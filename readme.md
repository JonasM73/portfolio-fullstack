# 🚀 Portfolio – Software Engineer Portfolio Platform

![.NET](https://img.shields.io/badge/.NET-9-purple)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Green)
![Azure Blob Storage](https://img.shields.io/badge/Azure-Blob%20Storage-0078D4)
![JWT](https://img.shields.io/badge/Auth-JWT-black)
![Resend](https://img.shields.io/badge/Email-Resend-000000)

A modern, scalable and production-ready developer portfolio platform built with a **microservices architecture** (.NET 9 + React 19), designed to showcase projects, technical experiences and professional achievements.

This platform includes a **public portfolio website**, a **secure admin dashboard**, **JWT authentication with role-based access**, **project management with cloud storage**, and **email integration**.

---

# ✨ Features

## 🌍 Public Portfolio Website
- Modern landing page with animations
- Project showcase with filtering
- Detailed project pages with technologies & roles
- Professional profile/about section
- Contact form with email notifications
- Legal notice & privacy policy
- Responsive design (mobile-friendly)

## 📁 Project Management (Admin Only)
- **Create, edit, delete projects** with full CRUD operations
- **Rich text editor** (TipTap) for project descriptions
- Upload limits:
-- Images: 10 MB max
-- PDF documents: 50 MB max
- Project metadata: technologies, roles, team size, dates
- GitHub repository & demo URL links
- Project publishing & featuring
- Version history & change tracking

## 🔐 Authentication & Security
- **JWT-based authentication** with strong signature validation
- **3 user roles**: Admin, User, Premium
- **Password security**: BCrypt hashing, 6+ chars with uppercase & numbers
- **Password reset flow** with time-limited tokens
- **Protected admin routes** - all modification endpoints require valid JWT + Admin role
- First admin setup endpoint available only during initial deployment
- Disabled or removed in production environments
- Refresh Token rotation & server-side revocation
- Login rate limiting
- Forgot password rate limiting
- Temporary account lockout after repeated failed login attempts
- Protection against user enumeration
- Generic authentication error messages

## 🛡️ HTTP Security

- Content Security Policy (CSP)
- HSTS (Strict-Transport-Security)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Referrer-Policy
- Permissions-Policy
- HTTPS enforced

## ☁️ Cloud Storage & Media
- **Azure Blob Storage integration** for scalable file hosting
- Project images & documents organized by project
- Avatar uploads for user profiles
- Automatic cleanup & optimization
- CDN-ready for fast delivery

## 💌 Contact & Notifications
- **Contact form submission** on public website
- **Email delivery via Resend API** for notifications
- Messages saved to MongoDB for admin review
- Project-specific contact links

## ⚡ Developer Experience
- **.NET Aspire orchestration** - start all services with one command
- **Swagger API documentation** for all endpoints
- **Feature-based frontend structure** for maintainability
- **Modular backend architecture** with shared service defaults
- **TypeScript** across full stack for type safety
- **Hot reload development** environment

---

# 🏗️ Architecture

The application follows a **distributed microservices architecture** with API Gateway pattern.

```txt
                    Frontend (React 19 + Vite)
                    - TypeScript + Tailwind
                    - Shadcn UI + Framer Motion
                            │
                            ▼
                    ┌──────────────────┐
                    │  API Gateway     │  (Port 7061)
                    │  (Request Router)│
                    └────────┬─────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
  │  Auth API   │    │ Projects API │    │ Profile API  │
  │ (7076)      │    │  (7057)      │    │  (7077)      │
  │ - JWT Gen   │    │ - CRUD Ops   │    │ - Avatar Mgmt│
  │ - Login     │    │ - File Upload│    │ - Bio/Links  │
  │ - Refresh Tokens │              │    │              │
  │ - Password Reset │              │    │              │
  │ - User Management│              │    │              │
  │ - Reset Pwd │    │ - Publish    │    │              │
  └──────┬──────┘    └──────┬───────┘    └──────────────┘
         │                   │
         └───────────┬───────┘
                     │
         ┌───────────┴──────────┐
         ▼                      ▼
    MongoDB              Azure Blob Storage
    (portfolio-db)       (portfolio-projects)
    - users              - Project images
    - projects           - Documents
    - messages           - User avatars
    - profiles

    Contact API (7174)
    ├─ Form Submissions
    └─ Resend API (Email)
```

---

# 🛠️ Tech Stack

## 🎨 Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI Framework |
| TypeScript | 5 | Type Safety |
| Vite | Latest | Build Tool & Dev Server |
| Tailwind CSS | 4.3 | Utility-first Styling |
| Shadcn UI | Latest | Pre-built Components |
| Framer Motion | Latest | Smooth Animations |
| React Router | 7 | Client-side Routing |
| TipTap | Latest | Rich Text Editor |
| Axios | Latest | HTTP Client |
| Lucide React | Latest | Icon Library |

## 🔙 Backend (.NET 9 - Microservices)
| Service | Purpose | Key Features |
|---------|---------|-------------|
| **Auth.Api** | User authentication & JWT | BCrypt, role-based auth, password reset |
| **Projects.Api** | Project management | CRUD, file uploads, publishing |
| **Profile.Api** | User profile management | Avatar uploads, bio, public profiles |
| **Contact.Api** | Contact form handling | Email delivery via Resend |
| **Gateway** | API entry point | Request routing, CORS |
| **AppHost** | .NET Aspire orchestration | Service startup & coordination |
| **ServiceDefaults** | Shared configuration | Health checks, logging, telemetry |

## 💾 Data & Storage
- **MongoDB** - Document database for users, projects, messages, profiles
- **Azure Blob Storage** - Cloud file hosting (images, documents, avatars)
- **Resend API** - Email delivery service

---

# 📂 Project Structure

```txt
Portfolio/
│
├── portfolio-front/                → React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── app/                   → Pages & layouts
│   │   ├── components/            → Reusable UI components
│   │   ├── features/              → Feature-specific logic
│   │   ├── lib/                   → Utilities & helpers
│   │   ├── services/              → API integration
│   │   ├── assets/                → Images, fonts
│   │   └── index.css              → Global styles
│   └── package.json               → Frontend dependencies
│
├── Portfolio.Gateway/              → API Gateway (.NET 9)
│   ├── Program.cs                 → Gateway setup & routing
│   └── appsettings.json           → Configuration
│
├── Portfolio.Auth.Api/             → Authentication Microservice
│   ├── Program.cs                 → Auth setup
│   ├── Models/                    → User models
│   ├── Dtos/                      → Request/response DTOs
│   ├── Services/                  → Authentication logic
│   └── appsettings.json
│
├── Portfolio.Projects.Api/         → Projects Management Microservice
│   ├── Program.cs                 → Projects setup
│   ├── Models/                    → Project models
│   ├── Dtos/                      → Project DTOs
│   ├── Endpoints/                 → API endpoints
│   ├── Services/                  → Business logic
│   └── appsettings.json
│
├── Portfolio.Profile.Api/          → Profile Management Microservice
│   ├── Program.cs
│   ├── Models/
│   ├── Dtos/
│   ├── Controllers/
│   ├── Services/
│   └── appsettings.json
│
├── Portfolio.Contact.Api/          → Contact & Email Microservice
│   ├── Program.cs
│   ├── Models/
│   ├── Dtos/
│   └── appsettings.json
│
├── Portfolio.AppHost/              → .NET Aspire Orchestration
│   ├── Program.cs                 → Service definitions
│   └── appsettings.json
│
└── Portfolio.ServiceDefaults/      → Shared Service Configuration
    ├── Extensions.cs              → Common extensions
    └── Portfolio.ServiceDefaults.csproj
```

---

# 🚀 Getting Started

### Prerequisites
- **.NET 9 SDK** - [Download](https://dotnet.microsoft.com/download)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **MongoDB** - Local or cloud instance
- **Azure Storage Account** - For blob storage
- **Resend API Key** - For email functionality

### Environment Variables

Create `.env` files or set system variables:

```env
# Database
MongoDb__ConnectionString=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
# JWT Authentication
Jwt__Key=your-super-secret-key-min-32-chars
Jwt__Issuer=Portfolio.Auth.Api
Jwt__Audience=Portfolio.Admin

# Azure Blob Storage
AzureBlobStorage__ConnectionString="<YOUR_AZURE_BLOB_CONNECTION_STRING>"
AzureBlobStorage__ContainerName=portfolio-projects

# Email (Resend)
Resend__ApiKey="<YOUR_RESEND_API_KEY>"
Resend__FromEmail=noreply@yourdomain.com

# CORS (Development)
AllowedOrigins=http://localhost:5173
```

### Running the Application

**Option 1: Using .NET Aspire (Recommended)**
```powershell
cd Portfolio
./start-dev.ps1
# Or manually:
dotnet run --project Portfolio.AppHost
```

**Option 2: Manually start services**
```powershell
# Terminal 1 - Frontend
cd portfolio-front
npm install
npm run dev

# Terminal 2 - Auth API
cd Portfolio.Auth.Api
dotnet run

# Terminal 3 - Projects API
cd Portfolio.Projects.Api
dotnet run

# ... etc for other services
```

### Accessing the Application
- **Frontend**: http://localhost:5173
- **API Gateway**: http://localhost:7061
- **Swagger Docs**: http://localhost:7061/swagger

---

# 🔒 Security

Sensitive information is **never stored in the repository**.

### Secrets Management
- ✅ **Environment Variables** - For development & production
- ✅ **Azure Key Vault** - For cloud deployments (recommended)
- ✅ **Local user secrets** - For development: `dotnet user-secrets`

### Security Features
- 🔐 **JWT tokens** - Signed & validated on each request
- 🔒 **BCrypt password hashing** - Industry-standard algorithm
- 🛡️ **Role-based access control** - Admin-only endpoints protected
- 📝 **Password policy** - 6+ chars, uppercase, numbers
- ⏱️ **Token expiration** - Configurable token lifetime
- 🚫 **CORS restrictions** - Configured per environment

---

# 📊 API Endpoints

### Authentication API (7076)
```
POST /auth/login
POST /auth/refresh
POST /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
GET  /auth/me
PUT  /auth/change-password
```

### Projects API (7057)
```
GET    /projects             - List all projects
GET    /projects/:id         - Get project details
POST   /projects             - Create project (admin)
PUT    /projects/:id         - Update project (admin)
DELETE /projects/:id         - Delete project (admin)
POST   /projects/:id/publish - Publish project (admin)
POST   /projects/:id/feature - Feature project (admin)
POST   /projects/:id/upload  - Upload image/document (admin)
```

### Profile API (7077)
```
GET    /profile              - Get current user profile
GET    /profile/:userId      - Get public profile
PUT    /profile              - Update profile (protected)
POST   /profile/avatar       - Upload avatar (protected)
```

### Contact API (7174)
```
POST   /contact/send         - Submit contact form
GET    /contact/messages     - Get messages (admin)
```

---

# 🚀 Roadmap

### ✅ Completed
- [x] Full public portfolio website
- [x] Project management (CRUD)
- [x] File uploads (images & documents)
- [x] JWT authentication & authorization
- [x] Admin dashboard
- [x] Project publishing & featuring
- [x] Contact form with email delivery
- [x] User profiles & avatars
- [x] Password reset flow
- [x] .NET Aspire orchestration
- [x] Rate limiting & API throttling
- [x] Refresh Token Security
- [x] Password Reset Flow
- [x] CSP & Security Headers
- [x] Brute Force Protection

### 🔄 In Progress / Planned
- [ ] User self-service portfolio customization
- [ ] Advanced project filtering & search
- [ ] Analytics dashboard (view counts, engagement)
- [ ] Full Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] User portfolio preview before publishing
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Redis caching for performance

# 🚀 Production Architecture

Frontend
- React 19
- Vite Build

Backend
- .NET 9 Microservices
- API Gateway Pattern

Storage
- MongoDB Atlas
- Azure Blob Storage

Email
- Resend

Security
- JWT Authentication
- Refresh Tokens
- Role-Based Authorization
- CSP
- HSTS
- Rate Limiting
---

# 📸 Screenshots

> Coming soon...

---

# 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# Update connection string in appsettings.json
```

### Azure Blob Storage Errors
- Verify connection string in environment variables
- Check container name matches configuration
- Ensure storage account has appropriate permissions

### JWT Authentication Failures
- Verify `Jwt__Key` is consistent across services
- Check token hasn't expired
- Confirm `Issuer` and `Audience` match

### Email Not Sending
- Validate Resend API key
- Check sender email is verified in Resend
- Review email logs in Resend dashboard

---

# 👨‍💻 Author

Jonas MIONNET

Engineering Student at CESI
Data Analyst Apprentice at Sogeti (Capgemini)

Areas of Interest:
- Software Engineering
- Cloud Computing
- Cybersecurity
- Distributed Systems
- Observability

---

# 📄 License

This project is for educational and portfolio purposes.