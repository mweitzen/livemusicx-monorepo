import Link from "next/link";

import { api } from "@repo/trpc/server";
import { convertSearchParamsToQuery } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/public/page";

import { GetAllOrganizersInputSchema } from "@/lib/schema/accounts/organizers";

export default async function OrganizerEventsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: SearchParams;
}) {
  const conversion = convertSearchParamsToQuery(searchParams);
  const query = GetAllOrganizersInputSchema.parse(conversion);

  const organizerEvents = await api.v1.accounts.organizers.getEvents({
    slug: params.slug,
  });

  return (
    <>
      <PageHeader>
        <PageTitle>Organizer Name</PageTitle>
        <PageDescription>Upcoming events</PageDescription>
      </PageHeader>
      <div className="flex flex-col">
        {organizerEvents.map((event) => (
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
