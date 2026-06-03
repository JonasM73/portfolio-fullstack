import {
  AtSign,
  Calendar,
  MapPin,
  Sparkles,
  UserRound,
} from "lucide-react";

import type { UserProfile } from "../../../services/profileService";
import { Input } from "../shared/Input";
import { Textarea } from "../shared/Textarea";

type Props = {
  profile: UserProfile;
  updateField: (
    field: keyof UserProfile,
    value: string | number | undefined
  ) => void;
};

export function IdentityTab({
  profile,
  updateField,
}: Props) {
  return (
    <section>
      <div className="mb-6 overflow-hidden rounded-[1.75rem] border border-zinc-100 bg-gradient-to-br from-zinc-950 to-zinc-800 p-6 text-white shadow-md">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-xl font-black ring-1 ring-white/10">
              {(profile.firstName?.[0] ?? "J")}
              {(profile.lastName?.[0] ?? "M")}
            </div>

            <div>
              <p className="text-sm font-bold text-teal-300">
                Profil public
              </p>

              <h2 className="mt-1 text-2xl font-black">
                {profile.firstName || "Prénom"}{" "}
                {profile.lastName || "Nom"}
              </h2>

              <p className="mt-1 max-w-xl text-sm text-white/60">
                {profile.headline ||
                  "Ajoute une headline claire pour présenter ton profil."}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white/80">
            Identité principale
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <Panel
            icon={<UserRound className="h-5 w-5" />}
            title="Informations personnelles"
            description="Nom, prénom et présentation courte."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                required
                label="Prénom"
                value={profile.firstName}
                onChange={(v) => updateField("firstName", v)}
              />

              <Input
                required
                label="Nom"
                value={profile.lastName}
                onChange={(v) => updateField("lastName", v)}
              />

              <div className="md:col-span-2">
                <Input
                  required
                  label="Headline"
                  value={profile.headline}
                  onChange={(v) => updateField("headline", v)}
                />
              </div>
            </div>
          </Panel>

          <Panel
            icon={<AtSign className="h-5 w-5" />}
            title="Contact public"
            description="Informations affichées ou utilisées sur le portfolio."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                required
                label="Email public"
                value={profile.email}
                onChange={(v) => updateField("email", v)}
              />

              <Input
                label="Date de naissance"
                type="date"
                value={profile.dateOfBirth ?? ""}
                onChange={(v) => updateField("dateOfBirth", v)}
              />
            </div>
          </Panel>

          <Panel
            icon={<MapPin className="h-5 w-5" />}
            title="Localisation"
            description="Ville et pays affichés sur la page À propos."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                required
                label="Ville"
                value={profile.city}
                onChange={(v) => updateField("city", v)}
              />

              <Input
                required
                label="Pays"
                value={profile.country}
                onChange={(v) => updateField("country", v)}
              />
            </div>
          </Panel>

          <Panel
            icon={<Sparkles className="h-5 w-5" />}
            title="Biographie"
            description="Texte principal utilisé pour présenter ton profil."
          >
            <Textarea
              required
              label="Biographie"
              value={profile.bio}
              onChange={(v) => updateField("bio", v)}
            />
          </Panel>
        </div>

        <aside className="h-fit rounded-[1.75rem] border border-zinc-100 bg-zinc-50 p-5">
          <h3 className="text-sm font-black uppercase tracking-wide text-zinc-400">
            Aperçu rapide
          </h3>

          <div className="mt-4 space-y-3">
            <PreviewItem
              label="Nom complet"
              value={`${profile.firstName || "Prénom"} ${
                profile.lastName || "Nom"
              }`}
            />

            <PreviewItem
              label="Email"
              value={profile.email || "Non renseigné"}
            />

            <PreviewItem
              label="Localisation"
              value={`${profile.city || "Ville"}, ${
                profile.country || "Pays"
              }`}
            />

            <PreviewItem
              label="Naissance"
              value={profile.dateOfBirth || "Non renseignée"}
            />
          </div>

          <div className="mt-5 rounded-2xl border border-teal-100 bg-teal-50 p-4 text-sm text-teal-800">
            <p className="font-black">
              Conseil
            </p>
            <p className="mt-1 leading-relaxed">
              Ta headline doit être courte, claire et orientée recruteur :
              formation, spécialité, technologies ou domaine.
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
            <div className="mb-2 flex items-center gap-2 font-black text-zinc-800">
              <Calendar className="h-4 w-4" />
              Format attendu
            </div>

            <p>
              Les champs marqués avec{" "}
              <span className="font-black text-teal-600">*</span>{" "}
              sont nécessaires pour avoir une page publique complète.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Panel({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-zinc-100 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-black text-zinc-900">
            {title}
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}

function PreviewItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-black text-zinc-800">
        {value}
      </p>
    </div>
  );
}