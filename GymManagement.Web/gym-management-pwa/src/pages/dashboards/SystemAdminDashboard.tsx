import { Card, type Row, type Col, type Statistic } from "antd";
import type { data } from "react-router-dom";

<Card title="داشبورد مدیر سیستم">
  <Row gutter={16}>
    <Col span={6}><Statistic title="باشگاه‌ها" value={data.totalGyms} /></Col>
    <Col span={6}><Statistic title="کاربران" value={data.totalUsers} /></Col>
    <Col span={6}><Statistic title="ورزشکاران" value={data.totalAthletes} /></Col>
    <Col span={6}><Statistic title="موجودی کل" value={data.totalWalletBalance} /></Col>
  </Row>
</Card>
