import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { authService } from "../services/authService";

import type {
  AuthUser,
  LoginRequest,
} from "../types/auth.types";

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (
    data: LoginRequest
  ) => Promise<void>;

  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [token, setToken] =
    useState<string | null>(
      localStorage.getItem("token")
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const isAuthenticated =
    !!user && !!token;

  useEffect(() => {
    const loadUser = async () => {
        try {
        if (!token) {
            setIsLoading(false);
            return;
        }

        const currentUser = await authService.me();

        setUser(currentUser);
        } catch {
        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
        } finally {
        setIsLoading(false);
        }
    };

    loadUser();
    }, [token]);

  const login = async (
    data: LoginRequest
  ) => {
    const response =
      await authService.login(data);

    localStorage.setItem(
      "token",
      response.token
    );

    setToken(response.token);

    const currentUser =
      await authService.me();

    setUser(currentUser);
  };

  const logout = () => {
    authService.logout();

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}