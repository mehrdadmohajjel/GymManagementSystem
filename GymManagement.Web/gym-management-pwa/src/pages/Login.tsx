// import { useState } from "react";
// import { authApi } from "../api/auth.api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [nationalCode, setNationalCode] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const submit = async () => {
//     try {
//       const user = await authApi.login({ nationalCode, password });

//       switch (user.role) {
//         case "SystemAdmin":
//           navigate("/dashboard/system-admin");
//           break;
//         case "GymAdmin":
//           navigate("/dashboard/gym-admin");
//           break;
//         case "Athlete":
//           navigate("/dashboard/athlete");
//           break;
//       }
//     } catch (e: any) {
//       setError(e.response?.data?.message || "خطا در ورود");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white w-96 p-8 rounded shadow">
//         <h2 className="text-xl font-bold text-center mb-6">ورود به سامانه</h2>

//         {error && <p className="text-red-500 mb-3">{error}</p>}

//         <input
//           className="w-full border p-2 mb-3 rounded"
//           placeholder="کد ملی"
//           value={nationalCode}
//           onChange={e => setNationalCode(e.target.value)}
//         />

//         <input
//           type="password"
//           className="w-full border p-2 mb-4 rounded"
//           placeholder="رمز عبور"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//         />

//         <button
//           onClick={submit}
//           className="w-full bg-indigo-600 text-white py-2 rounded"
//         >
//           ورود
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import { Form, Input, Button, message } from "antd";

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
