import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Building2,
  CalendarDays,
  GraduationCap,
  Laptop,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export type ProjectType = "personnel" | "ecole" | "entreprise" | "autre";

export type ProjectFile = {
  id?: string;
  fileName?: string;
  url?: string;
  contentType?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  goal?: string | null;
  context?: string | null;
  technologies?: string[];
  roles?: string[];
  images?: ProjectFile[];
  documents?: ProjectFile[];
  startDate?: string | null;
  endDate?: string | null;
  teamSize?: number | null;
  projectType: ProjectType;
  schools?: string[];
  companies?: string[];
  city?: string | null;
  country?: string | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
 
const projectTypeConfig = {
  personnel: { icon: Laptop, label: "Projet personnel" },
  ecole: { icon: GraduationCap, label: "Projet école" },
  entreprise: { icon: Briefcase, label: "Projet entreprise" },
  autre: { icon: Sparkles, label: "Autre projet" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 38 },
  visible: { opacity: 1, y: 0 },
};

function formatDate(date?: string | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function formatPeriod(startDate?: string | null, endDate?: string | null) {
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  if (start && end) return `${start} → ${end}`;
  if (start) return `Depuis ${start}`;
  if (end) return `Jusqu’à ${end}`;

  return null;
}
function formatCreatedAt(date?: string) {
  if (!date) return null;

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function ProjectDetails({ project }: { project: Project }) {
  const config = projectTypeConfig[project.projectType] ?? projectTypeConfig.autre;
  const Icon = config.icon;

  const period = formatPeriod(project.startDate, project.endDate);
  const location = [project.city, project.country].filter(Boolean).join(", ");
  const company = project.companies?.join(", ");
  const school = project.schools?.join(", ");
  const createdAt = formatCreatedAt(project.createdAt);
  const updatedAt = formatCreatedAt(project.updatedAt);

  const hasTeamSize =
    project.teamSize !== null &&
    project.teamSize !== undefined &&
    project.teamSize > 0;

  const navigationItems = [
    { id: "informations", label: "Informations" },
    project.goal ? { id: "objectif", label: "Objectif" } : null,
    project.context ? { id: "contexte", label: "Contexte" } : null,
    project.roles?.length ? { id: "roles", label: "Rôles" } : null,
    project.technologies?.length ? { id: "stack", label: "Stack" } : null,
    project.images?.length ? { id: "images", label: "Images" } : null,
    project.documents?.length ? { id: "documents", label: "Documents" } : null,
  ].filter(Boolean) as { id: string; label: string }[];
  const [activeSection, setActiveSection] = useState("top");
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      }
    );

    navigationItems.forEach((item) => {
      const element = document.getElementById(item.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [navigationItems]);
  return (
    <main className="relative min-h-screen overflow-hidden scroll-smooth bg-[#F8F6F2] text-zinc-900">
      <BackgroundShapes />
      <SideNavigation items={navigationItems} activeSection={activeSection} />

      <section className="relative mx-auto max-w-7xl px-8 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au portfolio
        </Link>
      </section>

      <section
        className="relative mx-auto flex min-h-[76vh] max-w-7xl flex-col justify-center px-8 pb-16"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="max-w-6xl"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-xl">
              <Icon className="h-6 w-6" />
            </span>

            <Badge className="rounded-full bg-teal-100 px-4 py-2 text-teal-700 hover:bg-teal-100">
              {config.label}
            </Badge>
            {createdAt && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-600 shadow-sm backdrop-blur">
                Ajouté le {createdAt}
              </span>
            )}
            {updatedAt && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-600 shadow-sm backdrop-blur">
                Modifié le {updatedAt}
              </span>
            )}
            {location && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-600 shadow-sm backdrop-blur">
                <MapPin className="h-4 w-4" />
                {location}
              </span>
            )}

            {period && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-600 shadow-sm backdrop-blur">
                <CalendarDays className="h-4 w-4" />
                {period}
              </span>
            )}
          </div>

          <h1 className="mt-9 max-w-6xl text-5xl font-black leading-[1.02] tracking-[-0.06em] text-zinc-950 md:text-8xl">
            {project.title}
          </h1>

          <p className="mt-7 max-w-4xl text-xl leading-9 text-zinc-600 md:text-2xl md:leading-10">
            {project.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                <Button className="rounded-full bg-zinc-900 px-7 py-6 text-base hover:bg-zinc-800">
                  Voir la démo
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            )}

            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Button
                  variant="outline"
                  className="rounded-full bg-white/60 px-7 py-6 text-base backdrop-blur"
                >
                  Voir GitHub
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            )}

            <Link
              to={`/contact?projectId=${project.id}&projectTitle=${encodeURIComponent(project.title)}`}
            >
              <Button
                variant="outline"
                className="rounded-full border-zinc-300 bg-white/60 px-7 py-6 text-base backdrop-blur hover:bg-white"
              >
                Me contacter pour ce projet
                <Mail className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <InformationSection
        company={company}
        school={school}
        hasTeamSize={hasTeamSize}
        teamSize={project.teamSize}
        location={location}
        period={period}
      />

      {project.goal && (
        <ScrollSection
          id="objectif"
          eyebrow="Objectif"
          title="Ce que ce projet cherche à résoudre."
          align="left"
        >
          {project.goal}
        </ScrollSection>
      )}

      {project.context && (
      <section
        id="contexte"
        className="mx-auto max-w-6xl px-8 py-28"
      >
        <div className="overflow-hidden rounded-[2.5rem] border border-zinc-200/70 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
          <div className="border-b border-zinc-100 px-8 py-8 md:px-12">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-600">
              Contexte
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
              Le cadre dans lequel le projet a été réalisé.
            </h2>
          </div>

          <div className="px-8 py-10 md:px-12 md:py-12">
            <div className="max-w-4xl space-y-6 text-lg leading-9 text-zinc-600">
              {project.context
                .split("\n")
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </div>
        </div>
      </section>
    )}

      {project.roles && project.roles.length > 0 && (
        <RolesSection roles={project.roles} />
      )}

      {project.technologies && project.technologies.length > 0 && (
        <TechnologiesSection technologies={project.technologies} />
      )}

      {project.images && project.images.length > 0 && (
        <ImagesSection images={project.images} />
      )}

      {project.documents && project.documents.length > 0 && (
        <DocumentsSection documents={project.documents} />
      )}
    </main>
  );
}

