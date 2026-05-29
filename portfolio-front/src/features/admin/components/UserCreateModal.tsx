import { X } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";

import type { CreateUserRequest, UserRole } from "../types/user.types";

type UserCreateModalProps = {
  form: CreateUserRequest;
  error: string;
  onChange: (form: CreateUserRequest) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function UserCreateModal({
  form,
  error,
  onChange,
  onClose,
  onSubmit,
}: UserCreateModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <Card className="w-full max-w-lg rounded-[2rem] border border-zinc-100 bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Ajouter un utilisateur</h2>
            <p className="text-sm text-zinc-500">Créer un nouveau compte utilisateur.</p>
          </div>

          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Nom complet</label>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => onChange({ ...form, fullName: e.target.value })}
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
              placeholder="Ex : Jonas Mionnet"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => onChange({ ...form, email: e.target.value })}
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
              placeholder="email@exemple.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => onChange({ ...form, password: e.target.value })}
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
              placeholder="Minimum 6 caractères"
            />
            <p className="mt-2 text-xs text-zinc-500">
              Minimum 6 caractères, 1 majuscule et 1 chiffre.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Rôle</label>
            <select
              value={form.role}
              onChange={(e) => onChange({ ...form, role: e.target.value as UserRole })}
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
            >
              <option value="User">User</option>
              <option value="Premium">Premium</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-3">
            <Button type="button" variant="outline" className="flex-1 rounded-2xl" onClick={onClose}>
              Annuler
            </Button>

            <Button type="submit" className="flex-1 rounded-2xl bg-zinc-900 hover:bg-zinc-800">
              Créer l’utilisateur
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}