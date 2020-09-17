import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Article } from "../entity/Article";
import { Lien } from "../entity/Lien";

/**
 * Saves given post.
 */
export async function articlesSaveAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const articleRepository = getManager().getRepository(Article);

	let article = new Article();
	article.title = request.body.title;
	article.resume = request.body.resume;
	article.miniature = request.body.miniature;
	article.site = request.body.site;
	article.contenu = request.body.contenu;
	article.langage = request.body.langage;

	const newArticle = articleRepository.create(article);

	// save received post
	await articleRepository.save(newArticle);

	// return saved post back
	response.send(newArticle);
}

export async function articlesPutAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const articleRepository = getManager().getRepository(Article);
	const lienRepository = getManager().getRepository(Lien);

	// save liens
	if (request.body.liens.length) {
		for (let i = 0; i < request.body.liens.length; i++) {
			const lien = request.body.liens[i];
			const lienToSave = await lienRepository.findOne(lien.id);
			lienToSave.nom = lien.nom;
			lienToSave.url = lien.url;

			await lienRepository.save(lienToSave);
		}
	}

	// load a post by a given post id
	const article = await articleRepository.findOne(request.params.id);

	article.title = request.body.title;
	article.resume = request.body.resume;
	article.miniature = request.body.miniature;
	article.site = request.body.site;
	article.contenu = request.body.contenu;
	article.langage = request.body.langage;

	// save received post
	await articleRepository.save(article);

	// return saved post back
	response.send("article modifié");
}
