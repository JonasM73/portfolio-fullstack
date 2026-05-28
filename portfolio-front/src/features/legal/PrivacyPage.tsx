import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F8F6F2] text-zinc-900">
      <section className="mx-auto max-w-5xl px-8 py-12">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au portfolio
        </Link>

        <Card className="mt-8 rounded-[2rem] border border-zinc-100 bg-white p-10 shadow-lg">
          <p className="font-bold text-teal-600">Protection des données</p>

          <h1 className="mt-2 text-5xl font-bold tracking-tight">
            Politique de confidentialité
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-600">
            Cette page explique comment les données personnelles envoyées via le
            formulaire de contact sont collectées, utilisées et protégées.
          </p>

          <div className="mt-10 space-y-8">
            <section>
              <h2 className="text-xl font-bold">Données collectées</h2>
              <p className="mt-3 leading-7 text-zinc-600">
                Lors de l’envoi d’un message via le formulaire de contact, les
                informations suivantes peuvent être collectées : nom, adresse
                email, sujet et contenu du message.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">Finalité du traitement</h2>
              <p className="mt-3 leading-7 text-zinc-600">
                Ces données sont utilisées uniquement afin de répondre aux
                demandes envoyées via le formulaire de contact et d’assurer le
                suivi des échanges professionnels ou académiques.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">Base légale</h2>
              <p className="mt-3 leading-7 text-zinc-600">
                Le traitement des données repose sur l’intérêt légitime de
                l’éditeur du site à pouvoir répondre aux demandes de contact
                initiées volontairement par l’utilisateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">Stockage des données</h2>
              <p className="mt-3 leading-7 text-zinc-600">
                Les messages transmis peuvent être stockés de manière sécurisée
                dans une base de données MongoDB et/ou faire l’objet d’une
                notification par email au propriétaire du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">Durée de conservation</h2>
              <p className="mt-3 leading-7 text-zinc-600">
                Les données issues du formulaire de contact sont conservées pour
                une durée maximale de 12 mois, sauf obligation légale contraire
                ou nécessité liée à un échange en cours.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">Vos droits</h2>
              <p className="mt-3 leading-7 text-zinc-600">
                Conformément au Règlement Général sur la Protection des Données
                RGPD, vous disposez d’un droit d’accès, de rectification, de
                suppression, de limitation et d’opposition concernant vos données
                personnelles.
              </p>
              <p className="mt-3 leading-7 text-zinc-600">
                Vous pouvez exercer ces droits à tout moment via le formulaire de
                contact disponible sur le site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">Cookies</h2>
              <p className="mt-3 leading-7 text-zinc-600">
                Le site peut utiliser des cookies strictement nécessaires à son
                bon fonctionnement ou à l’amélioration de l’expérience
                utilisateur. Aucun cookie publicitaire ou de suivi commercial
                n’est utilisé sans consentement préalable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">Services tiers</h2>
              <p className="mt-3 leading-7 text-zinc-600">
                Le site peut intégrer ou rediriger vers des services tiers tels
                que GitHub, LinkedIn, des services d’hébergement ou des services
                d’envoi d’emails. Ces services disposent de leurs propres
                politiques de confidentialité.
              </p>
            </section>
          </div>
        </Card>
      </section>
    </main>
  );
}