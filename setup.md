# ⚙️ Project Setup Guide

This guide explains how to run the project locally.

---

# 📋 Prerequisites

Before starting, install:

### Backend
- .NET 9 SDK
- MongoDB

### Frontend
- Node.js (LTS recommended)
- npm

### Cloud
- Azure Storage Account
- Blob Container

---

# 📂 Global Project Structure

```txt
Portfolio/
│
├── portfolio-front/
│   ├── src/
│   ├── components/
│   ├── features/
│   └── services/
│
├── Portfolio.Auth.Api/
├── Portfolio.Projects.Api/
├── Portfolio.Profile.Api/
├── Portfolio.Contact.Api/
│
├── Portfolio.Gateway/
├── Portfolio.AppHost/
└── Portfolio.ServiceDefaults/
```

---

# 📁 Main Folders Explanation

## `portfolio-front`

Frontend React application.

Contains:

```txt
src/components/
```

Reusable UI components.

Examples:
- Buttons
- Cards
- Navigation
- Project components

---

```txt
src/features/
```

Feature-based organization.

Contains application pages:

- home
- about
- projects
- contact
- legal
- admin

---

```txt
src/services/
```

API calls.

Example:

- project service
- auth service
- upload service

---

## `Portfolio.Auth.Api`

Handles authentication.

Responsibilities:
- login
- JWT generation
- authorization

---

## `Portfolio.Projects.Api`

Project management API.

Responsibilities:
- create project
- update project
- delete project
- upload files
- retrieve projects

Uses:
- MongoDB
- Azure Blob Storage

---

## `Portfolio.Profile.Api`

Profile information API.

Responsibilities:
- profile data
- professional information

---

## `Portfolio.Contact.Api`

Handles contact forms.

---

## `Portfolio.Gateway`

API gateway.

Central entry point for APIs.

---

## `Portfolio.AppHost`

.NET Aspire orchestration.

Used to launch all services together.

---

# 🔐 Environment Variables

Create local environment variables.

### PowerShell

```powershell
$env:MongoDb__ConnectionString="mongodb://username>:<password>@localhost:27017"

$env:Jwt__Key="YOUR_SECRET_KEY"

$env:AzureBlobStorage__ConnectionString="YOUR_AZURE_CONNECTION_STRING"

$env:AzureBlobStorage__ContainerName="portfolio-projects"
```

---

# ☁️ Azure Blob Storage Setup

Create:

### Storage Account

Example:

```txt
portfoliojonas
```

### Blob Container

Example:

```txt
portfolio-projects
```

---

# ▶️ Launch Backend

Go to:

```powershell
cd Portfolio.AppHost
```

Run:

```powershell
dotnet run
```

This starts:

- APIs
- Gateway
- Aspire dashboard

---

# ▶️ Launch Frontend

Go to:

```powershell
cd portfolio-front
```

Install dependencies:

```powershell
npm install
```

Run project:

```powershell
npm run dev
```

---

# 🌐 URLs

Frontend:

```txt
http://localhost:5173
```

Swagger:

```txt
https://localhost:xxxx/swagger
```

Aspire Dashboard:

```txt
https://localhost:xxxx
```

---

# 🧪 Useful Commands

### Restore .NET packages

```powershell
dotnet restore
```

### Build project

```powershell
dotnet build
```

### Frontend install

```powershell
npm install
```

### Frontend launch

```powershell
npm run dev
```

---

# 🔥 Common Issues

### Port already used

Kill running dotnet process:

```powershell
taskkill /F /IM dotnet.exe
```

---

### Mongo connection issue

Verify MongoDB is running:

```powershell
mongod
```

---

### Azure upload not working

Check:

- Azure connection string
- container name
- environment variables