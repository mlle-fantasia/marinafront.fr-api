import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { User } from "../entity/User";
import { LOADIPHLPAPI } from "dns";

const bcrypt = require("bcrypt");

/**
 * Saves given post.
 */
export async function authAction(request: Request, response: Response) {
	console.log(request.body);
	const userRepository = getManager().getRepository(User);
	const user = await userRepository.find({
		where: {
			email: request.body.login,
		},
	});

	if (!user.length) response.send("pas ok");
	let hash = user[0].password;
	bcrypt.compare(request.body.pass, hash).then(function (res) {
		console.log("2", hash);
		console.log("res ", res);
		if (res) {
			response.send("ok");
		} else {
			response.status(401);
			response.send("pas ok");
			return;
		}
	});
}
