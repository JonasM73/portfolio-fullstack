# 🚀 Portfolio.Auth.Api – V2 Roadmap

This document describes the **V2 evolution** of the authentication system.

The current authentication backend is already functional and secure (JWT, roles, password policy, CRUD users, MongoDB, BCrypt).

V2 focuses on **security, session management and account recovery**.

---

# 🎯 Goals

Improve authentication with:

* Refresh Tokens
* Logout system
* Email verification
* Forgot password system
* Password reset by email
* Better security lifecycle

---

# 🔄 Refresh Token System

## Goal

Allow users to stay connected **without logging in again** every few hours.

### Current situation

```txt
JWT expires after 2h
→ User must reconnect
```

### V2 behavior

```txt
Login
↓
Access Token (short duration)
+
Refresh Token (long duration)
↓
JWT expires
↓
Frontend requests a new token
↓
User stays connected
```

### Planned durations

| Token            | Duration |
| ---------------- | -------- |
| JWT Access Token | 15 min   |
| Refresh Token    | 7 days   |

### Planned endpoints

```http
POST /api/auth/refresh-token
POST /api/auth/logout
```

---

# 📧 Email Verification

## Goal

Verify that a user email address is valid.

### Flow

```txt
Admin creates account
↓
User receives verification email
↓
User clicks verification link
↓
Account becomes verified
```

### Database additions

```txt
emailVerified
emailVerificationTokenHash
emailVerificationTokenExpiresAt
```

### Planned endpoint

```http
GET /api/auth/verify-email?token=...
```

---

# 🔑 Forgot Password

## Goal

Allow users to recover their account if they forget their password.

### Flow

```txt
User clicks "Forgot password"
↓
Email sent with secure reset link
↓
User enters new password
↓
Password updated
```

### Planned endpoints

```http
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Database additions

```txt
passwordResetTokenHash
passwordResetTokenExpiresAt
```

### Security

Reset links will:

* expire after **15 minutes**
* be **single use**
* use **hashed secure tokens**

---

# 🚪 Logout System

## Goal

Invalidate refresh tokens.

### Flow

```txt
User logs out
↓
Refresh token deleted
↓
No new JWT can be generated
```

### Planned endpoint

```http
POST /api/auth/logout
```

---

# 🗄️ Database Evolution

Current `AppUser` model will evolve.

### Current

```txt
Email
PasswordHash
FullName
Role
CreatedAt
UpdatedAt
```

### V2 additions

```txt
EmailVerified

EmailVerificationTokenHash
EmailVerificationTokenExpiresAt

RefreshTokenHash
RefreshTokenExpiresAt

PasswordResetTokenHash
PasswordResetTokenExpiresAt
```

---

# 🔒 Security Improvements

### JWT lifecycle

```txt
JWT → short duration
Refresh Token → long duration
```

Benefits:

* less risk if token is stolen
* better session management
* professional authentication flow

---

### Email security

Verification emails and reset links will use:

```txt
Secure random tokens
Expiration dates
Single-use validation
Token hashing in database
```

---

# 📩 Email Provider

V2 will use:

```txt
Resend
```

Already configured with:

```txt
Resend__ApiKey
Resend__To
```

Used for:

* email verification
* forgot password
* password reset

---

# 🛣️ V2 Planned Endpoints

```http
POST /api/auth/refresh-token
POST /api/auth/logout

GET /api/auth/verify-email

POST /api/auth/forgot-password
POST /api/auth/reset-password
```

---

# 📌 Recommended Order

Implementation order:

```txt
1. Refresh Token
2. Logout
3. Email Service (Resend)
4. Email Verification
5. Forgot Password
6. Reset Password
```

---

# 🎯 Final Goal

By the end of V2, `Portfolio.Auth.Api` will provide:

```txt
JWT Authentication
Refresh Tokens
Role-based Authorization
Password Policy
User CRUD
Email Verification
Forgot Password
Password Reset
Logout System
Secure Sessions
```

A production-ready authentication system for the portfolio platform.
