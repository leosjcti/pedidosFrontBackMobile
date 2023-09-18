import primsaClient from "../../prisma";

interface AuthRequest {
    email: string;
    password: string;
}


class DatailUserService {
    
    async execute(user_id: string) {

        const user = await primsaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
       

        return user;
    }
}
export { DatailUserService }