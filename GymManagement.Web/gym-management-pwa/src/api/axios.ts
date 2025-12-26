import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { AppConfig } from "../config/app.config";
import { authApi } from "./auth.api";

export const axiosInstance = axios.create({
  baseURL: AppConfig.apiBaseUrl,
});

// اضافه کردن interceptor برای ارسال توکن
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authApi.getToken();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);
