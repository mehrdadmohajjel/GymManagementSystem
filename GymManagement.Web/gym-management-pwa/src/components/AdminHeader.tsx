// src/components/AdminHeader.tsx
import { Layout, Typography } from "antd";
import { authApi } from "../api/auth.api";

const { Header } = Layout;
const { Text } = Typography;

export default function AdminHeader() {
  const user = authApi.getCurrentUser();

  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px"
      }}
    >
      <Text strong>داشبورد مدیر سیستم</Text>
      <Text type="secondary">شناسه کاربر: {user?.userId}</Text>
    </Header>
  );
}
