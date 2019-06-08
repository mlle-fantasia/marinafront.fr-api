import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";
import {createConnection} from "typeorm";
import {Article} from "./entity/Article";

// create typeorm connection
createConnection().then(connection => {
    const articleRepository = connection.getRepository(Article);

    // create and setup express app
    const app = express();
    app.use(bodyParser.json());

    // register routes

    app.get("/articles", async function(req: Request, res: Response) {
        const articles = await articleRepository.find();
        res.json(articles);
    });

    app.get("/articles/:id", async function(req: Request, res: Response) {
        const results = await articleRepository.findOne(req.params.id);
        return res.send(results);
    });

    app.post("/articles", async function(req: Request, res: Response) {
        const articles = await articleRepository.create(req.body);
        const results = await articleRepository.save(articles);
        return res.send(results);
    });

    app.put("/articles/:id", async function(req: Request, res: Response) {
        const articles = await articleRepository.findOne(req.params.id);
        await articleRepository.merge(articles, req.body);
        const results = await articleRepository.save(articles);
        return res.send(results);
    });

    app.delete("/articles/:id", async function(req: Request, res: Response) {
        const results = await articleRepository.remove(req.params.id);
        return res.send(results);
    });

    // start express server
    app.listen(3001);
});