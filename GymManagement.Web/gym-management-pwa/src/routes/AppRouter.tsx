import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

import SystemAdminDashboard from "../dashboards/SystemAdminDashboard";
import AthleteDashboard from "../dashboards/AthleteDashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/system-admin"
          element={
            <ProtectedRoute roles={["SystemAdmin"]}>
              <SystemAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gym-admin"
          element={
            <ProtectedRoute roles={["GymAdmin"]}>
              <SystemAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/athlete"
          element={
            <ProtectedRoute roles={["Athlete"]}>
              <AthleteDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
