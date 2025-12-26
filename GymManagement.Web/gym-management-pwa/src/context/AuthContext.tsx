import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {jwtDecode} from "jwt-decode";
import { authApi } from "../api/auth.api";
import type { UserRole } from "../types/UserRole";

type User = {
  userId: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 restore login on refresh
  useEffect(() => {
    const token = authApi.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({
          userId: decoded.sub,
          role: decoded.role,
        });
      } catch {
        authApi.logout();
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    authApi.setToken(token);
    const decoded: any = jwtDecode(token);

    setUser({
      userId: decoded.sub,
      role: decoded.role,
    });
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
