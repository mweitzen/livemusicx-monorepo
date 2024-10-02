import { useUserStore } from "~/user-account/state";

import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import {
  AdminTabs,
  AdminTabsList,
  AdminTabsTrigger,
  AdminTabsContent,
} from "~/components/admin-tabs";

export const CurrentAffiliates = () => {
  const userType = useUserStore((state) => state.userType);
  const userLoading = useUserStore((state) => state.userLoading);

  if (userLoading) return <p>Loading...</p>;
  if (!userType) return <p>Logged out</p>;
  if (userType === "PUBLIC") return <p>Public</p>;
  if (userType === "ASSOCIATE") return <p>Associate</p>;

  return (
    <AdminTabs defaultValue={userType === "VENUE" ? "organizers" : "venues"}>
      <AdminTabsList className='grid-cols-3'>
        <AdminTabsTrigger
          value='venues'
          hidden={userType === "VENUE"}
        >
          Venues
        </AdminTabsTrigger>
        <AdminTabsTrigger
          value='organizers'
          hidden={userType === "ORGANIZER"}
        >
          Organizers
        </AdminTabsTrigger>
        <AdminTabsTrigger
          value='performers'
          hidden={userType === "PERFORMER"}
        >
          Performers
        </AdminTabsTrigger>
        <AdminTabsTrigger value='requests'>Requests</AdminTabsTrigger>
      </AdminTabsList>
      <AdminTabsContent
        value='venues'
        hidden={userType === "VENUE"}
      >
        <Card className='p-6'>
          <Input
            type='search'
            placeholder='Search venues'
          />
        </Card>
        <Card className='p-6'>
          <p>Venues</p>
        </Card>
      </AdminTabsContent>
      <AdminTabsContent
        value='organizers'
        hidden={userType === "ORGANIZER"}
      >
        <Card className='p-6'>
          <Input
            type='search'
            placeholder='Search organizers'
          />
        </Card>
        <Card className='p-6'>
          <p>Organizers</p>
        </Card>
      </AdminTabsContent>
      <AdminTabsContent
        value='performers'
        hidden={userType === "PERFORMER"}
      >
        <Card className='p-6'>
          <Input
            type='search'
            placeholder='Search performers'
          />
        </Card>
        <Card className='p-6'>
          <p>Performers</p>
        </Card>
      </AdminTabsContent>
      <AdminTabsContent value='requests'>
        <p>Incoming Requests</p>
        <Separator className='my-4' />
        <p>Outgoing Requests</p>
      </AdminTabsContent>
    </AdminTabs>
  );
};

export const CurrentAffiliateListItem = () => {
  return (
    <div>
      <p>Current Affiliate List Item</p>
    </div>
  );
};
