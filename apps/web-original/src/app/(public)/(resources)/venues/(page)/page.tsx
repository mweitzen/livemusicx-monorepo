import { api } from "@repo/trpc/server";
import { cookies } from "next/headers";
import { convertSearchParamsToQuery } from "@repo/utils";

import {
  List,
  ListHeader,
  ListShowFavorites,
  ListSearchInput,
  ListFilters,
  ListContent,
  // ListDateInput,
} from "~/components/public/list";
import {
  ListItem,
  ListItemContent,
  ListItemImage,
  ListItemTitle,
} from "~/components/public/list-item";
import { ListPage } from "~/components/public/list-page";
import { TypographyH2 } from "~/components/shared/typography";
import { ToggleWithUpcomingEvents } from "~/components/public/filters";

import { GetAllVenuesInputSchema } from "~/lib/schema/accounts/venues";

export default async function MusiciansPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const cookieString = cookies().toString();
  const conversion = convertSearchParamsToQuery(searchParams);
  const query = GetAllVenuesInputSchema.parse(conversion);

  const venues = await api.v1.accounts.venues.getAll(query);
  const venuesTotal = await api.v1.accounts.venues.getCount;

  return (
    <ListPage cookies={cookieString}>
      <TypographyH2 className="mt-0 flex w-full items-end justify-between">
        Explore Venues
        <ListShowFavorites />
      </TypographyH2>
      <List>
        <ListHeader>
          <ListSearchInput />
          {/* <ListDateInput /> */}
          <ListFilters>
            <ToggleWithUpcomingEvents />
          </ListFilters>
        </ListHeader>
        <ListContent>
          {venues.length
            ? venues.map((venue) => (
                <ListItem key={venue.id} href={`/venues/${venue.slug}`}>
                  <ListItemImage imageSrc={venue.avatar} />
                  <ListItemContent>
                    <ListItemTitle>{venue.name}</ListItemTitle>
                  </ListItemContent>
                </ListItem>
              ))
            : "No venues."}
        </ListContent>
      </List>

      <p>Total count: {venuesTotal}</p>
    </ListPage>
  );
}
