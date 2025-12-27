// import { axiosInstance } from "./axios";
// import { AppConfig } from "../config/app.config";
// import {jwtDecode} from "jwt-decode";

// interface LoginRequest {
//   nationalCode: string;
//   password: string;
// }

// interface LoginResponse {
//   accessToken: string;
//   refreshToken: string;
//   userId: number;
// }

// interface JwtPayloadRaw {
//   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
//   "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "SystemAdmin" | "GymAdmin" | "Athlete";
//   gymId?: number; // اگر JWT شامل gymId باشد، اختیاری
//   exp: number;
// }


// export interface JwtPayload {
//   userId: number;
//   role: "SystemAdmin" | "GymAdmin" | "Athlete";
//   gymId?: number;
//   exp: number;
// }

// export const authApi = {
//   // ---------------- LOGIN ----------------
//  async login(data: { nationalCode: string; password: string }) {
//   const res = await axiosInstance.post("/auth/login", data);

//   const { accessToken, refreshToken } = res.data;

//   // ✅ ذخیره توکن‌ها
//   this.setToken(accessToken);
//   if (refreshToken) {
//     localStorage.setItem(AppConfig.refreshTokenKey, refreshToken);
//   }

//   const user = this.getCurrentUser();
//   if (!user) {
//     throw new Error("خطا در پردازش اطلاعات کاربر");
//   }

//   return user;
// },

//   // ---------------- REFRESH TOKEN ----------------
// async refreshToken(): Promise<string | null> {
//   const refreshToken = localStorage.getItem(AppConfig.refreshTokenKey);
//   if (!refreshToken) return null;

//   try {
//     // توجه: فقط string خالی بفرستید، نه object
//     const response = await axiosInstance.post<LoginResponse>(
//       "/auth/refresh", 
//       refreshToken, // فقط string
//       {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     localStorage.setItem(AppConfig.tokenKey, response.data.accessToken);
//     localStorage.setItem(AppConfig.refreshTokenKey, response.data.refreshToken);

//     return response.data.accessToken;
//   } catch (error: any) {
//     console.error('Refresh token error:', {
//       status: error.response?.status,
//       data: error.response?.data,
//       message: error.message
//     });
    
//     this.logout();
//     return null;
//   }
// },

//   // ---------------- LOGOUT ----------------
//   logout() {
//     localStorage.removeItem(AppConfig.tokenKey);
//     localStorage.removeItem(AppConfig.refreshTokenKey);
//   },

//   // ---------------- IS AUTHENTICATED ----------------
//   isAuthenticated(): boolean {
//     const token = localStorage.getItem(AppConfig.tokenKey);
//     if (!token) return false;

//     try {
//       const decoded = jwtDecode<JwtPayloadRaw>(token);
//       return decoded.exp * 1000 > Date.now();
//     } catch {
//       return false;
//     }
//   },

//   // ---------------- GET CURRENT USER ----------------
// getCurrentUser(): JwtPayload | null {
//   const token = localStorage.getItem(AppConfig.tokenKey);
//   if (!token) return null;

//   try {
//     const decoded = jwtDecode<any>(token);

//     return {
//       userId: Number(
//         decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
//       ),
//       role: decoded[
//         "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
//       ],
//       gymId: decoded.gymId ? Number(decoded.gymId) : 0,
//       exp: decoded.exp
//     };
//   } catch {
//     return null;
//   }
// },


//   // ---------------- GET CURRENT ROLE ----------------
//   getCurrentRole(): JwtPayload["role"] | null {
//     const user = this.getCurrentUser();
//     return user?.role ?? null;
//   },

//   // ---------------- GET TOKENS ----------------
//   getToken(): string | null {
//     return localStorage.getItem(AppConfig.tokenKey);
//   },
//   getRefreshToken(): string | null {
//     return localStorage.getItem("gym_refresh_token");
//   },
//   setToken(token: string) {
//   localStorage.setItem("gym_access_token", token);
// },
// setRefreshToken(token: string) {
//   localStorage.setItem("gym_refresh_token", token);
// }

// };
import { axiosInstance } from "./axios";
import { AppConfig } from "../config/app.config";
import { jwtDecode } from "jwt-decode";

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
  gymId?: number;
  exp: number;
}

export interface JwtPayload {
  userId: number;
  role: "SystemAdmin" | "GymAdmin" | "Athlete";
  gymId?: number;
  exp: number;
}

// اول مطمئن شویم AppConfig درست تنظیم شده
console.log('AppConfig keys:', {
  tokenKey: AppConfig.tokenKey,
  refreshTokenKey: AppConfig.refreshTokenKey
});

