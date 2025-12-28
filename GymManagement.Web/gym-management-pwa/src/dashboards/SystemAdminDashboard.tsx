import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

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
          {/* ⬅️ اینجا صفحه فرزند render می‌شود */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
