// src/dashboards/SystemAdminDashboard.tsx
import { Layout, Menu } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import GymsPage from "../pages/system-admin/GymsPage";

const { Sider, Content } = Layout;

export default function SystemAdminDashboard() {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => navigate(key)}
          items={[
            { key: "/system-admin/gyms", label: "باشگاه‌ها" },
          ]}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: 16 }}>
          <Routes>
            <Route path="gyms" element={<GymsPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
