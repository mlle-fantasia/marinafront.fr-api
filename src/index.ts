import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";
import { cors } from "cors";
import { User } from "./entity/User";
import { LOADIPHLPAPI } from "dns";
const cors = require("cors");
const bcrypt = require("bcrypt");

// create connection with database
// TypeORM creates connection pools and uses them for your requests
createConnection()
	.then(async (connection) => {
		// create express app
		const app = express();
		app.use(bodyParser.json());
		app.use(
			cors({
				origin: "*",
			})
		);

		// create user marina front
		const userRepository = getManager().getRepository(User);
		const marina = await userRepository.find({
			where: {
				email: "marinafront@hotmail.fr",
			},
		});
		bcrypt.hash("pass123", 10, function (err, hash) {
			//console.log("1", hash);
			let user = new User();
			user.tel = "0602108507";
			user.email = "marinafront@hotmail.fr";
			user.password = hash;
			user.address = "16 rue de la mairie";
			user.city = "Sophia-Antipolis";
			if (!marina.length) {
				userRepository.save(user);
			}
		});

		// register all application routes
		AppRoutes.forEach((route) => {
			app[route.method](route.path, (request: Request, response: Response, next: Function) => {
				route
					.action(request, response)
					.then(() => next)
					.catch((err) => next(err));
			});
		});

		// run app
		app.listen(3001);

		console.log("Express application is up and running on port 3001");
	})
	.catch((error) => console.log("TypeORM connection error: ", error));
