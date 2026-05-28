import {
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Laptop,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export type ProjectType =
  | "personnel"
  | "ecole"
  | "entreprise"
  | "autre";
  
export type Project = {
  id: string;
  title: string;
  description: string;
  goal?: string | null;
  projectType: ProjectType;
  technologies?: string[];
  city?: string | null;
  country?: string | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
};

const projectTypeConfig = {
  personnel: {
    icon: Laptop,
    label: "Projet personnel",
  },
  ecole: {
    icon: GraduationCap,
    label: "Projet école",
  },
  entreprise: {
    icon: Briefcase,
    label: "Projet entreprise",
  },
  autre: {
    icon: Sparkles,
    label: "Autre projet",
  },
};

export default function ProjectCard({ project }: { project: Project }) {
  const config = projectTypeConfig[project.projectType] ?? projectTypeConfig.autre;
  const Icon = config.icon;

  return (
    <Card className="group overflow-hidden rounded-[2rem] border border-zinc-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-md">
            <Icon className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full bg-teal-100 px-3 py-1 text-teal-700 hover:bg-teal-100">
                {config.label}
              </Badge>

              {(project.city || project.country) && (
                <span className="text-sm font-medium text-zinc-400">
                  {project.city}
                  {project.city && project.country ? ", " : ""}
                  {project.country}
                </span>
              )}
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900">
              {project.title}
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600">
              {project.description}
            </p>

            {project.goal && (
              <p className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">
                <span className="font-bold text-zinc-900">Objectif :</span>{" "}
                {project.goal}
              </p>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-500"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3 lg:flex-col lg:items-end">
          <Link to={`/projects/${project.id}`}>
            <Button className="rounded-full bg-zinc-900 px-5 hover:bg-zinc-800">
              Voir le détail
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              <Button variant="outline" className="rounded-full px-5">
                Démo
              </Button>
            </a>
          )}

          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <Button variant="ghost" className="rounded-full px-5">
                GitHub
              </Button>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}