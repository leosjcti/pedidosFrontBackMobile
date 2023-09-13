import { hash } from "bcryptjs";
import primsaClient from "../../prisma";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}


class CreateUserService {
    
    async execute({name, email, password}: UserRequest) {
      
        //Verificar se tem email
        if(!email) {
            throw new Error("Email incorrect")
        }

        //Verificar se email já existe
        const userAlreadyExists = await primsaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExists) {
            throw new Error("User already exists")
        }
      
        const passwordHash = await hash(password, 8);
        
        //Grava no BD
        const user = await primsaClient.user.create ({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            //O que será retornado
            select: {
                id: true,
                name: true,
                email: true
            }
        })
      
      
        return { user }
    }
}
export { CreateUserService }