import { userGetAction, userPutAction, userPostCv } from "./controller/UserAction";
import { articlesGetAllAction, articlesGetAllAdminAction } from "./controller/ArticlesGetAllAction";
import { projectsGetAllAction } from "./controller/ProjetsGetAllAction";
import { articlesGetByIdAction, listeAsideGetByIdAction, articlesGetLiensByIdAction } from "./controller/ArticlesGetByIdAction";
import {
	articlesSaveAction,
	articlesPutAction,
	articlesPostMiniatureAction,
	articlesGetMiniatureAction,
	articlesHiddenAction,
	articlesDeleteArticleAction,
} from "./controller/ArticlesSaveAction";
import { projectsSaveAction, projectsGetAllAdminAction, projectsPutAction, projectsGetByIdAction } from "./controller/ProjectsSaveAction";
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
	{
		path: "/projets/list",
		method: "get",
		action: projectsGetAllAction,
		middlewares: [],
	},
	{
		path: "/projets/:id",
		method: "get",
		action: projectsGetByIdAction,
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
		path: "/user",
		method: "get",
		action: userGetAction,
		middlewares: [],
	},
	{
		path: "/admin/user/modifier/:id",
		method: "put",
		action: userPutAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/admin/user/modifiercv",
		method: "post",
		action: userPostCv,
		middlewares: [authMiddleware],
	},

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
		path: "/admin/articles/hide/:id",
		method: "put",
		action: articlesHiddenAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/admin/articles/list",
		method: "get",
		action: articlesGetAllAdminAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/admin/articles/:id",
		method: "delete",
		action: articlesDeleteArticleAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/admin/articles/:id/image",
		method: "post",
		action: articlesPostMiniatureAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/articles/:id/miniature",
		method: "get",
		action: articlesGetMiniatureAction,
		middlewares: [],
	},
	{
		path: "/admin/projets/modifier/:id",
		method: "post",
		action: projectsPutAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/admin/projets/add",
		method: "post",
		action: projectsSaveAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/admin/projets/list",
		method: "get",
		action: projectsGetAllAdminAction,
		middlewares: [authMiddleware],
	},
];
