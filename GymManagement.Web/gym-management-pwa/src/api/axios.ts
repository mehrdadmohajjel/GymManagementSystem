// src/api/axios.ts
import axios, { type InternalAxiosRequestConfig } from "axios";
import { authApi } from "./auth.api";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5051/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let queue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

// تابع helper برای افزودن دیباگ
const addRequestDebug = (config: InternalAxiosRequestConfig) => {
  console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`, {
    headers: config.headers,
    data: config.data
  });
  return config;
};

// ---- Request Interceptor ----
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // از اعمال interceptor روی درخواست‌های auth جلوگیری کن
    if (config.url?.includes('/auth/')) {
      console.log(`🔐 Auth request: ${config.url} - skipping token`);
      return addRequestDebug(config);
    }
    
    const token = authApi.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`🔑 Token added to ${config.url}: ${token.substring(0, 20)}...`);
    } else {
      console.warn(`⚠️ No token found for ${config.url}`);
    }
    
    return addRequestDebug(config);
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// ---- Response Interceptor ----
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url;
    const method = originalRequest?.method?.toUpperCase();
    
    console.log(`❌ ${error.response?.status || 'No response'} ${method} ${url}`, {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    
    // اگر درخواست auth است یا قبلاً retry شده، reject کن
    if (url?.includes('/auth/') || originalRequest._retry) {
      console.log(`⏩ Skipping refresh for ${url} (auth or already retried)`);
      return Promise.reject(error);
    }
    
    // فقط برای 401 و نه برای auth endpoints
    if (error.response?.status === 401) {
      console.log(`🔁 401 detected, attempting token refresh for ${url}`);
      
      originalRequest._retry = true;
      
      // اگر در حال refresh هستیم، به صف اضافه کن
      if (isRefreshing) {
        console.log(`⏳ Already refreshing, adding ${url} to queue`);
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token: string) => {
              console.log(`🔄 Processing queued request for ${url}`);
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err: any) => {
              console.log(`❌ Rejecting queued request for ${url}`);
              reject(err);
            }
          });
        });
      }
      
      isRefreshing = true;
      console.log('🔄 Starting token refresh process...');
      
      try {
        const newToken = await authApi.refreshToken();
        
        if (!newToken) {
          console.error('❌ Refresh token returned null or empty');
          throw new Error('Refresh failed - no token received');
        }
        
        console.log(`✅ New token received: ${newToken.substring(0, 20)}...`);
        
        // آپدیت صف
        console.log(`🔄 Processing ${queue.length} queued requests`);
        queue.forEach(({ resolve }) => resolve(newToken));
        queue = [];
        
        // درخواست اصلی را دوباره بفرست
        console.log(`🔄 Retrying original request: ${method} ${url}`);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
        
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        
        // به همه در صف اطلاع بده که refresh شکست خورد
        queue.forEach(({ reject }) => reject(refreshError));
        queue = [];
        
        authApi.logout();
        console.log('👋 Logged out due to refresh failure');
        
        // فقط اگر در صفحه login نیستیم، redirect کنیم
        if (!window.location.pathname.includes('/login')) {
          console.log('🔀 Redirecting to login page');
          window.location.href = '/login';
        }
        
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
        console.log('🔄 Refresh process completed');
      }
    }
    
    return Promise.reject(error);
  }
);