import type {
  EducationItem,
  UserProfile,
} from "../../../services/profileService";

import { DynamicBlock } from "../shared/DynamicBlock";
import { Input } from "../shared/Input";
import { ItemCard } from "../shared/ItemCard";
import { Select } from "../shared/Select";
import { Textarea } from "../shared/Textarea";

type Props = {
  profile: UserProfile;
  setProfile: React.Dispatch<
    React.SetStateAction<UserProfile>
  >;
  setSaved: (value: boolean) => void;
};

export function EducationTab({
  profile,
  setProfile,
  setSaved,
}: Props) {
  const add = () => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      education: [
        ...p.education,
        {
          school: "",
          degree: "",
          field: "",
          level: "",
          startYear: "",
          endYear: "",
          status: "in_progress",
          description: "",
        },
      ],
    }));
  };

  const update = (
    index: number,
    field: keyof EducationItem,
    value: string
  ) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      education: p.education.map(
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

  const remove = (index: number) => {
    setProfile((p) => ({
      ...p,
      education: p.education.filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <DynamicBlock
      title="Formations"
      onAdd={add}
    >
      {profile.education.map(
        (item, index) => (
          <ItemCard
            key={index}
            onRemove={() =>
              remove(index)
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="École"
                value={item.school}
                onChange={(v) =>
                  update(
                    index,
                    "school",
                    v
                  )
                }
              />

              <Input
                label="Diplôme"
                value={item.degree}
                onChange={(v) =>
                  update(
                    index,
                    "degree",
                    v
                  )
                }
              />

              <Input
                label="Domaine"
                value={item.field}
                onChange={(v) =>
                  update(
                    index,
                    "field",
                    v
                  )
                }
              />

              <Input
                label="Niveau"
                value={item.level}
                onChange={(v) =>
                  update(
                    index,
                    "level",
                    v
                  )
                }
              />

              <Input
                label="Début"
                type="month"
                value={item.startYear}
                onChange={(v) =>
                  update(index, "startYear", v)
                }
              />

              <Input
                label="Fin"
                type="month"
                value={item.endYear ?? ""}
                onChange={(v) =>
                  update(index, "endYear", v)
                }
              />
            </div>

            <div className="mt-4">
              <Select
                label="Statut"
                value={item.status}
                onChange={(v) =>
                  update(
                    index,
                    "status",
                    v
                  )
                }
              >
                <option value="in_progress">
                  En cours
                </option>

                <option value="completed">
                  Terminé
                </option>

                <option value="stopped">
                  Arrêté
                </option>

                <option value="none">
                  Pas d'école
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
                  update(
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
  );
}