import {Request, Response} from "express";
import {getManager, getRepository} from "typeorm";
import {Article} from "../entity/Article";
import {Lien} from "../entity/Lien";

/**
 * Loads post by a given id.
 */
export async function articlesGetByIdAction(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const articleRepository = getManager().getRepository(Article);

    // load a post by a given post id
    const article = await articleRepository.findOne(request.params.id);

    // if post was not found return 404 to the client
    if (!article) {
        response.status(404);
        response.end("article not found");
        return;
    }

    // return loaded post
    response.send(article);
}

export async function listeAsideGetByIdAction(request: Request, response: Response){

    const liste = await getRepository(Article).createQueryBuilder("article")
        .select(["article.id","article.title"])
        .getMany();

    if (!liste) {
        response.status(404);
        response.end("article not found");
        return;
    }

    let listaside = liste.filter((article)=>{
       return article.id !== parseInt(request.params.id);
    });

    response.send(listaside);

}

 export async function articlesGetLiensByIdAction(request: Request, response: Response){

     const listeLiens = await getRepository(Lien).createQueryBuilder("lien")
         .select(["lien.url","lien.nom"])
         .where("lien.articleId = :id", { id: request.params.id })
         .getMany();

    if (!listeLiens) {
        response.status(404);
        response.end("pas de liens disponibles");
        return;
    }
console.log("les liens",listeLiens);
    response.send(listeLiens);
}
