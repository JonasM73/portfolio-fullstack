import { Link } from "react-router-dom";
import { Plus, LogOut, Users, FolderKanban, Settings } from "lucide-react";

import { useAuth } from "../../auth/context/AuthContext";

import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";

export default function AdminProjectsPage() {
  const { logout, user } = useAuth();

  return (
    <main className="min-h-screen bg-[#F8F6F2] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Dashboard Admin</h1>

            <p className="mt-2 text-zinc-500">
              Connecté en tant que {user?.fullName}
            </p>
          </div>

          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline">Retour au site</Button>
            </Link>

            <Button variant="destructive" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
              <FolderKanban className="h-6 w-6 text-zinc-800" />
            </div>

            <h2 className="text-xl font-bold">Projets</h2>

            <p className="mt-2 text-zinc-500">
              Ajouter, modifier ou supprimer vos projets.
            </p>

            <Link to="/admin/projects/new">
              <Button className="mt-5 rounded-xl">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un projet
              </Button>
            </Link>
          </Card>

          <Card className="rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
              <Users className="h-6 w-6 text-zinc-800" />
            </div>

            <h2 className="text-xl font-bold">Utilisateurs</h2>

            <p className="mt-2 text-zinc-500">
              Gérer les comptes, les rôles et les accès.
            </p>

            <Link to="/admin/users">
              <Button className="mt-5 rounded-xl">
                Voir les utilisateurs
              </Button>
            </Link>
          </Card>

          <Card className="rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
              <Settings className="h-6 w-6 text-zinc-800" />
            </div>

            <h2 className="text-xl font-bold">Portfolio</h2>

            <p className="mt-2 text-zinc-500">
              Modifier les informations publiques du site.
            </p>

            <Button className="mt-5 rounded-xl" disabled>
              Bientôt disponible
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
}