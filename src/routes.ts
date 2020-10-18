import { userGetAction, userPutAction, userPostCv } from "./controller/UserAction";
import { articlesGetAllAction, articlesGetAllAdminAction , articlesGetMiniatureAction, articlesGetByIdAction} from "./controller/ArticlesGetAllAction";
import { projectsGetAllAction } from "./controller/ProjectsGetAllAction";
// import { articlesGetByIdAction } from "./controller/ArticlesGetByIdAction";
import {
	articlesSaveAction,
	articlesPutAction,
	articlesPostMiniatureAction,
	
	articlesHiddenAction,
	articlesDeleteArticleAction,
} from "./controller/ArticlesSaveAction";
import { projectsSaveAction, projectsGetAllAdminAction, projectsPutAction, projectsGetByIdAction } from "./controller/ProjectsSaveAction";
import { authAction } from "./controller/AuthentificationAction";
import { postsGetAllAction, postsGetByIdAction } from "./controller/PostsGetAction";
import {
	postsPostAction,
	postsPutAction,
	postsHiddenAction,
	postsPostImageAction,
	postsGetImageAction,
	postDeleteAction,
} from "./controller/PostsSaveAction";
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
	{
		path: "/admin/posts/list",
		method: "get",
		action: postsGetAllAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/posts/list",
		method: "get",
		action: postsGetAllAction,
		middlewares: [],
	},
	{
		path: "/admin/posts/add",
		method: "post",
		action: postsPostAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/admin/posts/:id/image",
		method: "post",
		action: postsPostImageAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/admin/posts/edit/:id",
		method: "put",
		action: postsPutAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/posts/hidden/:id",
		method: "put",
		action: postsHiddenAction,
		middlewares: [authMiddleware],
	},
	{
		path: "/posts/:id",
		method: "get",
		action: postsGetByIdAction,
		middlewares: [],
	},
	{
		path: "/posts/:id/image",
		method: "get",
		action: postsGetImageAction,
		middlewares: [],
	},
];
