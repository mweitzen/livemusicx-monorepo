import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";

import CreateVenueProfileForm from "./venue-form";
import CreatePerformerProfileForm from "./performer-form";
import CreateOrganizerProfileForm from "./organizer-form";

export default function App() {
  return (
    <div className='w-full max-w-2xl mx-auto'>
      <h1 className='text-center font-semibold tracking-tight text-xl py-4'>
        Account Creation Demos
      </h1>
      <Tabs defaultValue='performer'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='performer'>Performer</TabsTrigger>
          <TabsTrigger value='venue'>Venue</TabsTrigger>
          <TabsTrigger value='organizer'>Organizer</TabsTrigger>
          <TabsTrigger value='new-event'>Blank Event</TabsTrigger>
          <TabsTrigger value='add-days'>Add Days</TabsTrigger>
          <TabsTrigger value='from-template'>From Template</TabsTrigger>
          <TabsTrigger value='event-template'>Event Template</TabsTrigger>
        </TabsList>
        <TabsContent value='performer'>
          <CreatePerformerProfileForm />
        </TabsContent>
        <TabsContent value='venue'>
          <CreateVenueProfileForm />
        </TabsContent>
        <TabsContent value='organizer'>
          <CreateOrganizerProfileForm />
        </TabsContent>
        <TabsContent value='new-event'>
          {/* <CreateOrganizerAccount /> */}
        </TabsContent>
        <TabsContent value='add-days'>
          {/* <CreateOrganizerAccount /> */}
        </TabsContent>
        <TabsContent value='from-template'>
          {/* <CreateOrganizerAccount /> */}
        </TabsContent>
        <TabsContent value='event-template'>
          {/* <CreateOrganizerAccount /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
