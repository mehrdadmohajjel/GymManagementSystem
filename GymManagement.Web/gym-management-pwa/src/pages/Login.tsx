// src/pages/Login.tsx
import { Form, Input, Button, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const user = await authApi.login(values);
      message.success("ورود موفقیت‌آمیز بود");

      if (user.role === "SystemAdmin") {
        navigate("/system-admin", { replace: true });
      } else if (user.role === "GymAdmin") {
        navigate("/gym-admin", { replace: true });
      } else {
        navigate("/athlete", { replace: true });
      }
    } catch {
      message.error("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card title="ورود به سامانه" style={{ width: 350 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="nationalCode" label="کد ملی" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="password" label="رمز عبور" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            ورود
          </Button>
        </Form>
      </Card>
    </div>
  );
}
