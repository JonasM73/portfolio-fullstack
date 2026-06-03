import {
  Plane,
  Dumbbell,
  Rocket,
  Sun,
  BookOpen,
  Briefcase,
  Brain,
  Code2,
  Globe2,
  Shield,
  Database,
  Cpu,
  Heart,
  Sparkles,
  GraduationCap,
  Laptop,
} from "lucide-react";

const icons = [
  { name: "plane", label: "Voyage", Icon: Plane, color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-400" },
  { name: "dumbbell", label: "Sport", Icon: Dumbbell, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-400" },
  { name: "rocket", label: "Ambition", Icon: Rocket, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-400" },
  { name: "sun", label: "Soleil", Icon: Sun, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-400" },
  { name: "book", label: "Lecture", Icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-400" },
  { name: "briefcase", label: "Business", Icon: Briefcase, color: "text-zinc-700", bg: "bg-zinc-100", border: "border-zinc-400" },
  { name: "brain", label: "Curiosité", Icon: Brain, color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-400" },
  { name: "code", label: "Code", Icon: Code2, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-400" },
  { name: "globe", label: "International", Icon: Globe2, color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-400" },
  { name: "shield", label: "Cybersécurité", Icon: Shield, color: "text-red-600", bg: "bg-red-50", border: "border-red-400" },
  { name: "database", label: "Data", Icon: Database, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-400" },
  { name: "cpu", label: "Tech", Icon: Cpu, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-400" },
  { name: "heart", label: "Passion", Icon: Heart, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-400" },
  { name: "sparkles", label: "Créativité", Icon: Sparkles, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-400" },
  { name: "graduation", label: "Études", Icon: GraduationCap, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-400" },
  { name: "laptop", label: "Digital", Icon: Laptop, color: "text-slate-700", bg: "bg-slate-100", border: "border-slate-400" },
];

export function IconPicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-bold text-zinc-700">
        Icône
      </p>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
        {icons.map(({ name, label, Icon }) => {
          const selected = value === name;

          return (
            <button
              key={name}
              type="button"
              title={label}
              onClick={() => onChange(name)}
              className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition ${
                selected
                  ? "border-teal-500 bg-teal-50 text-teal-700 ring-4 ring-teal-500/10"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
              }`}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </div>

      {value && (
        <p className="mt-2 text-xs font-semibold text-zinc-400">
          Icône sélectionnée : {value}
        </p>
      )}
    </div>
  );
}