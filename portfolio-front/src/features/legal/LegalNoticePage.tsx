import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BadgeInfo,
  Copyright,
  ExternalLink,
  FileText,
  Globe,
  Mail,
  Scale,
  Server,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const sections = [
  {
    icon: <UserRound />,
    title: "Éditeur du site",
    content: (
      <>
        Le présent site portfolio est édité par{" "}
        <strong>Jonas Mionnet</strong>, étudiant ingénieur informatique basé à
        Lyon, France.
      </>
    ),
  },
  {
    icon: <BadgeInfo />,
    title: "Responsable de publication",
    content: (
      <>
        Le responsable de publication est{" "}
        <strong>Jonas Mionnet</strong>.
      </>
    ),
  },
  {
    icon: <Mail />,
    title: "Contact",
    content: (
      <>
        Pour toute demande relative au site, à son contenu ou à l’exercice de vos
        droits, vous pouvez utiliser la page contact du portfolio ou écrire à
        l’adresse suivante : <strong>mionnet.jonas@gmail.com</strong>.
      </>
    ),
  },
  {
    icon: <Server />,
    title: "Hébergement",
    content: (
      <>
        Le site est hébergé par{" "}
        <strong>[Nom de l’hébergeur à compléter]</strong>. Cette mention devra
        être mise à jour avec les informations exactes de l’hébergeur lors de la
        mise en ligne publique du site.
      </>
    ),
  },
  {
    icon: <Copyright />,
    title: "Propriété intellectuelle",
    content: (
      <>
        Les textes, visuels, composants, interfaces, projets, éléments
        graphiques et contenus présents sur ce site sont protégés par le droit de
        la propriété intellectuelle, sauf mention contraire. Toute reproduction,
        modification, diffusion ou exploitation totale ou partielle sans
        autorisation préalable est interdite.
      </>
    ),
  },
  {
    icon: <Scale />,
    title: "Responsabilité",
    content: (
      <>
        L’éditeur s’efforce de fournir des informations fiables, exactes et
        mises à jour. Toutefois, il ne peut garantir l’exactitude permanente ou
        l’exhaustivité des contenus publiés. L’utilisation des informations du
        site se fait sous la responsabilité de l’utilisateur.
      </>
    ),
  },
  {
    icon: <Globe />,
    title: "Liens externes",
    content: (
      <>
        Ce site peut contenir des liens vers des services tiers comme GitHub,
        LinkedIn ou d’autres plateformes externes. L’éditeur n’est pas
        responsable du contenu, du fonctionnement ou des pratiques de
        confidentialité de ces services.
      </>
    ),
  },
  {
    icon: <ShieldCheck />,
    title: "Données personnelles",
    content: (
      <>
        Les informations relatives au traitement des données personnelles sont
        détaillées dans la politique de confidentialité du site.
      </>
    ),
  },
];

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F6F2] text-zinc-900">
      <div className="pointer-events-none fixed left-[-12rem] top-[-12rem] h-[30rem] w-[30rem] rounded-full bg-teal-200/40 blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-14rem] right-[-14rem] h-[34rem] w-[34rem] rounded-full bg-orange-200/40 blur-3xl" />

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-zinc-500 shadow-sm backdrop-blur transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au portfolio
        </Link>

        <div className="mt-8 overflow-hidden rounded-[3rem] bg-zinc-950 p-8 text-white shadow-2xl md:p-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-teal-300">
            <FileText className="h-7 w-7" />
          </div>

          <p className="mt-8 font-black uppercase tracking-[0.25em] text-teal-300">
            Informations légales
          </p>

          <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-tight md:text-6xl">
            Mentions légales
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">
            Cette page regroupe les informations relatives à l’édition, à
            l’hébergement, à la responsabilité et à l’utilisation du site
            portfolio.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.title}
              className="group rounded-[2rem] border border-zinc-100 bg-white/85 p-6 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 transition group-hover:bg-zinc-950 group-hover:text-teal-300 [&>svg]:h-5 [&>svg]:w-5">
                  {section.icon}
                </div>

                <div>
                  <h2 className="text-xl font-black">{section.title}</h2>
                  <p className="mt-3 leading-7 text-zinc-600">
                    {section.content}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-teal-100 bg-teal-50 p-6 text-teal-900">
          <h2 className="text-xl font-black">À mettre à jour avant publication</h2>
          <p className="mt-3 leading-7">
            Remplace la partie hébergement par le nom exact de ton hébergeur,
            son adresse et ses coordonnées si disponibles.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/confidentialite"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
          >
            Voir la politique de confidentialité
            <ExternalLink className="h-4 w-4" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-zinc-900 shadow-sm transition hover:bg-zinc-100"
          >
            Me contacter
          </Link>
        </div>
      </section>
    </main>
  );
}