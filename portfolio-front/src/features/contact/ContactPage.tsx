import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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
      });
    } catch {
      setError("Impossible d’envoyer le message pour le moment.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-zinc-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au portfolio
        </Link>

        <div className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-600 shadow-sm">
          Contact
        </div>
      </nav>

      <section className="mx-auto grid min-h-[80vh] max-w-7xl grid-cols-1 items-center gap-12 px-8 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-violet-500 text-white shadow-lg">
            <Mail className="h-6 w-6" />
          </div>

          <h1 className="max-w-2xl text-6xl font-bold leading-tight tracking-tight">
            Une idée, un projet, une opportunité ?
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
            N’hésite pas à me contacter, je réponds généralement rapidement.
        </p>
        </div>

        <Card className="rounded-[2rem] border-0 bg-white/75 p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Nom</Label>
              <Input
                name="name"
                placeholder="Ton nom"
                value={form.name}
                onChange={handleChange}
                className="h-12 rounded-2xl bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="ton@email.com"
                value={form.email}
                onChange={handleChange}
                className="h-12 rounded-2xl bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Sujet</Label>
              <Input
                name="subject"
                placeholder="Sujet du message"
                value={form.subject}
                onChange={handleChange}
                className="h-12 rounded-2xl bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Message</Label>
              <textarea
                name="message"
                placeholder="Écris ton message..."
                value={form.message}
                onChange={handleChange}
                className="min-h-36 w-full resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            {success && (
              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                {success}
              </div>
            )}

            {error && (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="h-12 w-full rounded-2xl bg-zinc-900 text-base font-bold hover:bg-zinc-800"
            >
              Envoyer le message
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Card>
      </section>
    </main>
  );
}