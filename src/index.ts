import "reflect-metadata";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import {AppRoutes} from "./routes";
// import {cors} from "cors";
const cors = require('cors');

// create connection with database
// TypeORM creates connection pools and uses them for your requests
createConnection().then( connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors({
        origin: "*"
    }));

    // register all application routes
    AppRoutes.forEach(route => {
        console.log(route);
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    // run app
    app.listen(3001);

    console.log("Express application is up and running on port 3001");

}).catch(error => console.log("TypeORM connection error: ", error));
