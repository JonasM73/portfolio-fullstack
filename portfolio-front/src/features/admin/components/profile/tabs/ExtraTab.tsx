import { useState } from "react";
import {
  BadgeCheck,
  Car,
  ChevronDown,
  ChevronUp,
  Languages,
  Plus,
  Trash2,
} from "lucide-react";

import type {
  LanguageItem,
  LicenseItem,
  UserProfile,
} from "../../../services/profileService";

import { Input } from "../shared/Input";
import { Select } from "../shared/Select";
import { Textarea } from "../shared/Textarea";
import { LanguageAutocomplete } from "../shared/LanguageAutocomplete";

type Props = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setSaved: (value: boolean) => void;
};

const languageLevelStyles: Record<string, string> = {
  Natif: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Débutant: "bg-zinc-100 text-zinc-600 border-zinc-200",
  Intermédiaire: "bg-blue-50 text-blue-700 border-blue-100",
  Avancé: "bg-violet-50 text-violet-700 border-violet-100",
  Bilingue: "bg-teal-50 text-teal-700 border-teal-100",
};

const licenseStatusLabels: Record<string, string> = {
  obtained: "Obtenu",
  in_progress: "En cours",
  planned: "Prévu",
};

const licenseStatusStyles: Record<string, string> = {
  obtained: "bg-emerald-50 text-emerald-700 border-emerald-100",
  in_progress: "bg-teal-50 text-teal-700 border-teal-100",
  planned: "bg-amber-50 text-amber-700 border-amber-100",
};

