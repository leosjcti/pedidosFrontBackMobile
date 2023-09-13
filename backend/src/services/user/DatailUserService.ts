import primsaClient from "../../prisma";

interface AuthRequest {
    email: string;
    password: string;
}


class DatailUserService {
    
    async execute() {

       

        return {
           ok: true
        }
    }
}
export { DatailUserService }