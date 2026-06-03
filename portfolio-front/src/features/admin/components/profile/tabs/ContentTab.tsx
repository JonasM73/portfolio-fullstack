import type {
  ProfileCard,
  UserProfile,
} from "../../../services/profileService";

import { IconPicker } from "../IconPicker";
import { DynamicBlock } from "../shared/DynamicBlock";
import { Input } from "../shared/Input";
import { ItemCard } from "../shared/ItemCard";
import { Textarea } from "../shared/Textarea";

type Props = {
  profile: UserProfile;
  setProfile: React.Dispatch<
    React.SetStateAction<UserProfile>
  >;
  setSaved: (
    value: boolean
  ) => void;
};

export function ContentTab({
  profile,
  setProfile,
  setSaved,
}: Props) {
  const updateCards = (
    field:
      | "interests"
      | "traits",
    index: number,
    key: keyof ProfileCard,
    value: string
  ) => {
    setSaved(false);

    setProfile((p) => ({
      ...p,
      [field]:
        p[field].map(
          (
            item,
            i
          ) =>
            i === index
              ? {
                  ...item,
                  [key]:
                    value,
                }
              : item
        ),
    }));
  };

  return (
    <>
      {["interests", "traits"].map(
        (section) => (
          <DynamicBlock
            key={section}
            title={
              section ===
              "interests"
                ? "Motivations"
                : "Traits"
            }
            onAdd={() =>
              setProfile(
                (
                  p
                ) => ({
                  ...p,
                  [section]:
                    [
                      ...p[
                        section as
                          | "interests"
                          | "traits"
                      ],
                      {
                        title:
                          "",
                        description:
                          "",
                        icon:
                          "",
                      },
                    ],
                })
              )
            }
          >
            {profile[
              section as
                | "interests"
                | "traits"
            ].map(
              (
                item,
                index
              ) => (
                <ItemCard
                  key={
                    index
                  }
                  onRemove={() =>
                    setProfile(
                      (
                        p
                      ) => ({
                        ...p,
                        [section]:
                          p[
                            section as
                              | "interests"
                              | "traits"
                          ].filter(
                            (
                              _,
                              i
                            ) =>
                              i !==
                              index
                          ),
                      })
                    )
                  }
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Titre"
                      value={
                        item.title
                      }
                      onChange={(
                        v
                      ) =>
                        updateCards(
                          section as
                            | "interests"
                            | "traits",
                          index,
                          "title",
                          v
                        )
                      }
                    />

                    <IconPicker
                      value={
                        item.icon
                      }
                      onChange={(
                        v
                      ) =>
                        updateCards(
                          section as
                            | "interests"
                            | "traits",
                          index,
                          "icon",
                          v
                        )
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <Textarea
                      label="Description"
                      value={
                        item.description
                      }
                      onChange={(
                        v
                      ) =>
                        updateCards(
                          section as
                            | "interests"
                            | "traits",
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
        )
      )}
    </>
  );
}