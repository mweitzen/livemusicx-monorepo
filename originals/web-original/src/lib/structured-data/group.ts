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

export function generateGroupStructuredData(group: GroupDetails): WithContext<MusicGroup> {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: group.name,
    description: "Live Music, Performing Group",
    disambiguatingDescription: group.about || undefined,
    image: group.avatar || undefined,
    telephone: group.phone || undefined,
    url: group.website || `${process.env.NEXT_PUBLIC_SITE_URL}/groups/${group.slug}`,
    email: group.email || undefined,
    genre: group.genres.map((genre) => genre.displayName),
    areaServed: group.basedIn
      ? {
          "@type": "City",
          name: group.basedIn.name,
          containedInPlace: {
            "@type": "State",
            name: "New Mexico",
          },
        }
      : {
          "@type": "State",
          name: "New Mexico",
        },
    event: group.events.length
      ? group.events.map((event) => ({
          "@type": "MusicEvent",
        }))
      : undefined,
    keywords: ["Live Music", "Performing Group", "Local Music", "Local Artist"],
    location: group.basedIn
      ? {
          "@type": "City",
          name: group.basedIn.name,
          containedInPlace: {
            "@type": "State",
            name: "New Mexico",
          },
        }
      : {
          "@type": "State",
          name: "New Mexico",
        },
    member: group.members
      ? group.members.map((member) => ({
          "@type": "Person",
          name: member.name,
          jobTitle: "Musician",
          description: "Musician",
          disambiguatingDescription: member.about || undefined,
          image: member.avatar || undefined,
          telephone: member.phone || undefined,
          url: member.website || `${process.env.NEXT_PUBLIC_SITE_URL}/musicians/${member.slug}`,
          email: member.email || undefined,
          sameAs: [
            `${process.env.NEXT_PUBLIC_SITE_URL}/musicians/${member.slug}`,
            member.socialBandcamp || "",
            member.socialFacebook || "",
            member.socialInstagram || "",
            member.socialSpotify || "",
            member.socialTwitter || "",
            member.socialYouTube || "",
          ].filter((link) => link !== ""),
        }))
      : undefined,
    sameAs: [
      group.socialBandcamp || "",
      group.socialFacebook || "",
      group.socialInstagram || "",
      group.socialSpotify || "",
      group.socialTwitter || "",
      group.socialYouTube || "",
    ].filter((link) => link !== ""),
  };
}
