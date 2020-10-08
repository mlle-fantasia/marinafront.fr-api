import { Request, Response } from "express";
import { getManager, getRepository, getConnection } from "typeorm";
import { Article } from "../entity/Article";
import { Lien } from "../entity/Lien";
import { Projet } from "../entity/Projet";

/**
 * Loads post by a given id.
 */
export async function articlesGetByIdAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const articleRepository = getManager().getRepository(Article);

	// load a post by a given post id
	const article = await articleRepository.findOne(request.params.id, { relations: ["liens"] });
	// if post was not found return 404 to the client
	if (!article) {
		response.status(404);
		response.end("article not found");
		return;
	}
	article.liens = await getConnection().createQueryBuilder().relation(Article, "liens").of(article).loadMany();

	let acticlesaside = await listeAsideGetByIdAction(request.params.id);

	let projets = [];
	if (article.oc) {
		projets = await getRepository(Projet)
			.createQueryBuilder("projet")
			.select(["projet.id", "projet.title", "projet.langage", "projet.site", "projet.contenu"])
			.getMany();
	}
	let dataResponse = {
		article,
		acticlesaside,
		projets,
	};
	// return loaded post
	response.send(dataResponse);
}

export async function listeAsideGetByIdAction(id) {
	const liste = await getRepository(Article).createQueryBuilder("article").select(["article.id", "article.title"]).getMany();
	let listaside = liste.filter((article) => {
		return article.id !== parseInt(id);
	});
	//response.send(listaside);
	return listaside;
}

export async function articlesGetLiensByIdAction(request: Request, response: Response) {
	const listeLiens = await getRepository(Lien)
		.createQueryBuilder("lien")
		.select(["lien.url", "lien.nom"])
		.where("lien.articleId = :id", { id: request.params.id })
		.getMany();

	//response.send(listeLiens);
	return listeLiens;
}
