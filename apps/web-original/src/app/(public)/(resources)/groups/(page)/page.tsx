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

import { GetAllGroupsInputSchema } from "~/lib/schema/accounts/groups";

export default async function GroupsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const cookieString = cookies().toString();

  const conversion = convertSearchParamsToQuery(searchParams);
  const query = GetAllGroupsInputSchema.parse(conversion);

  const groups = await api.v1.accounts.groups.getAll(query);
  const favoriteGroups: any[] = [];
  // const favoriteGroups = await api.v1.users.public.getFavoriteAccounts({
  //   accountType: "groups",
  // });

  return (
    <ListPage cookies={cookieString}>
      <TypographyH2 className="mt-0 flex w-full items-end justify-between">
        Explore Groups
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
          {groups.length
            ? groups.map((group) => (
                <ListItem key={group.id} href={`/groups/${group.slug}`}>
                  <ListItemImage
                    imageSrc={group.avatar}
                    imageAlt={group.name}
                  />
                  <ListItemContent>
                    <ListItemTitle>{group.name}</ListItemTitle>
                    <FavoriteButton
                      id={group.id}
                      type="group"
                      favorites={favoriteGroups}
                    />
                  </ListItemContent>
                </ListItem>
              ))
            : "No groups."}
        </ListContent>
      </List>
    </ListPage>
  );
}
