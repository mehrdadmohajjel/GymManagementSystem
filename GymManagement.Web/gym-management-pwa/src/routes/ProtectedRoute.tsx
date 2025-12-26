// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { authApi } from "../api/auth.api";

interface Props {
  role: "SystemAdmin" | "GymAdmin" | "Athlete";
}

export default function ProtectedRoute({ role }: Props) {
  // 1️⃣ چک لاگین
  if (!authApi.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ چک نقش
  const currentRole = authApi.getCurrentRole();

  if (!currentRole || currentRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ اجازه دسترسی
  return <Outlet />;
}
