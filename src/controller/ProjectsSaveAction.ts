import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Projet } from "../entity/Projet";

/**
 * post projet
 * Saves given projet.
 */
export async function projectsSaveAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const projetRepository = getManager().getRepository(Projet);

	let projet = new Projet();
	projet.title = request.body.title;
	projet.site = request.body.site;
	projet.contenu = request.body.contenu;
	projet.langage = request.body.langage;
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

export async function projectsGetAllAdminAction(request: Request, response: Response) {
	const entities = await getRepository(Projet).createQueryBuilder("projet").select(["projet.id", "projet.title", "projet.order"]).orderBy("projet.order", "ASC").getMany();
	response.send(entities);
}

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
