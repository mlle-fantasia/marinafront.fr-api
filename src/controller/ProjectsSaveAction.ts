import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Projet } from "../entity/Projet";
import { getConnection } from "typeorm";
/**
 * post projet
 * Saves given projet.
 */
export async function projectsSaveAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const projetRepository = getManager().getRepository(Projet);
console.log(request.body.order)
	let projet = new Projet();
	projet.title = request.body.title;
	projet.site = request.body.site;
	projet.contenu = request.body.contenu;
	projet.langage = request.body.langage;
	projet.hidden = request.body.hidden;
	projet.order = parseInt(request.body.order === "" ? 1000 : request.body.order);

	const newProjet = projetRepository.create(projet);

	// save received post
	await projetRepository.save(newProjet);

	// return saved post back
	response.send(newProjet);
}

/**
 * put projet
 * Saves given projet.
 */
export async function projectsPutAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const projetRepository = getManager().getRepository(Projet);

	// load a post by a given post id
	const projet = await projetRepository.findOne(request.params.id);

	projet.title = request.body.title;
	projet.site = request.body.site;
	projet.contenu = request.body.contenu;
	projet.langage = request.body.langage;
	projet.order = request.body.order;

	const newProjet = projetRepository.create(projet);

	// save received post
	await projetRepository.save(newProjet);

	// return saved post back
	response.send("projet modifié");
}

export async function projectsDeleteAction(request: Request, response: Response) {
	await getConnection().createQueryBuilder().delete().from(Projet).where("id = :id", { id: request.params.id }).execute();
	response.send("ok");
}

/**
 * 
 * @param request 
 * @param response
 * put d'un projet pour modifier le champ hidden 
 *  
 */
export async function projectsHiddenAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const repository = getManager().getRepository(Projet);
	// load a artticle by a given post id
	const projet = await repository.findOne(request.params.id);
	projet.hidden = request.body.hidden;
	// save received post
	await repository.save(projet);

	// return saved post back
	response.send(projet);
}


