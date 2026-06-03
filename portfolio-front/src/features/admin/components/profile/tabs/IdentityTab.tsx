import type { UserProfile } from "../../../services/profileService";
import { Input } from "../shared/Input";
import { Section } from "../shared/Section";
import { Textarea } from "../shared/Textarea";

type Props = {
  profile: UserProfile;
  updateField: (
    field: keyof UserProfile,
    value: string | number | undefined
  ) => void;
};

export function IdentityTab({
  profile,
  updateField,
}: Props) {
  return (
    <Section
      title="Identité"
      description="Informations principales du profil."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          required
          label="Prénom"
          value={profile.firstName}
          onChange={(v) =>
            updateField("firstName", v)
          }
        />

        <Input
          required
          label="Nom"
          value={profile.lastName}
          onChange={(v) =>
            updateField("lastName", v)
          }
        />

        <Input
          required
          label="Headline"
          value={profile.headline}
          onChange={(v) =>
            updateField("headline", v)
          }
        />

        <Input
          required
          label="Email public"
          value={profile.email}
          onChange={(v) =>
            updateField("email", v)
          }
        />

        <Input
          required
          label="Ville"
          value={profile.city}
          onChange={(v) =>
            updateField("city", v)
          }
        />

        <Input
          required
          label="Pays"
          value={profile.country}
          onChange={(v) =>
            updateField("country", v)
          }
        />

        <Input
          label="Date de naissance"
          type="date"
          value={profile.dateOfBirth ?? ""}
          onChange={(v) =>
            updateField("dateOfBirth", v)
          }
        />
      </div>

      <div className="mt-4">
        <Textarea
          required
          label="Biographie"
          value={profile.bio}
          onChange={(v) =>
            updateField("bio", v)
          }
        />
      </div>
    </Section>
  );
}