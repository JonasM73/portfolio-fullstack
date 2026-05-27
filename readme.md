# 🚀 Portfolio - Microservices Architecture with .NET Aspire

Portfolio personnel moderne développé en architecture **microservices** avec **.NET Aspire**, **ASP.NET Core**, **React**, et une approche orientée **cloud-native**, **maintenabilité** et **scalabilité**.

L’objectif du projet est de créer un portfolio professionnel moderne, administrable et déployable, permettant de présenter mes projets, compétences et expériences via une architecture logicielle robuste.

---

# 📌 État actuel du projet

## ✅ Ce qui a été réalisé

### 1. Initialisation du projet Aspire

Création du projet principal avec :

```bash
dotnet new aspire-starter -n Portfolio

Cela a généré :

Portfolio.AppHost
Portfolio.ServiceDefaults
Portfolio.ApiService
Portfolio.Web
2. Création de l’architecture microservices

Création des APIs :

dotnet new webapi -n Portfolio.Profile.Api
dotnet new webapi -n Portfolio.Projects.Api
dotnet new webapi -n Portfolio.Contact.Api
dotnet new webapi -n Portfolio.Gateway

Ajout dans la solution :

dotnet sln add Portfolio.Profile.Api
dotnet sln add Portfolio.Projects.Api
dotnet sln add Portfolio.Contact.Api
dotnet sln add Portfolio.Gateway
3. Frontend React moderne

Création du frontend :

npm create vite@latest portfolio-front

Configuration :

Framework : React
Variant  : TypeScript

Installation des dépendances :

npm install axios framer-motion lucide-react

Technologies frontend utilisées :

React
TypeScript
Axios
Framer Motion
Lucide React

TailwindCSS sera ajouté plus tard.

4. Intégration des microservices dans Aspire

Configuration du Portfolio.AppHost.

Services actuellement orchestrés :

contact-api
gateway
profile-api
projects-api
webfrontend

Tous les services sont visibles dans le Dashboard Aspire.

5. Configuration Swagger

Suppression de la configuration OpenAPI incompatible.

Remplacement par Swagger classique :

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

Pipeline :

app.UseSwagger();
app.UseSwaggerUI();

Chaque microservice expose désormais un Swagger.

6. Résolution des problèmes techniques
Compatibilité framework

Problème rencontré :

net8.0 incompatible avec packages net9.0

Solution :

Migration du projet complet vers :

.NET 9
Certificat HTTPS Aspire

Problème rencontré :

The remote certificate is invalid
UntrustedRoot

Solution :

dotnet dev-certs https --clean
dotnet dev-certs https --trust
🏗️ Architecture du projet

Architecture microservices actuelle :

Portfolio
│
├── Portfolio.AppHost
│   └── Orchestration Aspire + Dashboard
│
├── Portfolio.ServiceDefaults
│   └── Configuration commune Aspire
│
├── Portfolio.Gateway
│   └── API Gateway
│
├── Portfolio.Profile.Api
│   └── Gestion profil utilisateur
│
├── Portfolio.Projects.Api
│   └── Gestion des projets
│
├── Portfolio.Contact.Api
│   └── Gestion contact
│
├── Portfolio.Web
│   └── Frontend Aspire
│
└── portfolio-front
    └── Frontend React moderne
🌐 Aspire Dashboard

Le dashboard Aspire est fonctionnel.

Fonctionnalités disponibles :

Logs
Monitoring
Health checks
Endpoints
Console
Traces
Métriques

Dashboard :

https://localhost:17010
🔗 Endpoints actuels
Contact API
https://localhost:7176
http://localhost:5066

Swagger :

https://localhost:7176/swagger
Gateway
https://localhost:7287
http://localhost:5080

Swagger :

https://localhost:7287/swagger
Profile API
https://localhost:7077
http://localhost:5050

Swagger :

https://localhost:7077/swagger
Projects API
https://localhost:7061
http://localhost:5107

Swagger :

https://localhost:7061/swagger
Web Frontend Aspire
https://localhost:7110
http://localhost:5278
🎯 Vision du projet

Le portfolio aura deux modes :

👤 Visiteur

Le visiteur pourra :

Voir le portfolio
Consulter les projets
Voir les compétences
Voir les expériences
Télécharger le CV
Envoyer un message
🔐 Admin

Un administrateur pourra :

Se connecter
Modifier les informations du portfolio
Ajouter des projets
Modifier des projets
Supprimer des projets
Voir les messages de contact
🔒 Architecture cible finale
Portfolio.AppHost
Portfolio.ServiceDefaults

Portfolio.Gateway
Portfolio.Auth.Api
Portfolio.Profile.Api
Portfolio.Projects.Api
Portfolio.Contact.Api

Portfolio.Web
portfolio-front

Un nouveau microservice sera ajouté :

Portfolio.Auth.Api

Il permettra :

Authentification JWT
Login Admin
Protection des routes
Gestion du rôle Admin

Exemple futur endpoint :

POST /api/auth/login
🛠️ Technologies utilisées
Backend
.NET 9
ASP.NET Core
.NET Aspire
Swagger
REST APIs
Microservices
Frontend
React
TypeScript
Axios
Framer Motion
Lucide React
Infrastructure
Aspire Dashboard
Docker (prévu)
CI/CD (prévu)
Déploiement Cloud (prévu)
🚀 Lancement du projet
Restaurer les packages
dotnet restore
Lancer Aspire
dotnet run --project Portfolio.AppHost
Ouvrir le dashboard
https://localhost:17010
🗺️ Roadmap
V1
 Architecture Aspire
 Dashboard Aspire
 Swagger
 Microservices
 Front React
 JWT Authentication
 CRUD Profile
 CRUD Projects
 Contact API
V2
 MongoDB / PostgreSQL
 Dockerisation
 Admin Dashboard
 Analytics visiteurs
 API Gateway avancée
V3
 Déploiement cloud
 Domaine personnalisé
 SEO
 Multi-langue
 CI/CD
👨‍💻 Auteur

Jonas Mionnet

Étudiant ingénieur informatique — Alternant chez Capgemini / HCL

Spécialisations :

Développement Web
Microservices
Data & BI
Cybersécurité

Puis fais :

```bash
git add .
git commit -m "docs: add project README"

Ça fera déjà un repo très sérieux.