import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Article } from "../entity/Article";
import { Lien } from "../entity/Lien";
import { getConnection } from "typeorm";
const fs = require("fs-extra");
const path = require("path");

/**
 * post article
 * Saves given new article .
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
	article.order = parseInt(request.body.order === "" ? 1000 :request.body.order);

	const newArticle = articleRepository.create(article);

	// save received post
	await articleRepository.save(newArticle);

	// return saved post back
	response.send(newArticle);
}


/**
 * put article
 * Saves given article.
 */
export async function articlesPutAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const articleRepository = getManager().getRepository(Article);
	const lienRepository = getManager().getRepository(Lien);
	// load a artticle by a given post id
	const article = await articleRepository.findOne(request.params.id);

	// save liens
	if (request.body.liens.length) {
		for (let i = 0; i < request.body.liens.length; i++) {
			const lien = request.body.liens[i];
			// si le lien existe
			if (lien.id) {
				const lienToSave = await lienRepository.findOne(lien.id);
				lienToSave.nom = lien.nom;
				lienToSave.url = lien.url;
				await lienRepository.save(lienToSave);
			} else {
				//s'il n'existe pas
				let newLien = new Lien();
				newLien.nom = lien.nom;
				newLien.url = lien.url;
				newLien.article = article;
				const newLink = lienRepository.create(newLien);
				await lienRepository.save(newLink);
			}
		}
	}

	article.title = request.body.title;
	article.oc = request.body.oc;
	article.resume = request.body.resume;
	article.miniature = request.body.miniature;
	article.site = request.body.site;
	article.contenu = request.body.contenu;
	article.langage = request.body.langage;
	article.order = request.body.order;

	// save received post
	await articleRepository.save(article);

	// return saved post back
	response.send(article);
}

/**
 * 
 * @param request 
 * @param response
 * put d'un article pour modifier le champs hidden 
 *  
 */
export async function articlesHiddenAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const articleRepository = getManager().getRepository(Article);
	// load a artticle by a given post id
	const article = await articleRepository.findOne(request.params.id);
	article.hidden = request.body.hidden;
	// save received post
	await articleRepository.save(article);

	// return saved post back
	response.send(article);
}

/**
 * 
 * @param request 
 * @param response
 * enregistre l'image miniature de l'article dans uploads/miniatures 
 * sous le nom : "article" + id de l'article
 *  
 */
export async function articlesPostMiniatureAction(req, res) {
	const articleRepository = getManager().getRepository(Article);
	const article = await articleRepository.findOne(req.params.id);

	let ext = path.extname(req.files.image.name).toLowerCase();
	fs.ensureDirSync(process.cwd() + "/uploads/miniatures");
	let filenameOrigin = process.cwd() + "/uploads/miniatures/article" + req.params.id + ext;
	req.files.image.mv(filenameOrigin, async function (err) {
		if (err) return res.status(500).send(err);

		article.miniature = req.files.image.name;
		await articleRepository.save(article);

		res.send("ok");
	});
}

/**
 * 
 * @param request 
 * @param response
 * supprime un article avec l'id donné en paramètre de la route
 *  
 */
export async function articlesDeleteArticleAction(request: Request, response: Response) {
	await getConnection().createQueryBuilder().delete().from(Article).where("id = :id", { id: request.params.id }).execute();
	response.send("ok");
}
