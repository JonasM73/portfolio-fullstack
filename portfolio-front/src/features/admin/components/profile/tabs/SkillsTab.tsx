import type {
  SkillItem,
  
  UserProfile,
} from "../../../services/profileService";

import { DynamicBlock } from "../shared/DynamicBlock";
import { Input } from "../shared/Input";
import { ItemCard } from "../shared/ItemCard";

type Props = {
  profile: UserProfile;
  setProfile: React.Dispatch<
    React.SetStateAction<UserProfile>
  >;
  setSaved: (
    value: boolean
  ) => void;
};

export function SkillsTab({
  profile,
  setProfile,
  setSaved,
}: Props) {
  const addSkill = () => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      skills: [
        ...p.skills,
        {
          name: "",
          category: "",
          level: 3,
        },
      ],
    }));
  };

  const updateSkill = (
    index: number,
    field: keyof SkillItem,
    value: string | number
  ) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      skills: p.skills.map(
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

  const removeSkill = (
    index: number
  ) => {
    setProfile((p) => ({
      ...p,
      skills:
        p.skills.filter(
          (_, i) =>
            i !== index
        ),
    }));
  };

  return (
    <>
      <DynamicBlock
        title="Compétences"
        onAdd={addSkill}
      >
        {profile.skills.map(
          (item, index) => (
            <ItemCard
              key={index}
              onRemove={() =>
                removeSkill(
                  index
                )
              }
            >
              <div className="grid gap-4 md:grid-cols-3">
                <Input
                  label="Nom"
                  value={
                    item.name
                  }
                  onChange={(v) =>
                    updateSkill(
                      index,
                      "name",
                      v
                    )
                  }
                />

                <Input
                  label="Catégorie"
                  value={
                    item.category
                  }
                  onChange={(v) =>
                    updateSkill(
                      index,
                      "category",
                      v
                    )
                  }
                />

                <Input
                  type="number"
                  label="Niveau /5"
                  value={item.level.toString()}
                  onChange={(v) =>
                    updateSkill(
                      index,
                      "level",
                      Number(v)
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