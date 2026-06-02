type Props = {
  checked: boolean;
  onToggle: () => void;
};

export default function ProjectPublishToggle({
  checked,
  onToggle,
}: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative flex h-10 min-w-[90px] items-center rounded-full px-2 transition-all duration-300 ${
        checked
          ? "bg-emerald-500"
          : "bg-zinc-300"
      }`}
    >
      <span
        className={`absolute flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
          checked
            ? "translate-x-[48px]"
            : "translate-x-0"
        }`}
      >
        {checked ? "✓" : "✕"}
      </span>

      <span
        className={`w-full text-center text-sm font-semibold text-white transition ${
          checked
            ? "pr-7"
            : "pl-7"
        }`}
      >
        {checked
          ? "Publié"
          : "Privé"}
      </span>
    </button>
  );
}