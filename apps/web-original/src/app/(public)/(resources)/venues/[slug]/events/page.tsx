import Link from "next/link";

import { api } from "@/lib/trpc/server";
import { convertSearchParamsToQuery } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { PageDescription, PageHeader, PageTitle } from "@/components/public/page";

import { GetAllVenuesInputSchema } from "@/lib/schema/accounts/venues";

export default async function VenueEventsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: SearchParams;
}) {
  const conversion = convertSearchParamsToQuery(searchParams);
  const query = GetAllVenuesInputSchema.parse(conversion);

  const venueEvents = await api.accounts.venues.getEvents.query({ slug: params.slug });

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
