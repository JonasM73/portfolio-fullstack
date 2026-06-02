type Props = {
  isPublished: boolean;
};

export default function ProjectStatusBadge({
  isPublished,
}: Props) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        isPublished
          ? "bg-emerald-100 text-emerald-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      {isPublished
        ? "Publié"
        : "Brouillon"}
    </span>
  );
}