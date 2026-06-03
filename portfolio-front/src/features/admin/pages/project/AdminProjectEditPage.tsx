import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Image as ImageIcon,
  Loader2,
  Plus,
  Save,
  BriefcaseBusiness,
  GraduationCap,
  Laptop,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";

import { projectService } from "../services/projectService";
import type { Project, ProjectFile, ProjectForm } from "../types/project.types";

export default function AdminProjectEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<ProjectForm>({
    title: "",
    goal: "",
    description: "",
    context: "",
    projectType: "autre",
    city: "",
    country: "",
    startDate: "",
    endDate: "",
    teamSize: "",
    githubUrl: "",
    demoUrl: "",
    isPublished: false,
    isFeatured: false,
    displayOrder: "999",
  });

  const [technologies, setTechnologies] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [schools, setSchools] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);

  const [technologyInput, setTechnologyInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [schoolInput, setSchoolInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");

  const [images, setImages] = useState<ProjectFile[]>([]);
  const [documents, setDocuments] = useState<ProjectFile[]>([]);

  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadProject() {
      if (!id || !token) {
        setError("Projet introuvable ou session expirée.");
        setIsLoadingProject(false);
        return;
      }

      try {
        const response = await projectService.getProjectById(id, token);
        const project: Project = response.data;

        setForm({
          title: project.title ?? "",
          goal: project.goal ?? "",
          description: project.description ?? "",
          context: project.context ?? "",
          projectType: project.projectType ?? "autre",
          city: project.city ?? "",
          country: project.country ?? "",
          startDate: toInputDate(project.startDate),
          endDate: toInputDate(project.endDate),
          teamSize: project.teamSize ? String(project.teamSize) : "",
          githubUrl: project.githubUrl ?? "",
          demoUrl: project.demoUrl ?? "",
          isPublished: project.isPublished ?? false,
          isFeatured: project.isFeatured ?? false,
          displayOrder: String(project.displayOrder ?? 999),
        });

        setTechnologies(project.technologies ?? []);
        setRoles(project.roles ?? []);
        setSchools(project.schools ?? []);
        setCompanies(project.companies ?? []);
        setImages(project.images ?? []);
        setDocuments(project.documents ?? []);
      } catch (error) {
        console.error(error);
        setError("Impossible de charger le projet.");
      } finally {
        setIsLoadingProject(false);
      }
    }

    loadProject();
  }, [id, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addItem = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    clearInput: () => void
  ) => {
    const cleanValue = value.trim();

    if (!cleanValue || list.includes(cleanValue)) return;

    setList([...list, cleanValue]);
    clearInput();
  };

  const removeItem = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList(list.filter((value) => value !== item));
  };

  const uploadFile = async (file: File) => {
    if (!token) {
      setError("Session expirée. Reconnecte-toi.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const response = await projectService.uploadProjectFile(token, file);

      if (response.data.fileType === "image") {
        setImages((current) => [...current, response.data]);
      } else {
        setDocuments((current) => [...current, response.data]);
      }
    } catch (error) {
      console.error(error);
      setError("Impossible d’envoyer le fichier.");
    } finally {
      setUploading(false);
    }
  };

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    for (const file of files) {
      await uploadFile(file);
    }

    e.target.value = "";
  };

  const getDurationLabel = () => {
    if (!form.startDate || !form.endDate) return "Non définie";

    const start = new Date(form.startDate);
    const end = new Date(form.endDate);

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      end.getMonth() -
      start.getMonth() +
      1;

    return months <= 1 ? "1 mois" : `${months} mois`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !token) {
      setError("Projet introuvable ou session expirée.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await projectService.updateProject(id, token, {
        title: form.title,
        description: form.description,
        goal: form.goal || null,
        context: form.context || null,
        technologies,
        roles,
        images,
        documents,
        projectType: form.projectType,
        schools,
        companies,
        city: form.city || null,
        country: form.country || null,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
        teamSize: form.teamSize ? Number(form.teamSize) : null,
        githubUrl: form.githubUrl || null,
        demoUrl: form.demoUrl || null,
        isPublished: form.isPublished,
        isFeatured: form.isFeatured,
        displayOrder: Number(form.displayOrder || 999),
      });

      navigate("/admin/projects");
    } catch (error) {
      console.error(error);
      setError("Impossible de modifier le projet.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingProject) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F6F2]">
        <div className="flex items-center gap-3 text-zinc-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Chargement du projet...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2] px-6 py-8 text-zinc-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              to="/admin/projects"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux projets
            </Link>

            <h1 className="text-4xl font-bold tracking-tight">
              Modifier le projet
            </h1>

            <p className="mt-3 max-w-2xl text-zinc-500">
              Mets à jour les informations, les médias, la visibilité et l’ordre
              d’affichage du projet.
            </p>
          </div>

          <Card className="rounded-[2rem] border border-zinc-100 bg-white p-5 shadow-lg">
            <p className="text-sm font-semibold text-zinc-500">
              Durée estimée
            </p>
            <p className="mt-1 text-xl font-bold">{getDurationLabel()}</p>
          </Card>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <SectionCard
              title="Informations essentielles"
              description="Les informations principales visibles sur le portfolio."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Titre du projet *"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Ex : Étude du métier d’ingénieur cybersécurité"
                  required
                />

                <div className="md:col-span-2">
                  <ProjectTypeSelector
                    value={form.projectType}
                    onChange={(value) =>
                      setForm({
                        ...form,
                        projectType: value,
                      })
                    }
                  />
                </div>

                <Field
                  label="Date de début"
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                  icon={<Calendar className="h-4 w-4" />}
                />

                <Field
                  label="Date de fin"
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                  icon={<Calendar className="h-4 w-4" />}
                />

                <TextareaField
                  label="Objectif du projet"
                  name="goal"
                  value={form.goal}
                  onChange={handleChange}
                  placeholder="Quel problème ce projet cherche-t-il à résoudre ?"
                />

                <TextareaField
                  label="Description courte *"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Résumé clair du projet..."
                  required
                />
              </div>
            </SectionCard>

            <SectionCard
              title="Contexte du projet"
              description="Ajoute le cadre, les organisations et la localisation."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Ville"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Ex : Lyon"
                />

                <Field
                  label="Pays"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Ex : France"
                />

                <Field
                  label="Taille de l’équipe"
                  name="teamSize"
                  type="number"
                  value={form.teamSize}
                  onChange={handleChange}
                  placeholder="Ex : 1"
                />

                <Field
                  label="Lien GitHub"
                  name="githubUrl"
                  value={form.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                />

                <Field
                  label="Lien de démonstration"
                  name="demoUrl"
                  value={form.demoUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />

                <TextareaField
                  label="Contexte détaillé"
                  name="context"
                  value={form.context}
                  onChange={handleChange}
                  placeholder="Contexte, contraintes, travail réalisé, résultats obtenus..."
                />
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <TagEditor
                  label="Écoles associées"
                  placeholder="Ex : CESI"
                  value={schoolInput}
                  onChange={setSchoolInput}
                  items={schools}
                  onAdd={() =>
                    addItem(schoolInput, schools, setSchools, () =>
                      setSchoolInput("")
                    )
                  }
                  onRemove={(item) => removeItem(item, schools, setSchools)}
                />

                <TagEditor
                  label="Entreprises associées"
                  placeholder="Ex : Capgemini"
                  value={companyInput}
                  onChange={setCompanyInput}
                  items={companies}
                  onAdd={() =>
                    addItem(companyInput, companies, setCompanies, () =>
                      setCompanyInput("")
                    )
                  }
                  onRemove={(item) => removeItem(item, companies, setCompanies)}
                />
              </div>
            </SectionCard>

            <SectionCard
              title="Technologies & rôles"
              description="Ajoute les technologies et les rôles un par un."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <TagEditor
                  label="Technologies utilisées *"
                  placeholder="Ex : React"
                  value={technologyInput}
                  onChange={setTechnologyInput}
                  items={technologies}
                  onAdd={() =>
                    addItem(
                      technologyInput,
                      technologies,
                      setTechnologies,
                      () => setTechnologyInput("")
                    )
                  }
                  onRemove={(item) =>
                    removeItem(item, technologies, setTechnologies)
                  }
                />

                <TagEditor
                  label="Rôles dans le projet"
                  placeholder="Ex : Développeur frontend"
                  value={roleInput}
                  onChange={setRoleInput}
                  items={roles}
                  onAdd={() =>
                    addItem(roleInput, roles, setRoles, () =>
                      setRoleInput("")
                    )
                  }
                  onRemove={(item) => removeItem(item, roles, setRoles)}
                />
              </div>
            </SectionCard>

            <SectionCard
              title="Paramètres du projet"
              description="Gestion de la visibilité et de l’ordre d’affichage."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <ToggleCard
                  title="Projet publié"
                  description="Visible publiquement sur le portfolio."
                  checked={form.isPublished}
                  onChange={(checked) =>
                    setForm({
                      ...form,
                      isPublished: checked,
                    })
                  }
                />

                <ToggleCard
                  title="Projet mis en avant"
                  description="Affiché parmi les projets principaux."
                  checked={form.isFeatured}
                  onChange={(checked) =>
                    setForm({
                      ...form,
                      isFeatured: checked,
                    })
                  }
                />

                <Field
                  label="Ordre d’affichage"
                  name="displayOrder"
                  type="number"
                  value={form.displayOrder}
                  onChange={handleChange}
                  placeholder="999"
                />
              </div>
            </SectionCard>

            <SectionCard
              title="Médias & documents"
              description="Ajoute séparément les images et les fichiers liés au projet."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                <UploadBox
                  title="Images du projet"
                  description="Captures, posters, visuels."
                  accept=".png,.jpg,.jpeg,.webp"
                  icon={<ImageIcon className="h-6 w-6 text-teal-600" />}
                  uploading={uploading}
                  onChange={handleFilesChange}
                />

                <UploadBox
                  title="Documents du projet"
                  description="PDF, Word, PowerPoint."
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  icon={<FileText className="h-6 w-6 text-violet-600" />}
                  uploading={uploading}
                  onChange={handleFilesChange}
                />
              </div>

              {(images.length > 0 || documents.length > 0) && (
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <FileList
                    title="Images"
                    files={images}
                    onRemove={(file) =>
                      setImages(images.filter((item) => item.url !== file.url))
                    }
                    preview
                  />

                  <FileList
                    title="Documents"
                    files={documents}
                    onRemove={(file) =>
                      setDocuments(
                        documents.filter((item) => item.url !== file.url)
                      )
                    }
                  />
                </div>
              )}
            </SectionCard>

            {error && (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Link to="/admin/projects">
                <Button type="button" variant="outline" className="rounded-2xl">
                  Annuler
                </Button>
              </Link>

              <Button
                type="submit"
                disabled={loading || uploading}
                className="rounded-2xl bg-zinc-900 px-8 hover:bg-zinc-800"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mise à jour...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer les modifications
                  </>
                )}
              </Button>
            </div>
          </div>

          <aside>
            <Card className="sticky top-8 rounded-[2rem] border border-zinc-100 bg-white p-6 shadow-lg">
              <p className="text-sm font-bold text-teal-600">Aperçu rapide</p>

              <h2 className="mt-3 text-2xl font-bold leading-tight">
                {form.title || "Titre du projet"}
              </h2>

              <p className="mt-4 text-sm leading-6 text-zinc-500">
                {form.description || "Description courte du projet."}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-zinc-100 pt-5 text-sm text-zinc-500">
                <p>
                  <strong className="text-zinc-900">Type :</strong>{" "}
                  {form.projectType}
                </p>

                <p>
                  <strong className="text-zinc-900">Statut :</strong>{" "}
                  {form.isPublished ? "Publié" : "Brouillon"}
                </p>

                <p>
                  <strong className="text-zinc-900">Mis en avant :</strong>{" "}
                  {form.isFeatured ? "Oui" : "Non"}
                </p>

                <p>
                  <strong className="text-zinc-900">Ordre :</strong>{" "}
                  {form.displayOrder}
                </p>

                <p>
                  <strong className="text-zinc-900">Lieu :</strong>{" "}
                  {form.city || "Ville"}, {form.country || "Pays"}
                </p>

                <p>
                  <strong className="text-zinc-900">Fichiers :</strong>{" "}
                  {images.length} image(s), {documents.length} document(s)
                </p>
              </div>
            </Card>
          </aside>
        </form>
      </div>
    </main>
  );
}

function toInputDate(value?: string) {
  if (!value) return "";
  return value.split("T")[0];
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-[2rem] border border-zinc-100 bg-white p-8 shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2 text-sm text-zinc-500">{description}</p>
      </div>

      {children}
    </Card>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  icon,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-zinc-700">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
            {icon}
          </div>
        )}

        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:bg-white ${
            icon ? "pl-11" : ""
          }`}
        />
      </div>
    </div>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="md:col-span-2">
      <label className="mb-2 block text-sm font-semibold text-zinc-700">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="min-h-36 w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-zinc-900 focus:bg-white"
      />
    </div>
  );
}

function ToggleCard({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
      <div className="flex items-center justify-between gap-5">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </div>

        <button
          type="button"
          onClick={() => onChange(!checked)}
          className={`relative h-7 w-12 rounded-full transition ${
            checked ? "bg-zinc-900" : "bg-zinc-300"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
              checked ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function TagEditor({
  label,
  placeholder,
  value,
  onChange,
  items,
  onAdd,
  onRemove,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  items: string[];
  onAdd: () => void;
  onRemove: (item: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-zinc-700">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAdd();
            }
          }}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:bg-white"
        />

        <Button
          type="button"
          onClick={onAdd}
          className="rounded-2xl bg-zinc-900 px-4 hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-700"
          >
            {item}

            <button
              type="button"
              onClick={() => onRemove(item)}
              className="rounded-full text-zinc-400 hover:text-zinc-900"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectTypeSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const types = [
    {
      value: "personnel",
      label: "Personnel",
      description: "Projet indépendant, portfolio, SaaS ou expérimentation.",
      icon: <Laptop className="h-5 w-5" />,
    },
    {
      value: "ecole",
      label: "École",
      description: "Projet académique, PBL, dossier ou livrable CESI.",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      value: "entreprise",
      label: "Entreprise",
      description: "Mission professionnelle, alternance ou projet client.",
      icon: <BriefcaseBusiness className="h-5 w-5" />,
    },
    {
      value: "autre",
      label: "Autre",
      description: "Projet hybride, associatif ou hors catégorie.",
      icon: <Sparkles className="h-5 w-5" />,
    },
  ];

  return (
    <div>
      <label className="mb-3 block text-sm font-semibold text-zinc-700">
        Type de projet *
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        {types.map((type) => {
          const isSelected = value === type.value;

          return (
            <button
              key={type.value}
              type="button"
              onClick={() => onChange(type.value)}
              className={`group rounded-3xl border p-5 text-left transition ${
                isSelected
                  ? "border-zinc-900 bg-zinc-900 text-white shadow-lg"
                  : "border-zinc-200 bg-zinc-50 text-zinc-900 hover:border-zinc-300 hover:bg-white"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition ${
                    isSelected
                      ? "bg-white/15 text-white"
                      : "bg-white text-zinc-700 shadow-sm group-hover:scale-105"
                  }`}
                >
                  {type.icon}
                </div>

                <div>
                  <p className="font-bold">{type.label}</p>

                  <p
                    className={`mt-1 text-sm leading-5 ${
                      isSelected ? "text-zinc-200" : "text-zinc-500"
                    }`}
                  >
                    {type.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function UploadBox({
  title,
  description,
  accept,
  icon,
  uploading,
  onChange,
}: {
  title: string;
  description: string;
  accept: string;
  icon: React.ReactNode;
  uploading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-zinc-200 bg-zinc-50 px-6 py-10 text-center transition hover:border-zinc-300 hover:bg-white">
      <input
        type="file"
        multiple
        className="hidden"
        accept={accept}
        onChange={onChange}
      />

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition group-hover:scale-105">
        {uploading ? (
          <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        ) : (
          icon
        )}
      </div>

      <p className="mt-4 font-semibold text-zinc-900">{title}</p>
      <p className="mt-2 text-sm text-zinc-500">{description}</p>

      <p className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-500 shadow-sm">
        Cliquer pour ajouter
      </p>
    </label>
  );
}

function FileList({
  title,
  files,
  onRemove,
  preview = false,
}: {
  title: string;
  files: ProjectFile[];
  onRemove: (file: ProjectFile) => void;
  preview?: boolean;
}) {
  if (files.length === 0) return null;

  return (
    <div>
      <h3 className="mb-4 font-bold">{title}</h3>

      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.url}
            className="overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50"
          >
            {preview && (
              <img
                src={file.url}
                alt={file.fileName}
                className="h-36 w-full object-cover"
              />
            )}

            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {file.fileName}
                </p>

                <p className="text-xs text-zinc-500">
                  {(file.size / 1024 / 1024).toFixed(2)} Mo
                </p>
              </div>

              <button
                type="button"
                onClick={() => onRemove(file)}
                className="rounded-full bg-white p-2 text-zinc-400 shadow-sm transition hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}