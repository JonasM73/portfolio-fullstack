import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Cookie,
  Database,
  ExternalLink,
  FileLock2,
  KeyRound,
  Mail,
  ShieldCheck,
  Trash2,
  UserCheck,
} from "lucide-react";

const sections = [
  {
    icon: <Database />,
    title: "Données collectées",
    content: (
      <>
        Lorsque vous utilisez le formulaire de contact, les informations
        suivantes peuvent être collectées : nom, adresse email, sujet du message
        et contenu du message. Ces informations sont transmises volontairement
        par l’utilisateur.
      </>
    ),
  },
  {
    icon: <UserCheck />,
    title: "Finalités du traitement",
    content: (
      <>
        Les données sont utilisées uniquement pour répondre aux demandes envoyées
        via le formulaire de contact, assurer le suivi des échanges et permettre
        une prise de contact professionnelle, académique ou liée à un projet.
      </>
    ),
  },
  {
    icon: <KeyRound />,
    title: "Base légale",
    content: (
      <>
        Le traitement repose sur l’intérêt légitime de l’éditeur à pouvoir
        répondre aux messages reçus, ou sur le consentement de l’utilisateur
        lorsqu’il choisit volontairement d’envoyer un message via le formulaire.
      </>
    ),
  },
  {
    icon: <FileLock2 />,
    title: "Stockage et sécurité",
    content: (
      <>
        Les messages peuvent être stockés dans une base de données sécurisée et
        faire l’objet d’une notification par email au propriétaire du site. Des
        mesures raisonnables sont mises en œuvre pour limiter l’accès non
        autorisé aux données.
      </>
    ),
  },
  {
    icon: <Clock />,
    title: "Durée de conservation",
    content: (
      <>
        Les données issues du formulaire de contact sont conservées pendant une
        durée maximale de <strong>12 mois</strong>, sauf nécessité liée à un
        échange en cours, obligation légale ou demande de suppression anticipée.
      </>
    ),
  },
  {
    icon: <ShieldCheck />,
    title: "Vos droits",
    content: (
      <>
        Conformément au RGPD, vous pouvez demander l’accès, la rectification,
        l’effacement, la limitation ou l’opposition au traitement de vos données
        personnelles. La CNIL rappelle que toute personne dispose d’un droit de
        regard sur ses données personnelles. :contentReference[oaicite:1]
      </>
    ),
  },
  {
    icon: <Mail />,
    title: "Exercice des droits",
    content: (
      <>
        Pour exercer vos droits, vous pouvez envoyer une demande via la page
        contact du site ou à l’adresse suivante :{" "}
        <strong>mionnet.jonas@gmail.com</strong>. Une réponse sera apportée dans
        les meilleurs délais.
      </>
    ),
  },
  {
    icon: <Cookie />,
    title: "Cookies",
    content: (
      <>
        Le site n’a pas vocation à utiliser de cookies publicitaires ou de suivi
        commercial. Des cookies ou stockages locaux strictement nécessaires
        peuvent être utilisés pour le bon fonctionnement technique du site, par
        exemple pour l’espace d’administration.
      </>
    ),
  },
  {
    icon: <Trash2 />,
    title: "Suppression des données",
    content: (
      <>
        Vous pouvez demander la suppression des données transmises via le
        formulaire de contact, sous réserve d’éventuelles obligations légales ou
        d’un besoin de conservation lié à un échange en cours.
      </>
    ),
  },
];

export default function PrivacyPage() {
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

        <div className="mt-8 overflow-hidden rounded-[3rem] bg-gradient-to-br from-zinc-950 via-zinc-900 to-teal-950 p-8 text-white shadow-2xl md:p-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-teal-300">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <p className="mt-8 font-black uppercase tracking-[0.25em] text-teal-300">
            Protection des données
          </p>

          <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-tight md:text-6xl">
            Politique de confidentialité
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">
            Cette page explique comment les données transmises via le formulaire
            de contact sont collectées, utilisées, conservées et protégées.
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



        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/mentions-legales"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
          >
            Voir les mentions légales
            <ExternalLink className="h-4 w-4" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-zinc-900 shadow-sm transition hover:bg-zinc-100"
          >
            Exercer mes droits
          </Link>
        </div>
      </section>
    </main>
  );
}