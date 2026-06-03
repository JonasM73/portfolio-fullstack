import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Code2,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Calendar,
} from "lucide-react";

import {
  profileService,
  type UserProfile,
} from "../admin/services/profileService";

export default function AboutPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    profileService.getPublic().then(setProfile);
  }, []);

  const age = useMemo(() => {
    if (!profile?.dateOfBirth) return null;

    const birth = new Date(profile.dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const diff = today.getMonth() - birth.getMonth();

    if (diff < 0 || (diff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }, [profile?.dateOfBirth]);

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F6F2]">
        <p className="font-bold text-zinc-500">Chargement du profil...</p>
      </main>
    );
  }

  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F6F2] text-zinc-900">
      <div className="pointer-events-none fixed left-[-10rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-teal-200/40 blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-12rem] right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-orange-200/40 blur-3xl" />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-zinc-500 shadow-sm backdrop-blur transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au portfolio
        </Link>

        <Link
          to="/contact"
          className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-zinc-800"
        >
          Me contacter
        </Link>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/70 px-4 py-2 text-sm font-black text-teal-700 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            À propos
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            {profile.headline}
          </h1>

          <p className="mt-7 max-w-3xl whitespace-pre-line text-lg leading-8 text-zinc-600">
            {profile.bio}
          </p>

          

          <div className="mt-10 flex flex-wrap gap-4">
            {profile.linkedinUrl && (
              <a
                href={normalizeUrl(profile.linkedinUrl)}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5"
              >
                LinkedIn
              </a>
            )}

            {profile.githubUrl && (
              <a
                href={normalizeUrl(profile.githubUrl)}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-bold text-zinc-900 shadow-sm transition hover:-translate-y-0.5"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-teal-400/20 blur-2xl" />
          <div className="absolute -right-8 bottom-8 h-28 w-28 rounded-full bg-orange-400/20 blur-2xl" />

          <div className="relative rounded-[3rem] bg-zinc-950 p-8 text-white shadow-2xl">
            <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-white/10" />
            <div className="absolute bottom-10 left-10 h-16 w-16 rounded-full border border-white/10" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white/10 text-3xl font-black ring-1 ring-white/10">
              {profile.firstName?.[0]}
              {profile.lastName?.[0]}
            </div>

            <h2 className="relative mt-8 text-4xl font-black">
              {fullName}
            </h2>

            <p className="relative mt-3 text-white/60">
              {profile.workTitle} chez {profile.company}
            </p>


            <div className="relative mt-8 grid gap-3">
              <DarkLine
                icon={<MapPin className="h-4 w-4" />}
                value={`${profile.city}, ${profile.country}`}
              />

              <DarkLine
                icon={<Mail className="h-4 w-4" />}
                value={profile.email}
              />

              <DarkLine
                icon={<Calendar className="h-4 w-4" />}
                value={age ? `${age} ans` : "Âge non renseigné"}
              />
              <DarkLine
                icon={<Briefcase className="h-4 w-4" />}
                value={`${profile.school ?? "Ecole non renseignée"} - ${profile.graduationYear ?? "Non renseigné"}`}
              />
              <DarkLine
                icon={<Briefcase className="h-4 w-4" />}
                value={profile.company ?? "Entreprise non renseignée"}
              />
            </div>
          </div>
        </div>
      </section>

      <Wave />

      <section className="relative z-10 bg-zinc-950 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-4">
          <Stat label="Formations" value={`${profile.education?.length ?? 0}`} />
          <Stat label="Compétences" value={`${profile.skills?.length ?? 0}`} />
          <Stat label="Langues" value={`${profile.languages?.length ?? 0}`} />
          <Stat label="Permis" value={`${profile.licenses?.length ?? 0}`} />
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <SectionTitle
          eyebrow="Parcours"
          title="Un chemin progressif vers l’ingénierie informatique."
          subtitle="Formation, spécialisation, alternance et progression technique."
        />

        <div className="relative mt-12">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-zinc-200 md:block" />

          <div className="space-y-6">
            {profile.education?.map((item, index) => (
              <div key={index} className="relative grid gap-5 md:grid-cols-[3rem_1fr]">
                <div className="hidden md:flex">
                  <div className="z-10 flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                </div>

                <div className="rounded-[2rem] border border-zinc-100 bg-white/80 p-6 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
                  <p className="text-sm font-black text-teal-600">
                    {formatPeriod(item.startYear, item.endYear)}
                  </p>

                  <h3 className="mt-2 text-2xl font-black">{item.degree}</h3>

                  <p className="mt-1 font-bold text-zinc-500">
                    {item.school} — {item.level}
                  </p>

                  <p className="mt-4 leading-7 text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white/60 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            eyebrow="Compétences"
            title="Un profil entre développement, data et architecture."
            subtitle="Technologies, domaines et outils utilisés dans mes projets."
          />

          <div className="mt-10 flex flex-wrap gap-3">
            {profile.skills?.map((skill, index) => (
              <div
                key={index}
                className="group rounded-full border border-zinc-200 bg-[#F8F6F2] px-5 py-3 shadow-sm transition hover:-translate-y-1 hover:bg-zinc-950 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <Code2 className="h-4 w-4 text-teal-600 group-hover:text-teal-300" />
                  <span className="font-black">{skill.name.trim()}</span>
                  <span className="text-sm font-bold text-zinc-400 group-hover:text-white/50">
                    {skill.category.trim()} • {skill.level}/5
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-2">
        <div className="rounded-[3rem] bg-gradient-to-br from-teal-500 to-zinc-950 p-8 text-white shadow-2xl">
          <Languages className="h-8 w-8" />
          <h2 className="mt-5 text-3xl font-black">Langues</h2>

          <div className="mt-8 space-y-4">
            {profile.languages?.map((language, index) => (
              <div key={index} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/10">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xl font-black">{language.name}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-zinc-950">
                    {language.level}
                  </span>
                </div>

                {language.description && (
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {language.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[3rem] bg-white p-8 shadow-2xl">
          <ShieldCheck className="h-8 w-8 text-teal-600" />
          <h2 className="mt-5 text-3xl font-black">Permis</h2>

          <div className="mt-8 space-y-4">
            {profile.licenses?.map((license, index) => (
              <div key={index} className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
                <div>
                  <p className="text-lg font-black">{license.name}</p>
                  <p className="mt-1 text-sm font-bold text-zinc-500">
                    {license.obtainedYear || "Année non renseignée"}
                  </p>
                </div>

                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">
                  {formatStatus(license.status)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <SectionTitle
          eyebrow="Traits"
          title="Ce qui me définit."
          subtitle="Une manière de travailler orientée curiosité, exigence et progression."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {profile.traits
            ?.filter((trait) => trait.title || trait.description)
            .map((trait, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-teal-100" />
                <h3 className="relative text-xl font-black">{trait.title}</h3>
                <p className="relative mt-4 text-sm leading-6 text-zinc-500">
                  {trait.description}
                </p>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}

function Pill({ icon, text }: { icon?: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm font-bold text-zinc-700 shadow-sm backdrop-blur [&>svg]:h-4 [&>svg]:w-4">
      {icon}
      {text}
    </div>
  );
}

function DarkLine({
  icon,
  value,
}: {
  icon?: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 transition hover:bg-white/15">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-teal-300">
        {icon}
      </div>

      <p className="font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
      <p className="text-5xl font-black">{value}</p>
      <p className="mt-2 text-sm font-bold text-white/50">{label}</p>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <p className="font-black text-teal-600">{eyebrow}</p>
      <h2 className="mt-2 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-zinc-500">{subtitle}</p>
    </div>
  );
}

function Wave() {
  return (
    <svg
      className="-mb-1 w-full text-zinc-950"
      viewBox="0 0 1440 120"
      fill="currentColor"
      preserveAspectRatio="none"
    >
      <path d="M0,64L80,69.3C160,75,320,85,480,74.7C640,64,800,32,960,32C1120,32,1280,64,1360,80L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
    </svg>
  );
}

function normalizeUrl(url: string) {
  if (url.startsWith("http")) return url;
  return `https://${url}`;
}

function formatPeriod(start?: string, end?: string) {
  return `${formatMonth(start)} → ${end ? formatMonth(end) : "Aujourd’hui"}`;
}

function formatMonth(value?: string) {
  if (!value) return "?";

  const [year, month] = value.split("-");
  const months: Record<string, string> = {
    "01": "janv.",
    "02": "févr.",
    "03": "mars",
    "04": "avr.",
    "05": "mai",
    "06": "juin",
    "07": "juil.",
    "08": "août",
    "09": "sept.",
    "10": "oct.",
    "11": "nov.",
    "12": "déc.",
  };

  return `${months[month] ?? month} ${year}`;
}

function formatStatus(status: string) {
  const map: Record<string, string> = {
    obtained: "Obtenu",
    in_progress: "En cours",
    planned: "Prévu",
  };

  return map[status] ?? status;
}