import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";

import CreateVenueProfileForm from "./forms/venue-form";
import CreatePerformerProfileForm from "./forms/performer-form";
import CreateOrganizerProfileForm from "./forms/organizer-form";
// import { CreateEventForm } from "./forms/blank-event";
import { CreateEventForm } from "./forms/event";
import { AddDatesToEventForm } from "./forms/add-dates";
import { CreateEventFromTemplate } from "./forms/from-templates";

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
          <CreateEventForm />
        </TabsContent>
        <TabsContent value='add-days'>
          <AddDatesToEventForm />
        </TabsContent>
        <TabsContent value='from-template'>
          <CreateEventFromTemplate />
        </TabsContent>
        <TabsContent value='event-template'>
          {/* <CreateOrganizerAccount /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
