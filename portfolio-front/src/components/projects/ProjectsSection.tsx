import { useEffect, useMemo, useState } from "react";

import ProjectCard from "./ProjectCard";
import type { Project, ProjectType } from "./ProjectCard";

type ProjectFilter =
  | "Tous"
  | "personnel"
  | "ecole"
  | "entreprise"
  | "autre";

const filters = [
  {
    value: "Tous",
    label: "Tous",
  },
  {
    value: "personnel",
    label: "Personnel",
  },
  {
    value: "ecole",
    label: "École",
  },
  {
    value: "entreprise",
    label: "Entreprise",
  },
  {
    value: "autre",
    label: "Autre",
  },
] as const;

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>("Tous");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("https://localhost:7061/api/projects");

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des projets.");
        }

        const data: Project[] = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "Tous") {
      return projects;
    }

    return projects.filter(
      (project) => project.projectType === selectedFilter
    );
  }, [projects, selectedFilter]);

  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-600">
            Réalisations
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Mes projets
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            Une sélection de projets personnels, scolaires et professionnels,
            présentés avec leurs objectifs, leurs technologies et leur contexte.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              onClick={() => setSelectedFilter(filter.value)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                selectedFilter === filter.value
                  ? "bg-zinc-900 text-white shadow-lg"
                  : "bg-white text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-14">
        {isLoading ? (
          <div className="rounded-[2rem] border border-zinc-100 bg-white p-8 text-zinc-500 shadow-sm">
            Chargement des projets...
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-zinc-100 bg-white p-8 text-zinc-500 shadow-sm">
            Aucun projet trouvé pour ce filtre.
          </div>
        )}
      </div>
    </section>
  );
}