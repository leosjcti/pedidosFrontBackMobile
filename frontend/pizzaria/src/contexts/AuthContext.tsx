import { api } from "../services/apiClient";
import  Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void;
    signUp: (credentials: SignUpProps) =>Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)


export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() => {

        //Tentar pegar algo no token
        const {'@nextauth.token': token} = parseCookies();
        if(token) {
            api.get('/me').then(response => {
                const {id, name, email} = response.data;
                setUser({ id, name, email })
            
            }).catch(() => {
                //Se deu erro, deslogamos o user
                signOut();
            })
        }

    }, [])

    //Login
    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            })

            const {id, name, token } = response.data

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, //Expirar em um mes
                path: "/" //Todas as paginas terão acesso
            })

            setUser({ id, name, email })

            //Passar para as proximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!')

            //Redirecionar o user para o /dashboard
            Router.push('/dashboard')


        } catch (error) {
            toast.error('Erro ao acessar!')
            console.log("Erro ao fazer login", error)
        }
    }

    //Cadastro de usuario
    async function signUp({name, email, password}: SignUpProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success('Conta criada!')

            Router.push('/')

        } catch (error) {
            toast.error('Erro ao cadastrar!')
            console.log("Erro ao cadastrar", error)
        }
    }


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch (error) {
        console.log("erro ao deslogar")
    }
}