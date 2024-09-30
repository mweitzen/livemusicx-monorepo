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

export function generateMusicianStructuredData(
  musician: MusicianDetails,
): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: musician.name,
    jobTitle: "Musician",
    description: "Musician",
    disambiguatingDescription: musician.about || undefined,
    image: musician.avatar || undefined,
    telephone: musician.phone || undefined,
    url:
      musician.website ||
      `${process.env.NEXT_PUBLIC_SITE_URL}/musicians/${musician.slug}`,
    email: musician.email || undefined,
    homeLocation: musician.basedIn
      ? {
          "@type": "City",
          name: musician.basedIn.name,
          containedInPlace: {
            "@type": "State",
            name: "New Mexico",
          },
        }
      : {
          "@type": "State",
          name: "New Mexico",
        },
    workLocation: musician.basedIn
      ? {
          "@type": "City",
          name: musician.basedIn.name,
          containedInPlace: {
            "@type": "State",
            name: "New Mexico",
            containedInPlace: {
              "@type": "Country",
              name: "United States",
            },
          },
        }
      : {
          "@type": "State",
          name: "New Mexico",
        },
    performerIn: musician.events.length
      ? musician.events.map((event) => ({
          "@type": "MusicEvent",
        }))
      : undefined,
    memberOf: musician.groups.length
      ? musician.groups.map((group) => ({
          "@type": "MusicGroup",
          name: group.name,
          description: "Live Music, Performing Group",
          disambiguatingDescription: group.about || undefined,
          image: group.avatar || undefined,
          telephone: group.phone || undefined,
          url: group.website || "thisSite",
          email: group.email || undefined,
          // genre: group.genres.map(genre=>genre.display_name),
          sameAs: [
            `thisSite.com/groups/${group.slug}`,
            group.socialBandcamp || "",
            group.socialFacebook || "",
            group.socialInstagram || "",
            group.socialSpotify || "",
            group.socialTwitter || "",
            group.socialYouTube || "",
          ].filter((link) => link !== ""),
        }))
      : undefined,
    // affiliation: [
    //  venues on their roster, organizers
    // ],
    // colleague: [
    // other members in the groups they are in
    // ],
    sameAs: [
      musician.socialBandcamp || "",
      musician.socialFacebook || "",
      musician.socialInstagram || "",
      musician.socialSpotify || "",
      musician.socialTwitter || "",
      musician.socialYouTube || "",
    ].filter((link) => link !== ""),
  };
}
