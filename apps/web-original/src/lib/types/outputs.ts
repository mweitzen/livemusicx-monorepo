import { RouterOutputs } from "@repo/trpc";

export type MusicianDetails = NonNullable<
  RouterOutputs["v1"]["accounts"]["musicians"]["getDetails"]
>;
export type GroupDetails = NonNullable<
  RouterOutputs["v1"]["accounts"]["groups"]["getDetails"]
>;
export type VenueDetails = NonNullable<
  RouterOutputs["v1"]["accounts"]["venues"]["getDetails"]
>;
export type OrganizerDetails = NonNullable<
  RouterOutputs["v1"]["accounts"]["organizers"]["getDetails"]
>;
export type EventDetails = NonNullable<
  RouterOutputs["v1"]["events"]["main"]["getDetails"]
>;
