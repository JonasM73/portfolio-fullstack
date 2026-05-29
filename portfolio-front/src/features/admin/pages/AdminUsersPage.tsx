import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";

import UsersTable from "../components/UsersTable";
import UserCreateModal from "../components/UserCreateModal";
import UserEditModal from "../components/UserEditModal";

import { userService } from "../services/userService";

import type {
  AdminUser,
  CreateUserRequest,
  UpdateUserRequest,
} from "../types/user.types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createError, setCreateError] = useState("");

  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [editError, setEditError] = useState("");

  const [createForm, setCreateForm] = useState<CreateUserRequest>({
    email: "",
    password: "",
    fullName: "",
    role: "User",
  });

  const [editForm, setEditForm] = useState<UpdateUserRequest>({
    fullName: "",
    role: "User",
  });

  const loadUsers = async () => {
    try {
      setPageError("");
      setIsLoading(true);

      const data = await userService.getUsers();
      setUsers(data ?? []);
    } catch {
      setPageError("Impossible de charger les utilisateurs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpenCreate = () => {
    setCreateError("");
    setIsCreateOpen(true);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");

    try {
      await userService.createUser(createForm);

      setCreateForm({
        email: "",
        password: "",
        fullName: "",
        role: "User",
      });

      setIsCreateOpen(false);
      await loadUsers();
    } catch (error: any) {
      setCreateError(
        error?.response?.data?.message || "Impossible de créer l’utilisateur."
      );
    }
  };

  const handleOpenEdit = (user: AdminUser) => {
    setEditError("");
    setEditingUser(user);

    setEditForm({
      fullName: user.fullName,
      role: user.role,
    });
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError("");

    if (!editingUser) return;

    try {
      await userService.updateUser(editingUser.id, editForm);

      setEditingUser(null);
      await loadUsers();
    } catch (error: any) {
      setEditError(
        error?.response?.data?.message || "Impossible de modifier l’utilisateur."
      );
    }
  };

  const handleDeleteUser = async (user: AdminUser) => {
    const confirmed = window.confirm(`Supprimer le compte de ${user.fullName} ?`);

    if (!confirmed) return;

    try {
      await userService.deleteUser(user.id);
      await loadUsers();
    } catch (error: any) {
      setPageError(
        error?.response?.data?.message || "Impossible de supprimer cet utilisateur."
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] p-8 text-zinc-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <Link
              to="/admin/projects"
              className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au dashboard
            </Link>

            <h1 className="text-4xl font-bold">Utilisateurs</h1>

            <p className="mt-2 text-zinc-500">
              Gestion des comptes, rôles et accès au portfolio.
            </p>
          </div>

          <Button
            onClick={handleOpenCreate}
            className="rounded-2xl bg-zinc-900 hover:bg-zinc-800"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un utilisateur
          </Button>
        </div>

        {pageError && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {pageError}
          </div>
        )}

        <Card className="overflow-hidden rounded-[2rem] border border-zinc-100 bg-white shadow-lg">
          <UsersTable
            users={users}
            isLoading={isLoading}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteUser}
          />
        </Card>
      </div>

      {isCreateOpen && (
        <UserCreateModal
          form={createForm}
          error={createError}
          onChange={setCreateForm}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreateUser}
        />
      )}

      {editingUser && (
        <UserEditModal
          form={editForm}
          error={editError}
          onChange={setEditForm}
          onClose={() => setEditingUser(null)}
          onSubmit={handleUpdateUser}
        />
      )}
    </main>
  );
}