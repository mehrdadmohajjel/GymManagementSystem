import { Link } from "react-router-dom";
import { authApi } from "../api/auth.api";

export default function Sidebar() {
  const role = authApi.getCurrentRole();

  return (
    <aside style={{ width: 200, background: "#fff", padding: 16, boxShadow: "2px 0 5px rgba(0,0,0,0.1)" }}>
      <h3 style={{ color: "#1890ff" }}>Dashboard</h3>
      <nav>
        {role === "SystemAdmin" && <Link to="/system-admin">مدیریت کل سیستم</Link>}
        {role === "GymAdmin" && <Link to="/gym-admin">مدیریت باشگاه</Link>}
        {role === "Athlete" && <Link to="/athlete">پنل ورزشکار</Link>}
      </nav>
    </aside>
  );
}
