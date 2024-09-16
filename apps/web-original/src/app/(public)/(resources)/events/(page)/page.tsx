import Link from "next/link";

import { api } from "@/lib/trpc/server";
import { cookies } from "next/headers";
import { convertSearchParamsToQuery } from "@/lib/utils";
import { format } from "date-fns";

import { ListPage } from "@/components/public/list-page";
import {
  List,
  ListHeader,
  ListShowFavorites,
  ListSearchInput,
  ListFilters,
  ListContent,
} from "@/components/public/list";
import {
  ListItem,
  ListItemContent,
  ListItemImage,
  ListItemTitle,
} from "@/components/public/list-item";
import { TypographyH2 } from "@/components/shared/typography";
import { ToggleFilter } from "@/components/public/filters";
import { BookmarkButton } from "@/components/public/interactions";

import { GetUpcomingEventsInputSchema } from "@/lib/schema/events";

export default async function EventsPage({ searchParams }: { searchParams: SearchParams }) {
  const cookieString = cookies().toString();
  const conversion = convertSearchParamsToQuery(searchParams);
  const query = GetUpcomingEventsInputSchema.parse(conversion);

  const events = await api.events.main.getUpcoming.query(query);
  const bookmarkedEvents: any[] = []; // await api.events.main.getBookmarked.query();

  return (
    <ListPage cookies={cookieString}>
      <TypographyH2 className="mt-0 flex w-full items-end justify-between">
        Explore Events
        <ListShowFavorites events />
      </TypographyH2>
      <List>
        <ListHeader>
          <ListSearchInput />
          <ListFilters>
            <ToggleFilter name="isFree" label="Free" />
            <ToggleFilter name="isChildFriendly" label="Child Friendly" />
            <ToggleFilter name="isHoliday" label="Holiday" />
          </ListFilters>
        </ListHeader>
        <ListContent>
          {events.length
            ? events.map((event) => (
                <ListItem key={event.id} href={`/events/${event.slug}`}>
                  <ListItemImage imageSrc={event.image} imageAlt={event.name} event />
                  <ListItemContent>
                    <ListItemTitle>{event.name}</ListItemTitle>
                    <p className="line-clamp-1 text-sm text-secondary-foreground md:text-base">
                      {event.description}
                    </p>
                    <p className="text-sm text-secondary-foreground md:text-base">
                      {format(event.timeStart, "MMM d")} {event.venue.name}
                    </p>
                    <BookmarkButton id={event.id} bookmarkedEvents={bookmarkedEvents} />
                  </ListItemContent>
                </ListItem>
              ))
            : "No events."}
        </ListContent>
      </List>
    </ListPage>
  );
}
