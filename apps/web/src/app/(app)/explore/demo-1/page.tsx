import { api } from "@repo/trpc/server";
import { convertSearchParamsToQuery } from "@repo/utils";

import { Card, CardContent } from "@repo/ui/components/card";
import { BookmarkButton } from "~/actions/events-components";

import {
  ResetFilters,
  SearchInput,
  ToggleFilter,
} from "~/components/features/filters";
import { SearchEventsInput } from "@repo/validators/events";
import { VenueTypeFilter } from "./filter";
import { Button } from "@repo/ui/components/button";

export default async function DemoPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const conversion = convertSearchParamsToQuery(searchParams);
  const query = SearchEventsInput.parse(conversion);

  const events = await api.events.getUpcoming(query);

  return (
    <div>
      <p className='mt-4 text-2xl'>Demos</p>
      <SearchInput />
      <VenueTypeFilter />
      <ToggleFilter
        name='isFree'
        label='Free Events'
      />
      <ToggleFilter
        name='bookmarked'
        label='Bookmarked Events'
      />
      <ToggleFilter
        name='favorites'
        label='Favorites'
      />
      <ToggleFilter
        name='isChildFriendly'
        label='Child Friendly'
      />
      <ToggleFilter
        name='isHoliday'
        label='Holday Events'
      />
      <ToggleFilter
        name='servesAlcohol'
        label='Serves Alcohol'
      />
      <ToggleFilter
        name='servesFood'
        label='Serves Food'
      />
      <ResetFilters />
      {!events.length ? (
        <p>Nothing Found</p>
      ) : (
        events.map((event) => (
          <Card>
            <BookmarkButton
              id={event.id}
              bookmarked={!!event.bookmarkedBy.length}
            />
            <form
              action={async () => {
                "use server";
                await api.events.addGenres({
                  resourceId: event.id,
                  tagId: "jazz",
                });
              }}
            >
              <Button>Add Jazz as Genre</Button>
            </form>
            <CardContent>
              <p>{event.name}</p>
              <p>{event.timeStart!.toString()}</p>
              <p>{event.timeEnd?.toString()}</p>
              {event.genres?.map((genre) => <p>{genre.id}</p>)}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
