# 🔐 Portfolio.Auth.Api

Authentication & authorization microservice for the **Portfolio Platform**.

This service manages:

* Authentication (JWT)
* Role-based authorization
* User management (CRUD)
* Password management
* First administrator setup
* Security policies

The API is built with **.NET 9**, **Minimal APIs**, **MongoDB**, and **JWT Authentication**.

---

# ✨ Features

## 🔑 Authentication

* Secure login
* JWT token generation
* Protected routes
* `/me` endpoint to retrieve authenticated user information

---

## 👤 User Management

### Roles

The application supports **3 roles**:

| Role        | Permissions                        |
| ----------- | ---------------------------------- |
| **Admin**   | Full access                        |
| **User**    | Standard access                    |
| **Premium** | Same permissions as User (for now) |

### Admin permissions

An administrator can:

* Create users
* Edit users
* Delete users
* Change user roles
* View all users
* Manage future portfolio content

### User & Premium permissions

Users can:

* Login
* Change their password
* Delete their own account
* Manage their own portfolio *(future feature)*

---

## 🔒 Security

### Password Policy

Passwords must contain:

* Minimum **6 characters**
* At least **1 uppercase letter**
* At least **1 number**
* Only **letters and numbers**

### Valid examples

```txt
Jonas1
Admin123
User2026
```

### Invalid examples

```txt
jonas
ADMIN
123456
abc123
```

---

## 🔐 JWT Authentication

The API uses **Bearer JWT tokens**.

Authentication flow:

```txt
Login
   ↓
JWT token generated
   ↓
Frontend stores token
   ↓
Protected API access
```

Example authorization header:

```http
Authorization: Bearer YOUR_TOKEN
```

---

# 🏗️ Architecture

```txt
Portfolio.Auth.Api/
│
├── Dtos/
│   ├── ChangePasswordRequest.cs
│   ├── CreateUserRequest.cs
│   ├── LoginRequest.cs
│   ├── LoginResponse.cs
│   ├── MeResponse.cs
│   ├── SetupAdminRequest.cs
│   └── UpdateUserRequest.cs
│
├── Models/
│   ├── AppUser.cs
│   └── UserRole.cs
│
├── Services/
│   ├── AuthService.cs
│   ├── JwtService.cs
│   └── PasswordPolicyService.cs
│
├── appsettings.json
├── appsettings.Development.json
└── Program.cs
```

---

# 🗄️ Database Structure

MongoDB collection:

```txt
portfolio-db
└── users
```

Example document:

```json
{
  "_id": "68384d2f1f74596dedbbfe1d",
  "email": "admin@email.com",
  "passwordHash": "$2a$11$hash...",
  "fullName": "Jonas Mionnet",
  "role": "Admin",
  "createdAt": "2026-05-29T11:50:30.153Z",
  "updatedAt": "2026-05-29T11:50:30.153Z"
}
```

Passwords are **hashed using BCrypt** and are never stored in plain text.

---

# 🚀 API Endpoints

## First Admin Setup

### Create first administrator

```http
POST /api/auth/setup
```

⚠️ This endpoint only works if **no admin exists**.

Example request:

```json
{
  "email": "admin@email.com",
  "password": "Admin123",
  "fullName": "Jonas Mionnet"
}
```

---

## Authentication

### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "admin@email.com",
  "password": "Admin123"
}
```

Response:

```json
{
  "token": "JWT_TOKEN",
  "email": "admin@email.com",
  "fullName": "Jonas Mionnet",
  "role": "Admin",
  "expiresIn": "2h"
}
```

---

### Get current user

```http
GET /api/auth/me
```

Requires authentication.

---

### Delete own account

```http
DELETE /api/auth/me
```

⚠️ Administrators cannot delete themselves using this route.

---

## Users CRUD (Admin Only)

### Get all users

```http
GET /api/auth/users
```

---

### Get user by ID

```http
GET /api/auth/users/{id}
```

---

### Create user

```http
POST /api/auth/users
```

Example:

```json
{
  "email": "user@test.com",
  "password": "User123",
  "fullName": "Test User",
  "role": "User"
}
```

Accepted roles:

```txt
Admin
User
Premium
```

---

### Update user

```http
PUT /api/auth/users/{id}
```

Example:

```json
{
  "fullName": "Updated Name",
  "role": "Premium"
}
```

---

### Delete user

```http
DELETE /api/auth/users/{id}
```

Protection rules:

* Cannot delete the last admin
* Cannot remove admin role from the last admin

---

## Password Management

### Change password

```http
PUT /api/auth/change-password
```

Request:

```json
{
  "currentPassword": "OldPassword1",
  "newPassword": "NewPassword1"
}
```

---

# ⚙️ Environment Variables

Required environment variables:

```powershell
# MongoDB
$env:MongoDb__ConnectionString="YOUR_CONNECTION_STRING"
$env:MongoDb__DatabaseName="portfolio-db"

# JWT
$env:Jwt__Key="YOUR_SUPER_SECRET_KEY"
$env:Jwt__Issuer="Portfolio.Auth.Api"
$env:Jwt__Audience="Portfolio.Admin"
```

---

# ▶️ Run the Service

Install dependencies:

```powershell
dotnet restore
```

Run API:

```powershell
dotnet run
```

Or with Aspire:

```powershell
dotnet run --project Portfolio.AppHost
```

---

# 🧪 Swagger

Swagger URL:

```txt
https://localhost:7296/swagger
```

### Authentication in Swagger

1. Login via:

```http
POST /api/auth/login
```

2. Copy JWT token

3. Click **Authorize**

4. Paste:

```txt
Bearer YOUR_TOKEN
```

5. Access protected endpoints

---

# 🔒 Security Notes

Sensitive information is **not stored in source code**.

Secrets should be managed using:

* Environment variables
* Secret Manager
* Azure Key Vault *(future)*

Never commit:

```txt
JWT keys
MongoDB credentials
Azure credentials
API keys
```

---

# 🛣️ Roadmap

* [x] JWT Authentication
* [x] MongoDB users
* [x] Password policy
* [x] User CRUD
* [x] Role system
* [x] Change password
* [x] Self account deletion
* [ ] Refresh tokens
* [ ] Email verification
* [ ] Forgot password
* [ ] MFA / 2FA
* [ ] Rate limiting
* [ ] Session management
* [ ] Audit logs
