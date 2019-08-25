import {Request, Response} from "express";
import {getManager, getRepository} from "typeorm";
import {User} from "../entity/User";

const bcrypt = require('bcrypt');

/**
 * Saves given post.
 */
export async function authAction(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    console.log(request.body.pass);
    const user = await userRepository.find({
        where: {
            email: request.body.login
        }
    });

    bcrypt.hash(request.body.pass, 10, function(err, hash) {
        console.log("1",hash)
    });

    let hash = user[0].password;
    bcrypt.compare(request.body.pass, hash).then(function(res) {
        console.log("2",hash);
        console.log("res " , res);
        if(res ){
            response.send("ok");
        }
        else{
            response.status(404);
            response.send("pas ok");
            return;

        }
    });



}