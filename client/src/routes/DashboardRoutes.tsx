
import React from "react";
import Loadable from "../components/Loadable";
import PrivateRoute from "../gurads/PrivateRoutes";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import VaccinationPage from "../pages/manager/VaccinationPage";
import AppointmentPage from "../pages/manager/AppointmentPage";
import ChatPage from "../pages/manager/Chatpage";
import NotePage from "../pages/manager/Notepage";


const DashBoardPage = Loadable(React.lazy(() => import("../pages/manager/DashBoardPage")));
const MemberPage = Loadable(React.lazy(() => import("../pages/manager/MemberPage")));
const AllergyPage = Loadable(React.lazy(() => import('../pages/manager/AllergyPage')));
const MedicationPage = Loadable(React.lazy(() => import('../pages/manager/MedicationPage')));
const EmergencyContactPage = Loadable(React.lazy(() => import('../pages/manager/EmergencyContactPage')));
const HelpPage = Loadable(React.lazy(() => import('../pages/manager/HelpPage')));
const MedicalRecordPage = Loadable(React.lazy(() => import('../pages/manager/MedicalRecordPage')));
const DocumentPage = Loadable(React.lazy(() => import('../pages/manager/DocumentPage')));
const HealthStatsPage = Loadable(React.lazy(() => import('../pages/manager/HealthStatsPage')))

export const DashboardRoutes: RouteObject = {

  children: [
    {
      path: '/manager',
      element: <PrivateRoute element={<DashboardLayout />} />,
      children: [
        {
          path: "",
          element: <DashBoardPage />
        },
        {
          path: 'members',
          element: <MemberPage />
        },
        {
          path: 'allergies',
          element: <AllergyPage />
        },
        {
          path: 'medications',
          element: <MedicationPage />
        },
        {
          path: 'vaccinations',
          element: <VaccinationPage />
        },
        {
          path: 'emergency-contacts',
          element: <EmergencyContactPage />
        },
        {
          path: 'help-support',
          element: <HelpPage />
        },
        {
          path: 'health-stats',
          element: <HealthStatsPage />
        },
        {
          path: 'medical-records',
          // element: <PrivateRoute element={<MedicalRecordPage />} />
          element: <MedicalRecordPage />
        },
        {
          path: 'documents',
          // element: <PrivateRoute element={<DocumentPage />} />
          element: <DocumentPage />
        },
        {
          path: 'appointments',
          element: <AppointmentPage />
        },
        {
          path: 'notes',
          element: <NotePage />
        },
        {
          path: 'chat-ai',
          element: <ChatPage />
        }
      ],
    },
  ],
};
