// src/router/index.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import SystemAdminDashboard from "../dashboards/SystemAdminDashboard";
import AthleteDashboard from "../dashboards/AthleteDashboard";
import GymsPage from "../dashboards/gym/GymsPage";
import ProtectedRoute from "../routes/ProtectedRoute";



export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },

  // -------- SYSTEM ADMIN --------
  {
    path: "/system-admin",
    element: <ProtectedRoute role="SystemAdmin" />,
    children: [
      { index: true, element: <SystemAdminDashboard /> },
      { path: "gyms", element: <GymsPage /> }
    ]
  },

  // -------- GYM ADMIN --------
  {
    path: "/gym-admin",
    element: <ProtectedRoute role="GymAdmin" />,
    children: [
      // { index: true, element: <GymAdminDashboard /> }
      { index: true, element: <AthleteDashboard /> }

    ]
  },

  // -------- ATHLETE --------
  {
    path: "/athlete",
    element: <ProtectedRoute role="Athlete" />,
    children: [
      { index: true, element: <AthleteDashboard /> }
    ]
  },

  { path: "*", element: <Navigate to="/login" /> }
]);
