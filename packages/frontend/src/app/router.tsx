import { createBrowserRouter, RouteObject } from "react-router-dom";
import { CommonLayout } from "./layouts/common-layout";
import { HomePage } from "../page/Home";
import { PostPage } from "../page/post";
import { UserPage } from "../page/user";







const routes: RouteObject[] = [
  {
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/posts/:postId",
        element: <PostPage />
      },
    ]
  },
  {
    path: "/users/:userId",
    element: <UserPage />
  }
];


export const router =  createBrowserRouter(routes);