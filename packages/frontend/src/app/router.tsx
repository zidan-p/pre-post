import { createBrowserRouter, RouteObject } from "react-router-dom";
import { CommonLayout } from "./layouts/common-layout";







const routes: RouteObject[] = [
  {
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <>Hello</>
      },
    ]
  },
];


export const router =  createBrowserRouter(routes);