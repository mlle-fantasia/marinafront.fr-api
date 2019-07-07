import {Request, Response} from "express";
import {getManager, getRepository} from "typeorm";
import {Projet} from "../entity/Projet";

/**
 * Saves given post.
 */
export async function projetsSaveAction(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const projetRepository = getManager().getRepository(Projet);

    let projet = new Projet();
    projet.title = request.body.title;
    projet.site = request.body.site;
    projet.contenu = request.body.contenu;
    projet.langage = request.body.langage;

    const newProjet = projetRepository.create(projet);

    // save received post
    await projetRepository.save(newProjet);

    // return saved post back
    response.send(newProjet);
}

export async function projetsPutAction(request: Request, response: Response){
    // get a post repository to perform operations with post
    const projetRepository = getManager().getRepository(Projet);

    // load a post by a given post id
    const projet = await projetRepository.findOne(request.params.id);

    projet.title = request.body.title;
    projet.site = request.body.site;
    projet.contenu = request.body.contenu;
    projet.langage = request.body.langage;

    const newProjet = projetRepository.create(projet);

    // save received post
    await projetRepository.save(newProjet);

    // return saved post back
    response.send("projet modifié");
}

export async function projetsGetAllAdminAction(request: Request, response: Response){

    const entities = await getRepository(Projet).createQueryBuilder("projet")
        .select(["projet.id","projet.title"])
        .getMany();
console.log(entities);
    response.send(entities);
}

export async function projetsGetByIdAction(request: Request, response: Response){
    // get a post repository to perform operations with post
    const projetRepository = getManager().getRepository(Projet);

    // load a post by a given post id
    const projet = await projetRepository.findOne(request.params.id);

    // if post was not found return 404 to the client
    if (!projet) {
        response.status(404);
        response.end("projet not found");
        return;
    }

    // return loaded post
    response.send(projet);
}