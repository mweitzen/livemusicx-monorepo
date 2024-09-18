"use client";
import { api } from "@repo/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const NextEvent = () => {
  const { data: event, status } =
    api.v1.users.authorized.getNextEvent.useQuery();

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
      <p>{event.name}</p>
      <p>{event.description}</p>
    </CardContent>
  );
};

export function NextEventSection(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Next Event</CardTitle>
      </CardHeader>
      <NextEvent />
    </Card>
  );
}
