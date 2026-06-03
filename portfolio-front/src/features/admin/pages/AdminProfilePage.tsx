import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  Code2,
  FileBadge,
  GraduationCap,
  Languages,
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

import { IconPicker } from "../components/profile/IconPicker";
import {
  profileService,
  type CertificationItem,
  type EducationItem,
  type LanguageItem,
  type LicenseItem,
  type ProfileCard,
  type SkillItem,
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
  education: [],
  licenses: [],
  languages: [],
  certifications: [],
  skills: [],
};

type Tab =
  | "identity"
  | "career"
  | "education"
  | "skills"
  | "extra"
  | "content";

const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: "identity", label: "Identité", icon: <UserRound /> },
  { id: "career", label: "Carrière", icon: <Briefcase /> },
  { id: "education", label: "Formations", icon: <GraduationCap /> },
  { id: "skills", label: "Compétences", icon: <Code2 /> },
  { id: "extra", label: "Langues & Permis", icon: <Languages /> },
  { id: "content", label: "Contenu page", icon: <Sparkles /> },
];

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("identity");
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

    return Math.round(
      (required.filter((v) => v?.trim()).length / required.length) * 100
    );
  }, [profile]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileService.getMe();

        setProfile({
          ...emptyProfile,
          ...data,
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          interests: data.interests ?? [],
          traits: data.traits ?? [],
          timeline: data.timeline ?? [],
          education: data.education ?? [],
          licenses: data.licenses ?? [],
          languages: data.languages ?? [],
          certifications: data.certifications ?? [],
          skills: data.skills ?? [],
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
        <Loader2 className="h-6 w-6 animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2] px-6 py-8 text-zinc-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au dashboard
            </Link>

            <h1 className="mt-3 text-4xl font-black">Modifier mon profil</h1>
            <p className="mt-2 text-zinc-500">
              Toutes les données publiques de ta page À propos.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-zinc-800 disabled:opacity-60"
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

        <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
          <div className="rounded-[2rem] bg-white p-6 shadow-lg">
            {activeTab === "identity" && (
              <Section title="Identité" description="Informations principales.">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input required label="Prénom" value={profile.firstName} onChange={(v) => updateField("firstName", v)} />
                  <Input required label="Nom" value={profile.lastName} onChange={(v) => updateField("lastName", v)} />
                  <Input required label="Headline" value={profile.headline} onChange={(v) => updateField("headline", v)} />
                  <Input required label="Email public" value={profile.email} onChange={(v) => updateField("email", v)} />
                  <Input required label="Ville" value={profile.city} onChange={(v) => updateField("city", v)} />
                  <Input required label="Pays" value={profile.country} onChange={(v) => updateField("country", v)} />
                  <Input label="Date de naissance" type="date" value={profile.dateOfBirth ?? ""} onChange={(v) => updateField("dateOfBirth", v)} />
                </div>

                <Textarea required label="Bio" value={profile.bio} onChange={(v) => updateField("bio", v)} />
              </Section>
            )}

            {activeTab === "career" && (
              <Section title="Carrière" description="Alternance, liens et situation actuelle.">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="École actuelle" value={profile.school ?? ""} onChange={(v) => updateField("school", v)} />
                  <Input label="Diplôme attendu" type="number" value={profile.graduationYear?.toString() ?? ""} onChange={(v) => updateField("graduationYear", v ? Number(v) : undefined)} />
                  <Input label="Entreprise" value={profile.company ?? ""} onChange={(v) => updateField("company", v)} />
                  <Input label="Poste" value={profile.workTitle ?? ""} onChange={(v) => updateField("workTitle", v)} />
                  <Input label="LinkedIn" value={profile.linkedinUrl ?? ""} onChange={(v) => updateField("linkedinUrl", v)} />
                  <Input label="GitHub" value={profile.githubUrl ?? ""} onChange={(v) => updateField("githubUrl", v)} />
                </div>
              </Section>
            )}

            {activeTab === "education" && (
              <EducationSection
                items={profile.education}
                setProfile={setProfile}
                setSaved={setSaved}
              />
            )}

            {activeTab === "skills" && (
              <>
                <SkillsSection
                  items={profile.skills}
                  setProfile={setProfile}
                  setSaved={setSaved}
                />

                <CertificationsSection
                  items={profile.certifications}
                  setProfile={setProfile}
                  setSaved={setSaved}
                />
              </>
            )}

            {activeTab === "extra" && (
              <>
                <LanguagesSection
                  items={profile.languages}
                  setProfile={setProfile}
                  setSaved={setSaved}
                />

                <LicensesSection
                  items={profile.licenses}
                  setProfile={setProfile}
                  setSaved={setSaved}
                />
              </>
            )}

            {activeTab === "content" && (
              <>
                <CardsSection
                  title="Motivations"
                  items={profile.interests}
                  setProfile={setProfile}
                  setSaved={setSaved}
                  field="interests"
                />

                <CardsSection
                  title="Traits"
                  items={profile.traits}
                  setProfile={setProfile}
                  setSaved={setSaved}
                  field="traits"
                />

                <TimelineSection
                  items={profile.timeline}
                  setProfile={setProfile}
                  setSaved={setSaved}
                />
              </>
            )}
          </div>

          <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-lg lg:sticky lg:top-8">
            <div className="rounded-[1.5rem] bg-zinc-950 p-5 text-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-lg font-black">
                {(profile.firstName?.[0] ?? "J")}
                {(profile.lastName?.[0] ?? "M")}
              </div>

              <h2 className="mt-4 text-xl font-black">
                {profile.firstName || "Prénom"} {profile.lastName || "Nom"}
              </h2>

              <p className="mt-1 text-sm text-white/60">
                {profile.headline || "Headline non renseignée"}
              </p>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm font-bold">
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

            <div className="mt-5 space-y-3">
              <Preview icon={<Mail />} value={profile.email || "Email non renseigné"} />
              <Preview icon={<MapPin />} value={`${profile.city || "Ville"}, ${profile.country || "Pays"}`} />
              <Preview icon={<GraduationCap />} value={`${profile.education.length} formation(s)`} />
              <Preview icon={<Languages />} value={`${profile.languages.length} langue(s)`} />
              <Preview icon={<BadgeCheck />} value={`${profile.licenses.length} permis`} />
              <Preview icon={<Code2 />} value={`${profile.skills.length} compétence(s)`} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function EducationSection({
  items,
  setProfile,
  setSaved,
}: {
  items: EducationItem[];
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setSaved: (value: boolean) => void;
}) {
  const add = () => {
    setSaved(false);
    setProfile((p) => ({
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
    }));
  };

  const update = (index: number, field: keyof EducationItem, value: string) => {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      education: p.education.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const remove = (index: number) => {
    setProfile((p) => ({
      ...p,
      education: p.education.filter((_, i) => i !== index),
    }));
  };

  return (
    <DynamicBlock title="Formations" onAdd={add}>
      {items.map((item, index) => (
        <ItemCard key={index} onRemove={() => remove(index)}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="École" value={item.school} onChange={(v) => update(index, "school", v)} />
            <Input label="Diplôme" value={item.degree} onChange={(v) => update(index, "degree", v)} />
            <Input label="Domaine" value={item.field} onChange={(v) => update(index, "field", v)} />
            <Input label="Niveau" value={item.level} onChange={(v) => update(index, "level", v)} />
            <Input label="Début" value={item.startYear} onChange={(v) => update(index, "startYear", v)} />
            <Input label="Fin" value={item.endYear ?? ""} onChange={(v) => update(index, "endYear", v)} />
          </div>

          <Select label="Statut" value={item.status} onChange={(v) => update(index, "status", v)}>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminé</option>
            <option value="stopped">Arrêté</option>
            <option value="none">Pas d’école</option>
          </Select>

          <Textarea label="Description" value={item.description ?? ""} onChange={(v) => update(index, "description", v)} />
        </ItemCard>
      ))}
    </DynamicBlock>
  );
}

function SkillsSection({
  items,
  setProfile,
  setSaved,
}: {
  items: SkillItem[];
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setSaved: (value: boolean) => void;
}) {
  const add = () => {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      skills: [...p.skills, { name: "", category: "", level: 3 }],
    }));
  };

  const update = (index: number, field: keyof SkillItem, value: string | number) => {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      skills: p.skills.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const remove = (index: number) => {
    setProfile((p) => ({
      ...p,
      skills: p.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <DynamicBlock title="Compétences" onAdd={add}>
      {items.map((item, index) => (
        <ItemCard key={index} onRemove={() => remove(index)}>
          <div className="grid gap-4 md:grid-cols-3">
            <Input label="Nom" value={item.name} onChange={(v) => update(index, "name", v)} />
            <Input label="Catégorie" value={item.category} onChange={(v) => update(index, "category", v)} />
            <Input label="Niveau /5" type="number" value={item.level.toString()} onChange={(v) => update(index, "level", Number(v))} />
          </div>
        </ItemCard>
      ))}
    </DynamicBlock>
  );
}

function LanguagesSection({
  items,
  setProfile,
  setSaved,
}: {
  items: LanguageItem[];
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setSaved: (value: boolean) => void;
}) {
  const add = () => {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      languages: [...p.languages, { name: "", level: "", score: "", description: "" }],
    }));
  };

  const update = (index: number, field: keyof LanguageItem, value: string) => {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      languages: p.languages.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const remove = (index: number) => {
    setProfile((p) => ({
      ...p,
      languages: p.languages.filter((_, i) => i !== index),
    }));
  };

  return (
    <DynamicBlock title="Langues" onAdd={add}>
      {items.map((item, index) => (
        <ItemCard key={index} onRemove={() => remove(index)}>
          <div className="grid gap-4 md:grid-cols-3">
            <Input label="Langue" value={item.name} onChange={(v) => update(index, "name", v)} />
            <Select label="Niveau" value={item.level} onChange={(v) => update(index, "level", v)}>
              <option value="">Choisir</option>
              <option value="Natif">Natif</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </Select>
            <Input label="Score" value={item.score ?? ""} onChange={(v) => update(index, "score", v)} />
          </div>

          <Textarea label="Description" value={item.description ?? ""} onChange={(v) => update(index, "description", v)} />
        </ItemCard>
      ))}
    </DynamicBlock>
  );
}

function LicensesSection({
  items,
  setProfile,
  setSaved,
}: {
  items: LicenseItem[];
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setSaved: (value: boolean) => void;
}) {
  const add = () => {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      licenses: [...p.licenses, { name: "", status: "obtained", obtainedYear: "" }],
    }));
  };

  const update = (index: number, field: keyof LicenseItem, value: string) => {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      licenses: p.licenses.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const remove = (index: number) => {
    setProfile((p) => ({
      ...p,
      licenses: p.licenses.filter((_, i) => i !== index),
    }));
  };

  return (
    <DynamicBlock title="Permis" onAdd={add}>
      {items.map((item, index) => (
        <ItemCard key={index} onRemove={() => remove(index)}>
          <div className="grid gap-4 md:grid-cols-3">
            <Input label="Nom" value={item.name} onChange={(v) => update(index, "name", v)} />
            <Select label="Statut" value={item.status} onChange={(v) => update(index, "status", v)}>
              <option value="obtained">Obtenu</option>
              <option value="in_progress">En cours</option>
              <option value="planned">Prévu</option>
            </Select>
            <Input label="Année" value={item.obtainedYear ?? ""} onChange={(v) => update(index, "obtainedYear", v)} />
          </div>
        </ItemCard>
      ))}
    </DynamicBlock>
  );
}

