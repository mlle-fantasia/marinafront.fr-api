import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Article} from "../entity/Article";

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