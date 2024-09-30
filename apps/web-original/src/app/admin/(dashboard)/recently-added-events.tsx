"use client";
import { api } from "@repo/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Skeleton } from "@repo/ui/components/skeleton";

const RecentlyAddedEvents = () => {
  const { data: events, status } =
    api.v1.users.authorized.getDashboardUpcomingEvents.useQuery();

  if (status === "loading")
    return (
      <CardContent>
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
      </CardContent>
    );
  if (status === "error") return <CardContent>Error</CardContent>;

  if (!event) return <CardContent>No event.</CardContent>;
  return (
    <CardContent>
      {/* <p>{event.name}</p> */}
      {/* <p>{event.description}</p> */}
    </CardContent>
  );
};

export function RecentlyAddedEventsSection(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Recently Added Events</CardTitle>
      </CardHeader>
      <RecentlyAddedEvents />
    </Card>
  );
}
