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
          <p className="font-bold text-teal-600">
            Protection des données
          </p>

          <h1 className="mt-2 text-5xl font-bold tracking-tight">
            Politique de confidentialité
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-600">
            Cette page explique comment les données envoyées via le formulaire
            de contact sont utilisées.
          </p>

          <div className="mt-10 space-y-8">
            <section>
              <h2 className="text-xl font-bold">
                Données collectées
              </h2>

              <p className="mt-3 leading-7 text-zinc-600">
                Lors de l’envoi d’un message via le formulaire de contact,
                les informations suivantes peuvent être collectées :
                nom, email, sujet et message.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">
                Finalité des données
              </h2>

              <p className="mt-3 leading-7 text-zinc-600">
                Ces données sont utilisées uniquement afin de pouvoir répondre
                aux demandes de contact et échanger avec les visiteurs du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">
                Stockage
              </h2>

              <p className="mt-3 leading-7 text-zinc-600">
                Les messages peuvent être stockés de manière sécurisée dans une
                base de données MongoDB et une notification email peut être
                envoyée au propriétaire du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">
                Durée de conservation
              </h2>

              <p className="mt-3 leading-7 text-zinc-600">
                Les données peuvent être conservées pour une durée maximale
                de 12 mois afin de permettre le suivi des échanges.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">
                Suppression des données
              </h2>

              <p className="mt-3 leading-7 text-zinc-600">
                Une demande de suppression peut être effectuée à tout moment
                via le formulaire de contact.
              </p>
            </section>
          </div>
        </Card>
      </section>
    </main>
  );
}