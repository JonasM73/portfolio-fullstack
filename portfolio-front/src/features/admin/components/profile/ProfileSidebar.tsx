import {
  BadgeCheck,
  Code2,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
} from "lucide-react";

import type { UserProfile } from "../../services/profileService";
import { Preview } from "./shared/Preview";

type Props = {
  profile: UserProfile;
  completion: number;
};

export function ProfileSidebar({ profile, completion }: Props) {
  return (
    <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-lg lg:sticky lg:top-8">
      <div className="rounded-[1.5rem] bg-zinc-950 p-5 text-white">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-lg font-black">
          {(profile.firstName?.[0] ?? "J")}
          {(profile.lastName?.[0] ?? "M")}
        </div>

        <h2 className="mt-4 text-xl font-black">
          {profile.firstName || "Prénom"} {profile.lastName || "Nom"}
        </h2>

        <p className="mt-1 text-sm text-white/60">
          {profile.headline || "Headline non renseignée"}
        </p>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm font-bold">
          <span>Complétion obligatoire</span>
          <span>{completion}%</span>
        </div>

        <div className="h-3 rounded-full bg-zinc-100">
          <div
            className="h-3 rounded-full bg-teal-500 transition-all"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <Preview icon={<Mail />} value={profile.email || "Email non renseigné"} />
        <Preview
          icon={<MapPin />}
          value={`${profile.city || "Ville"}, ${profile.country || "Pays"}`}
        />
        <Preview
          icon={<GraduationCap />}
          value={`${profile.education?.length ?? 0} formation(s)`}
        />
        <Preview
          icon={<Languages />}
          value={`${profile.languages?.length ?? 0} langue(s)`}
        />
        <Preview
          icon={<BadgeCheck />}
          value={`${profile.licenses?.length ?? 0} permis`}
        />
        <Preview
          icon={<Code2 />}
          value={`${profile.skills?.length ?? 0} compétence(s)`}
        />
      </div>
    </aside>
  );
}