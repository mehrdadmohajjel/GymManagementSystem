// // src/routes/ProtectedRoute.tsx
// import { Navigate, Outlet } from "react-router-dom";
// import { authApi } from "../api/auth.api";

// interface Props {
//   role: "SystemAdmin" | "GymAdmin" | "Athlete";
// }

// export default function ProtectedRoute({ role }: Props) {
//   // 1️⃣ چک لاگین
//   if (!authApi.isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }

//   // 2️⃣ چک نقش
//   const currentRole = authApi.getCurrentRole();

//   if (!currentRole || currentRole !== role) {
//     return <Navigate to="/login" replace />;
//   }

//   // 3️⃣ اجازه دسترسی
//   return <Outlet />;
// }

// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { authApi } from "../api/auth.api";
import type { UserRole } from "../types/UserRole";

interface Props {
  role?: UserRole; // ⬅️ اختیاری
}

export default function ProtectedRoute({ role }: Props) {
  // 1️⃣ چک لاگین
  if (!authApi.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ اگر role مشخص شده، چک نقش
  if (role) {
    const currentRole = authApi.getCurrentRole();

    if (!currentRole) {
      return <Navigate to="/login" replace />;
    }

    if (currentRole !== role) {
      // 🔁 ریدایرکت به داشبورد درست
      switch (currentRole) {
        case "SystemAdmin":
          return <Navigate to="/system-admin" replace />;
        case "GymAdmin":
          return <Navigate to="/gym-admin" replace />;
        case "Athlete":
          return <Navigate to="/athlete" replace />;
        default:
          return <Navigate to="/login" replace />;
      }
    }
  }

  // 3️⃣ اجازه دسترسی
  return <Outlet />;
}
