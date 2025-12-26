import { Layout, Menu, Breadcrumb, Card, Row, Col, Statistic } from "antd";
import { DesktopOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";

const { Header, Content, Sider } = Layout;

export default function SystemAdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState({
    users: 0,
    gyms: 0,
    athletes: 0
  });

  useEffect(() => {
    // فراخوانی API برای آمار (مثال)
    const fetchStats = async () => {
      try {
        const usersResp = await axiosInstance.get("/users/count");
        const gymsResp = await axiosInstance.get("/gyms/count");
        const athletesResp = await axiosInstance.get("/athletes/count");

        setStats({
          users: usersResp.data,
          gyms: gymsResp.data,
          athletes: athletesResp.data
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo text-white text-center text-xl font-bold py-4">
          Gym System
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DesktopOutlined />}>
            داشبورد
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            مدیریت باشگاه‌ها
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            مدیریت کاربران
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="bg-white p-0" />
        <Content style={{ margin: "16px" }}>
          <Breadcrumb style={{ marginBottom: "16px" }}>
            <Breadcrumb.Item>داشبورد</Breadcrumb.Item>
            <Breadcrumb.Item>مدیر سیستم</Breadcrumb.Item>
          </Breadcrumb>

          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Statistic title="تعداد کاربران" value={stats.users} />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic title="تعداد باشگاه‌ها" value={stats.gyms} />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic title="تعداد ورزشکاران" value={stats.athletes} />
              </Card>
            </Col>
          </Row>

          <Card style={{ marginTop: 24 }}>
            <p>اینجا می‌توانید گزارش‌ها، نمودارها و عملیات مدیریتی خود را اضافه کنید.</p>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}
