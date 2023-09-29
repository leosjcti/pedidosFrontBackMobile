import React, { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode
}

type SignInProps = {
    email: string;
    password: string;
}


export const AuthContext = createContext({} as AuthContextData)

export function AuthProvier({children}: AuthProviderProps) {
    const[loadingAuth, setLoadingAuth] = useState(false)
    const[loading, setLoading] = useState(true)

    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })
    const isAuthenticated = !!user.name;

    //Gerencia o ciclo de vida
    useEffect(() => {
      
        async function getUser() {
            //Pegar os dados salvos do user
            const userInfo = await AsyncStorage.getItem('@pizzaria');
            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            //Verificar se recebemos as informacoes dele
            if(Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`
                   
                setUser({id: hasUser.id, name: hasUser.name, email: hasUser.email, token: hasUser.token})
            }
            setLoading(false)
        }
        getUser();
          
    }, [])
    

    //Login do usuer
    async function signIn({ email, password}: SignInProps) {
        setLoadingAuth(true)
        try {
            const response = await api.post('/session', {
                email, 
                password
            })
            //console.log(response.data)
            const {id, name, token} = response.data

            //Grava no async storage
            const data = {...response.data}
            await AsyncStorage.setItem('@pizzaria', JSON.stringify(data))

            //Fornece o token por padrão para todas as rotas desse contexto.
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({id, name, email, token})
            setLoadingAuth(false)
            
        } catch (error) {
            console.log("erro ao acessar", error)
            setLoadingAuth(false)
        }
    }

    //Logout do user
    async function signOut() {
        await AsyncStorage.clear()
        .then( () => {
            setUser({id: '', name: '', email: '', token: ''})
        })
    }


    //O que o contexto vai exportar
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, loadingAuth, loading, signOut }} >
            {children /* {} Renderiza todas as paginas que estarão por dentro do contexto. */}
        </AuthContext.Provider>
    )
}