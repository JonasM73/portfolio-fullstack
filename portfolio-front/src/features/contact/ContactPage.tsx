import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Mail, Send, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/RichTextEditror";

type ProjectOption = {
  id: string;
  title: string;
};

export default function ContactPage() {
  const [searchParams] = useSearchParams();

  const [projects, setProjects] = useState<ProjectOption[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectId: "",
    projectTitle: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get("https://localhost:7061/api/projects");

        setProjects(
          response.data.map((project: any) => ({
            id: project.id,
            title: project.title,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    const projectId = searchParams.get("projectId");
    const projectTitle = searchParams.get("projectTitle");

    if (projectId && projectTitle) {
      setForm((current) => ({
        ...current,
        projectId,
        projectTitle,
        subject: `À propos du projet : ${projectTitle}`,
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProject = projects.find(
      (project) => project.id === e.target.value
    );

    setForm({
      ...form,
      projectId: selectedProject?.id ?? "",
      projectTitle: selectedProject?.title ?? "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await axios.post("https://localhost:7176/api/contact", form);

      setSuccess("Message envoyé avec succès.");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        projectId: "",
        projectTitle: "",
      });
    } catch (error) {
      console.error(error);
      setError("Impossible d’envoyer le message pour le moment.");
    }
  };

  const inputClass =
    "h-12 rounded-2xl border-zinc-200 bg-white/80 px-4 shadow-sm transition-all duration-300 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-teal-400 focus:ring-4 focus:ring-teal-500/10";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F6F2] text-zinc-900">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-teal-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-32 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl" />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-600 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 hover:bg-white hover:text-zinc-950 hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Retour au portfolio
        </Link>


      </nav>

      <section className="relative z-10 mx-auto grid min-h-[80vh] max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-8 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-2xl">
          <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-teal-400 via-cyan-400 to-violet-500 text-white shadow-xl shadow-teal-500/20 transition-transform duration-300 hover:scale-105">
            <Mail className="h-7 w-7" />
          </div>



          <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-zinc-950 md:text-6xl">
            Une idée, un projet, une opportunité ?
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
            Écris-moi directement depuis le formulaire ou ouvre ton application
            mail. Je réponds généralement rapidement.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:mionnet.jonas@gmail.com"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 text-sm font-bold text-white shadow-lg shadow-zinc-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/20"
            >
              Me contacter via Outlook
              <Mail className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>


          </div>
        </div>

        <Card
          id="contact-form"
          className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-2xl shadow-zinc-900/10 backdrop-blur-2xl md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-zinc-700">
                  Nom / prénom
                </Label>
                <Input
                  name="name"
                  placeholder="ex : Jonas Mionnet"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-zinc-700">
                  Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="ex : nom.prenom@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-zinc-700">
                Sujet
              </Label>
              <Input
                name="subject"
                placeholder="ex : Je t'aime Jonas, travaillons ensemble !"
                value={form.subject}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-zinc-700">
                Projet concerné optionnel
              </Label>
              <select
                value={form.projectId}
                onChange={handleProjectChange}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white/80 px-4 text-sm text-zinc-700 shadow-sm outline-none transition-all duration-300 hover:border-zinc-300 focus:border-teal-400 focus:ring-4 focus:ring-teal-500/10"
              >
                <option value="">Aucun projet sélectionné</option>

                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-zinc-700">
                Message
              </Label>

              <RichTextEditor
                value={form.message}
                onChange={(value) =>
                  setForm({
                    ...form,
                    message: value,
                  })
                }
              />
            </div>

            {success && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                {success}
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="group h-13 w-full rounded-2xl bg-zinc-950 text-base font-black text-white shadow-lg shadow-zinc-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/20"
            >
              Envoyer le message
              <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </form>
        </Card>
      </section>
    </main>
  );
}