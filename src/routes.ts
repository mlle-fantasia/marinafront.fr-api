import {articlesGetAllAction} from "./controller/ArticlesGetAllAction";
import {articlesGetByIdAction} from "./controller/ArticlesGetByIdAction";
import {articlesSaveAction} from "./controller/ArticlesSaveAction";
import {articlesGetAllAdminAction} from "./controller/ArticlesGetAllAction";

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
        path: "/admin/articles/add",
        method: "post",
        action: articlesSaveAction
    },
    {
        path: "/admin/articles/list",
        method: "get",
        action: articlesGetAllAdminAction
    },
];