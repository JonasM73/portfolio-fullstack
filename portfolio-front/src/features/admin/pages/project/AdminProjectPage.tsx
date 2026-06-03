import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  ArrowLeft,
  FolderKanban,
  Plus,
} from "lucide-react";

import { useAuth } from "../../../auth/context/AuthContext";

import { Button } from "@/components/ui/button";

import ProjectAdminCard from "../../components/projects/ProjectAdminCard";

import {
  projectService,
} from "../../services/projectService";

import type {
  Project,
} from "../../types/project.types";

export default function AdminProjectsPage() {
  const { token } =
    useAuth();

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  async function loadProjects() {
    try {
      if (!token) return;

      const response =
        await projectService.getAdminProjects(
          token
        );

      setProjects(
        response.data
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleDelete(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Voulez-vous vraiment supprimer ce projet ?"
      );

    if (!confirmed) {
      return;
    }

    try {
      if (!token) return;

      await projectService.deleteProject(
        id,
        token
      );

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project.id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleTogglePublish(
    id: string,
    value: boolean
  ) {
    try {
      if (!token) return;

      await projectService.togglePublish(
        id,
        token,
        value
      );

      setProjects((prev) =>
        prev.map((project) =>
          project.id === id
            ? {
                ...project,
                isPublished:
                  value,
              }
            : project
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4">
              <Link to="/admin/projects">
                <Button
                  variant="outline"
                  className="rounded-xl"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <FolderKanban className="h-8 w-8 text-zinc-800" />

              <h1 className="text-4xl font-bold">
                Gestion des projets
              </h1>
            </div>

            <p className="mt-3 text-zinc-500">
              Gérez les projets,
              leur visibilité
              publique et leur
              ordre
              d’affichage.
            </p>
          </div>

          <Link to="/admin/projects/new">
            <Button className="rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un projet
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="rounded-[2rem] bg-white p-8 shadow-lg">
            Chargement des projets...
          </div>
        ) : projects.length ===
          0 ? (
          <div className="rounded-[2rem] bg-white p-8 shadow-lg">
            Aucun projet trouvé.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map(
              (project) => (
                <ProjectAdminCard
                  key={
                    project.id
                  }
                  project={
                    project
                  }
                  onDelete={
                    handleDelete
                  }
                  onTogglePublish={
                    handleTogglePublish
                  }
                />
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}