import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  
  GraduationCap,
  
  Loader2,
  Mail,
  MapPin,
  Plus,
  Save,
  Sparkles,
  Trash2,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  profileService,
  type ProfileCard,
  type TimelineItem,
  type UserProfile,
} from "../services/profileService";

const emptyProfile: UserProfile = {
  firstName: "",
  lastName: "",
  headline: "",
  bio: "",
  dateOfBirth: "",
  city: "",
  country: "",
  email: "",
  linkedinUrl: "",
  githubUrl: "",
  school: "",
  workTitle: "",
  company: "",
  graduationYear: undefined,
  interests: [],
  traits: [],
  timeline: [],
};

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const completion = useMemo(() => {
    const required = [
      profile.firstName,
      profile.lastName,
      profile.headline,
      profile.bio,
      profile.city,
      profile.country,
      profile.email,
    ];

    const filled = required.filter((v) => v?.trim()).length;
    return Math.round((filled / required.length) * 100);
  }, [profile]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileService.getMe();

        setProfile({
          ...emptyProfile,
          ...data,
          dateOfBirth: data.dateOfBirth
            ? data.dateOfBirth.split("T")[0]
            : "",
          interests: data.interests ?? [],
          traits: data.traits ?? [],
          timeline: data.timeline ?? [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const updateField = (
    field: keyof UserProfile,
    value: string | number | undefined
  ) => {
    setSaved(false);
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const addCard = (section: "interests" | "traits") => {
    setProfile((prev) => ({
      ...prev,
      [section]: [...prev[section], { title: "", description: "", icon: "" }],
    }));
  };

  const updateCard = (
    section: "interests" | "traits",
    index: number,
    field: keyof ProfileCard,
    value: string
  ) => {
    setSaved(false);
    setProfile((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeCard = (section: "interests" | "traits", index: number) => {
    setProfile((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const addTimeline = () => {
    setProfile((prev) => ({
      ...prev,
      timeline: [
        ...prev.timeline,
        { date: "", title: "", text: "", isCurrent: false },
      ],
    }));
  };

  const updateTimeline = (
    index: number,
    field: keyof TimelineItem,
    value: string | boolean
  ) => {
    setSaved(false);
    setProfile((prev) => ({
      ...prev,
      timeline: prev.timeline.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeTimeline = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);

    try {
      await profileService.updateMe({
        ...profile,
        graduationYear: profile.graduationYear
          ? Number(profile.graduationYear)
          : undefined,
      });

      setSaved(true);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F6F2]">
        <div className="flex items-center gap-3 rounded-3xl bg-white px-6 py-4 shadow-lg">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-semibold">Chargement du profil...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2] px-6 py-8 text-zinc-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              to="/admin/projects"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au dashboard
            </Link>

            <p className="font-bold text-teal-600">Portfolio public</p>

            <h1 className="mt-1 text-4xl font-black tracking-tight md:text-5xl">
              Modifier mon profil
            </h1>

            <p className="mt-3 max-w-2xl text-zinc-500">
              Renseigne les informations qui alimenteront automatiquement ta
              page À propos.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 py-4 font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-zinc-800 disabled:opacity-60"
          >
            {isSaving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : saved ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            {isSaving ? "Sauvegarde..." : saved ? "Sauvegardé" : "Sauvegarder"}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <Section
              icon={<UserRound className="h-5 w-5" />}
              title="Identité"
              description="Les informations principales visibles sur ton portfolio."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Input required label="Prénom" value={profile.firstName} onChange={(v) => updateField("firstName", v)} />
                <Input required label="Nom" value={profile.lastName} onChange={(v) => updateField("lastName", v)} />
                <Input required label="Titre / headline" value={profile.headline} onChange={(v) => updateField("headline", v)} />
                <Input required label="Email public" value={profile.email} onChange={(v) => updateField("email", v)} />
                <Input required label="Ville" value={profile.city} onChange={(v) => updateField("city", v)} />
                <Input required label="Pays" value={profile.country} onChange={(v) => updateField("country", v)} />
                <Input label="Date de naissance" type="date" value={profile.dateOfBirth ?? ""} onChange={(v) => updateField("dateOfBirth", v)} />
              </div>

              <Textarea required label="Bio" value={profile.bio} onChange={(v) => updateField("bio", v)} />
            </Section>

            <Section
              icon={<Briefcase className="h-5 w-5" />}
              title="Études & alternance"
              description="École, entreprise, poste et diplôme attendu."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Input label="École" value={profile.school ?? ""} onChange={(v) => updateField("school", v)} />
                <Input label="Année de diplôme" type="number" value={profile.graduationYear?.toString() ?? ""} onChange={(v) => updateField("graduationYear", v ? Number(v) : undefined)} />
                <Input label="Entreprise" value={profile.company ?? ""} onChange={(v) => updateField("company", v)} />
                <Input label="Poste" value={profile.workTitle ?? ""} onChange={(v) => updateField("workTitle", v)} />
              </div>
            </Section>

            <Section
              icon={<Sparkles className="h-5 w-5" />}
              title="Liens"
              description="Tes liens publics professionnels."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Input label="LinkedIn" value={profile.linkedinUrl ?? ""} onChange={(v) => updateField("linkedinUrl", v)} />
                <Input label="GitHub" value={profile.githubUrl ?? ""} onChange={(v) => updateField("githubUrl", v)} />
              </div>
            </Section>

            <CardsSection
              title="Motivations"
              description="Cartes visibles dans la section motivations."
              items={profile.interests}
              onAdd={() => addCard("interests")}
              onRemove={(i) => removeCard("interests", i)}
              onChange={(i, f, v) => updateCard("interests", i, f, v)}
            />

            <CardsSection
              title="Traits"
              description="Qualités ou valeurs qui te définissent."
              items={profile.traits}
              onAdd={() => addCard("traits")}
              onRemove={(i) => removeCard("traits", i)}
              onChange={(i, f, v) => updateCard("traits", i, f, v)}
            />

            <Section
              icon={<Calendar className="h-5 w-5" />}
              title="Parcours"
              description="Timeline académique et professionnelle."
              action={
                <button
                  onClick={addTimeline}
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-sm font-bold text-white"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter
                </button>
              }
            >
              <div className="space-y-4">
                {profile.timeline.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-[1.5rem] border border-zinc-100 bg-zinc-50 p-5"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input label="Période" value={item.date} onChange={(v) => updateTimeline(index, "date", v)} />
                      <Input label="Titre" value={item.title} onChange={(v) => updateTimeline(index, "title", v)} />
                    </div>

                    <Textarea label="Description" value={item.text} onChange={(v) => updateTimeline(index, "text", v)} />

                    <div className="mt-4 flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm font-bold text-zinc-600">
                        <input
                          type="checkbox"
                          checked={item.isCurrent}
                          onChange={(e) =>
                            updateTimeline(index, "isCurrent", e.target.checked)
                          }
                        />
                        En cours
                      </label>

                      <button
                        onClick={() => removeTimeline(index)}
                        className="inline-flex items-center gap-2 text-sm font-bold text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <aside className="h-fit rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-xl lg:sticky lg:top-8">
            <div className="rounded-[1.5rem] bg-zinc-950 p-6 text-white">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-xl font-black">
                {(profile.firstName?.[0] ?? "J")}
                {(profile.lastName?.[0] ?? "M")}
              </div>

              <h2 className="mt-5 text-2xl font-black">
                {profile.firstName || "Prénom"} {profile.lastName || "Nom"}
              </h2>

              <p className="mt-2 text-sm text-white/70">
                {profile.headline || "Titre professionnel"}
              </p>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm font-bold">
                <span>Complétion obligatoire</span>
                <span>{completion}%</span>
              </div>

              <div className="h-3 rounded-full bg-zinc-100">
                <div
                  className="h-3 rounded-full bg-teal-500 transition-all"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-zinc-600">
              <PreviewLine icon={<Mail />} value={profile.email || "Email non renseigné"} />
              <PreviewLine icon={<MapPin />} value={`${profile.city || "Ville"}, ${profile.country || "Pays"}`} />
              <PreviewLine icon={<GraduationCap />} value={profile.school || "École non renseignée"} />
              <PreviewLine icon={<Briefcase />} value={profile.company || "Entreprise non renseignée"} />
              <PreviewLine icon={<LinkedInIcon />} value={profile.linkedinUrl || "LinkedIn non renseigné"} />
              <PreviewLine icon={<GitHubIcon />} value={profile.githubUrl || "GitHub non renseigné"} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Section({
  icon,
  title,
  description,
  children,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-lg md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100">
            {icon}
          </div>

          <div>
            <h2 className="text-2xl font-black">{title}</h2>
            <p className="mt-1 text-sm text-zinc-500">{description}</p>
          </div>
        </div>

        {action}
      </div>

      {children}
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm font-bold text-zinc-700">{label}</span>
        {required && (
          <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-bold text-teal-700">
            obligatoire
          </span>
        )}
      </div>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-medium outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="mt-5 block">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm font-bold text-zinc-700">{label}</span>
        {required && (
          <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-bold text-teal-700">
            obligatoire
          </span>
        )}
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-medium outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
      />
    </label>
  );
}

function CardsSection({
  title,
  description,
  items,
  onAdd,
  onRemove,
  onChange,
}: {
  title: string;
  description: string;
  items: ProfileCard[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof ProfileCard, value: string) => void;
}) {
  return (
    <Section
      icon={<Sparkles className="h-5 w-5" />}
      title={title}
      description={description}
      action={
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-sm font-bold text-white"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </button>
      }
    >
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-[1.5rem] border border-zinc-100 bg-zinc-50 p-5"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Titre" value={item.title} onChange={(v) => onChange(index, "title", v)} />
              <Input label="Icône" value={item.icon ?? ""} onChange={(v) => onChange(index, "icon", v)} />
            </div>

            <Textarea label="Description" value={item.description} onChange={(v) => onChange(index, "description", v)} />

            <button
              onClick={() => onRemove(index)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-red-500"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}
function LinkedInIcon() {
  return (
    <svg className="h-4 w-4 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="h-4 w-4 text-zinc-800" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
function PreviewLine({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 px-4 py-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-zinc-700 [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>
      <span className="truncate font-semibold">{value}</span>
    </div>
  );
}