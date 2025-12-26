import { Row, Col, Card, Statistic } from "antd";
import {
  ShopOutlined,
  TeamOutlined,
  DollarOutlined
} from "@ant-design/icons";
import AdminLayout from "../layouts/AdminLayout";

export default function SystemAdminDashboard() {
  return (
    <AdminLayout>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="تعداد باشگاه‌ها"
              value={12}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="تعداد کاربران"
              value={320}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="مجموع پرداخت‌ها"
              value={125000000}
              prefix={<DollarOutlined />}
              suffix="ریال"
            />
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
}
