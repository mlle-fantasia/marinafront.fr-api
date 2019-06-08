import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Article} from "../entity/Article";

/**
 * Loads all posts from the database.
 */
export async function articlesGetAllAction(request: Request, response: Response) {

        // get a post repository to perform operations with post
        const articlesRepository = getManager().getRepository(Article);
        // load a post by a given post id
        const articles = await
        articlesRepository.find();

        // return loaded posts
        response.send(articles);

}