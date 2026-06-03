import { Plus } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  title: string;
  onAdd: () => void;
  children: ReactNode;
};

export function DynamicBlock({
  title,
  onAdd,
  children,
}: Props) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-black">
          {title}
        </h2>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-sm font-bold text-white"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </button>
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}