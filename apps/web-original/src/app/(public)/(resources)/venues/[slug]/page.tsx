import { api } from "@repo/trpc/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import StructuredData from "~/components/shared/structured-data";
import { generateVenuePageMetadata } from "~/lib/metadata";
import { generateVenueStructuredData } from "~/lib/structured-data";
import { getSocialLinks } from "@repo/utils";
import {
  AboutInformation,
  WebsiteLink,
  SocialIcons,
  GenresList,
  LocationInformation,
  DetailsTitle,
  DetailsHeader,
  DetailsImage,
  UpcomingEvents,
  AdditionalResources,
  MemberOfGroups,
  AffiliatedAccounts,
} from "~/components/public/details";

export async function generateMetadata({
  params,
}: PublicDetailPageProps): Promise<Metadata> {
  const venue = await api.v1.accounts.venues.getDetails({
    slug: params.slug,
  });
  if (!venue) return notFound();
  return generateVenuePageMetadata(venue);
}

export default async function VenueDetailPage({
  params,
}: PublicDetailPageProps) {
  const venue = await api.v1.accounts.venues.getDetails({
    slug: params.slug,
  });
  if (!venue) return notFound();

  const jsonLd = generateVenueStructuredData(venue);

  return (
    <>
      <StructuredData jsonLd={jsonLd} />
      <DetailsTitle>{venue.name}</DetailsTitle>
      <DetailsHeader>
        <DetailsImage src={venue.avatar} />
        <div className="flex-shrink overflow-hidden">
          <p className="text-sm uppercase text-muted-foreground">
            {venue.type}
          </p>
          <AboutInformation about={venue.about} />
        </div>
      </DetailsHeader>
      <GenresList genres={venue.genres} />
      <LocationInformation location={{ name: venue.addressShort }} />
      <WebsiteLink link={venue.website} />
      <SocialIcons links={getSocialLinks(venue)} />
      <UpcomingEvents
        href={`/venues/${venue.slug}/events`}
        events={venue.events}
      />
      <AdditionalResources />
      <AffiliatedAccounts />
    </>
  );
}
