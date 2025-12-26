import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "../auth/ProtectedRoute";
import SystemAdminDashboard from "../dashboards/SystemAdminDashboard";
import AthleteDashboard from "../dashboards/AthleteDashboard";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/system-admin",
    element: (
      <ProtectedRoute roles={["SystemAdmin"]}>
        <SystemAdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/gym-admin",
    element: (
      <ProtectedRoute roles={["GymAdmin"]}>
        <SystemAdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/athlete",
    element: (
      <ProtectedRoute roles={["Athlete"]}>
        <AthleteDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Login />,
  },
]);
