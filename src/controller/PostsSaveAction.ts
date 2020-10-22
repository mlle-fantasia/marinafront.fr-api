import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Post } from "../entity/Post";
import { getConnection } from "typeorm";
import { LOADIPHLPAPI } from "dns";
const fs = require("fs-extra");
const path = require("path");

/**
 * Saves given post.
 */
export async function postsPostAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const postRepository = getManager().getRepository(Post);

	let post = new Post();
	post.title = request.body.title;
	post.image = request.body.site;
	post.contenu = request.body.contenu;
	post.hidden = request.body.hidden;
	post.order = parseInt(request.body.order === "" ? 1000 : request.body.order);
	post.resume = request.body.resume 
	post.date = request.body.date ? request.body.date : new Date() ;

	const newPost = postRepository.create(post);

	// save received post
	await postRepository.save(newPost);

	// return saved post back
	response.send(newPost);
}

export async function postsPutAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const postRepository = getManager().getRepository(Post);

	// load a post by a given post id
	const post = await postRepository.findOne(request.params.id);

	post.title = request.body.title;
	post.image = request.body.site;
	post.contenu = request.body.contenu;
	post.hidden = request.body.hidden;
	post.order = request.body.order;
	post.date = request.body.date 
	post.resume = request.body.resume 

	const newPost = postRepository.create(post);

	// save received post
	await postRepository.save(newPost);

	// return saved post back
	response.send(newPost);
}

export async function postsHiddenAction(request: Request, response: Response) {
	// get a post repository to perform operations with post
	const repository = getManager().getRepository(Post);
	// load a artticle by a given post id
	const post = await repository.findOne(request.params.id);
	post.hidden = request.body.hidden;
	// save received post
	await repository.save(post);

	// return saved post back
	response.send(post);
}

export async function postsPostImageAction(req, res) {
	const repository = getManager().getRepository(Post);
	const post = await repository.findOne(req.params.id);
	let ext = path.extname(req.files.image.name).toLowerCase();
	fs.ensureDirSync(process.cwd() + "/uploads/posts");
	let filenameOrigin = process.cwd() + "/uploads/posts/post" + req.params.id + ext;
	req.files.image.mv(filenameOrigin, async function (err) {
		if (err) return res.status(500).send(err);

		post.image = req.files.image.name;
		await repository.save(post);

		res.send("ok");
	});
}

export async function postsPostImage2Action(req, res) {
	const repository = getManager().getRepository(Post);
	const post = await repository.findOne(req.params.id);
	console.log("req.params.id",req.params.id)
	let ext = path.extname(req.files.image.name).toLowerCase();
	fs.ensureDirSync(process.cwd() + "/uploads/posts");
	let filenameOrigin = process.cwd() + "/uploads/posts/post" + req.params.id +"-big"+ ext;
	req.files.image.mv(filenameOrigin, async function (err) {
		if (err) return res.status(500).send(err);

		post.image2= req.files.image.name;
		await repository.save(post);

		res.send("ok");
	});
}

export async function postDeleteAction(request: Request, response: Response) {
	await getConnection().createQueryBuilder().delete().from(Post).where("id = :id", { id: request.params.id }).execute();
	response.send("ok");
}