function CertificationsSection({
  items,
  setProfile,
  setSaved,
}: {
  items: CertificationItem[];
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setSaved: (value: boolean) => void;
}) {
  const add = () => {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      certifications: [...p.certifications, { name: "", organization: "", year: "", url: "" }],
    }));
  };

  const update = (index: number, field: keyof CertificationItem, value: string) => {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      certifications: p.certifications.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const remove = (index: number) => {
    setProfile((p) => ({
      ...p,
      certifications: p.certifications.filter((_, i) => i !== index),
    }));
  };

  return (
    <DynamicBlock title="Certifications" onAdd={add}>
      {items.map((item, index) => (
        <ItemCard key={index} onRemove={() => remove(index)}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Nom" value={item.name} onChange={(v) => update(index, "name", v)} />
            <Input label="Organisme" value={item.organization ?? ""} onChange={(v) => update(index, "organization", v)} />
            <Input label="Année" value={item.year ?? ""} onChange={(v) => update(index, "year", v)} />
            <Input label="URL" value={item.url ?? ""} onChange={(v) => update(index, "url", v)} />
          </div>
        </ItemCard>
      ))}
    </DynamicBlock>
  );
}

function CardsSection({
  title,
  items,
  field,
  setProfile,
  setSaved,
}: {
  title: string;
  items: ProfileCard[];
  field: "interests" | "traits";
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setSaved: (value: boolean) => void;
}) {
  const add = () => {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      [field]: [...p[field], { title: "", description: "", icon: "" }],
    }));
  };

  const update = (index: number, key: keyof ProfileCard, value: string) => {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      [field]: p[field].map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const remove = (index: number) => {
    setProfile((p) => ({
      ...p,
      [field]: p[field].filter((_, i) => i !== index),
    }));
  };

  return (
    <DynamicBlock title={title} onAdd={add}>
      {items.map((item, index) => (
        <ItemCard key={index} onRemove={() => remove(index)}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Titre" value={item.title} onChange={(v) => update(index, "title", v)} />
            <IconPicker value={item.icon} onChange={(v) => update(index, "icon", v)} />
          </div>

          <Textarea label="Description" value={item.description} onChange={(v) => update(index, "description", v)} />
        </ItemCard>
      ))}
    </DynamicBlock>
  );
}