export const authApi = {
  // ---------------- LOGIN ----------------
  async login(data: { nationalCode: string; password: string }) {
    console.log('🔑 Starting login process...');
    
    const res = await axiosInstance.post("/auth/login", data);
    console.log('✅ Login API response received');

    const { accessToken, refreshToken } = res.data;
    console.log('Tokens received:', {
      accessToken: accessToken?.substring(0, 20) + '...',
      refreshToken: refreshToken?.substring(0, 20) + '...'
    });
    // ✅ ذخیره توکن‌ها با استفاده از AppConfig
    this.setToken(accessToken);
    this.setRefreshToken(refreshToken);
    
    console.log('💾 Tokens saved to localStorage with keys:', {
      accessKey: AppConfig.tokenKey,
      refreshKey: AppConfig.refreshTokenKey
    });

    const user = this.getCurrentUser();
    if (!user) {
      console.error('❌ Failed to get current user after login');
      throw new Error("خطا در پردازش اطلاعات کاربر");
    }

    console.log('👤 User logged in:', user);
    return user;
  },

  // ---------------- REFRESH TOKEN ----------------
  async refreshToken(): Promise<string | null> {
    console.log('🔄 Starting refreshToken...');
    
    const refreshToken = this.getRefreshToken(); // استفاده از متد داخلی
    console.log('Refresh token from storage:', refreshToken ? 'Exists' : 'Missing');
    
    if (!refreshToken) {
      console.error('❌ No refresh token available');
      return null;
    }

    try {
      console.log('🔄 Calling refresh endpoint...');
      
      // استفاده از axios مستقل برای جلوگیری از loop
      const response = await fetch(`${AppConfig.apiBaseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refreshToken) // چون backend از [FromBody] string استفاده می‌کند
      });

      if (!response.ok) {
        console.error(` Refresh failed with status: ${response.status}`);
        throw new Error(`Refresh failed: ${response.status}`);
      }

      const data: LoginResponse = await response.json();
      console.log('✅ Refresh successful, new tokens:', {
        accessToken: data.accessToken?.substring(0, 20) + '...',
        refreshToken: data.refreshToken?.substring(0, 20) + '...'
      });

      // ذخیره توکن‌های جدید
      this.setToken(data.accessToken);
      this.setRefreshToken(data.refreshToken);

      return data.accessToken;
    } catch (error: any) {
      console.error('❌ Refresh token error:', {
        error: error.message,
        status: error.status
      });
      
      this.logout();
      return null;
    }
  },

  // ---------------- LOGOUT ----------------
  logout() {
    console.log('👋 Logging out...');
    localStorage.removeItem(AppConfig.tokenKey);
    localStorage.removeItem(AppConfig.refreshTokenKey);
    console.log('🗑️ Tokens removed from localStorage');
  },

  // ---------------- IS AUTHENTICATED ----------------
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      console.log('🔍 No token found for authentication check');
      return false;
    }

    try {
      const decoded = jwtDecode<JwtPayloadRaw>(token);
      const isExpired = decoded.exp * 1000 <= Date.now();
      
      console.log('🔍 Token expiration check:', {
        expires: new Date(decoded.exp * 1000).toLocaleString(),
        now: new Date().toLocaleString(),
        isValid: !isExpired
      });
      
      return !isExpired;
    } catch (error) {
      console.error('❌ Token decode error:', error);
      return false;
    }
  },

  // ---------------- GET CURRENT USER ----------------
  getCurrentUser(): JwtPayload | null {
    const token = this.getToken();
    if (!token) {
      console.log('🔍 No token for user info');
      return null;
    }

    try {
      const decoded = jwtDecode<any>(token);
      console.log('🔍 Decoded token claims:', Object.keys(decoded));

      const user: JwtPayload = {
        userId: Number(
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        ),
        role: decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
        gymId: decoded.gymId ? Number(decoded.gymId) : undefined,
        exp: decoded.exp
      };
      
      console.log('👤 Parsed user:', user);
      return user;
    } catch (error) {
      console.error('❌ Error decoding token:', error);
      return null;
    }
  },

  // ---------------- GET CURRENT ROLE ----------------
  getCurrentRole(): JwtPayload["role"] | null {
    const user = this.getCurrentUser();
    console.log('🎭 Current role:', user?.role || 'No user');
    return user?.role ?? null;
  },

  // ---------------- GET TOKENS ----------------
  getToken(): string | null {
    const token = localStorage.getItem("gym_access_token");
    console.log('🔑 getToken called, found:', token ? 'Yes' : 'No');
    return token;
  },
  
  getRefreshToken(): string | null {
    const token = localStorage.getItem("gym_refresh_token");
    console.log('🔄 getRefreshToken called, found:', token ? 'Yes' : 'No');
    return token;
  },
  
  setToken(token: string) {
    console.log('💾 Setting access token, length:', token.length);
    localStorage.setItem(AppConfig.tokenKey, token);
  },
  
  setRefreshToken(token: string) {
    console.log('💾 Setting refresh token, length:', token.length);
    localStorage.setItem(AppConfig.refreshTokenKey, token);
  },

  // ---------------- DEBUG HELPER ----------------
  debugTokens() {
    console.log('🔍 DEBUG - Current tokens in localStorage:');
    console.log('Access token:', this.getToken()?.substring(0, 30) + '...');
    console.log('Refresh token exists:', !!this.getRefreshToken());
    console.log('Is authenticated:', this.isAuthenticated());
    console.log('Current user:', this.getCurrentUser());
  }
};