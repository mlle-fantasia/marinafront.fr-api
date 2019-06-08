import {articlesGetAllAction} from "./controller/ArticlesGetAllAction";
import {articlesGetByIdAction} from "./controller/ArticlesGetByIdAction";
import {articlesSaveAction} from "./controller/ArticlesSaveAction";

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
        path: "/articles",
        method: "get",
        action: articlesGetAllAction
    },
    {
        path: "/articles/:id",
        method: "get",
        action: articlesGetByIdAction
    },
    {
        path: "/articles",
        method: "post",
        action: articlesSaveAction
    }
];