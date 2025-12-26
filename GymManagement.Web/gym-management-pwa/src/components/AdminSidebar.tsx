// src/components/AdminSidebar.tsx
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  ShopOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";

const { Sider } = Layout;

export default function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    authApi.logout();
    navigate("/login", { replace: true });
  };

  return (
    <Sider theme="dark" collapsible>
      <div className="text-white text-center py-4 font-bold">
        Gym System
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={[
          {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: "داشبورد",
            onClick: () => navigate("/system-admin")
          },
          {
            key: "gyms",
            icon: <ShopOutlined />,
            label: "مدیریت باشگاه‌ها"
          },
          {
            key: "users",
            icon: <TeamOutlined />,
            label: "مدیریت کاربران"
          },
          {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "خروج",
            onClick: logout
          }
        ]}
      />
    </Sider>
  );
}
