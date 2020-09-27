import { articlesGetAllAction, articlesGetAllAdminAction } from "./controller/ArticlesGetAllAction";
import { articlesGetByIdAction, listeAsideGetByIdAction, articlesGetLiensByIdAction } from "./controller/ArticlesGetByIdAction";
import { articlesSaveAction, articlesPutAction, articlesPutImageAction } from "./controller/ArticlesSaveAction";
import { projetsSaveAction, projetsGetAllAdminAction, projetsPutAction, projetsGetByIdAction } from "./controller/ProjectSaveAction";
import { authAction } from "./controller/AuthentificationAction";
import { Request, Response } from "express";
var jwt = require("jsonwebtoken");

function authMiddleware(request: Request, response: Response, next) {
	try {
		jwt.verify(request.headers.authorization, process.env.TOKEN_KEY);
		next();
	} catch (error) {
		response.status(401).send();
	}
}

/**
 * All application routes.
 */
export const AppRoutes = [
	{
		path: "/",
		method: "get",
		action: articlesGetAllAction,
		middlewares: [],
	},
	{
		path: "/login",
		method: "post",
		action: authAction,
		middlewares: [],
	},
	{
		path: "/articles/list",
		method: "get",
		action: articlesGetAllAction,
		middlewares: [],
	},
	{
		path: "/articles/:id",
		method: "get",
		action: articlesGetByIdAction,
		middlewares: [],
	},
	/* {
		path: "/articles/listeaside/:id",
		method: "get",
		action: listeAsideGetByIdAction,
		middlewares: [],
	},
	{
		path: "/articles/liens/:id",
		method: "get",
		action: articlesGetLiensByIdAction,
		middlewares: [],
	}, */
	{
		path: "/admin/articles/add",
		method: "post",
		action: articlesSaveAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/admin/articles/modifier/:id",
		method: "put",
		action: articlesPutAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/admin/articles/list",
		method: "get",
		action: articlesGetAllAdminAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/admin/articles/:id/image",
		method: "post",
		action: articlesPutImageAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/projets/:id",
		method: "get",
		action: projetsGetByIdAction,
		middlewares: [],
	},
	{
		path: "/admin/projets/modifier/:id",
		method: "post",
		action: projetsPutAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/admin/projets/add",
		method: "post",
		action: projetsSaveAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/admin/projets/list",
		method: "get",
		action: projetsGetAllAdminAction,
		middlewares: [authMiddleware],
	},
];
