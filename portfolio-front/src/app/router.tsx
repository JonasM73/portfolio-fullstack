import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import PublicLayout from "../components/layout/PublicLayout";

import HomePage from "../features/home/HomePage";
import AboutPage from "../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";

import LegalNoticePage from "../features/legal/LegalNoticePage";
import PrivacyPage from "../features/legal/PrivacyPage";

import ProjectDetailsPage from "../features/projects/ProjectDetailsPage";

import AdminLoginPage from "../features/auth/pages/AdminLoginPage";
import { ProtectedRoute } from "../features/auth/guards/ProtectedRoute";

import AdminDashboardPage from "../features/admin/pages/AdminDashboardPage";
import AdminProjectPage from "../features/admin/pages/AdminProjectPage";
import AdminProjectCreatePage from "../features/admin/pages/AdminProjectCreatePage";
import AdminUsersPage from "../features/admin/pages/AdminUsersPage";
import AdminProjectEditPage from "../features/admin/pages/AdminProjectEditPage";


export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* ADMIN */}
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/projects/page" element={<ProtectedRoute><AdminProjectPage /></ProtectedRoute>} />
        <Route path="/admin/projects/new" element={<ProtectedRoute><AdminProjectCreatePage /></ProtectedRoute>} />
        <Route path="/admin/projects/:id/edit" element={<ProtectedRoute><AdminProjectEditPage /></ProtectedRoute>} />
        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<LegalNoticePage />} />
          <Route path="/confidentialite" element={<PrivacyPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}