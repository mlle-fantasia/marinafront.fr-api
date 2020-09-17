import { Request, Response } from "express";
import { getManager, getRepository, getConnection } from "typeorm";
import { Article } from "../entity/Article";
import { Lien } from "../entity/Lien";

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
	const listeLiens = await getRepository(Lien).createQueryBuilder("lien").select(["lien.id", "lien.url", "lien.nom"]).getMany();
	article.liens = await getConnection().createQueryBuilder().relation(Article, "liens").of(article).loadMany();

	//let liens = await articlesGetLiensByIdAction(request.params.id);
	let acticlesaside = await listeAsideGetByIdAction(request.params.id);
	let dataResponse = {
		article,
		acticlesaside,
	};
	// return loaded post
	response.send(dataResponse);
}

export async function listeAsideGetByIdAction(id) {
	const liste = await getRepository(Article).createQueryBuilder("article").select(["article.id", "article.title"]).getMany();
	/*     if (!liste) {
        response.status(404);
        response.end("article not found");
        return;
    } */
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

	/*     if (!listeLiens) {
        response.status(404);
        response.end("pas de liens disponibles");
        return;
    } */
	//response.send(listeLiens);
	return listeLiens;
}
