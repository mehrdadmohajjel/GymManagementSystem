import { Navigate, Outlet } from "react-router-dom";
import { authenticateServices } from "../api/authenticateServices";
import type { UserRole } from "../types/UserRole";

interface Props {
  role?: UserRole;
}

export default function ProtectedRoute({ role }: Props) {
const accessToken = localStorage.getItem("access-token");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  const user = authenticateServices.userToken(accessToken);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // اگر Role خاصی لازم است
  if (role && user.UserRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