function InformationSection({
  company,
  school,
  hasTeamSize,
  teamSize,
  location,
  period,
}: {
  company?: string;
  school?: string;
  hasTeamSize: boolean;
  teamSize?: number | null;
  location?: string;
  period?: string | null;
}) {
  const infos = [
    company ? { icon: <Building2 />, label: "Entreprise", value: company } : null,
    school ? { icon: <GraduationCap />, label: "École", value: school } : null,
    hasTeamSize
      ? {
          icon: <Users />,
          label: "Équipe",
          value: `${teamSize} personne${teamSize && teamSize > 1 ? "s" : ""}`,
        }
      : null,
    location ? { icon: <MapPin />, label: "Localisation", value: location } : null,
    period ? { icon: <CalendarDays />, label: "Période", value: period } : null,
  ].filter(Boolean) as {
    icon: React.ReactNode;
    label: string;
    value: string;
  }[];

  if (infos.length === 0) return null;

  return (
    <section
      id="informations"
      className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-8 py-20 lg:grid-cols-[1fr_1.1fr]"
    >
      <WaveBand top="10%" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={fadeUp}
        transition={{ duration: 0.65 }}
        className="relative z-10"
      >
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-teal-600">
          Informations
        </p>

        <h2 className="mt-5 text-5xl font-black tracking-[-0.05em] text-zinc-950 md:text-7xl">
          Les repères essentiels du projet.
        </h2>
      </motion.div>

      <div className="relative z-10 space-y-6">
        {infos.map((info, index) => (
          <FloatingInfo
            key={info.label}
            icon={info.icon}
            label={info.label}
            value={info.value}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function ScrollSection({
  id,
  eyebrow,
  title,
  children,
  align,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  align: "left" | "right";
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-8 py-20 lg:grid-cols-2 ${
        align === "right" ? "lg:[&>div:first-child]:order-2" : ""
      }`}
    >
      <WaveBand top="18%" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={fadeUp}
        transition={{ duration: 0.65 }}
        className="relative z-10"
      >
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-teal-600">
          {eyebrow}
        </p>

        <h2 className="mt-5 text-5xl font-black tracking-[-0.05em] text-zinc-950 md:text-7xl">
          {title}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 38 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ delay: 0.12, duration: 0.65 }}
        className="relative z-10 text-2xl font-medium leading-[1.65] text-zinc-600 md:text-3xl"
      >
        {children}
      </motion.div>
    </section>
  );
}

function RolesSection({ roles }: { roles: string[] }) {
  return (
    <section id="roles" className="relative mx-auto max-w-7xl px-8 py-20">
      <WaveBand top="20%" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={fadeUp}
        transition={{ duration: 0.65 }}
        className="relative z-10 max-w-4xl"
      >
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-teal-600">
          Rôles
        </p>

        <h2 className="mt-5 text-5xl font-black tracking-[-0.05em] text-zinc-950 md:text-7xl">
          Les casquettes que j’ai portées sur ce projet.
        </h2>
      </motion.div>

      <div className="relative z-10 mt-14 grid gap-6 md:grid-cols-2">
        {roles.map((role, index) => (
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-7 shadow-xl shadow-zinc-200/40 backdrop-blur transition hover:-translate-y-1 hover:bg-white"
          >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-200/50 blur-2xl transition group-hover:bg-violet-200/60" />

            <p className="relative text-sm font-bold uppercase tracking-[0.25em] text-zinc-400">
              Casquette {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="relative mt-4 text-2xl font-bold leading-snug tracking-tight text-zinc-900">
              {role}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TechnologiesSection({ technologies }: { technologies: string[] }) {
  return (
    <section
      id="stack"
      className="relative mx-auto flex max-w-7xl flex-col justify-center px-8 py-20"
    >
      <WaveBand top="25%" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={fadeUp}
        transition={{ duration: 0.65 }}
        className="relative z-10 max-w-4xl self-end text-left lg:text-right"
      >
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-teal-600">
          Stack
        </p>

        <h2 className="mt-5 text-5xl font-black tracking-[-0.05em] text-zinc-950 md:text-7xl">
          Les technologies utilisées.
        </h2>
      </motion.div>

      <div className="relative z-10 mt-14 flex flex-wrap gap-4">
        {technologies.map((technology, index) => (
          <motion.span
            key={technology}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04, duration: 0.42 }}
            className="rounded-full bg-zinc-950 px-6 py-4 text-sm font-bold text-white shadow-xl md:text-base"
          >
            {technology}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function ImagesSection({ images }: { images: ProjectFile[] }) {
  return (
    <section id="images" className="relative mx-auto max-w-7xl px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={fadeUp}
        transition={{ duration: 0.65 }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-teal-600">
          Aperçus
        </p>

        <h2 className="mt-5 text-5xl font-black tracking-[-0.05em] text-zinc-950 md:text-7xl">
          Quelques visuels du projet.
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {images.map((image, index) => (
          <motion.img
            key={image.id ?? image.url ?? index}
            src={image.url}
            alt={image.fileName ?? `Image ${index + 1}`}
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08, duration: 0.55 }}
            className="h-[420px] w-full rounded-[2.5rem] object-cover shadow-2xl"
          />
        ))}
      </div>
    </section>
  );
}

function DocumentsSection({ documents }: { documents: ProjectFile[] }) {
  return (
    <section id="documents" className="relative mx-auto max-w-7xl px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={fadeUp}
        transition={{ duration: 0.65 }}
        className="max-w-4xl"
      >
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-teal-600">
          Documents
        </p>

        <h2 className="mt-5 text-5xl font-black tracking-[-0.05em] text-zinc-950 md:text-7xl">
          Les documents liés au projet.
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {documents.map((document, index) => (
          <motion.a
            key={document.id ?? document.url ?? index}
            href={document.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="flex items-center justify-between rounded-[2rem] border border-white/70 bg-white/70 p-6 font-bold text-zinc-900 shadow-xl shadow-zinc-200/40 backdrop-blur transition hover:-translate-y-1 hover:bg-white"
          >
            {document.fileName ?? `Document ${index + 1}`}
            <ArrowUpRight className="h-5 w-5" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function FloatingInfo({
  icon,
  label,
  value,
  index,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
      className="flex items-center gap-5 border-b border-zinc-300/60 pb-6"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-xl">
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
          {label}
        </p>

        <p className="mt-2 text-2xl font-bold leading-tight text-zinc-900">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

function SideNavigation({
  items,
  activeSection,
}: {
  items: { id: string; label: string }[];
  activeSection: string;
}) {
  return (
    <nav className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="rounded-[2rem] border border-white/70 bg-white/75 p-4 shadow-2xl shadow-zinc-200/50 backdrop-blur-2xl">
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group flex items-center gap-4 rounded-2xl px-5 py-3 text-base font-bold transition duration-300 ${
                  isActive
                    ? "bg-zinc-950 text-white shadow-lg"
                    : "text-zinc-400 hover:bg-zinc-950 hover:text-white"
                }`}
              >
                <span
                  className={`h-3 w-3 shrink-0 rounded-full transition duration-300 ${
                    isActive
                      ? "bg-teal-300"
                      : "bg-zinc-300 group-hover:bg-white"
                  }`}
                />

                <span className="whitespace-nowrap">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function WaveBand({ top }: { top: string }) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 z-0 h-72 w-screen -translate-x-1/2 overflow-hidden opacity-80"
      style={{ top }}
    >
      <div className="absolute left-1/2 top-1/2 h-40 w-[120vw] -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] bg-gradient-to-r from-teal-100/0 via-teal-100/80 to-violet-100/0 blur-xl" />

      <svg
        className="absolute inset-0 h-full w-full text-white/70"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,192L80,181.3C160,171,320,149,480,160C640,171,800,213,960,202.7C1120,192,1280,128,1360,96L1440,64L1440,320L0,320Z"
        />
      </svg>

      <svg
        className="absolute inset-0 h-full w-full translate-y-8 text-teal-100/60"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,96L80,117.3C160,139,320,181,480,186.7C640,192,800,160,960,149.3C1120,139,1280,149,1360,154.7L1440,160L1440,320L0,320Z"
        />
      </svg>
    </div>
  );
}

function BackgroundShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-56 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-[50%] bg-teal-200/50 blur-3xl" />
      <div className="absolute right-[-240px] top-[520px] h-[600px] w-[600px] rounded-full bg-violet-300/30 blur-3xl" />
      <div className="absolute bottom-[20%] left-[-240px] h-[600px] w-[600px] rounded-full bg-emerald-200/40 blur-3xl" />

      <svg
        className="absolute left-0 top-[660px] h-[420px] w-full text-white/60"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,224L80,197.3C160,171,320,117,480,122.7C640,128,800,192,960,202.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L0,320Z"
        />
      </svg>

      <svg
        className="absolute left-0 top-[1300px] h-[420px] w-full text-violet-100/50"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,160L80,170.7C160,181,320,203,480,181.3C640,160,800,96,960,96C1120,96,1280,160,1360,192L1440,224L1440,320L0,320Z"
        />
      </svg>
    </div>
  );
}