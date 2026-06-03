import axios from "axios";

const profileApi = axios.create({
  baseURL: "https://localhost:7077/api",
});

profileApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export type ProfileCard = {
  title: string;
  description: string;
  icon?: string;
};

export type TimelineItem = {
  date: string;
  title: string;
  text: string;
  isCurrent: boolean;
};

export type UserProfile = {
  id?: string;
  authUserId?: string;

  firstName: string;
  lastName: string;
  headline: string;
  bio: string;

  dateOfBirth?: string;

  city: string;
  country: string;
  email: string;

  linkedinUrl?: string;
  githubUrl?: string;

  school?: string;
  workTitle?: string;
  company?: string;
  graduationYear?: number;
  education: EducationItem[];
  licenses: LicenseItem[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  skills: SkillItem[];

  interests: ProfileCard[];
  traits: ProfileCard[];
  timeline: TimelineItem[];
};
export type EducationItem = {
  school: string;
  degree: string;
  field: string;
  level: string;
  startYear: string;
  endYear?: string;
  status: string;
  description?: string;
};

export type LicenseItem = {
  name: string;
  status: string;
  obtainedYear?: string;
};

export type LanguageItem = {
  name: string;
  level: string;
  score?: string;
  description?: string;
};

export type CertificationItem = {
  name: string;
  organization?: string;
  year?: string;
  url?: string;
};

export type SkillItem = {
  name: string;
  category: string;
  level: number;
};

export const profileService = {
  getMe: async () => {
    const response =
      await profileApi.get<UserProfile>(
        "/profile/me"
      );

    return response.data;
  },

  updateMe: async (
    data: UserProfile
  ) => {
    const response =
      await profileApi.put<UserProfile>(
        "/profile/me",
        data
      );

    return response.data;
  },
};