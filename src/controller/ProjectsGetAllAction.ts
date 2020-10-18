import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Projet } from "../entity/Projet";

/**
 * get all 
 * Loads all project from the database to affiche in site
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
