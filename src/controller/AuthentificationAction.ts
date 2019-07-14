import {Request, Response} from "express";
import {getManager, getRepository} from "typeorm";
import {User} from "../entity/User";


/**
 * Saves given post.
 */
export async function authAction(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    console.log(request.body.login);
    const user = await userRepository.find({
        where: {
            email: request.body.login
        }
    });

    if(user[0]){
        console.log(user);
        response.send("ok");
    }else{
        response.status(404);
        response.end("utilisateur non trouvé");
        return;

    }


}