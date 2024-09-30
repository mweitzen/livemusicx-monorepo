import { siteName } from "~/lib/content/global";
import { api } from "@repo/trpc/server";

// import { AdminListCard } from "~/components/admin-list-card";
import { TypographyH1, TypographyLead } from "~/components/shared/typography";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";

import type { Metadata } from "next";
import {
  AdminPageDescription,
  AdminPageHeader,
  AdminPageTitle,
} from "~/components/admin/page";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: `Events - Admin | ${siteName}`,
  },
};

export default async function AdminEventsPage() {
  // const usersEvents = await api.v1.events.getUsersEvents;

  return (
    <>
      {/* <AdminPageHeader>
        <AdminPageTitle>Your Events</AdminPageTitle>
        <AdminPageDescription>Manage your events.</AdminPageDescription>
      </AdminPageHeader> */}
      <Tabs defaultValue="published">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="postponed">Postponed</TabsTrigger>
        </TabsList>
        <TabsContent value="published">
          {/* <AdminListCard
            createButton
            items={usersEvents}
            title="Events"
            description={"Mixed list of your performer accounts."}
          /> */}
          <Button asChild>
            <Link href="/admin/events/create">Create Event</Link>
          </Button>
        </TabsContent>
        <TabsContent value="drafts">
          {/* <AdminListCard
            createButton
            items={usersEvents}
            title="Events"
            description={`Your individual musician accounts. (You can manage more than one "persona" if you would like.)`}
          /> */}
          <Button asChild>
            <Link href="/admin/events/create">Start Draft</Link>
          </Button>
        </TabsContent>
        <TabsContent value="postponed">
          {/* <AdminListCard
            createButton
            items={usersEvents}
            title="Events"
            description={`Any group accounts you have created, or are a member of.`}
          /> */}
        </TabsContent>
      </Tabs>
    </>
  );
}
