import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { User } from "../entity/User";
var jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

/**
 * 
 */
export async function authAction(request: Request, response: Response) {
	const userRepository = getManager().getRepository(User);
	const user = await userRepository.find({
		where: {
			email: request.body.login,
		},
	});
	if (!user.length) {
		response.send("pas ok");
		return;
	}
	let hash = user[0].password;
	console.log(request.body.pass, hash);
		bcrypt.compare(request.body.pass, hash).then(async function (res) {
 			if (res) {
				console.log("hash ok");
				let token = generateToken();
				response.send({ token });
				return;
			} else {
				console.log("hash pas ok");
				response.status(401);
				response.send("pas ok");
				return;
			}

		}).catch((err) => {
			console.error("bcrypt.compare err", err);
			response.status(500);
			response.send("error");
		});

}

function generateToken() {
	var jeton = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60, foo: "bar" }, process.env.TOKEN_KEY);
	return jeton;
}
