import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface Payload {
    sub: string
}

export function isAuthenticated(
    req: Request,
    res: Response, 
    next: NextFunction
    ){

    //Receber o token
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).end();
    }

    //tira o bearer do tokn
    const [, token] = authToken.split(" ")

   
    try {
        //Valiar esse token  (Desconstruir o token pegar o sub e afirmar que é um Payload)
        const { sub } = verify( token, process.env.JWT_SECRET) as Payload

        return next();
        
    } catch (error) {
        return res.status(401).end();
    }

}