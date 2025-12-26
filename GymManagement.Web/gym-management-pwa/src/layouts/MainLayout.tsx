import { Layout, Grid, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

interface Props {
  menu: React.ReactNode;
  children: React.ReactNode;
}

export default function MainLayout({ menu, children }: Props) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [open, setOpen] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header
        style={{
          background: "#001529",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "0 16px"
        }}
      >
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "#fff" }} />}
            onClick={() => setOpen(true)}
          />
        )}
        <h3 style={{ color: "#fff", margin: "0 auto" }}>Gym System</h3>
      </Header>

      <Layout>
        {/* Sidebar Desktop */}
        {!isMobile && (
          <Layout.Sider width={220} theme="dark">
            {menu}
          </Layout.Sider>
        )}

        {/* Drawer Mobile */}
        <Drawer
          placement="left"
          open={open}
          onClose={() => setOpen(false)}
          bodyStyle={{ padding: 0 }}
        >
          {menu}
        </Drawer>

        {/* Content */}
        <Content
          style={{
            padding: 16,
            background: "#f5f5f5",
            overflowY: "auto"
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
