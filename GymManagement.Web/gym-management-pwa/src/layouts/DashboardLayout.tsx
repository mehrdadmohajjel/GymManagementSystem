import { Layout } from "antd";
import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

const { Header, Content, Footer } = Layout;

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <h2 style={{ marginLeft: 24 }}>Gym Management System</h2>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} Gym Management
        </Footer>
      </Layout>
    </Layout>
  );
}
