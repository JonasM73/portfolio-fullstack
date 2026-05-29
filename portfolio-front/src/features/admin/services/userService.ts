import { api } from "../../../lib/api";

import type {
  AdminUser,
  CreateUserRequest,
  UpdateUserRequest,
} from "../types/user.types";

export const userService = {
  async getUsers(): Promise<AdminUser[]> {
    const response = await api.get<AdminUser[]>("/auth/users");
    return response.data;
  },

  async createUser(data: CreateUserRequest): Promise<void> {
    await api.post("/auth/users", data);
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<void> {
    await api.put(`/auth/users/${id}`, data);
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/auth/users/${id}`);
  },
};