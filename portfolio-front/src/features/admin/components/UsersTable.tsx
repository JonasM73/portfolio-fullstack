import { Pencil, Trash2 } from "lucide-react";

import { Button } from "../../../components/ui/button";
import type { AdminUser } from "../types/user.types";

type UsersTableProps = {
  users: AdminUser[];
  isLoading: boolean;
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
};

export default function UsersTable({
  users,
  isLoading,
  onEdit,
  onDelete,
}: UsersTableProps) {
  if (isLoading) {
    return <div className="p-8 text-zinc-500">Chargement...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-500">
          <tr>
            <th className="px-6 py-4">Nom</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Rôle</th>
            <th className="px-6 py-4">Créé le</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-zinc-100">
              <td className="px-6 py-4 font-medium">{user.fullName}</td>

              <td className="px-6 py-4 text-zinc-500">{user.email}</td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium">
                  {user.role}
                </span>
              </td>

              <td className="px-6 py-4 text-zinc-500">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("fr-FR")
                  : "-"}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button variant="destructive" size="sm" onClick={() => onDelete(user)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-zinc-500">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}