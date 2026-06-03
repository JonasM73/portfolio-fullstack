import {
  Briefcase,
  Building2,
  CalendarCheck,
  ExternalLink,
  GraduationCap,
  Link as LinkIcon,
  UserRound,
} from "lucide-react";

import type { UserProfile } from "../../../services/profileService";
import { Input } from "../shared/Input";

type Props = {
  profile: UserProfile;
  updateField: (
    field: keyof UserProfile,
    value: string | number | undefined
  ) => void;
};

export function CareerTab({ profile, updateField }: Props) {
  return (
    <section>
      <div className="mb-6 overflow-hidden rounded-[1.75rem] border border-zinc-100 bg-white shadow-sm">
        <div className="border-b border-zinc-100 bg-zinc-50 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white">
              <Briefcase className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-zinc-900">
                Carrière & situation
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Mets à jour ton école, ton alternance, ton poste et tes liens
                professionnels.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 xl:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <Panel
              icon={<GraduationCap className="h-5 w-5" />}
              title="Situation académique"
              description="Informations principales liées à tes études."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="École actuelle"
                  value={profile.school ?? ""}
                  onChange={(v) => updateField("school", v)}
                />

                <Input
                  label="Diplôme attendu"
                  type="number"
                  value={profile.graduationYear?.toString() ?? ""}
                  onChange={(v) =>
                    updateField("graduationYear", v ? Number(v) : undefined)
                  }
                />
              </div>
            </Panel>

            <Panel
              icon={<Building2 className="h-5 w-5" />}
              title="Alternance / entreprise"
              description="Entreprise actuelle et intitulé du poste."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Entreprise"
                  value={profile.company ?? ""}
                  onChange={(v) => updateField("company", v)}
                />

                <Input
                  label="Poste"
                  value={profile.workTitle ?? ""}
                  onChange={(v) => updateField("workTitle", v)}
                />
              </div>
            </Panel>

            <Panel
              icon={<LinkIcon className="h-5 w-5" />}
              title="Liens professionnels"
              description="Ces liens seront utilisés sur la page publique."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="LinkedIn"
                  value={profile.linkedinUrl ?? ""}
                  onChange={(v) => updateField("linkedinUrl", v)}
                />

                <Input
                  label="GitHub"
                  value={profile.githubUrl ?? ""}
                  onChange={(v) => updateField("githubUrl", v)}
                />
              </div>
            </Panel>
          </div>

          <aside className="h-fit rounded-[1.5rem] border border-zinc-100 bg-zinc-50 p-5">
            <h3 className="text-sm font-black uppercase tracking-wide text-zinc-400">
              Aperçu carrière
            </h3>

            <div className="mt-4 space-y-3">
              <PreviewCard
                icon={<GraduationCap className="h-4 w-4" />}
                label="École"
                value={profile.school || "Non renseignée"}
              />

              <PreviewCard
                icon={<CalendarCheck className="h-4 w-4" />}
                label="Diplôme attendu"
                value={
                  profile.graduationYear
                    ? `${profile.graduationYear}`
                    : "Non renseigné"
                }
              />

              <PreviewCard
                icon={<Building2 className="h-4 w-4" />}
                label="Entreprise"
                value={profile.company || "Non renseignée"}
              />

              <PreviewCard
                icon={<UserRound className="h-4 w-4" />}
                label="Poste"
                value={profile.workTitle || "Non renseigné"}
              />
            </div>

            <div className="mt-5 grid gap-3">
              <SocialPreview
                label="LinkedIn"
                value={profile.linkedinUrl}
                color="bg-[#0077B5]/10 text-[#0077B5]"
                icon={<LinkedInIcon />}
              />

              <SocialPreview
                label="GitHub"
                value={profile.githubUrl}
                color="bg-zinc-950/10 text-zinc-950"
                icon={<GitHubIcon />}
              />
            </div>


          </aside>
        </div>
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

function PreviewCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-black text-zinc-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function SocialPreview({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value?: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-sm font-black text-zinc-800">
            {label}
          </p>

          <p className="max-w-[180px] truncate text-xs font-semibold text-zinc-400">
            {value || "Non renseigné"}
          </p>
        </div>
      </div>

      {value && (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-zinc-100 p-2 text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-900"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}