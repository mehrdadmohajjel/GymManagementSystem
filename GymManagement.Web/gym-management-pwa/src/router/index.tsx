// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute";
import SystemAdminDashboard from "../dashboards/SystemAdminDashboard";
import Login from "../pages/Login";
import AthleteDashboard from "../dashboards/AthleteDashboard";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard/system-admin",
    element: (
      <ProtectedRoute role="SystemAdmin">
        <SystemAdminDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/gym-admin",
    element: (
      <ProtectedRoute role="GymAdmin">
        <SystemAdminDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard/athlete",
    element: (
      <ProtectedRoute role="Athlete">
        <AthleteDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: <Login />
  }
]);