function TimelineSection({
  items,
  setProfile,
  setSaved,
}: {
  items: TimelineItem[];
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setSaved: (value: boolean) => void;
}) {
  const add = () => {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      timeline: [...p.timeline, { date: "", title: "", text: "", isCurrent: false }],
    }));
  };

  const update = (index: number, field: keyof TimelineItem, value: string | boolean) => {
    setSaved(false);
    setProfile((p) => ({
      ...p,
      timeline: p.timeline.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const remove = (index: number) => {
    setProfile((p) => ({
      ...p,
      timeline: p.timeline.filter((_, i) => i !== index),
    }));
  };

  return (
    <DynamicBlock title="Parcours" onAdd={add}>
      {items.map((item, index) => (
        <ItemCard key={index} onRemove={() => remove(index)}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Période" value={item.date} onChange={(v) => update(index, "date", v)} />
            <Input label="Titre" value={item.title} onChange={(v) => update(index, "title", v)} />
          </div>

          <Textarea label="Description" value={item.text} onChange={(v) => update(index, "text", v)} />

          <label className="mt-3 flex items-center gap-2 text-sm font-bold">
            <input
              type="checkbox"
              checked={item.isCurrent}
              onChange={(e) => update(index, "isCurrent", e.target.checked)}
            />
            En cours
          </label>
        </ItemCard>
      ))}
    </DynamicBlock>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl font-black">{title}</h2>
      <p className="mt-1 text-sm text-zinc-500">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function DynamicBlock({
  title,
  onAdd,
  children,
}: {
  title: string;
  onAdd: () => void;
  children: ReactNode;
}) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-black">{title}</h2>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-sm font-bold text-white"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </button>
      </div>

      <div className="space-y-4">{children}</div>
    </section>
  );
}

function ItemCard({
  children,
  onRemove,
}: {
  children: ReactNode;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-[1.5rem] border border-zinc-100 bg-zinc-50 p-5">
      {children}

      <button
        onClick={onRemove}
        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-red-500"
      >
        <Trash2 className="h-4 w-4" />
        Supprimer
      </button>
    </div>
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
      <span className="mb-2 block text-sm font-bold text-zinc-700">
        {label} {required && <span className="text-teal-600">*</span>}
      </span>

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
    <label className="mt-4 block">
      <span className="mb-2 block text-sm font-bold text-zinc-700">
        {label} {required && <span className="text-teal-600">*</span>}
      </span>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-medium outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="mt-4 block">
      <span className="mb-2 block text-sm font-bold text-zinc-700">
        {label}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-medium outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
      >
        {children}
      </select>
    </label>
  );
}

function Preview({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 px-4 py-3 text-sm">
      <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      <span className="truncate font-semibold text-zinc-600">{value}</span>
    </div>
  );
}