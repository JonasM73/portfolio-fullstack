import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Code2,
  Database,
  Layers3,
  Plus,
  Server,
  Shield,
  Sparkles,
  Trash2,
} from "lucide-react";

import type {
  SkillItem,
  UserProfile,
} from "../../../services/profileService";

import { Input } from "../shared/Input";
import { Select } from "../shared/Select";

type Props = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setSaved: (value: boolean) => void;
};

const categoryOptions = [
  "Frontend",
  "Backend",
  "Data",
  "Business Intelligence",
  "Cybersécurité",
  "DevOps",
  "Architecture",
  "Base de données",
  "Outils",
  "Autre",
];

const categoryStyles: Record<string, string> = {
  Frontend: "bg-sky-50 text-sky-700 border-sky-100",
  Backend: "bg-violet-50 text-violet-700 border-violet-100",
  Data: "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Business Intelligence": "bg-teal-50 text-teal-700 border-teal-100",
  Cybersécurité: "bg-red-50 text-red-700 border-red-100",
  DevOps: "bg-orange-50 text-orange-700 border-orange-100",
  Architecture: "bg-zinc-100 text-zinc-700 border-zinc-200",
  "Base de données": "bg-emerald-50 text-emerald-700 border-emerald-100",
  Outils: "bg-amber-50 text-amber-700 border-amber-100",
  Autre: "bg-zinc-100 text-zinc-600 border-zinc-200",
};

function getCategoryIcon(category: string) {
  if (category === "Frontend") return <Code2 className="h-5 w-5 text-sky-600" />;
  if (category === "Backend") return <Server className="h-5 w-5 text-violet-600" />;
  if (category === "Data" || category === "Business Intelligence")
    return <Database className="h-5 w-5 text-indigo-600" />;
  if (category === "Cybersécurité")
    return <Shield className="h-5 w-5 text-red-600" />;
  if (category === "Architecture")
    return <Layers3 className="h-5 w-5 text-zinc-700" />;

  return <Sparkles className="h-5 w-5 text-amber-600" />;
}

export function SkillsTab({
  profile,
  setProfile,
  setSaved,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    profile.skills.length === 0 ? null : 0
  );

  const addSkill = () => {
    setSaved(false);

    const newSkill = {
      name: "",
      category: "Frontend",
      level: 3,
    };

    setProfile((p) => ({
      ...p,
      skills: [newSkill, ...p.skills], // ajoute EN HAUT
    }));

    setOpenIndex(0); // ouvre automatiquement la nouvelle compétence
  };

  const updateSkill = (
    index: number,
    field: keyof SkillItem,
    value: string | number
  ) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      skills: p.skills.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      ),
    }));
  };

  const removeSkill = (index: number) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      skills: p.skills.filter((_, i) => i !== index),
    }));

    setOpenIndex(null);
  };

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-zinc-900">
            Compétences
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Ajoute tes technologies, domaines et niveaux de maîtrise.
          </p>
        </div>

        <button
          type="button"
          onClick={addSkill}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          Ajouter une compétence
        </button>
      </div>

      {profile.skills.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Code2 className="h-6 w-6 text-zinc-500" />
          </div>

          <h3 className="mt-4 text-lg font-black">
            Aucune compétence renseignée
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
            Ajoute React, TypeScript, C#, MongoDB, Docker, SQL, SAP BO ou toute autre compétence importante.
          </p>

          <button
            type="button"
            onClick={addSkill}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white"
          >
            <Plus className="h-4 w-4" />
            Ajouter ma première compétence
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {profile.skills.map((item, index) => {
            const isOpen = openIndex === index;
            const categoryClass =
              categoryStyles[item.category] ?? categoryStyles.Autre;

            return (
              <article
                key={index}
                className={`overflow-hidden rounded-[1.5rem] border bg-white transition ${
                  isOpen
                    ? "border-zinc-200 shadow-md"
                    : "border-zinc-100 shadow-sm hover:border-zinc-200 hover:shadow-md"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-100">
                      {getCategoryIcon(item.category)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-base font-black text-zinc-900">
                          {item.name || "Compétence non renseignée"}
                        </h3>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-bold ${categoryClass}`}
                        >
                          {item.category || "Catégorie"}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <SkillLevel value={item.level} readonly />
                        <span className="text-xs font-bold text-zinc-400">
                          {item.level}/5
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span className="hidden rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-500 sm:inline-flex">
                      {isOpen ? "Réduire" : "Modifier"}
                    </span>

                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-zinc-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-zinc-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-zinc-100 bg-zinc-50/60 p-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        label="Nom"
                        value={item.name}
                        onChange={(v) => updateSkill(index, "name", v)}
                      />

                      <Select
                        label="Catégorie"
                        value={item.category}
                        onChange={(v) => updateSkill(index, "category", v)}
                      >
                        {categoryOptions.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className="mt-5 rounded-2xl border border-zinc-100 bg-white p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm font-black text-zinc-700">
                          Niveau de maîtrise
                        </p>

                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-500">
                          {item.level}/5
                        </span>
                      </div>

                      <SkillLevel
                        value={item.level}
                        onChange={(level) =>
                          updateSkill(index, "level", level)
                        }
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-zinc-200 pt-4">
                      <button
                        type="button"
                        onClick={() => setOpenIndex(null)}
                        className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-zinc-600 shadow-sm transition hover:bg-zinc-100"
                      >
                        Réduire
                      </button>

                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function SkillLevel({
  value,
  onChange,
  readonly = false,
}: {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
}) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((level) => {
        const active = level <= value;

        return (
          <button
            key={level}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(level)}
            className={`h-2.5 rounded-full transition ${
              readonly ? "w-6" : "w-10 hover:scale-105"
            } ${
              active
                ? "bg-teal-500"
                : "bg-zinc-200"
            }`}
          />
        );
      })}
    </div>
  );
}