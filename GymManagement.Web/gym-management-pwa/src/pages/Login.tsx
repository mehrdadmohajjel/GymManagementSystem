import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authApi } from "../api/auth.api";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const user = await authApi.login({
        nationalCode: values.nationalCode,
        password: values.password
      });

      message.success("ورود موفقیت‌آمیز بود");

      // ✅ ریدایرکت بر اساس نقش
      switch (user.role) {
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
          message.error("نقش کاربر نامعتبر است");
          authApi.logout();
          navigate("/login", { replace: true });
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || "خطا در ورود");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }} className="flex items-center justify-center bg-gray-100">
      <Card title="ورود به سامانه مدیریت باشگاه" style={{ width: 380 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="کد ملی"
            name="nationalCode"
            rules={[{ required: true, message: "کد ملی را وارد کنید" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="رمز عبور"
            name="password"
            rules={[{ required: true, message: "رمز عبور را وارد کنید" }]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            ورود
          </Button>
        </Form>
      </Card>
    </div>
  );
}
