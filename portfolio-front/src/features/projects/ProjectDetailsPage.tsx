import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProjectDetails from "../../components/projects/ProjectDetails";
import type { Project } from "../../components/projects/ProjectDetails";

export default function ProjectDetailsPage() {
  const { id } = useParams();

  const [project, setProject] =
    useState<Project | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);
 useEffect(() => {
  window.scrollTo(0, 0);
}, [id]);
  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(
          `https://localhost:7061/api/projects/${id}`
        );

        if (!response.ok) {
          throw new Error(
            "Impossible de récupérer le projet."
          );
        }

        const data: Project =
          await response.json();

        setProject(data);
      } catch (error) {
        console.error(error);

        setError(
          "Une erreur est survenue lors du chargement."
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F6F2]">
        <p className="text-zinc-500">
          Chargement du projet...
        </p>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F6F2]">
        <p className="text-red-500">
          Projet introuvable.
        </p>
      </main>
    );
  }

  return <ProjectDetails project={project} />;
}