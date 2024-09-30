import Link from "next/link";

import { api } from "@repo/trpc/server";
import { convertSearchParamsToQuery } from "@repo/utils";

import { Card, CardContent } from "@repo/ui/components/card";
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "~/components/public/page";

import { GetGroupEventsInputSchema } from "~/lib/schema/accounts/groups";

export default async function GroupEventsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: SearchParams;
}) {
  const conversion = convertSearchParamsToQuery(searchParams);
  const query = GetGroupEventsInputSchema.parse(conversion);

  const groupEvents = await api.v1.accounts.groups.getEvents({
    slug: params.slug,
  });

  return (
    <>
      <PageHeader>
        <PageTitle>Group Name Events</PageTitle>
        <PageDescription>Group Name Events Description</PageDescription>
      </PageHeader>
      <div className="flex flex-col">
        {groupEvents.map((event) => (
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
