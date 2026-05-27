import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function LegalNoticePage() {
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
            Informations légales
          </p>

          <h1 className="mt-2 text-5xl font-bold tracking-tight">
            Mentions légales
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-600">
            Informations relatives à l’édition et à l’utilisation de ce site portfolio.
          </p>

          <div className="mt-10 space-y-8">
            <section>
              <h2 className="text-xl font-bold">
                Éditeur du site
              </h2>

              <p className="mt-3 leading-7 text-zinc-600">
                Ce site est édité par <strong>Jonas Mionnet</strong>,
                étudiant ingénieur informatique basé à Lyon, France.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">
                Contact
              </h2>

              <p className="mt-3 leading-7 text-zinc-600">
                Toute prise de contact peut être effectuée via le formulaire
                disponible sur la page contact du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">
                Hébergement
              </h2>

              <p className="mt-3 leading-7 text-zinc-600">
                Les informations relatives à l’hébergement seront précisées lors
                de la mise en ligne publique du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold">
                Propriété intellectuelle
              </h2>

              <p className="mt-3 leading-7 text-zinc-600">
                L’ensemble des contenus présents sur ce site
                (textes, structure, éléments graphiques et projets),
                sauf mention contraire, sont protégés et ne peuvent être
                reproduits sans autorisation préalable.
              </p>
            </section>
          </div>
        </Card>
      </section>
    </main>
  );
}