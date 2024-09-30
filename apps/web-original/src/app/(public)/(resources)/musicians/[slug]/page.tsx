import { api } from "@repo/trpc/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import StructuredData from "~/components/shared/structured-data";
import { generateMusicianPageMetadata } from "~/lib/metadata";
import { generateMusicianStructuredData } from "~/lib/structured-data";
import { getSocialLinks } from "@repo/utils";
import {
  AboutInformation,
  WebsiteLink,
  SocialIcons,
  GenresList,
  LocationInformation,
  DetailsTitle,
  DetailsAccountType,
  DetailsHeader,
  DetailsImage,
  UpcomingEvents,
  AdditionalResources,
  MemberOfGroups,
  AffiliatedAccounts,
  RelatedMusicians,
} from "~/components/public/details";

export async function generateMetadata({
  params,
}: PublicDetailPageProps): Promise<Metadata> {
  const musician = await api.v1.accounts.musicians.getDetails({
    slug: params.slug,
  });
  if (!musician) return notFound();
  return generateMusicianPageMetadata(musician);
}

export default async function MusicianDetailPage({
  params,
}: PublicDetailPageProps) {
  const musician = await api.v1.accounts.musicians.getDetails({
    slug: params.slug,
  });
  if (!musician) return notFound();

  const jsonLd = generateMusicianStructuredData(musician);

  return (
    <>
      <StructuredData jsonLd={jsonLd} />
      <DetailsTitle>{musician.name}</DetailsTitle>
      <DetailsHeader>
        <DetailsImage src={musician.avatar} />
        <div>
          <DetailsAccountType>Musician</DetailsAccountType>
          <AboutInformation about={musician.about} />
        </div>
      </DetailsHeader>
      <GenresList genres={musician.genres} />
      <LocationInformation location={musician.basedIn} />
      <WebsiteLink link={musician.website} />
      <SocialIcons links={getSocialLinks(musician)} />

      <UpcomingEvents
        href={`/musicians/${musician.slug}/events`}
        events={musician.events}
      />
      <AdditionalResources />
      <MemberOfGroups groups={musician.groups} />
      <AffiliatedAccounts />
      <RelatedMusicians />
    </>
  );
}
