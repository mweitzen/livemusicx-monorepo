import { formatISODuration, intervalToDuration } from "date-fns";

import {
  Person,
  MusicGroup,
  MusicVenue,
  MusicEvent,
  WithContext,
  Organization,
} from "schema-dts";

import type {
  MusicianDetails,
  GroupDetails,
  VenueDetails,
  OrganizerDetails,
  EventDetails,
} from "~/lib/types/outputs";

export function generateEventSeriesStructuredData(
  organizer: OrganizerDetails,
): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
  };
}
