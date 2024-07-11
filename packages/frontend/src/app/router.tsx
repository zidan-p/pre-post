import { createBrowserRouter, RouteObject } from "react-router-dom";
import { CommonLayout } from "./layouts/common-layout";
import { HomePage } from "../page/Home";
import { PostPage } from "../page/post";







const routes: RouteObject[] = [
  {
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/post/:postId",
        element: <PostPage />
      },
    ]
  },
];


export const router =  createBrowserRouter(routes);