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

const prismaToSchemaMap = {
  VENUE: "MusicVenue",
  AREA: "MusicVenue",
  CASINO: "MusicVenue",
  LOCATION: "MusicVenue",
  RESTAURANT: "Restaurant",
  CAFE: "CafeOrCoffeeShop",
  BAR: "BarOrPub",
  BREWERY: "Brewery",
  WINERY: "Winery",
  DISTILLERY: "Distillery",
  CLUB: "NightClub",
  THEATER: "PerformingArtsTheater",
  GALLERY: "ArtGallery",
  COMPLEX: "StadiumOrArena",
  STADIUM: "StadiumOrArena",
};

export function generateVenueStructuredData(
  venue: VenueDetails,
): WithContext<MusicVenue> {
  return {
    "@context": "https://schema.org",
    "@type": "MusicVenue",
    name: venue.name,
    sameAs:
      venue.website ||
      `${process.env.NEXT_PUBLIC_SITE_URL}/venues/${venue.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: venue.addressLong.split(",")[0],
      addressLocality: venue.addressLong.split(",")[1],
      addressRegion: venue.addressLong.split(",")[2]?.split(" ")[1],
      postalCode: venue.addressLong.split(",")[2]?.split(" ")[2],
      addressCountry: venue.addressLong.split(",")[3],
    },
  };
}
