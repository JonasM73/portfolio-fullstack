import type {
  LanguageItem,
  LicenseItem,
  UserProfile,
} from "../../../services/profileService";

import { DynamicBlock } from "../shared/DynamicBlock";
import { Input } from "../shared/Input";
import { ItemCard } from "../shared/ItemCard";
import { Select } from "../shared/Select";
import { Textarea } from "../shared/Textarea";
import { LanguageAutocomplete } from "../shared/LanguageAutocomplete";

type Props = {
  profile: UserProfile;
  setProfile: React.Dispatch<
    React.SetStateAction<UserProfile>
  >;
  setSaved: (
    value: boolean
  ) => void;
};

export function ExtraTab({
  profile,
  setProfile,
  setSaved,
}: Props) {
  const addLanguage = () => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      languages: [
        ...p.languages,
        {
          name: "",
          level: "",
          description: "",
        },
      ],
    }));
  };

  const updateLanguage = (
    index: number,
    field: keyof LanguageItem,
    value: string
  ) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      languages: p.languages.map(
        (item, i) =>
          i === index
            ? {
                ...item,
                [field]: value,
              }
            : item
      ),
    }));
  };

  const removeLanguage = (
    index: number
  ) => {
    setProfile((p) => ({
      ...p,
      languages:
        p.languages.filter(
          (_, i) =>
            i !== index
        ),
    }));
  };

  const addLicense = () => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      licenses: [
        ...p.licenses,
        {
          name: "",
          status: "obtained",
          obtainedYear: "",
        },
      ],
    }));
  };

  const updateLicense = (
    index: number,
    field: keyof LicenseItem,
    value: string
  ) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      licenses: p.licenses.map(
        (item, i) =>
          i === index
            ? {
                ...item,
                [field]: value,
              }
            : item
      ),
    }));
  };

  const removeLicense = (
    index: number
  ) => {
    setProfile((p) => ({
      ...p,
      licenses:
        p.licenses.filter(
          (_, i) =>
            i !== index
        ),
    }));
  };

  return (
    <>
      <DynamicBlock
        title="Langues"
        onAdd={addLanguage}
      >
        {profile.languages.map(
          (item, index) => (
            <ItemCard
              key={index}
              onRemove={() =>
                removeLanguage(
                  index
                )
              }
            >
              <div className="grid gap-4 md:grid-cols-3">
                <LanguageAutocomplete
  label="Langue"
  value={item.name}
  onChange={(v) =>
    updateLanguage(index, "name", v)
  }
/>

                <Select
                  label="Niveau"
                  value={item.level}
                  onChange={(v) =>
                    updateLanguage(
                      index,
                      "level",
                      v
                    )
                  }
                >
                  <option value="">
                    Choisir
                  </option>
                  <option value="Natif">
                    Natif
                  </option>
                  <option value="Débutant">
                    Débutant
                  </option>
                  <option value="Intermédiaire">
                    Intermédiaire
                  </option>
                  <option value="Avancé">
                    Avancé
                  </option>
                  <option value="Billingue">
                    Billingue
                  </option>
                  
                </Select>

                
              </div>

              <div className="mt-4">
                <Textarea
                  label="Description"
                  value={
                    item.description ??
                    ""
                  }
                  onChange={(v) =>
                    updateLanguage(
                      index,
                      "description",
                      v
                    )
                  }
                />
              </div>
            </ItemCard>
          )
        )}
      </DynamicBlock>

      <DynamicBlock
        title="Permis"
        onAdd={addLicense}
      >
        {profile.licenses.map(
          (item, index) => (
            <ItemCard
              key={index}
              onRemove={() =>
                removeLicense(
                  index
                )
              }
            >
              <div className="grid gap-4 md:grid-cols-3">
                <Input
                  label="Nom"
                  value={item.name}
                  onChange={(v) =>
                    updateLicense(
                      index,
                      "name",
                      v
                    )
                  }
                />

                <Select
                  label="Statut"
                  value={
                    item.status
                  }
                  onChange={(v) =>
                    updateLicense(
                      index,
                      "status",
                      v
                    )
                  }
                >
                  <option value="obtained">
                    Obtenu
                  </option>

                  <option value="in_progress">
                    En cours
                  </option>

                  <option value="planned">
                    Prévu
                  </option>
                </Select>

                <Input
                  label="Année"
                  value={
                    item.obtainedYear ??
                    ""
                  }
                  onChange={(v) =>
                    updateLicense(
                      index,
                      "obtainedYear",
                      v
                    )
                  }
                />
              </div>
            </ItemCard>
          )
        )}
      </DynamicBlock>
    </>
  );
}