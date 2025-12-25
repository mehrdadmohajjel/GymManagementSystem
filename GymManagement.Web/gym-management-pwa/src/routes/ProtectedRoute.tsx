import { Navigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  roles: Array<"SystemAdmin" | "GymAdmin" | "Athlete">;
}

export default function ProtectedRoute({ children, roles }: Props) {
  // 1️⃣ چک توکن
  if (!authApi.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ چک نقش
  const role = authApi.getCurrentRole();

  if (!role || !roles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
