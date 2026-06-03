import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Plus,
  Trash2,
} from "lucide-react";

import type {
  EducationItem,
  UserProfile,
} from "../../../services/profileService";

import { Input } from "../shared/Input";
import { Select } from "../shared/Select";
import { Textarea } from "../shared/Textarea";

type Props = {
  profile: UserProfile;
  setProfile: React.Dispatch<
    React.SetStateAction<UserProfile>
  >;
  setSaved: (value: boolean) => void;
};

const statusLabels: Record<string, string> = {
  in_progress: "En cours",
  completed: "Terminé",
  stopped: "Arrêté",
  none: "Pas d’école",
};

const statusStyles: Record<string, string> = {
  in_progress: "bg-teal-50 text-teal-700 border-teal-100",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  stopped: "bg-orange-50 text-orange-700 border-orange-100",
  none: "bg-zinc-100 text-zinc-600 border-zinc-200",
};

export function EducationTab({
  profile,
  setProfile,
  setSaved,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    profile.education.length === 0 ? null : 0
  );

  const add = () => {
    setSaved(false);

    setProfile((p) => {
      const newIndex = p.education.length;

      setOpenIndex(newIndex);

      return {
        ...p,
        education: [
          ...p.education,
          {
            school: "",
            degree: "",
            field: "",
            level: "",
            startYear: "",
            endYear: "",
            status: "in_progress",
            description: "",
          },
        ],
      };
    });
  };

  const update = (
    index: number,
    field: keyof EducationItem,
    value: string
  ) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      education: p.education.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      ),
    }));
  };

  const remove = (index: number) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      education: p.education.filter((_, i) => i !== index),
    }));

    setOpenIndex(null);
  };

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-zinc-900">
            Formations
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Ajoute ton parcours scolaire, tes diplômes et formations importantes.
          </p>
        </div>

        <button
          type="button"
          onClick={add}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          Ajouter une formation
        </button>
      </div>

      {profile.education.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
            <GraduationCap className="h-6 w-6 text-zinc-500" />
          </div>

          <h3 className="mt-4 text-lg font-black">
            Aucune formation renseignée
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
            Ajoute ton école, ton bac, ton cycle ingénieur ou toute formation importante.
          </p>

          <button
            type="button"
            onClick={add}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white"
          >
            <Plus className="h-4 w-4" />
            Ajouter ma première formation
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {profile.education.map((item, index) => {
            const isOpen = openIndex === index;
            const statusClass =
              statusStyles[item.status] ?? statusStyles.in_progress;

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
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-4 p-4 text-left"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-100">
                      <GraduationCap className="h-5 w-5 text-zinc-700" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-base font-black text-zinc-900">
                          {item.degree || "Diplôme non renseigné"}
                        </h3>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-bold ${statusClass}`}
                        >
                          {statusLabels[item.status] ?? "En cours"}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-sm font-semibold text-zinc-500">
                        {item.school || "École non renseignée"}
                        {item.level ? ` • ${item.level}` : ""}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-zinc-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.startYear || "Début"}
                        {" → "}
                        {item.endYear || "Aujourd’hui"}
                      </p>
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
                        label="École"
                        value={item.school}
                        onChange={(v) =>
                          update(index, "school", v)
                        }
                      />

                      <Input
                        label="Diplôme"
                        value={item.degree}
                        onChange={(v) =>
                          update(index, "degree", v)
                        }
                      />

                      <Input
                        label="Domaine"
                        value={item.field}
                        onChange={(v) =>
                          update(index, "field", v)
                        }
                      />

                      <Input
                        label="Niveau"
                        value={item.level}
                        onChange={(v) =>
                          update(index, "level", v)
                        }
                      />

                      <Input
                        label="Début"
                        type="month"
                        value={item.startYear}
                        onChange={(v) =>
                          update(index, "startYear", v)
                        }
                      />

                      <Input
                        label="Fin"
                        type="month"
                        value={item.endYear ?? ""}
                        onChange={(v) =>
                          update(index, "endYear", v)
                        }
                      />
                    </div>

                    <div className="mt-4">
                      <Select
                        label="Statut"
                        value={item.status}
                        onChange={(v) =>
                          update(index, "status", v)
                        }
                      >
                        <option value="in_progress">
                          En cours
                        </option>
                        <option value="completed">
                          Terminé
                        </option>
                        <option value="stopped">
                          Arrêté
                        </option>
                        <option value="none">
                          Pas d'école
                        </option>
                      </Select>
                    </div>

                    <div className="mt-4">
                      <Textarea
                        label="Description"
                        value={item.description ?? ""}
                        onChange={(v) =>
                          update(index, "description", v)
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
                        onClick={() => remove(index)}
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