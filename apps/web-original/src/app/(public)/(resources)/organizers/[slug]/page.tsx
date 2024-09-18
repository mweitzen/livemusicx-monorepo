import { api } from "@repo/trpc/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import StructuredData from "@/components/shared/structured-data";
import { generateOrganizerPageMetadata } from "@/lib/metadata";
import { generateOrganizerStructuredData } from "@/lib/structured-data";
import { getSocialLinks } from "@/lib/utils";
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
} from "@/components/public/details";

export async function generateMetadata({
  params,
}: PublicDetailPageProps): Promise<Metadata> {
  const organizer = await api.v1.accounts.organizers.getDetails({
    slug: params.slug,
  });
  if (!organizer) return notFound();
  return generateOrganizerPageMetadata(organizer);
}

export default async function OrganizerDetailPage({
  params,
}: PublicDetailPageProps) {
  const organizer = await api.v1.accounts.organizers.getDetails({
    slug: params.slug,
  });
  if (!organizer) return notFound();

  const jsonLd = generateOrganizerStructuredData(organizer);

  return (
    <>
      <StructuredData jsonLd={jsonLd} />
      <DetailsHeader>
        <DetailsImage src={organizer.avatar} />
        <div className="space-y-2">
          <DetailsTitle>{organizer.name}</DetailsTitle>
          <LocationInformation location={organizer.basedIn} />
        </div>
      </DetailsHeader>
      <GenresList genres={organizer.genres} />
      <AboutInformation about={organizer.about} />
      <WebsiteLink link={organizer.website} />
      <SocialIcons links={getSocialLinks(organizer)} />
      <UpcomingEvents
        href={`/organizers/${organizer.slug}/events`}
        events={organizer.events}
      />
      <AdditionalResources />
      <AffiliatedAccounts />
    </>
  );
}
