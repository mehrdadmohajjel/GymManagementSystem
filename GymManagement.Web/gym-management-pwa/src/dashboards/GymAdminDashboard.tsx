import { Card, Statistic, Row, Col } from "antd";

export default function GymAdminDashboard() {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic title="تعداد ورزشکاران" value={85} />
        </Card>
      </Col>

      <Col span={8}>
        <Card>
          <Statistic title="درآمد ماه" value={32000000} suffix="ریال" />
        </Card>
      </Col>
    </Row>
  );
}
