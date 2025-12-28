import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  TeamOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function GymAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ color: "#fff", padding: 16, fontWeight: "bold" }}>
          🏋️ Gym Admin
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={(e) => navigate(e.key)}
          items={[
            {
              key: "/gym-admin",
              icon: <DashboardOutlined />,
              label: "داشبورد",
            },
            {
              key: "/gym-admin/services",
              icon: <AppstoreOutlined />,
              label: "مدیریت خدمات",
            },
            {
              key: "/gym-admin/customers",
              icon: <TeamOutlined />,
              label: "مدیریت مشتریان",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff" }}>
          مدیر باشگاه
        </Header>

        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
