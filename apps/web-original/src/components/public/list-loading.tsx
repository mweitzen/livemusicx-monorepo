import { Input } from "@repo/ui/components/input";
import { Skeleton } from "@repo/ui/components/skeleton";
import { TypographyH2 } from "~/components/shared/typography";
import {
  List,
  ListContent,
  ListHeader,
  ListShowFavorites,
} from "~/components/public/list";
import { Button } from "@repo/ui/components/button";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import { ListItem } from "./list-item";

function ListLoading({ title }: { title: string }) {
  return (
    <>
      <TypographyH2 className="mt-0 flex w-full items-end justify-between">
        {title}
        <ListShowFavorites events loading />
      </TypographyH2>
      <List>
        <ListHeader>
          <Skeleton className="w-full">
            <Input disabled placeholder="Search" className="w-full" />
          </Skeleton>
          <Button variant="outline" asChild>
            <Skeleton>
              <AdjustmentsVerticalIcon className="mr-1 inline-block h-5 w-5" />{" "}
              Filter
            </Skeleton>
          </Button>
        </ListHeader>
        <ListContent>
          <div className="grid h-52 w-full place-content-center">
            <div className="h-24 w-24 animate-spin rounded-full border-4 border-b-0" />
          </div>
        </ListContent>
      </List>
    </>
  );
}

export { ListLoading };
