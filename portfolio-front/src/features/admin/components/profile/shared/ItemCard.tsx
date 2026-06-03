import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onRemove: () => void;
};

export function ItemCard({
  children,
  onRemove,
}: Props) {
  return (
    <div className="rounded-[1.5rem] border border-zinc-100 bg-zinc-50 p-5">
      {children}

      <button
        onClick={onRemove}
        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-red-500"
      >
        <Trash2 className="h-4 w-4" />
        Supprimer
      </button>
    </div>
  );
}