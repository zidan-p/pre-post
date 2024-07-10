import { createBrowserRouter, RouteObject } from "react-router-dom";
import { CommonLayout } from "./layouts/common-layout";
import { HomePage } from "../page/Home";







const routes: RouteObject[] = [
  {
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
    ]
  },
];


export const router =  createBrowserRouter(routes);