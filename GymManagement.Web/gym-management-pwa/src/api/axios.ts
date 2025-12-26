import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { AppConfig } from "../config/app.config";
import { authApi } from "./auth.api";

export const axiosInstance = axios.create({
  baseURL: AppConfig.apiBaseUrl,
});

// Request interceptor: اضافه کردن توکن
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authApi.getToken();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: مدیریت 401 و refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // جلوگیری از لوپ بی‌نهایت

      const refreshedUser = await authApi.refreshToken();

      if (refreshedUser) {
        // توکن جدید ذخیره شده، حالا درخواست اصلی رو دوباره بزن
        return axiosInstance(originalRequest);
      }
    }

    // اگر refresh هم شکست خورد یا 401 غیرمرتبط بود، خطا رو برگردون
    return Promise.reject(error);
  }
);