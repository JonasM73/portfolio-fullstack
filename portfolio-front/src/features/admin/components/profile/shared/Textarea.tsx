type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export function Textarea({
  label,
  value,
  onChange,
  required = false,
}: Props) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-zinc-700">
        {label}
        {required && (
          <span className="ml-1 text-teal-600">*</span>
        )}
      </span>

      <textarea
        rows={4}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
      />
    </label>
  );
}