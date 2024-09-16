"use client";
import { api } from "@/lib/trpc/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardMessages = () => {
  const { data: events, status } = api.users.authorized.getDashboardUpcomingEvents.useQuery();

  if (status === "loading")
    return (
      <CardContent>
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-3/4 h-3" />
      </CardContent>
    );
  if (status === "error") return <CardContent>Error</CardContent>;

  if (!event) return <CardContent>No messages.</CardContent>;

  return (
    <CardContent>
      {/* <p>{event.name}</p> */}
      {/* <p>{event.description}</p> */}
    </CardContent>
  );
};

export function DashboardMessagesSection(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Messages Quick View</CardTitle>
      </CardHeader>
      <DashboardMessages />
    </Card>
  );
}
