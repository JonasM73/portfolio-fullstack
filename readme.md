# 🚀 Portfolio – Software Engineer Portfolio Platform

![.NET](https://img.shields.io/badge/.NET-9-purple)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Green)
![Azure Blob Storage](https://img.shields.io/badge/Azure-Blob%20Storage-0078D4)
![JWT](https://img.shields.io/badge/Auth-JWT-black)

A modern, scalable and production-ready developer portfolio platform built with a **microservices architecture**, designed to showcase projects, technical experiences and professional achievements.

This platform includes a **public portfolio**, an **administration dashboard**, **secure authentication**, **project management**, and **cloud media storage**.

---

# ✨ Features

## 🌍 Public Portfolio
- Modern landing page
- Project showcase
- Detailed project pages
- Professional profile section
- Contact page
- Legal notice & privacy policy

## 📁 Project Management
- Create projects
- Edit projects
- Delete projects
- Categorization by project type
- Technologies & roles management
- Project timeline
- Image upload
- Technical document upload

## 🔐 Authentication & Security
- JWT authentication
- Protected admin routes
- Role-based authorization
- Secure API access

## ☁️ Cloud Storage
- Azure Blob Storage integration
- Image hosting
- PDF / technical reports hosting
- Scalable external storage

## ⚡ Developer Experience
- .NET Aspire orchestration
- Swagger API documentation
- Modular architecture
- Clean folder organization
- Feature-based frontend structure

---

# 🏗️ Architecture

The application follows a **distributed microservices architecture**.

```txt
Frontend (React + Vite)
            │
            ▼
      API Gateway
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼
Auth     Projects    Profile
 API        API         API
 │            │
 ▼            ▼
 JWT       MongoDB
              │
              ▼
      Azure Blob Storage
```

---

# 🛠️ Tech Stack

## Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Framer Motion
- Axios
- React Router
- Lucide React

## Backend
- .NET 9
- Minimal APIs
- JWT Authentication
- Swagger

## Infrastructure
- MongoDB
- Azure Blob Storage
- .NET Aspire

---

# 📂 Project Structure

```txt
Portfolio/
│
├── portfolio-front/           → React frontend
│
├── Portfolio.Auth.Api/        → Authentication API
├── Portfolio.Projects.Api/    → Projects management API
├── Portfolio.Profile.Api/     → Profile management API
├── Portfolio.Contact.Api/     → Contact API
│
├── Portfolio.Gateway/         → API Gateway
├── Portfolio.AppHost/         → Aspire orchestration
├── Portfolio.ServiceDefaults/ → Shared Aspire configuration
└── Portfolio.ApiService/      → Shared backend services
```

---

# 📸 Screenshots

### Home Page
> Add screenshot here

### Projects Page
> Add screenshot here

### Project Details
> Add screenshot here

### Admin Dashboard
> Add screenshot here

---

# 🔒 Security

Sensitive information is **not stored inside the repository**.

Secrets are handled using:

- Environment Variables
- Azure Configuration
- Local development secrets

Example:

```env
AzureBlobStorage__ConnectionString=
MongoDb__ConnectionString=
Jwt__Key=
```

---

# 🚀 Roadmap

- [x] Project CRUD
- [x] JWT authentication
- [x] Azure Blob Storage
- [x] Admin dashboard
- [x] Project details page
- [ ] Full Docker deployment
- [ ] CI/CD pipeline
- [ ] Contact email service
- [ ] Analytics dashboard

---

# 👨‍💻 Author

**Jonas MIONNET**

Software Engineering Student – CESI  
Cybersecurity & Software Engineering Enthusiast

---

# 📄 License

This project is for educational and portfolio purposes.