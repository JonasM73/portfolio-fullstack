import { useMemo, useState } from "react";

export const languages = [
  "Français",
  "Anglais",
  "Espagnol",
  "Allemand",
  "Italien",
  "Portugais",
  "Néerlandais",
  "Arabe",
  "Chinois",
  "Japonais",
  "Coréen",
  "Russe",
  "Turc",
  "Grec",
  "Polonais",
  "Roumain",
  "Suédois",
  "Norvégien",
  "Danois",
  "Finnois",
  "Hindi",
  "Vietnamien",
  "Thaï",
  "Créole seychellois",
  "Créole haïtien",
  "Ukrainien",
  "Tchèque",
  "Slovaque",
  "Hongrois",
  "Croate",
  "Serbe",
  "Bulgare",
  "Albanais",
  "Maltais",
  "Islandais",
  "Irlandais",
  "Gallois",
  "Breton",
  "Catalan",
  "Basque",
  "Latin",
  "Hébreu",
  "Persan",
  "Ourdou",
  "Bengali",
  "Tamoul",
  "Indonésien",
  "Malais",
  "Tagalog",
  "Swahili",
];

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function LanguageAutocomplete({
  label,
  value,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = useMemo(() => {
    const search = value.trim().toLowerCase();

    if (!search) {
      return languages.slice(0, 8);
    }

    return languages
      .filter((language) =>
        language.toLowerCase().startsWith(search)
      )
      .slice(0, 8);
  }, [value]);

  return (
    <div className="relative">
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-zinc-700">
          {label}
        </span>

        <input
          value={value}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => setIsOpen(false), 150);
          }}
          placeholder="Ex : Français, Anglais..."
          className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
        />
      </label>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-30 mt-2 max-h-56 w-full overflow-auto rounded-2xl border border-zinc-100 bg-white p-2 shadow-xl">
          {suggestions.map((language) => (
            <button
              key={language}
              type="button"
              onMouseDown={() => {
                onChange(language);
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
            >
              <span>{language}</span>

              {value === language && (
                <span className="text-xs font-bold text-teal-600">
                  sélectionné
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}