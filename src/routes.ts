import {articlesGetAllAction, articlesGetAllAdminAction} from "./controller/ArticlesGetAllAction";
import {articlesGetByIdAction, listeAsideGetByIdAction, articlesGetLiensByIdAction} from "./controller/ArticlesGetByIdAction";
import {articlesSaveAction, articlesPutAction} from "./controller/ArticlesSaveAction";
import {projetsSaveAction, projetsGetAllAdminAction, projetsPutAction, projetsGetByIdAction} from "./controller/ProjectSaveAction";
import {authAction} from "./controller/AuthentificationAction";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/",
        method: "get",
        action: articlesGetAllAction
    },
    {
        path: "/login",
        method: "post",
        action: authAction
    },
    {
        path: "/articles/list",
        method: "get",
        action: articlesGetAllAction
    },
    {
        path: "/articles/:id",
        method: "get",
        action: articlesGetByIdAction
    },
    {
        path: "/articles/listeaside/:id",
        method: "get",
        action: listeAsideGetByIdAction
    },
    {
        path: "/articles/liens/:id",
        method: "get",
        action: articlesGetLiensByIdAction
    },
    {
        path: "/admin/articles/add",
        method: "post",
        action: articlesSaveAction
    },
    {
        path: "/admin/articles/modifier/:id",
        method: "post",
        action: articlesPutAction
    },
    {
        path: "/admin/articles/list",
        method: "get",
        action: articlesGetAllAdminAction
    },
    {
        path: "/projets/:id",
        method: "get",
        action: projetsGetByIdAction
    },
    {
        path: "/admin/projets/modifier/:id",
        method: "post",
        action: projetsPutAction
    },
    {
        path: "/admin/projets/add",
        method: "post",
        action: projetsSaveAction
    },
    {
        path: "/admin/projets/list",
        method: "get",
        action: projetsGetAllAdminAction
    },
];