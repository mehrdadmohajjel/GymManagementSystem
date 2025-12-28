import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import SystemAdminDashboard from "./dashboards/SystemAdminDashboard";
import GymsPage from "./pages/system-admin/GymsPage";

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
]);
