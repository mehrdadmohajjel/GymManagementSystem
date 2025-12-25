import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { JSX } from "react";
import { authApi } from "./api/auth.api";
import AthleteDashboard from "./dashboards/AthleteDashboard";
import SystemAdminDashboard from "./dashboards/SystemAdminDashboard";
import GymAdminDashboard from "./dashboards/GymAdminDashboard";
import Login from "./pages/Login";

// تعریف enum نقش‌ها
export enum UserRole {
  SystemAdmin = "SystemAdmin",
  GymAdmin = "GymAdmin",
  Athlete = "Athlete",
}

// ProtectedRoute جدا شده
interface ProtectedRouteProps {
  children: JSX.Element;
  roles: UserRole[];
}

function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const user = authApi.getCurrentUser();

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// AppRouter اصلی
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* صفحه ورود */}
        <Route path="/login" element={<Login />} />

        {/* داشبورد مدیر سیستم */}
        <Route
          path="/system-admin"
          element={
            <ProtectedRoute roles={[UserRole.SystemAdmin]}>
              <SystemAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* داشبورد مدیر باشگاه */}
        <Route
          path="/gym-admin"
          element={
            <ProtectedRoute roles={[UserRole.GymAdmin]}>
              <GymAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* داشبورد ورزشکار */}
        <Route
          path="/athlete"
          element={
            <ProtectedRoute roles={[UserRole.Athlete]}>
              <AthleteDashboard />
            </ProtectedRoute>
          }
        />

        {/* ریدایرکت پیشفرض */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
