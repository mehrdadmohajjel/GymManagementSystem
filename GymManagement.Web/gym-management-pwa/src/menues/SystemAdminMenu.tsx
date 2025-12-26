import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function SystemAdminMenu() {
  const navigate = useNavigate();

  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={(e) => navigate(e.key)}
      items={[
        {
          key: "/system-admin/gyms",
          icon: <HomeOutlined />,
          label: "باشگاه‌ها"
        }
      ]}
    />
  );
}
