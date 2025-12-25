import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";

export default function Login() {
  const navigate = useNavigate();
  const [nationalCode, setNationalCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // فراخوانی API لاگین
      const user = await authApi.login({ nationalCode, password });

      // بررسی نقش و ریدایرکت
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
          setError("نقش کاربر شناسایی نشد.");
          authApi.logout();
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "خطا در ورود. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">ورود به سامانه</h2>

        {error && (
          <div className="mb-4 text-red-600 font-medium text-center">{error}</div>
        )}

        <label className="block mb-2 font-medium">کد ملی</label>
        <input
          type="text"
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <label className="block mb-2 font-medium">رمز عبور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </div>
  );
}
