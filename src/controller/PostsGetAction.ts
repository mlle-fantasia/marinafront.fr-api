import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Post } from "../entity/Post";
const fs = require("fs-extra");
const path = require("path");

/**
 * Loads all posts from the database.
 *  * @param request
 * @param response
 *  * @returns a tableau of post object order by l'ordre
 */
export async function postsGetAllAction(request: Request, response: Response) {
	const entities = await getRepository(Post).createQueryBuilder("post").orderBy("post.order", "ASC").getMany();
	response.send(entities);
}
/**
 * loads a post with post id given in route parametter
 * @param request
 * @param response
 * @returns a post object
 */
export async function postsGetByIdAction(request: Request, response: Response) {
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

export async function postsGetImageAction(req, res) {
	const repository = getManager().getRepository(Post);
	const post = await repository.findOne(req.params.id);
	let ext = "";
	if (post.image) ext = path.extname(post.image).toLowerCase();

	let filenameDest = process.cwd() + "/uploads/posts/post" + req.params.id + ext;
	if (!fs.existsSync(filenameDest)) return res.send("not_found");
	let readStream = fs.createReadStream(filenameDest);
	readStream.pipe(res);
}

export async function postsGetImage2Action(req, res) {
	const repository = getManager().getRepository(Post);
	const post = await repository.findOne(req.params.id);
	let ext = "";
	if (post.image2) ext = path.extname(post.image2).toLowerCase();

	let filenameDest = process.cwd() + "/uploads/posts/post" + req.params.id +"-big"+ ext;
	if (!fs.existsSync(filenameDest)) return res.send("not_found");
	let readStream = fs.createReadStream(filenameDest);
	readStream.pipe(res);
}
