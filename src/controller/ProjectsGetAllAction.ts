import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Projet } from "../entity/Projet";

/**
 * get all 
 * Loads all project from the database to affiche in site - pas utilisé il me semble
 */
export async function projectsGetAllAction(request: Request, response: Response) {
	const entities = await getRepository(Projet)
		.createQueryBuilder("projet")
		.select(["projet.id", "projet.title", "projet.langage", "projet.site" ])
		.where("projet.hidden = :hidden", { hidden: 0 })
		.orderBy("projet.order", "ASC")
		.getMany();
	response.send(entities);
}


/**
 * get all 
 * Loads all project from the database to affiche in admin
 */
export async function projectsGetAllAdminAction(request: Request, response: Response) {
	const entities = await getRepository(Projet).createQueryBuilder("projet").select(["projet.id", "projet.title", "projet.order", "projet.hidden"]).orderBy("projet.order", "ASC").getMany();
	response.send(entities);
}

/**
 * get one 
 * Loads one project from the database with the id given
 */
export async function projectsGetByIdAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const projetRepository = getManager().getRepository(Projet);

	// load a post by a given post id
	const projet = await projetRepository.findOne(request.params.id);

	// if post was not found return 404 to the client
	if (!projet) {
		response.status(404);
		response.end("projet not found");
		return;
	}

	// return loaded post
	response.send(projet);
}

