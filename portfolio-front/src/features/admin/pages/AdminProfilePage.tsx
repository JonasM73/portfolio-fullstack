import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Save,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  profileService,
  type UserProfile,
} from "../services/profileService";

import {
  ProfileTabs,
  type ProfileTab,
} from "../components/profile/ProfileTabs";

import { ProfileSidebar } from "../components/profile/ProfileSidebar";

import { IdentityTab } from "../components/profile/tabs/IdentityTab";
import { CareerTab } from "../components/profile/tabs/CareerTab";
import { EducationTab } from "../components/profile/tabs/EducationTab";
import { SkillsTab } from "../components/profile/tabs/SkillsTab";
import { ExtraTab } from "../components/profile/tabs/ExtraTab";
import { ContentTab } from "../components/profile/tabs/ContentTab";

const emptyProfile: UserProfile = {
  firstName: "",
  lastName: "",
  headline: "",
  bio: "",
  dateOfBirth: "",

  city: "",
  country: "",
  email: "",

  linkedinUrl: "",
  githubUrl: "",

  school: "",
  workTitle: "",
  company: "",
  graduationYear: undefined,

  interests: [],
  traits: [],
  timeline: [],

  education: [],
  licenses: [],
  languages: [],
  certifications: [],
  skills: [],
};

export default function AdminProfilePage() {
  const [profile, setProfile] =
    useState<UserProfile>(emptyProfile);

  const [activeTab, setActiveTab] =
    useState<ProfileTab>("identity");

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const completion = useMemo(() => {
    const required = [
      profile.firstName,
      profile.lastName,
      profile.headline,
      profile.bio,
      profile.city,
      profile.country,
      profile.email,
    ];

    return Math.round(
      (required.filter((v) => v?.trim()).length /
        required.length) *
        100
    );
  }, [profile]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data =
          await profileService.getMe();

        setProfile({
          ...emptyProfile,
          ...data,

          dateOfBirth:
            data.dateOfBirth
              ? data.dateOfBirth.split("T")[0]
              : "",

          interests:
            data.interests ?? [],

          traits:
            data.traits ?? [],

          timeline:
            data.timeline ?? [],

          education:
            data.education ?? [],

          licenses:
            data.licenses ?? [],

          languages:
            data.languages ?? [],

          certifications:
            data.certifications ?? [],

          skills:
            data.skills ?? [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const updateField = (
    field: keyof UserProfile,
    value:
      | string
      | number
      | undefined
  ) => {
    setSaved(false);

    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);

    try {
      await profileService.updateMe({
        ...profile,

        graduationYear:
          profile.graduationYear
            ? Number(
                profile.graduationYear
              )
            : undefined,
      });

      setSaved(true);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F6F2]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2] px-6 py-8 text-zinc-900">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour dashboard
            </Link>

            <h1 className="mt-3 text-4xl font-black">
              Modifier mon profil
            </h1>

            <p className="mt-2 text-zinc-500">
              Configure toutes les données
              publiques de ton portfolio.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-zinc-800 disabled:opacity-60"
          >
            {isSaving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : saved ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <Save className="h-5 w-5" />
            )}

            {isSaving
              ? "Sauvegarde..."
              : saved
              ? "Sauvegardé"
              : "Sauvegarder"}
          </button>
        </div>

        {/* TABS */}
        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* CONTENT */}
        <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
          <div className="rounded-[2rem] bg-white p-6 shadow-lg">
            {activeTab ===
              "identity" && (
              <IdentityTab
                profile={profile}
                updateField={
                  updateField
                }
              />
            )}

            {activeTab ===
              "career" && (
              <CareerTab
                profile={profile}
                updateField={
                  updateField
                }
              />
            )}

            {activeTab ===
              "education" && (
              <EducationTab
                profile={profile}
                setProfile={
                  setProfile
                }
                setSaved={
                  setSaved
                }
              />
            )}

            {activeTab ===
              "skills" && (
              <SkillsTab
                profile={profile}
                setProfile={
                  setProfile
                }
                setSaved={
                  setSaved
                }
              />
            )}

            {activeTab ===
              "extra" && (
              <ExtraTab
                profile={profile}
                setProfile={
                  setProfile
                }
                setSaved={
                  setSaved
                }
              />
            )}

            {activeTab ===
              "content" && (
              <ContentTab
                profile={profile}
                setProfile={
                  setProfile
                }
                setSaved={
                  setSaved
                }
              />
            )}
          </div>

          <ProfileSidebar
            profile={profile}
            completion={
              completion
            }
          />
        </div>
      </div>
    </main>
  );
}