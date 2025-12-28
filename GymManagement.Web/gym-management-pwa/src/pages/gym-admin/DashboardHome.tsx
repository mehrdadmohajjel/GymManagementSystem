import { Card, Col, Row, Statistic } from "antd";

export default function DashboardHome() {
  return (
    <Row gutter={16}>
      <Col xs={24} md={8}>
        <Card>
          <Statistic title="تعداد مشتریان" value={128} />
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card>
          <Statistic title="خدمات فعال" value={12} />
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card>
          <Statistic title="درآمد ماهانه" value={45000000} suffix="تومان" />
        </Card>
      </Col>
    </Row>
  );
}
