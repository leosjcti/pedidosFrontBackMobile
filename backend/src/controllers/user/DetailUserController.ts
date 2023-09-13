import { Request, Response } from "express";
import { DatailUserService } from "../../services/user/DatailUserService";

class DetailUserController {
    
    async handle(req: Request, res:Response) {
        const {email, password} = req.body
        
        const detailUserService = new DatailUserService();
        const user = await detailUserService.execute();

        return res.json(user)
    }
}
export { DetailUserController }