
import React from "react";
import Loadable from "../components/Loadable";
import PrivateRoute from "../gurads/PrivateRoutes";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import VaccinationPage from "../pages/manager/VaccinationPage";
import AppointmentPage from "../pages/manager/AppointmentPage";
import ChatPage from "../pages/manager/Chatpage";


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
          // element: <PrivateRoute element={<MemberPage />} />,
          element: <MemberPage />
        },
        {
          path: 'allergies',
          // element: <PrivateRoute element={<AllergyPage />} />
          element: <AllergyPage />
        },
        {
          path: 'medications',
          // element: <PrivateRoute element={<MedicationPage />} />
          element: <MedicationPage />
        },
        {
          path: 'vaccinations',
          // element: <PrivateRoute element={<VaccinationPage />} />
          element: <VaccinationPage />
        },
        {
          path: 'emergency-contacts',
          // element: <PrivateRoute element={<EmergencyContactPage />} />
          element: <EmergencyContactPage />
        },
        {
          path: 'help-support',
          // element: <PrivateRoute element={<HelpPage />} />
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
          path: 'chat-ai',
          element: <ChatPage />
        }
      ],
    },
  ],
};
