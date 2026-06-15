import { useState } from "react";
import {
  AtSign,
  ImagePlus,
  Loader2,
  MapPin,
  Sparkles,
  UserRound,
} from "lucide-react";

import {
  profileService,
  type UserProfile,
} from "../../../services/profileService";

import { Input } from "../shared/Input";
import { Textarea } from "../shared/Textarea";

type Props = {
  profile: UserProfile;
  updateField: <K extends keyof UserProfile>(
    field: K,
    value: UserProfile[K]
  ) => void;
};

export function IdentityTab({ profile, updateField }: Props) {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState("");

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setAvatarError("");

    if (!file.type.startsWith("image/")) {
      setAvatarError("Le fichier doit être une image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("L’image ne doit pas dépasser 2 Mo.");
      return;
    }

    setIsUploadingAvatar(true);

    try {
      const avatar = await profileService.uploadAvatar(file);
      updateField("avatar", avatar);
    } catch (error) {
      console.error(error);
      setAvatarError("Impossible d’envoyer la photo.");
    } finally {
      setIsUploadingAvatar(false);
      event.target.value = "";
    }
  };

  return (
    <section>
      <div className="mb-6 overflow-hidden rounded-[1.75rem] border border-zinc-100 bg-gradient-to-br from-zinc-950 to-zinc-800 p-6 text-white shadow-md">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-[1.7rem] bg-white/10 text-xl font-black ring-1 ring-white/10">
              {profile.avatar?.url ? (
                <img
                  src={profile.avatar.url}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  {(profile.firstName?.[0] ?? "J")}
                  {(profile.lastName?.[0] ?? "M")}
                </>
              )}
            </div>

            <div>
              <p className="text-sm font-bold text-teal-300">
                Profil public
              </p>

              <h2 className="mt-1 text-2xl font-black">
                {profile.firstName || "Prénom"} {profile.lastName || "Nom"}
              </h2>

              <p className="mt-1 max-w-xl text-sm text-white/60">
                {profile.headline ||
                  "Ajoute une headline claire pour présenter ton profil."}
              </p>
            </div>
          </div>

          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white/80 transition hover:bg-white/15">
            {isUploadingAvatar ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ImagePlus className="h-4 w-4" />
            )}

            {profile.avatar?.url ? "Changer la photo" : "Ajouter une photo"}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
              disabled={isUploadingAvatar}
            />
          </label>
        </div>

        {avatarError && (
          <p className="mt-4 rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200">
            {avatarError}
          </p>
        )}
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

          <div className="mt-4 overflow-hidden rounded-[1.5rem] bg-white shadow-sm">
            {profile.avatar?.url ? (
              <img
                src={profile.avatar.url}
                alt="Photo de profil"
                className="h-64 w-full object-cover"
              />
            ) : (
              <div className="flex h-64 items-center justify-center bg-zinc-100 text-4xl font-black text-zinc-400">
                {(profile.firstName?.[0] ?? "J")}
                {(profile.lastName?.[0] ?? "M")}
              </div>
            )}
          </div>

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
          <h3 className="text-lg font-black text-zinc-900">{title}</h3>

          <p className="mt-1 text-sm text-zinc-500">{description}</p>
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