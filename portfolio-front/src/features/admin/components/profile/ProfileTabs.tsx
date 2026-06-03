import {
  Briefcase,
  Code2,
  GraduationCap,
  Languages,
  Sparkles,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";

export type ProfileTab =
  | "identity"
  | "career"
  | "education"
  | "skills"
  | "extra"
  | "content";

const tabs: {
  id: ProfileTab;
  label: string;
  icon: ReactNode;
}[] = [
  { id: "identity", label: "Identité", icon: <UserRound /> },
  { id: "career", label: "Carrière", icon: <Briefcase /> },
  { id: "education", label: "Formations", icon: <GraduationCap /> },
  { id: "skills", label: "Compétences", icon: <Code2 /> },
  { id: "extra", label: "Langues & Permis", icon: <Languages /> },
  { id: "content", label: "Contenu", icon: <Sparkles /> },
];

type Props = {
  activeTab: ProfileTab;
  setActiveTab: (tab: ProfileTab) => void;
};

export function ProfileTabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className="mb-6 grid gap-3 rounded-[1.5rem] bg-white p-3 shadow-sm md:grid-cols-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition [&>svg]:h-4 [&>svg]:w-4 ${
            activeTab === tab.id
              ? "bg-zinc-950 text-white"
              : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}