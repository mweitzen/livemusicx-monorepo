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

const DashboardAffiliateRequests = () => {
  const { data: events, status } = api.users.authorized.getDashboardUpcomingEvents.useQuery();

  if (status === "loading")
    return (
      <CardContent>
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-3/4 h-3" />
      </CardContent>
    );
  if (status === "error") return <CardContent>Error</CardContent>;

  if (!event) return <CardContent>No requests.</CardContent>;

  return (
    <CardContent>
      {/* <p>{event.name}</p> */}
      {/* <p>{event.description}</p> */}
    </CardContent>
  );
};

export function DashboardAffiliateRequestsSection(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Affiliate Requests</CardTitle>
      </CardHeader>
      <DashboardAffiliateRequests />
    </Card>
  );
}
