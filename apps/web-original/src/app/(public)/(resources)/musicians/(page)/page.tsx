import Link from "next/link";

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

import { GetAllMusiciansInputSchema } from "~/lib/schema/accounts/musicians";

export default async function MusiciansPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const cookieString = cookies().toString();

  const conversion = convertSearchParamsToQuery(searchParams);
  const query = GetAllMusiciansInputSchema.parse(conversion);

  const musicians = await api.v1.accounts.musicians.getAll(query);

  return (
    <ListPage cookies={cookieString}>
      <TypographyH2 className="mt-0 flex w-full items-end justify-between">
        Explore Musicians
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
          {musicians.length
            ? musicians.map((musician) => (
                <ListItem
                  key={musician.id}
                  href={`/musicians/${musician.slug}`}
                >
                  <ListItemImage
                    imageSrc={musician.avatar}
                    imageAlt={musician.name}
                  />
                  <ListItemContent>
                    <ListItemTitle>{musician.name}</ListItemTitle>
                  </ListItemContent>
                </ListItem>
              ))
            : "No musicians."}
        </ListContent>
        {/* <ListPagination /> */}
      </List>
    </ListPage>
  );
}
