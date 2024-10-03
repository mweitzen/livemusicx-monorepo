import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";

// import { CreateOrganizerAccount } from "./organizer";
// import { CreatePerformerAccount } from "./performer";
// import { CreateVenueAccount } from "./venue";

// import { CreateOrganizerAccount } from "./organizer-new";
import CreateVenueProfileForm from "./venue-form";
import CreatePerformerProfileForm from "./performer-form";

export default function App() {
  return (
    <div className='w-full max-w-2xl mx-auto'>
      <h1 className='text-center font-semibold tracking-tight text-xl py-4'>
        Account Creation Demos
      </h1>
      <Tabs defaultValue='venue'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='performer'>Performer</TabsTrigger>
          <TabsTrigger value='venue'>Venue</TabsTrigger>
          <TabsTrigger value='organizer'>Organizer</TabsTrigger>
        </TabsList>
        <TabsContent value='performer'>
          <CreatePerformerProfileForm />
        </TabsContent>
        <TabsContent value='venue'>
          <CreateVenueProfileForm />
        </TabsContent>
        <TabsContent value='organizer'>
          {/* <CreateOrganizerAccount /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
