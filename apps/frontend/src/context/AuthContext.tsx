import React, { createContext, useContext, useState, useEffect } from "react";
import { User, LoginRequest, RegisterRequest, UserRole } from "../types/auth";
import { authService } from "../services/authService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem("smartbank_user");
      const token = localStorage.getItem("smartbank_access_token");

      if (token && storedUser) {
        try {
          const freshUser = await authService.getCurrentUser();
          setUser(freshUser);
        } catch {
          // Token expired, attempt refresh
          try {
            const tokenData = await authService.refreshToken();
            setUser(tokenData.user);
          } catch {
            authService.clearSession();
            setUser(null);
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      const res = await authService.login(data);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest): Promise<User> => {
    return await authService.register(data);
  };

  const logout = () => {
    authService.clearSession();
    setUser(null);
  };

  const hasRole = (requiredRoles: UserRole[]): boolean => {
    if (!user) return false;
    return user.roles.some((role) => requiredRoles.includes(role));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
