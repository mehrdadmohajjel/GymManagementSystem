import axios from "axios";
import { AppConfig } from "../config/app.config";
import { authApi } from "./auth.api";

export const axiosInstance = axios.create({
  baseURL: AppConfig.apiBaseUrl
});

axiosInstance.interceptors.request.use(config => {
  const token = authApi.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
