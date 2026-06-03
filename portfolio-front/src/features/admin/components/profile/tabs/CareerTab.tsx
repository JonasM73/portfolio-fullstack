import type { UserProfile } from "../../../services/profileService";
import { Input } from "../shared/Input";
import { Section } from "../shared/Section";

type Props = {
  profile: UserProfile;
  updateField: (
    field: keyof UserProfile,
    value: string | number | undefined
  ) => void;
};

export function CareerTab({
  profile,
  updateField,
}: Props) {
  return (
    <Section
      title="Carrière & Situation"
      description="Études, alternance et liens professionnels."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="École actuelle"
          value={profile.school ?? ""}
          onChange={(v) =>
            updateField("school", v)
          }
        />

        <Input
          label="Diplôme attendu"
          type="number"
          value={
            profile.graduationYear?.toString() ??
            ""
          }
          onChange={(v) =>
            updateField(
              "graduationYear",
              v ? Number(v) : undefined
            )
          }
        />

        <Input
          label="Entreprise"
          value={profile.company ?? ""}
          onChange={(v) =>
            updateField("company", v)
          }
        />

        <Input
          label="Poste"
          value={profile.workTitle ?? ""}
          onChange={(v) =>
            updateField("workTitle", v)
          }
        />

        <Input
          label="LinkedIn"
          value={profile.linkedinUrl ?? ""}
          onChange={(v) =>
            updateField("linkedinUrl", v)
          }
        />

        <Input
          label="GitHub"
          value={profile.githubUrl ?? ""}
          onChange={(v) =>
            updateField("githubUrl", v)
          }
        />
      </div>
    </Section>
  );
}