import { compare } from "bcryptjs";
import primsaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}


class AuthUserService {
    
    async execute({email, password}: AuthRequest) {

        //Verificar se email já existe
        const user = await primsaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user) {
            throw new Error("User/password incorrect")
        }


        //Verificar senha
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("User/password incorrect")
        }


        //Gerar token JWT e retornar os dados id, name, email
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}
export { AuthUserService }