import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, KeyRound } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { authService } from "../services/authService";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const emailFromUrl = searchParams.get("email") ?? "";
  const tokenFromUrl = searchParams.get("token") ?? "";

  const [email, setEmail] = useState(emailFromUrl);
  const [token, setToken] = useState(tokenFromUrl);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasTokenInUrl = useMemo(
    () => Boolean(emailFromUrl && tokenFromUrl),
    [emailFromUrl, tokenFromUrl]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authService.resetPassword({
        email,
        token,
        newPassword,
      });

      setMessage(response?.message ?? "Mot de passe réinitialisé avec succès.");

      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Lien invalide, expiré ou mot de passe non conforme.");
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
            <KeyRound className="h-6 w-6" />
          </div>

          <h1 className="mt-6 text-3xl font-black">
            Nouveau mot de passe
          </h1>

          <p className="mt-2 leading-6 text-zinc-500">
            Choisis un nouveau mot de passe pour ton compte administrateur.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-zinc-700">
              Email
            </label>

            <input
              type="email"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={hasTokenInUrl}
              required
            />
          </div>

          {!hasTokenInUrl && (
            <div>
              <label className="mb-2 block text-sm font-bold text-zinc-700">
                Code de réinitialisation
              </label>

              <input
                type="text"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-bold text-zinc-700">
              Nouveau mot de passe
            </label>

            <input
              type="password"
              placeholder="Ex : Test123"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-zinc-700">
              Confirmer le mot de passe
            </label>

            <input
              type="password"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isSubmitting ? "Réinitialisation..." : "Réinitialiser"}
          </Button>
        </form>
      </Card>
    </main>
  );
}