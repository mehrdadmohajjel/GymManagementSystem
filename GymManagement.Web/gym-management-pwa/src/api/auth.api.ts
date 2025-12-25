import { axiosInstance } from "./axios";
import { AppConfig } from "../config/app.config";
import {jwtDecode} from "jwt-decode";

interface LoginRequest {
  nationalCode: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
}

interface JwtPayloadRaw {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "SystemAdmin" | "GymAdmin" | "Athlete";
  gymId?: number; // اگر JWT شامل gymId باشد، اختیاری
  exp: number;
}


export interface JwtPayload {
  userId: number;
  role: "SystemAdmin" | "GymAdmin" | "Athlete";
  gymId?: number;
  exp: number;
}

export const authApi = {
  // ---------------- LOGIN ----------------
  async login(data: LoginRequest): Promise<JwtPayload> {
    const response = await axiosInstance.post<LoginResponse>("/auth/login", data);

    // ذخیره توکن‌ها
    localStorage.setItem(AppConfig.tokenKey, response.data.accessToken);
    localStorage.setItem(AppConfig.refreshTokenKey, response.data.refreshToken);

    // decode userId و role از JWT
    const user = this.getCurrentUser()!;

    // دریافت gymId از API جداگانه
      const gymResp = await axiosInstance.get<{ gymId: number }>(`/general/${user.userId}/gym`);
    user.gymId = gymResp.data.gymId;

    return user;
  },

  // ---------------- REFRESH TOKEN ----------------
  async refreshToken(): Promise<JwtPayload | null> {
    const refreshToken = localStorage.getItem(AppConfig.refreshTokenKey);
    if (!refreshToken) return null;

    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/refresh", { refreshToken });

      localStorage.setItem(AppConfig.tokenKey, response.data.accessToken);
      localStorage.setItem(AppConfig.refreshTokenKey, response.data.refreshToken);

      const user = this.getCurrentUser();
      if (!user) return null;

      // دوباره gymId از API جداگانه بگیر
      const gymResp = await axiosInstance.get<{ gymId: number }>(`/general/${user.userId}/gym`);
      user.gymId = gymResp.data.gymId;

      return user;
    } catch {
      this.logout();
      return null;
    }
  },

  // ---------------- LOGOUT ----------------
  logout() {
    localStorage.removeItem(AppConfig.tokenKey);
    localStorage.removeItem(AppConfig.refreshTokenKey);
  },

  // ---------------- IS AUTHENTICATED ----------------
  isAuthenticated(): boolean {
    const token = localStorage.getItem(AppConfig.tokenKey);
    if (!token) return false;

    try {
      const decoded = jwtDecode<JwtPayloadRaw>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  // ---------------- GET CURRENT USER ----------------
getCurrentUser(): JwtPayload | null {
  const token = localStorage.getItem(AppConfig.tokenKey);
  if (!token) return null;

  try {
    const decoded = jwtDecode<any>(token);

    return {
      userId: Number(
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
      ),
      role: decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
      gymId: decoded.gymId ? Number(decoded.gymId) : undefined,
      exp: decoded.exp
    };
  } catch {
    return null;
  }
},


  // ---------------- GET CURRENT ROLE ----------------
  getCurrentRole(): JwtPayload["role"] | null {
    const user = this.getCurrentUser();
    return user?.role ?? null;
  },

  // ---------------- GET TOKENS ----------------
  getToken(): string | null {
    return localStorage.getItem(AppConfig.tokenKey);
  },
  getRefreshToken(): string | null {
    return localStorage.getItem(AppConfig.refreshTokenKey);
  }
};
