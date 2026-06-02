import {
  Pencil,
  Star,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";

import type {
  Project,
} from "../../types/project.types";

import ProjectStatusBadge from "./ProjectStatusBadge";
import ProjectPublishToggle from "./ProjectPublishToggle";

type Props = {
  project: Project;

  onDelete: (
    id: string
  ) => void;

  onTogglePublish: (
    id: string,
    value: boolean
  ) => void;
};

export default function ProjectAdminCard({
  project,
  onDelete,
  onTogglePublish,
}: Props) {
  return (
    <Card className="rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">
              {project.title}
            </h2>

            {project.isFeatured && (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            )}
          </div>

          <p className="mt-2 text-zinc-500">
            {project.projectType}
          </p>

          <p className="mt-3 text-sm text-zinc-500">
            {project.city},{" "}
            {project.country}
          </p>
        </div>

        <ProjectPublishToggle
          checked={
            project.isPublished
          }
          onToggle={() =>
            onTogglePublish(
              project.id,
              !project.isPublished
            )
          }
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <ProjectStatusBadge
          isPublished={
            project.isPublished
          }
        />

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
          Ordre :
          {" "}
          {project.displayOrder}
        </span>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          to={`/admin/projects/${project.id}/edit`}
        >
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Modifier
          </Button>
        </Link>

        <Button
          variant="destructive"
          onClick={() =>
            onDelete(project.id)
          }
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Supprimer
        </Button>
      </div>
    </Card>
  );
}