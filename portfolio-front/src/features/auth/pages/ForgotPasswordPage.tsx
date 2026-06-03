import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { authService } from "../services/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await authService.forgotPassword(email);

      setMessage(
        response?.message ??
          "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé."
      );
    } catch (err) {
      console.error(err);
      setError("Impossible d’envoyer la demande de réinitialisation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F6F2] px-6 text-zinc-900">
      <div className="pointer-events-none fixed left-[-10rem] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-teal-200/40 blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-12rem] right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-orange-200/40 blur-3xl" />

      <Card className="relative z-10 w-full max-w-md rounded-[2rem] border border-zinc-100 bg-white/90 p-8 shadow-2xl backdrop-blur">
        <Link
          to="/admin/login"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour connexion
        </Link>

        <div className="mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-950 text-teal-300">
            <Mail className="h-6 w-6" />
          </div>

          <h1 className="mt-6 text-3xl font-black">
            Mot de passe oublié
          </h1>

          <p className="mt-2 leading-6 text-zinc-500">
            Entre ton email admin. Si le compte existe, tu recevras un lien de
            réinitialisation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-zinc-700">
              Email
            </label>

            <input
              type="email"
              placeholder="mionnet.jonas@gmail.com"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && (
            <div className="flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <p>{message}</p>
            </div>
          )}

          {error && (
            <p className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-zinc-950 py-6 font-bold hover:bg-zinc-800"
          >
            {isSubmitting ? "Envoi..." : "Envoyer le lien"}
          </Button>

          <Link
            to="/"
            className="block text-center text-sm font-semibold text-zinc-500 hover:text-zinc-900"
          >
            Retour au portfolio
          </Link>
        </form>
      </Card>
    </main>
  );
}