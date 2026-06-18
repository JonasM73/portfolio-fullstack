import { api } from "../../../lib/api";

import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
} from "../types/auth.types";

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  async refresh(refreshToken: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/refresh", {
      refreshToken,
    });

    return response.data;
  },

  async me(): Promise<AuthUser> {
    const response = await api.get<AuthUser>("/auth/me");
    return response.data;
  },

  async logout() {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      await api.post("/auth/logout", {
        refreshToken,
      });
    }

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },

  async forgotPassword(email: string) {
    const response = await api.post("/auth/forgot-password", {
      email,
      frontendUrl: window.location.origin,
    });

    return response.data;
  },

  async resetPassword(data: {
    email: string;
    token: string;
    newPassword: string;
  }) {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  },
};