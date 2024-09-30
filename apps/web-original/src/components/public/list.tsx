import * as React from "react";

import { cn } from "@repo/ui/helpers";

import { Button } from "@repo/ui/components/button";
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";
import { ResetFilters, ToggleFilter } from "~/components/public/filters";
import { SearchInput, SearchInputProps } from "./filters";

import {
  StarIcon,
  BookmarkIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";

import {
  StarIcon as StarIconFilled,
  BookmarkIcon as BookmarkIconFilled,
} from "@heroicons/react/24/solid";
// import { DatePickerWithRange } from "../shared/date-range-picker";

import { Skeleton } from "@repo/ui/components/skeleton";
import { Toggle } from "@repo/ui/components/toggle";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/pagination";

const List = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
List.displayName = "List";

const ListHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-wrap gap-y-1.5 py-2 lg:py-4", className)}
    {...props}
  />
));
ListHeader.displayName = "ListHeader";

const ListTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "flex-grow self-end text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
ListTitle.displayName = "ListTitle";

const ListShowFavorites = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    events?: boolean;
    loading?: boolean;
  }
>(({ className, events, loading, ...props }, ref) => {
  if (loading)
    return (
      <Toggle variant="outline" className="bg-muted" disabled asChild>
        <Skeleton>
          <StarIcon className="h-6 w-6" />
        </Skeleton>
      </Toggle>
    );

  return (
    <div
      ref={ref}
      className={cn("flex flex-shrink-0 space-x-2", className)}
      {...props}
    >
      <ToggleFilter
        name="favorites"
        label={<StarIcon className="h-6 w-6" />}
        selectedLabel={<StarIconFilled className="h-6 w-6" />}
      />
      <ToggleFilter
        hidden={!events}
        name="bookmarked"
        label={<BookmarkIcon className="h-6 w-6" />}
        selectedLabel={<BookmarkIconFilled className="h-6 w-6" />}
      />
    </div>
  );
});
ListShowFavorites.displayName = "ListShowFavorites";

const ListSearchInput = ({
  className,
  loading,
  ...props
}: SearchInputProps & {
  loading?: boolean;
}) => (
  <SearchInput
    {...props}
    className={cn("flex-1 basis-full", className)}
    disabled={loading}
  />
);
ListSearchInput.displayName = "ListSearchInput";

// const ListDateInput = () => <DatePickerWithRange className="basis-full" />;
// ListDateInput.displayName = "ListDateInput";

const ListFilters = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <ScrollArea className="w-full basis-full pb-2">
    <div
      ref={ref}
      className={cn("flex flex-nowrap gap-x-2", className)}
      {...props}
    >
      <Button variant="outline">
        <AdjustmentsVerticalIcon className="mr-1 h-5 w-5" /> Filter
      </Button>
      <ResetFilters />
      {children}
      {/* <div>Filters applied...</div> */}
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
));
ListFilters.displayName = "ListFilters";

const ListContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    loading?: boolean;
  }
>(({ className, loading, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-y-2", className)} {...props}>
    {loading
      ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div key={item}>Loading....</div>
        ))
      : children}
  </div>
));
ListContent.displayName = "ListContent";

const ListItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
ListItem.displayName = "ListItem";

const ListFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
ListFooter.displayName = "ListFooter";

const ListPagination = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="?page=0" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="?page=1">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="?page=2">2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="?page=2" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
));
ListPagination.displayName = "ListPagination";

export {
  List,
  ListHeader,
  ListTitle,
  ListShowFavorites,
  ListSearchInput,
  // ListDateInput,
  ListFilters,
  ListContent,
  ListItem,
  ListFooter,
  ListPagination,
};
