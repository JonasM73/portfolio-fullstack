import type { ReactNode } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
};

export function Select({
  label,
  value,
  onChange,
  children,
}: Props) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-zinc-700">
        {label}
      </span>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
      >
        {children}
      </select>
    </label>
  );
}