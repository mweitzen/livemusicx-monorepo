import { api } from "@repo/trpc/server";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import { convertSearchParamsToQuery } from "@repo/utils";
import { SearchEventsInput } from "@repo/validators/events";
import Link from "next/link";
import { Suspense } from "react";
import { BookmarkButton } from "~/actions/events-components";
import { SearchInput } from "~/components/features/filters";

export default async function DemoPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const conversion = convertSearchParamsToQuery(searchParams);
  const query = SearchEventsInput.parse(conversion);

  const events = await api.events.getUpcoming(query);

  if (!events.length) {
    return <p>Nothing found.</p>;
  }

  return (
    <div>
      <p className='mt-4 text-2xl'>Demos</p>
      <SearchInput />
      {events.map((event) => (
        <Link
          key={event.id}
          href={`/event/${event.slug}`}
          className='rounded-xl'
        >
          <Card>
            <Suspense fallback={<p>Loading...</p>}>
              <BookmarkButton
                id={event.id}
                bookmarked={!!event.bookmarkedBy.length}
              />
            </Suspense>
            <CardContent>
              <p>{event.name}</p>
              <p>{event.timeStart.toString()}</p>
              <p>{event.timeEnd?.toString()}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
