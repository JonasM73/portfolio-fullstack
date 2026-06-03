import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";

import type {
  ProfileCard,
  UserProfile,
} from "../../../services/profileService";

import { IconPicker } from "../IconPicker";
import { Input } from "../shared/Input";
import { Textarea } from "../shared/Textarea";

type Props = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setSaved: (value: boolean) => void;
};

type CardSection = "interests" | "traits";

export function ContentTab({ profile, setProfile, setSaved }: Props) {
  return (
    <div className="space-y-8">
      <CardsBlock
        field="interests"
        title="Motivations"
        description="Ce qui te pousse à avancer et à construire des projets."
        buttonLabel="Ajouter une motivation"
        emptyTitle="Aucune motivation renseignée"
        emptyDescription="Ajoute par exemple voyage, sport, technologie, entrepreneuriat ou apprentissage."
        icon={<Sparkles className="h-5 w-5" />}
        items={profile.interests}
        setProfile={setProfile}
        setSaved={setSaved}
      />

      <CardsBlock
        field="traits"
        title="Traits"
        description="Les qualités et valeurs qui définissent ton profil."
        buttonLabel="Ajouter un trait"
        emptyTitle="Aucun trait renseigné"
        emptyDescription="Ajoute par exemple curiosité, ambition, rigueur, ouverture ou esprit d’ingénierie."
        icon={<Heart className="h-5 w-5" />}
        items={profile.traits}
        setProfile={setProfile}
        setSaved={setSaved}
      />
    </div>
  );
}

function CardsBlock({
  field,
  title,
  description,
  buttonLabel,
  emptyTitle,
  emptyDescription,
  icon,
  items,
  setProfile,
  setSaved,
}: {
  field: CardSection;
  title: string;
  description: string;
  buttonLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  icon: React.ReactNode;
  items: ProfileCard[];
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setSaved: (value: boolean) => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    items.length === 0 ? null : 0
  );

  const add = () => {
    setSaved(false);

    setProfile((p) => {
      const newIndex = p[field].length;
      setOpenIndex(newIndex);

      return {
        ...p,
        [field]: [
          ...p[field],
          {
            title: "",
            description: "",
            icon: "",
          },
        ],
      };
    });
  };

  const update = (
    index: number,
    key: keyof ProfileCard,
    value: string
  ) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      [field]: p[field].map((item, i) =>
        i === index
          ? {
              ...item,
              [key]: value,
            }
          : item
      ),
    }));
  };

  const remove = (index: number) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      [field]: p[field].filter((_, i) => i !== index),
    }));

    setOpenIndex(null);
  };

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
            {icon}
          </div>

          <div>
            <h2 className="text-2xl font-black text-zinc-900">
              {title}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={add}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          {buttonLabel}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
            {icon}
          </div>

          <h3 className="mt-4 text-lg font-black">
            {emptyTitle}
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
            {emptyDescription}
          </p>

          <button
            type="button"
            onClick={add}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-bold text-white"
          >
            <Plus className="h-4 w-4" />
            {buttonLabel}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

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
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
                      {item.icon ? (
                        <span className="text-xs font-black uppercase">
                          {item.icon.slice(0, 2)}
                        </span>
                      ) : (
                        icon
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-black text-zinc-900">
                        {item.title || "Titre non renseigné"}
                      </h3>

                      <p className="mt-1 line-clamp-1 text-sm font-semibold text-zinc-500">
                        {item.description || "Description non renseignée"}
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
                        label="Titre"
                        value={item.title}
                        onChange={(v) => update(index, "title", v)}
                      />

                      <IconPicker
                        value={item.icon}
                        onChange={(v) => update(index, "icon", v)}
                      />
                    </div>

                    <div className="mt-4">
                      <Textarea
                        label="Description"
                        value={item.description}
                        onChange={(v) => update(index, "description", v)}
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