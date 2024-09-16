import { api } from "@/lib/trpc/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import StructuredData from "@/components/shared/structured-data";
import { generateGroupPageMetadata } from "@/lib/metadata";
import { generateGroupStructuredData } from "@/lib/structured-data";
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
  GroupMembers,
  AffiliatedAccounts,
} from "@/components/public/details";

export async function generateMetadata({ params }: PublicDetailPageProps): Promise<Metadata> {
  const group = await api.accounts.groups.getDetails.query({
    slug: params.slug,
  });
  if (!group) return notFound();
  return generateGroupPageMetadata(group);
}

export default async function GroupDetailPage({ params }: PublicDetailPageProps) {
  const group = await api.accounts.groups.getDetails.query({
    slug: params.slug,
  });
  if (!group) return notFound();

  const jsonLd = generateGroupStructuredData(group);

  return (
    <>
      <StructuredData jsonLd={jsonLd} />
      <DetailsTitle>{group.name}</DetailsTitle>
      <DetailsHeader>
        <DetailsImage src={group.avatar} />
        <div>
          <AboutInformation about={group.about} />
          <GenresList genres={group.genres} />
        </div>
      </DetailsHeader>
      <LocationInformation location={group.basedIn} />
      <WebsiteLink link={group.website} />
      <SocialIcons links={getSocialLinks(group)} />
      <UpcomingEvents href={`/groups/${group.slug}/events`} events={group.events} />
      <GroupMembers members={group.members} />
      <AdditionalResources />
      <AffiliatedAccounts />
    </>
  );
}
