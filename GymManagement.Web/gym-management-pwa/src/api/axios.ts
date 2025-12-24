import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "https://localhost:5001/api", // آدرس API
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ➕ افزودن توکن به هر درخواست
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
      // توکن منقضی شده یا نامعتبر
      localStorage.clear();
      window.location.href = "/login";
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      "خطای ناشناخته‌ای رخ داد";

    return Promise.reject(message);
  }
);

export default api;
