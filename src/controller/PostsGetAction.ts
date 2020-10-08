import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Post } from "../entity/Post";

/**
 * Loads all posts from the database.
 *  * @param request
 * @param response
 *  * @returns a tableau of post object
 */
export async function postsGetAllAction(request: Request, response: Response) {
	const entities = await getRepository(Post).createQueryBuilder("post").select(["post.id", "post.title", "post.contenu", "post.image"]).getMany();
	response.send(entities);
}
/**
 * loads a post with post id given in route parametter
 * @param request
 * @param response
 * @returns a post object
 */
export async function articlesGetByIdAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const articleRepository = getManager().getRepository(Post);

	// load a post by a given post id
	const post = await articleRepository.findOne(request.params.id);
	// if post was not found return 404 to the client
	if (!post) {
		response.status(404);
		response.end("post not found");
		return;
	}
	// return loaded post
	response.send(post);
}