export function ExtraTab({ profile, setProfile, setSaved }: Props) {
  const [openLanguageIndex, setOpenLanguageIndex] = useState<number | null>(
    profile.languages.length === 0 ? null : 0
  );

  const [openLicenseIndex, setOpenLicenseIndex] = useState<number | null>(
    profile.licenses.length === 0 ? null : 0
  );

  const addLanguage = () => {
    setSaved(false);

    setProfile((p) => {
      const newIndex = p.languages.length;
      setOpenLanguageIndex(newIndex);

      return {
        ...p,
        languages: [
          ...p.languages,
          {
            name: "",
            level: "",
            description: "",
          },
        ],
      };
    });
  };

  const updateLanguage = (
    index: number,
    field: keyof LanguageItem,
    value: string
  ) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      languages: p.languages.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeLanguage = (index: number) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      languages: p.languages.filter((_, i) => i !== index),
    }));

    setOpenLanguageIndex(null);
  };

  const addLicense = () => {
    setSaved(false);

    setProfile((p) => {
      const newIndex = p.licenses.length;
      setOpenLicenseIndex(newIndex);

      return {
        ...p,
        licenses: [
          ...p.licenses,
          {
            name: "",
            status: "obtained",
            obtainedYear: "",
          },
        ],
      };
    });
  };

  const updateLicense = (
    index: number,
    field: keyof LicenseItem,
    value: string
  ) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      licenses: p.licenses.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeLicense = (index: number) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      licenses: p.licenses.filter((_, i) => i !== index),
    }));

    setOpenLicenseIndex(null);
  };

  return (
    <div className="space-y-8">
      <section>
        <SectionHeader
          icon={<Languages className="h-5 w-5" />}
          title="Langues"
          description="Ajoute les langues que tu maîtrises avec ton niveau."
          buttonLabel="Ajouter une langue"
          onAdd={addLanguage}
        />

        {profile.languages.length === 0 ? (
          <EmptyState
            icon={<Languages className="h-6 w-6" />}
            title="Aucune langue renseignée"
            description="Ajoute le français, l’anglais ou d’autres langues utiles pour ton profil."
            buttonLabel="Ajouter ma première langue"
            onAdd={addLanguage}
          />
        ) : (
          <div className="space-y-3">
            {profile.languages.map((item, index) => {
              const isOpen = openLanguageIndex === index;
              const levelClass =
                languageLevelStyles[item.level] ??
                "bg-zinc-100 text-zinc-600 border-zinc-200";

              return (
                <article
                  key={index}
                  className={`overflow-visible rounded-[1.5rem] border bg-white transition ${
                    isOpen
                      ? "border-zinc-200 shadow-md"
                      : "border-zinc-100 shadow-sm hover:border-zinc-200 hover:shadow-md"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenLanguageIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-100">
                        <Languages className="h-5 w-5 text-zinc-700" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-base font-black text-zinc-900">
                            {item.name || "Langue non renseignée"}
                          </h3>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-bold ${levelClass}`}
                          >
                            {item.level || "Niveau"}
                          </span>
                        </div>

                        <p className="mt-1 truncate text-sm font-semibold text-zinc-500">
                          {item.description || "Aucune description"}
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
                        <LanguageAutocomplete
                          label="Langue"
                          value={item.name}
                          onChange={(v) =>
                            updateLanguage(index, "name", v)
                          }
                        />

                        <Select
                          label="Niveau"
                          value={item.level}
                          onChange={(v) =>
                            updateLanguage(index, "level", v)
                          }
                        >
                          <option value="">Choisir</option>
                          <option value="Natif">Natif</option>
                          <option value="Débutant">Débutant</option>
                          <option value="Intermédiaire">Intermédiaire</option>
                          <option value="Avancé">Avancé</option>
                          <option value="Bilingue">Bilingue</option>
                        </Select>
                      </div>

                      <div className="mt-4">
                        <Textarea
                          label="Description"
                          value={item.description ?? ""}
                          onChange={(v) =>
                            updateLanguage(index, "description", v)
                          }
                        />
                      </div>

                      <CardFooter
                        onCollapse={() => setOpenLanguageIndex(null)}
                        onRemove={() => removeLanguage(index)}
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <SectionHeader
          icon={<Car className="h-5 w-5" />}
          title="Permis"
          description="Ajoute tes permis obtenus, en cours ou prévus."
          buttonLabel="Ajouter un permis"
          onAdd={addLicense}
        />

        {profile.licenses.length === 0 ? (
          <EmptyState
            icon={<Car className="h-6 w-6" />}
            title="Aucun permis renseigné"
            description="Ajoute par exemple le permis B, A2, bateau côtier ou fluvial."
            buttonLabel="Ajouter mon premier permis"
            onAdd={addLicense}
          />
        ) : (
          <div className="space-y-3">
            {profile.licenses.map((item, index) => {
              const isOpen = openLicenseIndex === index;
              const statusClass =
                licenseStatusStyles[item.status] ??
                licenseStatusStyles.obtained;

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
                    onClick={() => setOpenLicenseIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-100">
                        <BadgeCheck className="h-5 w-5 text-zinc-700" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-base font-black text-zinc-900">
                            {item.name || "Permis non renseigné"}
                          </h3>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-bold ${statusClass}`}
                          >
                            {licenseStatusLabels[item.status] ?? "Obtenu"}
                          </span>
                        </div>

                        <p className="mt-1 truncate text-sm font-semibold text-zinc-500">
                          {item.obtainedYear
                            ? `Année : ${item.obtainedYear}`
                            : "Année non renseignée"}
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
                      <div className="grid gap-4 md:grid-cols-3">
                        <Input
                          label="Nom"
                          value={item.name}
                          onChange={(v) =>
                            updateLicense(index, "name", v)
                          }
                        />

                        <Select
                          label="Statut"
                          value={item.status}
                          onChange={(v) =>
                            updateLicense(index, "status", v)
                          }
                        >
                          <option value="obtained">Obtenu</option>
                          <option value="in_progress">En cours</option>
                          <option value="planned">Prévu</option>
                        </Select>

                        <Input
                          label="Année"
                          value={item.obtainedYear ?? ""}
                          onChange={(v) =>
                            updateLicense(index, "obtainedYear", v)
                          }
                        />
                      </div>

                      <CardFooter
                        onCollapse={() => setOpenLicenseIndex(null)}
                        onRemove={() => removeLicense(index)}
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  description,
  buttonLabel,
  onAdd,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  onAdd: () => void;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
          {icon}
        </div>

        <div>
          <h2 className="text-2xl font-black text-zinc-900">{title}</h2>
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800"
      >
        <Plus className="h-4 w-4" />
        {buttonLabel}
      </button>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
  buttonLabel,
  onAdd,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  onAdd: () => void;
}) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
        {icon}
      </div>

      <h3 className="mt-4 text-lg font-black">{title}</h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
        {description}
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white"
      >
        <Plus className="h-4 w-4" />
        {buttonLabel}
      </button>
    </div>
  );
}

function CardFooter({
  onCollapse,
  onRemove,
}: {
  onCollapse: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="mt-5 flex items-center justify-between border-t border-zinc-200 pt-4">
      <button
        type="button"
        onClick={onCollapse}
        className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-zinc-600 shadow-sm transition hover:bg-zinc-100"
      >
        Réduire
      </button>

      <button
        type="button"
        onClick={onRemove}
        className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
      >
        <Trash2 className="h-4 w-4" />
        Supprimer
      </button>
    </div>
  );
}