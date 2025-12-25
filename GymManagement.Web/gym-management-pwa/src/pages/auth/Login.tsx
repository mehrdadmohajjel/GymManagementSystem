import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { authApi } from "../../api/auth.api";

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

      // ریدایرکت بر اساس نقش
      switch (user.role) {
        case "SystemAdmin":
          navigate("/system-admin");
          break;
        case "GymAdmin":
          navigate("/gym-admin");
          break;
        case "Athlete":
          navigate("/athlete");
          break;
        default:
          navigate("/");
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || "خطا در ورود");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Form name="login" onFinish={onFinish} style={{ width: 300 }}>
        <Form.Item name="nationalCode" rules={[{ required: true, message: "کد ملی را وارد کنید" }]}>
          <Input placeholder="کد ملی" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "رمز عبور را وارد کنید" }]}>
          <Input.Password placeholder="رمز عبور" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            ورود
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
