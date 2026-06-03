import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Cake,
  GraduationCap,
  LogOut,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

import ProjectsSection from "../../components/projects/ProjectsSection";
import { Button } from "../../components/ui/button";
import { useAuth } from "../auth/context/AuthContext";
import {
  profileService,
  type UserProfile,
} from "../admin/services/profileService";

export default function HomePage() {
  const { isAuthenticated, user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    profileService.getPublic().then(setProfile);
  }, []);

  const stats = useMemo(() => {
    if (!profile) return [];

    return [
      {
        value: `${profile.education?.length ?? 0}`,
        label: "formations",
      },
      {
        value: `${profile.skills?.length ?? 0}+`,
        label: "compétences",
      },
      {
        value: `${profile.languages?.length ?? 0}`,
        label: "langues",
      },
      {
        value: profile.graduationYear
          ? `${profile.graduationYear}`
          : "—",
        label: "diplôme attendu",
      },
    ];
  }, [profile]);

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F6F2]">
        <p className="font-bold text-zinc-500">Chargement...</p>
      </main>
    );
  }

  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-zinc-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 font-black text-white">
            {profile.firstName?.[0]}
            {profile.lastName?.[0]}
          </div>

          <div>
            <h2 className="text-lg font-black">{fullName}</h2>
            
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/about">
            <Button variant="ghost" className="rounded-full font-bold">
              À propos
            </Button>
          </Link>

          <Link to="/contact">
            <Button variant="ghost" className="rounded-full font-bold">
              Contact
            </Button>
          </Link>

          {isAuthenticated && user?.role === "Admin" ? (
            <>
              <Link to="/admin/projects">
                <Button className="rounded-full bg-zinc-950 font-bold hover:bg-zinc-800">
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="outline"
                className="rounded-full font-bold"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </>
          ) : (
            <Link to="/admin/login">
              <Button className="rounded-full bg-zinc-950 font-bold hover:bg-zinc-800">
                Connexion Admin
              </Button>
            </Link>
          )}
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-black text-teal-600">Portfolio</p>

          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            {profile.headline}
          </h1>

          <p className="mt-6 max-w-2xl whitespace-pre-line text-lg leading-8 text-zinc-600">
            {profile.bio}
          </p>



          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/about">
              <Button
                size="lg"
                className="rounded-full bg-zinc-950 px-8 font-bold hover:bg-zinc-800"
              >
                Découvrir mon profil
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-white px-8 font-bold"
              >
                Me contacter
              </Button>
            </Link>
          </div>
        </div>

        <aside className="rounded-[3rem] bg-zinc-950 p-8 text-white shadow-2xl">
          <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white/10 text-2xl font-black">
            {profile.firstName?.[0]}
            {profile.lastName?.[0]}
          </div>

          <h2 className="mt-8 text-4xl font-black">{fullName}</h2>

          {profile.workTitle && (
            <p className="mt-3 text-white/60">
              {profile.workTitle}
              {profile.company ? ` chez ${profile.company}` : ""}
            </p>
          )}

          <div className="mt-8 grid gap-3">
            <DarkLine icon={<MapPin />} value={`${profile.city}, ${profile.country}`} />
            <DarkLine icon={<Mail />} value={profile.email} />
            <DarkLine
              icon={<Cake />}
              value={
                getAge(profile.dateOfBirth)
                  ? `${getAge(profile.dateOfBirth)} ans`
                  : "Âge non renseigné"
              }
            />
            {profile.company && (
              <DarkLine icon={<Briefcase />} value={profile.company} />
            )}

            {profile.graduationYear && (
              <DarkLine
                icon={<GraduationCap />}
                value={`${profile.school} : ${profile.graduationYear}`}
              />
            )}
          </div>
        </aside>
      </section>

      <section className="relative overflow-hidden py-24 text-white">
        {/* Fond dégradé */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-teal-950" />

        {/* Glow décoratif */}
        <div className="absolute left-[-8rem] top-[-8rem] h-[22rem] w-[22rem] rounded-full bg-teal-400/20 blur-[120px]" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[26rem] w-[26rem] rounded-full bg-cyan-400/10 blur-[140px]" />

        {/* Vague haut */}
        <svg
          className="absolute top-0 w-full text-[#F8F6F2]"
          viewBox="0 0 1440 120"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,74.7C640,64,800,32,960,32C1120,32,1280,64,1360,80L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="font-black uppercase tracking-[0.25em] text-teal-300">
              Mon parcours
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Quelques chiffres sur mon profil
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              Une vue rapide de mon évolution, de mes compétences
              et de mon parcours.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              >
                {/* glow interne */}
                <div className="absolute right-[-2rem] top-[-2rem] h-24 w-24 rounded-full bg-teal-400/10 blur-3xl transition group-hover:scale-150" />

                {/* numéro */}
                <p className="relative text-6xl font-black tracking-tight text-white">
                  {stat.value}
                </p>

                {/* ligne décorative */}
                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-300 group-hover:w-24" />

                {/* label */}
                <p className="mt-5 text-sm font-bold uppercase tracking-widest text-white/60">
                  {stat.label}
                </p>

                
              </div>
            ))}
          </div>
        </div>

        {/* Vague bas */}
        <svg
          className="absolute bottom-0 w-full text-[#F8F6F2]"
          viewBox="0 0 1440 120"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,74.7C640,64,800,32,960,32C1120,32,1280,64,1360,80L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
        </svg>
      </section>
      <ProjectsSection />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[3rem] bg-zinc-950 p-8 text-white shadow-2xl md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-black text-teal-300">Contact</p>

              <h2 className="mt-2 text-4xl font-black tracking-tight">
                Un projet, une idée ou une opportunité ?
              </h2>


            </div>

            <Link to="/contact">
              <Button
                size="lg"
                className="rounded-full bg-white px-8 font-bold text-zinc-950 hover:bg-zinc-100"
              >
                Me contacter
                <Mail className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Pill({
  icon,
  text,
}: {
  icon?: React.ReactNode;
  text: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-bold text-zinc-700 shadow-sm [&>svg]:h-4 [&>svg]:w-4">
      {icon}
      {text}
    </div>
  );
}
function getAge(date?: string | Date | null) {
  if (!date) return null;

  const birthDate = new Date(date);
  const today = new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDiff =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 &&
      today.getDate() <
        birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
function DarkLine({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-teal-300 [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </div>

      <p className="font-semibold text-white">{value}</p>
    </div>
  );
}