// src/layouts/AdminLayout.tsx
import { Layout } from "antd";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

const { Content } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar />

      <Layout>
        <AdminHeader />
        <Content style={{ margin: "16px", background: "#fff", padding: 24 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
