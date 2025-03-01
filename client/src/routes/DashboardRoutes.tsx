

import React from "react";
import Loadable from "../components/Loadable";
import PrivateRoute from "../gurads/PrivateRoutes";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

const DashBoardPage = Loadable(React.lazy(() => import("../pages/manager/DashBoardPage")));
const MemberPage = Loadable(React.lazy(() => import("../pages/manager/MemberPage")));


export const DashboardRoutes: RouteObject = {

  children: [
    {
      path: "/manager",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          // element: <PrivateRoute element={<DashBoardPage />} />,
          element: <DashBoardPage />
        },
        {
          path: "members",
          // element: <PrivateRoute element={<MemberPage />} />,
          element: <MemberPage />
        },
      ],
    },
  ],
};
