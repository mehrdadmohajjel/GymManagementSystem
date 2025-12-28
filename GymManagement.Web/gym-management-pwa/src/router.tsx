import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import SystemAdminDashboard from "./dashboards/SystemAdminDashboard";
import GymsPage from "./pages/system-admin/GymsPage";
import GymAdminDashboard from "./dashboards/GymAdminDashboard";
import { GymAdminRoutes } from "./pages/gym-admin/GymAdminRoutes";
import CustomersPage from "./pages/gym-admin/CustomersPage";
import ServicesPage from "./pages/gym-admin/ServicesPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute role="SystemAdmin" />,
    children: [
      {
        path: "/system-admin",
        element: <SystemAdminDashboard />,
        children: [
          {
            path: "gyms",
            element: <GymsPage />,
          },
        ],
      },
    ],
  },
    {
    element: <ProtectedRoute role="GymAdmin" />,
    children: [
      {
        path: "/gym-admin",
        element: <GymAdminDashboard />,
        children: [
          {
            path: "services",
            element: <ServicesPage />,
          },
               {
            path: "customers",
            element: <CustomersPage />,
          },
        ],
      },
    ],
  },
]);
