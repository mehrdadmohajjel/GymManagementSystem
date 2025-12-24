import api from "./axios";
import jwtDecode from "jwt-decode";
import { LoginRequest, LoginResponse } from "../types/auth.types";

interface JwtPayload {
  role: string;
  sub: string;
  exp: number;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data);

    const { accessToken, refreshToken } = response.data;

    const decoded = jwtDecode<JwtPayload>(accessToken);

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("role", decoded.role);
    localStorage.setItem("userId", decoded.sub);

    return {
      ...response.data,
      role: decoded.role as any,
    };
  },

  logout: () => {
    localStorage.clear();
    window.location.href = "/login";
  },

  getCurrentRole: (): string | null => {
    return localStorage.getItem("role");
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("access_token");
  },
};
