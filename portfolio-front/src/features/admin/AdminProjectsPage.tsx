import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Plus } from "lucide-react";

export default function AdminProjectsPage() {
  return (
    <main className="min-h-screen bg-[#F8F6F2] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Dashboard Admin
            </h1>
            <Link to="/admin/projects/new">
              <Button className="rounded-2xl bg-zinc-900 hover:bg-zinc-800">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau projet
              </Button>
            </Link>
            <p className="mt-2 text-zinc-500">
              Gestion simple du portfolio.
            </p>
          </div>

          <Link to="/">
            <Button variant="outline">
              Retour au site
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold">
              Projets
            </h2>

            <p className="mt-2 text-zinc-500">
              Ajouter, modifier ou supprimer
              vos projets.
            </p>

            <Link to="/admin/projects/new">
              <Button className="mt-5 rounded-xl">
                Ajouter un projet
              </Button>
            </Link>
          </Card>

          <Card className="rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold">
              Messages
            </h2>

            <p className="mt-2 text-zinc-500">
              Voir les messages reçus via
              le formulaire de contact.
            </p>

            <Button className="mt-5 rounded-xl">
              Voir les messages
            </Button>
          </Card>

          <Card className="rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold">
              Portfolio
            </h2>

            <p className="mt-2 text-zinc-500">
              Modifier les informations
              publiques du site.
            </p>

            <Button className="mt-5 rounded-xl">
              Paramètres
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
}