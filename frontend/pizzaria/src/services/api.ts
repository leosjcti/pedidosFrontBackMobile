import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenErrors } from "./errors/AuthTokenErrors";
import { signOut } from "../contexts/AuthContext";

export function setupAPIClient(context = undefined) {
    let cookies = parseCookies(context);

    const api = axios.create({
        baseURL: 'http://192.168.15.7:3333',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}` //Poderia ser qualquer nome
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response.status === 401) {
            //Qualquer erro 401 (nao autorizado) devemos deslogar o usuario
            if(typeof window !== undefined) {
                //Chamar a funcao para deslogar o usuario
                signOut();
            } else {
                return Promise.reject(new AuthTokenErrors)
            }
        }
        return Promise.reject(error)
    })

    return api;

}

