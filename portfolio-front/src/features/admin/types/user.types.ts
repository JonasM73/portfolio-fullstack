export type UserRole = "Admin" | "User" | "Premium";

export type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserRequest = {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
};

export type UpdateUserRequest = {
  fullName: string;
  role: UserRole;
};