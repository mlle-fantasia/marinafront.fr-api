import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Article } from "../entity/Article";
import { LOADIPHLPAPI } from "dns";

/**
 * Loads all posts from the database.
 */
export async function articlesGetAllAction(request: Request, response: Response) {
	const entities = await getRepository(Article)
		.createQueryBuilder("article")
		.select(["article.id", "article.title", "article.miniature", "article.resume", "article.langage", "article.site"])
		.getMany();
	response.send(entities);
}

export async function articlesGetAllAdminAction(request: Request, response: Response) {
	const entities = await getRepository(Article)
		.createQueryBuilder("article")
		.select(["article.id", "article.title", "article.miniature"])
		.getMany();

	response.send(entities);
}
