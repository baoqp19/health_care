
import React from "react";
import Loadable from "../components/Loadable";
import PrivateRoute from "../gurads/PrivateRoutes";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import VaccinationPage from "../pages/manager/VaccinationPage";


const DashBoardPage = Loadable(React.lazy(() => import("../pages/manager/DashBoardPage")));
const MemberPage = Loadable(React.lazy(() => import("../pages/manager/MemberPage")));
const AllergyPage = Loadable(React.lazy(() => import('../pages/manager/AllergyPage')));
const MedicationPage = Loadable(React.lazy(() => import('../pages/manager/MedicationPage')));
const EmergencyContactPage = Loadable(React.lazy(() => import('../pages/manager/EmergencyContactPage')));


export const DashboardRoutes: RouteObject = {

  children: [
    {
      path: '/manager',
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <PrivateRoute element={<DashBoardPage />} />,
        },
        {
          path: 'members',
          element: <PrivateRoute element={<MemberPage />} />,
        },
        {
          path: 'allergies',
          element: <PrivateRoute element={<AllergyPage />} />
        },
        {
          path: 'medications',
          element: <PrivateRoute element={<MedicationPage />} />
        },
        {
          path: 'vaccinations',
          element: <PrivateRoute element={<VaccinationPage />} />
        },
        {
          path: 'emergencyContacts',
          element: <PrivateRoute element={<EmergencyContactPage />} />
        },
      ],
    },
  ],
};
