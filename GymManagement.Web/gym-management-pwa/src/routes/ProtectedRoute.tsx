import { Navigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  roles: Array<"SystemAdmin" | "GymAdmin" | "Athlete">;
}

export default function ProtectedRoute({ children, roles }: Props) {
  const isAuth = authApi.isAuthenticated();
  const role = authApi.getCurrentRole();

  if (!isAuth) return <Navigate to="/login" replace />;
  if (!role || !roles.includes(role)) return <Navigate to="/login" replace />;

  return children;
}
