import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  value: string;
};

export function Preview({ icon, value }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 px-4 py-3 text-sm">
      <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      <span className="truncate font-semibold text-zinc-600">{value}</span>
    </div>
  );
}