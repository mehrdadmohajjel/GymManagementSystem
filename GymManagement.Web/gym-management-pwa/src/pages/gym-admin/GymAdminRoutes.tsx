// src/routes/GymAdminRoutes.tsx

import GymAdminDashboard from "../../dashboards/GymAdminDashboard";
import CustomersPage from "./CustomersPage";
import ServicesPage from "./ServicesPage";

export const GymAdminRoutes = {
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
};
