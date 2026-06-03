import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export function Section({
  title,
  description,
  children,
}: Props) {
  return (
    <section>
      <h2 className="text-2xl font-black">
        {title}
      </h2>

      <p className="mt-1 text-sm text-zinc-500">
        {description}
      </p>

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}