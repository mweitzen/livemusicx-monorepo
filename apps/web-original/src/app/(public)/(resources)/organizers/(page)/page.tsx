import { api } from "@repo/trpc/server";
import { cookies } from "next/headers";
import { convertSearchParamsToQuery } from "@/lib/utils";

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
import {
  ToggleFilter,
  ToggleWithUpcomingEvents,
} from "@/components/public/filters";
import { FavoriteButton } from "@/components/public/interactions";

import { GetAllOrganizersInputSchema } from "@/lib/schema/accounts/organizers";

export default async function OrganizersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const cookieString = cookies().toString();

  const conversion = convertSearchParamsToQuery(searchParams);
  const query = GetAllOrganizersInputSchema.parse(conversion);

  const organizers = await api.v1.accounts.organizers.getAll(query);

  return (
    <ListPage cookies={cookieString}>
      <TypographyH2 className="mt-0 flex w-full items-end justify-between">
        Explore Organizers
        <ListShowFavorites />
      </TypographyH2>
      <List>
        <ListHeader>
          <ListSearchInput />
          <ListFilters />
        </ListHeader>
        <ListContent>
          {organizers && organizers.length
            ? organizers.map((organizer) => (
                <ListItem
                  key={organizer.id}
                  href={`/organizers/${organizer.slug}`}
                >
                  <ListItemImage imageSrc={organizer.avatar} />
                  <ListItemContent>
                    <ListItemTitle>{organizer.name}</ListItemTitle>
                  </ListItemContent>
                </ListItem>
              ))
            : "No organizers."}
        </ListContent>
      </List>
      {/* <ul>
        {organizers.length
          ? organizers.map((organizer) => (
              <li key={organizer.id}>{organizer.name}</li>
            ))
          : "No organizers."}
      </ul> */}
      {/* <PerformersList performers={performers} /> */}
    </ListPage>
  );
}
