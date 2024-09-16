import { RouterOutputs } from "@/lib/trpc/shared";

export type MusicianDetails = NonNullable<RouterOutputs["accounts"]["musicians"]["getDetails"]>;
export type GroupDetails = NonNullable<RouterOutputs["accounts"]["groups"]["getDetails"]>;
export type VenueDetails = NonNullable<RouterOutputs["accounts"]["venues"]["getDetails"]>;
export type OrganizerDetails = NonNullable<
  RouterOutputs["accounts"]["organizers"]["getDetails"]
>;
export type EventDetails = NonNullable<RouterOutputs["events"]["main"]["getDetails"]>;
