import type { Metadata } from "next";
import type {
  MusicianDetails,
  GroupDetails,
  VenueDetails,
  OrganizerDetails,
  EventDetails,
} from "~/lib/types/outputs";

import { siteName } from "~/lib/content/global";

function generateMusicianPageMetadata(
  musician: MusicianDetails | null,
): Metadata {
  if (!musician) return {};

  return {
    title: musician.name,
    description:
      musician.about ||
      `${musician.name} is a musician playing live music in New Mexico. Come check out their music events.`,
    openGraph: {
      images: [musician.avatar || ""],
      title: `${musician.name} on ${siteName}`,
      description:
        musician.about ||
        `${musician.name} is a musician playing live music in New Mexico. Come check out their music events.`,
      type: "website",
    },
  };
}

function generateGroupPageMetadata(group: GroupDetails | null): Metadata {
  if (!group) return {};

  return {
    title: group.name,
    description:
      group.about ||
      `${group.name} is a music group playing live music in New Mexico. Come check out their music events.`,
    openGraph: {
      images: [group.avatar || ""],
      title: `${group.name} on ${siteName}`,
      description:
        group.about ||
        `${group.name} is a music group playing live music in New Mexico. Come check out their music events.`,
      type: "website",
    },
  };
}

function generateVenuePageMetadata(venue: VenueDetails | null): Metadata {
  if (!venue) return {};

  return {
    title: venue.name,
    description:
      venue.about ||
      `${venue.name} is a live music venue in New Mexico. Come check out their music events.`,
    openGraph: {
      images: [venue.avatar || ""],
      title: `${venue.name} on ${siteName}`,
      description:
        venue.about ||
        `${venue.name} is a live music venue in New Mexico. Come check out their music events.`,
      type: "website",
    },
  };
}

function generateOrganizerPageMetadata(
  organizer: OrganizerDetails | null,
): Metadata {
  if (!organizer) return {};

  return {};
}

function generateEventPageMetadata(event: EventDetails | null): Metadata {
  if (!event) return {};

  return {
    title: event.name,
    description:
      event.description || `${event.name} is a live music event in New Mexico.`,
    openGraph: {
      images: [event.image || ""],
      title: `${event.name} on ${siteName}`,
      description:
        event.description ||
        `${event.name} is a live music event in New Mexico.`,
      type: "website",
    },
  };
}

export {
  generateMusicianPageMetadata,
  generateGroupPageMetadata,
  generateVenuePageMetadata,
  generateOrganizerPageMetadata,
  generateEventPageMetadata,
};
