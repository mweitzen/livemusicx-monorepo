import Link from "next/link";

import { api } from "@repo/trpc/server";
import { convertSearchParamsToQuery } from "@repo/utils";

import { Card, CardContent } from "@repo/ui/components/card";
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "~/components/public/page";

import { GetAllVenuesInputSchema } from "~/lib/schema/accounts/venues";

export default async function VenueEventsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: SearchParams;
}) {
  const conversion = convertSearchParamsToQuery(searchParams);
  const query = GetAllVenuesInputSchema.parse(conversion);

  const venueEvents = await api.v1.accounts.venues.getEvents({
    slug: params.slug,
  });

  return (
    <>
      <PageHeader>
        <PageTitle>Venue Name</PageTitle>
        <PageDescription>Upcoming events</PageDescription>
      </PageHeader>
      <div className="flex flex-col">
        {venueEvents.map((event) => (
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
