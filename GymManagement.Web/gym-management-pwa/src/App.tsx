import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import SystemAdminDashboard from "./dashboards/SystemAdminDashboard";
import GymAdminDashboard from "./dashboards/GymAdminDashboard";
import AthleteDashboard from "./dashboards/AthleteDashboard";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* صفحه لاگین */}
        <Route path="/login" element={<Login />} />

        {/* روت‌های محافظت‌شده */}
        <Route element={<ProtectedRoute />}>
          <Route path="/system-admin" element={<SystemAdminDashboard />} />
          <Route path="/gym-admin" element={<GymAdminDashboard />} />
          <Route path="/athlete" element={<AthleteDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
