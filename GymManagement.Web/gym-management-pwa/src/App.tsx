import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AthleteDashboard from "./dashboards/AthleteDashboard";
import SystemAdminDashboard from "./dashboards/SystemAdminDashboard";
import GymAdminDashboard from "./dashboards/GymAdminDashboard";
import { authApi } from "./api/auth.api";
import type { JSX } from "react";
import { UserRole } from "./types/UserRole";

// enum نقش‌ها


// ProtectedRoute نهایی
function ProtectedRoute({
  children,
  role,
}: {
  children: JSX.Element;
  role: UserRole;
}) {
  const user = authApi.getCurrentUser();

  // اگر لاگین نیست
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // اگر نقش مجاز نیست
  if (user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Router اصلی
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* System Admin */}
        <Route
          path="/system-admin"
          element={
            <ProtectedRoute role={UserRole.SystemAdmin}>
              <SystemAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Gym Admin */}
        <Route
          path="/gym-admin"
          element={
            <ProtectedRoute role={UserRole.GymAdmin}>
              <GymAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Athlete */}
        <Route
          path="/athlete"
          element={
            <ProtectedRoute role={UserRole.Athlete}>
              <AthleteDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
