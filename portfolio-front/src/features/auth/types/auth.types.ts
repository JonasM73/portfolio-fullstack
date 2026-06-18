export type UserRole = "Admin" | "User" | "Premium";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  refreshToken: string;
  email: string;
  fullName: string;
  role: UserRole;
  expiresIn: string;
};

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
};