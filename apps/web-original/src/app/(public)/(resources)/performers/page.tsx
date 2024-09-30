import { api } from "@repo/trpc/server";
import { cookies } from "next/headers";
import { convertSearchParamsToQuery } from "@repo/utils";

import { ListPage } from "~/components/public/list-page";
import {
  List,
  ListHeader,
  ListShowFavorites,
  ListSearchInput,
  ListFilters,
  ListContent,
} from "~/components/public/list";
import {
  ListItem,
  ListItemContent,
  ListItemImage,
  ListItemTitle,
} from "~/components/public/list-item";
import { TypographyH2 } from "~/components/shared/typography";
import {
  ToggleFilter,
  TogglePerformerType,
  ToggleWithUpcomingEvents,
} from "~/components/public/filters";
import { FavoriteButton } from "~/components/public/interactions";

import { GetAllPerformersInputSchema } from "~/lib/schema/accounts/performers";

export default async function PerformersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const cookieString = cookies().toString();

  const conversion = convertSearchParamsToQuery(searchParams);
  const query = GetAllPerformersInputSchema.parse(conversion);

  const performers = await api.v1.accounts.performers.getAll(query);
  const favoritePerformers: any[] = [];

  return (
    <ListPage cookies={cookieString}>
      <TypographyH2 className="mt-0 flex w-full items-end justify-between">
        Explore Performers
        <ListShowFavorites />
      </TypographyH2>
      <List>
        <ListHeader>
          <ListSearchInput />
          <ListFilters>
            <ToggleWithUpcomingEvents />
            <TogglePerformerType />
          </ListFilters>
        </ListHeader>
        <ListContent>
          {performers.length
            ? performers.map((performer) => (
                <ListItem
                  key={performer.id}
                  href={`/${performer.performerType + "s"}/${performer.slug}`}
                >
                  <ListItemImage
                    imageSrc={performer.avatar}
                    imageAlt={performer.name}
                  />
                  <ListItemContent>
                    <ListItemTitle>{performer.name}</ListItemTitle>
                    {/* <ListItemGenres genres={performer.genres} /> */}
                    <FavoriteButton
                      id={performer.id}
                      type={performer.performerType as "musician" | "group"}
                      favorites={favoritePerformers}
                    />
                  </ListItemContent>
                </ListItem>
              ))
            : "No performers."}
        </ListContent>
      </List>
    </ListPage>
  );
}
