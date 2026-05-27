import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import PublicLayout from "../components/layout/PublicLayout";

import HomePage from "../features/home/HomePage";
import AboutPage from "../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";

import LegalNoticePage from "../features/legal/LegalNoticePage";
import PrivacyPage from "../features/legal/PrivacyPage";

import AdminLoginPage from "../features/admin/AdminLoginPage";
import AdminProjectsPage from "../features/admin/AdminProjectsPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<LegalNoticePage />} />
          <Route path="/confidentialite" element={<PrivacyPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/projects" element={<AdminProjectsPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}