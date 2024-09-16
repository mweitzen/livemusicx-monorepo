import Link from "next/link";

import { api } from "@/lib/trpc/server";
import { convertSearchParamsToQuery } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { PageDescription, PageHeader, PageTitle } from "@/components/public/page";

import { GetMusicianEventsInputSchema } from "@/lib/schema/accounts/musicians";

export default async function MusicianEventsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: SearchParams;
}) {
  const conversion = convertSearchParamsToQuery(searchParams);
  const query = GetMusicianEventsInputSchema.parse(conversion);

  const musicianEvents = await api.accounts.musicians.getEvents.query({ slug: params.slug });

  return (
    <>
      <PageHeader>
        <PageTitle>Musician Name</PageTitle>
        <PageDescription>Upcoming events</PageDescription>
      </PageHeader>
      <div className="flex flex-col">
        {musicianEvents.map((event) => (
          <Link key={event.id} href={`/events/${event.slug}`}>
            <Card>
              <CardContent>
                <p>{event.name}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
