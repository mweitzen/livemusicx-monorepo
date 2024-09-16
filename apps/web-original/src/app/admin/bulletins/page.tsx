import { Badge, type BadgeProps } from "@/components/ui/badge";
import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { CardGrid } from "@/components/shared/card-grid";
import { TypographyH1, TypographyLead } from "@/components/shared/typography";
import { currentUser } from "@/lib/auth";
import { AdminPageDescription, AdminPageHeader, AdminPageTitle } from "@/components/admin/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BulletinCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card>
      <CardContent className="flex-grow pt-6">{children}</CardContent>
      <div className="flex justify-end space-x-4 p-4">
        <Button>Reply</Button>
        <Button>
          <BookmarkIcon className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

const CardTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h3 className="text-lg font-bold" {...props} />;
};
const CardBadge = (props: BadgeProps) => {
  return <Badge className="mb-2" {...props} />;
};
const CardDescription = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <p className="line-clamp-3 text-sm text-gray-600" {...props} />;
};

export default async function AdminBulletinsPage() {
  const user = await currentUser();
  if (!user) return null;

  const accountType = user.accountType;
  const otherAccounts = ["VENUE", "ORGANIZER", "PERFORMER"].filter(
    (type) => type !== accountType
  );

  return (
    <Tabs defaultValue="feed">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="feed">Feed</TabsTrigger>
        <TabsTrigger value="posts">Your Posts</TabsTrigger>
        <TabsTrigger value="replies">Replies</TabsTrigger>
      </TabsList>
      <TabsContent value="feed">
        <CardGrid>
          <BulletinCard>
            <CardBadge>Organizers Seeking Venues</CardBadge>
            <CardTitle>Spring Music Festival</CardTitle>
            <CardDescription>
              San Francisco, CA - Looking for a large outdoor venue in the San Francisco area
              for a music festival in May. Expected attendance of 5,000+
            </CardDescription>
          </BulletinCard>
          <BulletinCard>
            <Badge className="mb-2">Venues Seeking Performers</Badge>
            <h3 className="text-lg font-bold">Local Art Gallery</h3>
            <p className="line-clamp-3 text-sm text-gray-600">
              Downtown, NY - Seeking local musicians for weekly live music nights at our
              downtown art gallery.
            </p>
          </BulletinCard>
          <BulletinCard>
            <Badge className="mb-2">Performers Seeking Performers</Badge>
            <h3 className="text-lg font-bold">Rock Band</h3>
            <p className="line-clamp-3 text-sm text-gray-600">
              Los Angeles, CA - Rock band seeking a new drummer. Must be available for weekly
              rehearsals and local gigs.
            </p>
          </BulletinCard>
          <BulletinCard>
            <Badge className="mb-2">Performers Seeking Venues</Badge>
            <h3 className="text-lg font-bold">Jazz Band</h3>
            <p className="line-clamp-3 text-sm text-gray-600">
              New York, NY - Jazz band with 7 members seeking a new venue for our performances.
              We have a large following and require a venue that can accommodate at least 1,000
              attendees. We perform a variety of jazz styles including bebop, cool jazz, and
              modern jazz.
            </p>
          </BulletinCard>
          <Card className="animate-pulse">
            <CardContent className="pt-6">
              <Skeleton className="mb-2 h-4 w-1/2 rounded-full" />
              <Skeleton className="mb-2 h-6 w-3/4" />
              <Skeleton className="mb-2 h-12 w-full" />
            </CardContent>
            <div className="flex justify-end space-x-4 p-4">
              <Button disabled>Reply</Button>
              <Button disabled>
                <BookmarkIcon className="h-4 w-4" />
              </Button>
            </div>
          </Card>
          <Button className="w-full">Load More</Button>
          <Card>
            <CardContent className="flex-grow pt-6 text-center">
              <h2 className="mb-4 text-2xl font-bold">No More Items</h2>
              <p className="text-lg text-gray-600">Check back later for more!</p>
            </CardContent>
          </Card>
        </CardGrid>
      </TabsContent>
      <TabsContent value="posts"></TabsContent>
      <TabsContent value="replies"></TabsContent>
    </Tabs>
  );
}
