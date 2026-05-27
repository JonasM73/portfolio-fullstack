import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Compass,
  Code2,
  Plane,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen text-zinc-900" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop&blur=10')",
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center'
    }}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/20 to-slate-100/30 pointer-events-none" />
      <div className="relative z-10">
      <nav className="mx-auto flex items-center justify-between px-24 py-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au portfolio
        </Link>

        <Link to="/contact">
          <Button className="rounded-full bg-zinc-900 hover:bg-zinc-800">
            Me contacter
          </Button>
        </Link>
      </nav>

      <section className="mx-auto grid grid-cols-1 gap-10 px-32 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8 rounded-3xl border border-white/30 bg-white/95 p-8 backdrop-blur-md shadow-lg">
          <Badge className="rounded-full bg-teal-100 px-4 py-2 text-teal-700 hover:bg-teal-100">
            À propos
          </Badge>

          <h1 className="max-w-4xl text-6xl font-bold leading-tight tracking-tight">
            Un profil entre ingénierie, curiosité et ouverture internationale.
          </h1>

          <p className="max-w-3xl text-lg leading-8 text-zinc-600">
            Je suis Jonas Mionnet, étudiant ingénieur informatique en alternance.
            J’aime construire des projets utiles, propres et modernes, avec une
            approche à la fois technique, humaine et orientée produit.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200/70 bg-white/95 p-6 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">Informations</p>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-medium text-zinc-500">Nom complet</p>
                  <p className="text-sm font-semibold text-zinc-900">Jonas Mionnet</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500">Âge</p>
                  <p className="text-sm font-semibold text-zinc-900">21 ans (27/09/2004)</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500">Localisation</p>
                  <p className="text-sm font-semibold text-zinc-900">Lyon, France 🇫🇷</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500">Email</p>
                  <p className="text-sm font-semibold text-teal-600">mionnet.jonas@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200/70 bg-white/95 p-6 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">Études & Alternance</p>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-medium text-zinc-500">École</p>
                  <p className="text-sm font-semibold text-zinc-900">CESI Ingénieur</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500">Poste en alternance</p>
                  <p className="text-sm font-semibold text-zinc-900">Data Analyst / BI</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500">Entreprise</p>
                  <p className="text-sm font-semibold text-zinc-900">Capgemini France</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500">Diplôme attendu</p>
                  <p className="text-sm font-semibold text-zinc-900">2027</p>
                </div>
              </div>
            </div>
          </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
                href="https://www.linkedin.com/in/jonas-mionnet-5339012a0"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/95 px-5 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0077B5]/10">
                <svg className="h-5 w-5 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                </div>

                <div>
                <p className="text-xs uppercase tracking-wide text-zinc-400">
                    LinkedIn
                </p>
                <p className="font-semibold text-zinc-800 transition group-hover:text-zinc-950">
                    Voir mon profil
                </p>
                </div>
            </a>

            <a
                href="https://github.com/JonasM73"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/95 px-5 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/10">
                <svg className="h-5 w-5 text-zinc-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                </div>

                <div>
                <p className="text-xs uppercase tracking-wide text-zinc-400">
                    GitHub
                </p>
                <p className="font-semibold text-zinc-800 transition group-hover:text-zinc-950">
                    Explorer mes projets
                </p>
                </div>
            </a>
            </div>
        </div>

        <Card className="overflow-hidden rounded-[2rem] border-0 bg-gradient-to-br from-white/80 to-white/50 shadow-2xl backdrop-blur-xl">
          <div className="p-8">
            <div className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-700">Motivations</p>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              Ce qui me pousse à avancer.
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="group flex items-start gap-4 rounded-2xl border border-orange-100/50 bg-orange-50/50 p-5 transition hover:bg-orange-50">
                <div className="text-2xl">✈️</div>
                <div>
                  <h3 className="font-bold text-zinc-900">Voyager & Découvrir</h3>
                  <p className="text-sm leading-6 text-zinc-600 mt-1">
                    Explorer grandes villes, immergé dans nouvelles cultures et langues. Toronto m'a marqué — j'adore cette approche où chaque voyage est une école.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 rounded-2xl border border-teal-100/50 bg-teal-50/50 p-5 transition hover:bg-teal-50">
                <div className="text-2xl">💪</div>
                <div>
                  <h3 className="font-bold text-zinc-900">Sport & Dépassement</h3>
                  <p className="text-sm leading-6 text-zinc-600 mt-1">
                    Fitness, cyclisme, repousser mes limites. Le sport c'est aussi une philosophie — discipline, rigueur, progression constante.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 rounded-2xl border border-violet-100/50 bg-violet-50/50 p-5 transition hover:bg-violet-50">
                <div className="text-2xl">🚀</div>
                <div>
                  <h3 className="font-bold text-zinc-900">Projets Ambitieux</h3>
                  <p className="text-sm leading-6 text-zinc-600 mt-1">
                    Construire des solutions qui changent les choses. Pas de petits projets — je veux des challenges qui me font grandir.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 rounded-2xl border border-amber-100/50 bg-amber-50/50 p-5 transition hover:bg-amber-50">
                <div className="text-2xl">☀️</div>
                <div>
                  <h3 className="font-bold text-zinc-900">Soleil & Bien-être</h3>
                  <p className="text-sm leading-6 text-zinc-600 mt-1">
                    J'aime la vie au soleil, l'énergie positive. Voyager vers des destinations ensoleillées, c'est ma recharge.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 rounded-2xl border border-indigo-100/50 bg-indigo-50/50 p-5 transition hover:bg-indigo-50">
                <div className="text-2xl">📚</div>
                <div>
                  <h3 className="font-bold text-zinc-900">Apprendre & Lire</h3>
                  <p className="text-sm leading-6 text-zinc-600 mt-1">
                    La curiosité sans limite. Business, tech, développement personnel — j'absorbe tout pour mieux comprendre le monde.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 rounded-2xl border border-rose-100/50 bg-rose-50/50 p-5 transition hover:bg-rose-50">
                <div className="text-2xl">💼</div>
                <div>
                  <h3 className="font-bold text-zinc-900">Entrepreneurship</h3>
                  <p className="text-sm leading-6 text-zinc-600 mt-1">
                    Créer de la valeur, sortir de la zone de confort. Monter des projets avec impact, c'est mon moteur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto px-32 py-14">
        <div className="mb-10 rounded-[2rem] bg-white px-8 py-8 shadow-lg">
          <div className="mb-4 inline-block rounded-full bg-teal-100 px-4 py-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Parcours</p>
          </div>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Mon académique.
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-600">
            Un parcours progressif de sciences à l'ingénierie, avec une spécialisation croissante en développement, data et systèmes d'information.
          </p>
        </div>

        <Card className="rounded-[2rem] border-0 bg-white p-8 shadow-lg">

          <div className="space-y-10 border-l-2 border-zinc-200 pl-6">
            <TimelineItem
                date="Lycée"
                title="Baccalauréat — Lycée de l’Albanais, Rumilly"
                text="Parcours scientifique avec spécialités Mathématiques, Physique-Chimie et SVT, puis spécialisation finale en Mathématiques et SVT."
            />

            <TimelineItem
                date="Années 1-2"
                title="Classe préparatoire intégrée — École d’ingénieurs"
                text="Deux années de prépa intégrée avec un socle scientifique et technique solide. En deuxième année, spécialisation en informatique afin d’approfondir les bases du développement, des systèmes et de l’algorithmique."
            >
                <div className="mt-5 rounded-3xl bg-gradient-to-br from-teal-50 to-violet-50 p-5 border border-teal-100/50">
                <p className="text-sm font-semibold text-teal-600">
                    ⭐ Expérience réalisée durant la prépa
                </p>

                <h4 className="mt-2 font-bold text-zinc-900">
                    Stage cybersécurité — Hôpital de La Tour, Meyrin (Suisse)
                </h4>

                <p className="mt-2 text-sm leading-7 text-zinc-600">
                    Stage de 3 mois en tant qu’Assistant CISO Cybersécurité,
                    avec une immersion dans les sujets de gouvernance sécurité,
                    gestion des risques, sensibilisation et sécurité des systèmes
                    d’information dans un environnement hospitalier.
                </p>
                </div>
            </TimelineItem>

            <TimelineItem
                date="Années 3-5"
                title="Cycle ingénieur informatique — Alternance Capgemini France"
                text="Cycle ingénieur de trois ans réalisé en alternance chez Capgemini France en tant que Data Analyst / BI, avec des missions autour de la Business Intelligence, de SAP BO, de la visualisation de données et de projets clients."
            >
                <div className="mt-6">
                <div className="mb-3 flex items-center justify-between text-sm font-semibold text-zinc-500">
                    <span className="text-teal-600">📍 En cours</span>
                    <span>Bac +4</span>
                    <span className="text-violet-600">Diplôme en 2027 🎓</span>
                </div>

                <div className="h-3 rounded-full bg-zinc-200 overflow-hidden">
                    <div className="h-3 w-[67%] rounded-full bg-gradient-to-r from-teal-400 to-violet-500" />
                </div>

                <p className="mt-3 text-sm text-zinc-500">
                    Actuellement en quatrième année d’études supérieures.
                </p>
                </div>
            </TimelineItem>
            </div>
        </Card>
      </section>

      <section className="mx-auto px-24 py-14">
        <div className="mb-10 rounded-[2rem] bg-white px-8 py-8 shadow-lg">
          <div className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-700">Traits</p>
          </div>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Ce qui me définit.
          </h2>
    

        

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Card className="group rounded-[2rem] border border-zinc-200/50 bg-white p-8 shadow-lg transition hover:shadow-2xl hover:-translate-y-1">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100/80 group-hover:bg-teal-200 transition">
              <Compass className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold">Curiosité</h3>
            <p className="mt-3 leading-7 text-zinc-600">
              J’aime comprendre comment les choses fonctionnent, apprendre vite
              et transformer une idée en projet concret.
            </p>
          </Card>

          <Card className="group rounded-[2rem] border border-zinc-200/50 bg-white p-8 shadow-lg transition hover:shadow-2xl hover:-translate-y-1">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100/80 group-hover:bg-violet-200 transition">
              <Code2 className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold">Ingénierie</h3>
            <p className="mt-3 leading-7 text-zinc-600">
              Je m’intéresse aux applications bien pensées, aux architectures
              solides et aux interfaces agréables à utiliser.
            </p>
          </Card>

          <Card className="group rounded-[2rem] border border-zinc-200/50 bg-white p-8 shadow-lg transition hover:shadow-2xl hover:-translate-y-1">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100/80 group-hover:bg-orange-200 transition">
              <Plane className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold">Ouverture</h3>
            <p className="mt-3 leading-7 text-zinc-600">
              Les expériences internationales, les échanges et les nouveaux
              contextes sont des moteurs importants dans mon parcours.
            </p>
          </Card>
        </div>
        </div>
      </section>
      </div>
    </main>
  );
}

function TimelineItem({
  date,
  title,
  text,
  children,
}: {
  date: string;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-full border-4 border-white bg-gradient-to-br from-teal-400 to-violet-500 shadow-md" />

      <p className="text-sm font-bold text-teal-600">
        {date}
      </p>

      <h3 className="mt-1 text-xl font-bold text-zinc-900">
        {title}
      </h3>

      <p className="mt-2 leading-7 text-zinc-600">
        {text}
      </p>

      {children}
    </div>
  );
}