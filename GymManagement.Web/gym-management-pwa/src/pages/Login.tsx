// src/pages/Login.tsx
import { Form, Input, Button, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { authenticateServices } from "../api/authenticateServices";

export default function Login() {
  const navigate = useNavigate();

const onFinish = async (values: any) => {
  try {
    await authenticateServices.login(values);
    message.success("ورود موفقیت‌آمیز بود");

    // فقط برو به یک مسیر عمومی
const user = authenticateServices.userToken(
  localStorage.getItem("access-token")!
);

 switch (user.UserRole) {
        case "SystemAdmin":
          navigate("/system-admin", { replace: true });
          break;

        case "GymAdmin":
          navigate("/gym-admin", { replace: true });
          break;

        case "Athlete":
          navigate("/athlete", { replace: true });
          break;

        default:
          navigate("/login", { replace: true });
      }
    } catch {
      message.error("نام کاربری یا رمز عبور اشتباه است");
    }};

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
