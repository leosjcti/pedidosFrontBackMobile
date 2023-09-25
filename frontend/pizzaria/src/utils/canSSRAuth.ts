import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenErrors } from "../services/errors/AuthTokenErrors";

//Função para paginas que só podem ser acessadas por users logados
export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        //Se o user tentar acessar a pagina poren tenda já um login salvo, redirecionamos
        const token = cookies['@nextauth.token'];
        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
        try {
            return await fn(ctx);
        } catch (error) {

            if (error instanceof AuthTokenErrors) {
                destroyCookie(ctx, '@nextauth.token')

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }




    }

}