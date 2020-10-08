import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Projet } from "../entity/Projet";

/**
 * Loads all posts from the database.
 */
export async function projectsGetAllAction(request: Request, response: Response) {
	const entities = await getRepository(Projet)
		.createQueryBuilder("projet")
		.select(["projet.id", "projet.title", "projet.langage", "projet.site"])
		.getMany();
	response.send(entities);
}

export async function projectsGetAllAdminAction(request: Request, response: Response) {
	const entities = await getRepository(Projet).createQueryBuilder("projet").select(["projet.id", "projet.title", "projet.miniature"]).getMany();
	response.send(entities);
}
