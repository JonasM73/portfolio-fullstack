import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7296/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/admin/projects");
    } catch {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F6F2] px-6">
      <Card className="w-full max-w-md rounded-[2rem] border border-zinc-100 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Connexion Admin
          </h1>

          <p className="mt-2 text-zinc-500">
            Accès sécurisé à l’administration.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Votre email"
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Mot de passe
            </label>

            <input
              type="password"
              placeholder="Votre mot de passe"
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full rounded-2xl bg-zinc-900 py-6 hover:bg-zinc-800"
          >
            Se connecter
          </Button>

          <Link
            to="/"
            className="block text-center text-sm text-zinc-500 hover:text-zinc-900"
          >
            Retour au portfolio
          </Link>
        </form>
      </Card>
    </main>
  );
}