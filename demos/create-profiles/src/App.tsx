// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@repo/ui/components/tabs";

// import { CreateOrganizerAccount } from "./organizer";
// import { CreatePerformerAccount } from "./performer";
// import { CreateVenueAccount } from "./venue";

// import { CreateOrganizerAccount } from "./organizer-new";
// import { CreatePerformerAccount } from "./performer-new";
import CreateVenueProfileForm from "./venue-new";

export default function App() {
  return (
    <>
      <h1 className='text-center font-semibold tracking-tight text-xl mb-2'>
        Account Creation Demos
      </h1>
      <CreateVenueProfileForm />
      {/* <Tabs defaultValue='venue'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='venue'>Venue</TabsTrigger>
          <TabsTrigger value='organizer'>Organizer</TabsTrigger>
          <TabsTrigger value='performer'>Performer</TabsTrigger>
        </TabsList>
        <TabsContent value='venue'>
          <CreateVenueAccount />
        </TabsContent>
        <TabsContent value='organizer'>
          <CreateOrganizerAccount />
        </TabsContent>
        <TabsContent value='performer'>
          <CreatePerformerAccount />
        </TabsContent>
      </Tabs> */}
    </>
  );
}
