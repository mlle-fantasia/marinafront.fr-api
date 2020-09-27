import { LOADIPHLPAPI } from "dns";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Article } from "../entity/Article";
import { Lien } from "../entity/Lien";
const fs = require("fs-extra");
const path = require("path");

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
	article.resume = request.body.resume;
	article.miniature = request.body.miniature;
	article.site = request.body.site;
	article.contenu = request.body.contenu;
	article.langage = request.body.langage;

	// save received post
	await articleRepository.save(article);

	// return saved post back
	response.send(article);
}
export async function articlesPutImageAction(request: Request, response: Response) {
	const articleRepository = getManager().getRepository(Article);
	const article = await articleRepository.findOne(request.params.id);

	/* 	row_co.co_avatar = path.basename(request.files.image.name);

	let uploadPathDirImage = path.dirname(__dirname) + "/uploads/image/";
	let ext = path.extname(row_co.co_avatar).toLowerCase();
	fs.ensureDirSync(uploadPathDirImage);
	let filenameOrigin = uploadPathDirImage + "original-" + row_co.co_id + ext;

			let filenameOrigin = Services.getAvatarPathOrigin(row_co);
			// let filenameDest = Services.getAvatarPathDest(row_co, w, h);
			response.files.image.mv(filenameOrigin, async function (err) {
				if (err) return response.status(500).send(err);
				let row_co2 = await Contacts.update({ co_id: row_co.co_id }, { co_avatar: row_co.co_avatar }).exec(true);
				response.send("ok"); */
}
