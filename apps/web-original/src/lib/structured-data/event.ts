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
} from "@/lib/types/outputs";

export function generateEventStructuredData(event: EventDetails): WithContext<MusicEvent> {
  const performers = [...event.musicians, ...event.groups];

  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: event.name,
    audience: "Music lovers",
    description: event.description,
    startDate: new Date(event.timeStart).toISOString(),
    image: event.image || undefined,
    url: `https://${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.slug}`,
    doorTime: event.timeDoor ? new Date(event.timeDoor).toISOString() : undefined,
    duration: event.timeEnd
      ? formatISODuration(
          intervalToDuration({
            start: new Date(event.timeStart),
            end: new Date(event.timeEnd),
          })
        )
      : undefined,
    endDate: event.timeEnd ? new Date(event.timeEnd).toISOString() : undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    inLanguage: "en-US",
    isAccessibleForFree: event.isFree ? "https://schema.org/True" : "https://schema.org/False",
    keywords: [
      "Live Music",
      ...event.genres.map((genre) => genre.displayName),
      ...event.keywords.map((keyword) => keyword.displayName),
    ],
    location: {
      "@type": "Place",
      name: event.venue.name,
      sameAs:
        event.venue.website || `${process.env.NEXT_PUBLIC_SITE_URL}/venues/${event.venue.slug}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.venue.addressLong.split(",")[0],
        addressLocality: event.venue.addressLong.split(",")[1],
        addressRegion: event.venue.addressLong.split(",")[2].split(" ")[1],
        postalCode: event.venue.addressLong.split(",")[2].split(" ")[2],
        addressCountry: event.venue.addressLong.split(",")[3],
      },
    },
    // offers: [],
    organizer: event.organizer
      ? { "@type": "Organization", name: event.organizer.name }
      : { "@type": "Organization", name: event.venue.name },
    performer: performers.map((performer) =>
      performer.performerType === "musician"
        ? { "@type": "Person", name: performer.name }
        : { "@type": "MusicGroup", name: performer.name }
    ),
    // previousStartDate: event.timeStartPrevious || undefined,
    // eventSchedule: {},
    // superEvent: {},
    // typicalAgeRange: "",
  };
}
