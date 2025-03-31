import React from "react";
import Loadable from "../components/Loadable";
import HomeLayout from "../layouts/HomeLayout";

const HomePage = Loadable(React.lazy(() => import("../pages/home/HomePage")));
const TestPage = Loadable(React.lazy(() => import("../pages/home/TestPage")));

export const HomeRoutes = {
  children: [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <HomePage />
        }
      ]
    }
  ]
}