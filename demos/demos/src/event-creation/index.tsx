import { useState } from "react";

import { FromTemplateForm } from "./from-template";
import { BlankEventForm } from "./blank";
import { AddDatesForm } from "./add-dates";

import { CreateEventForm } from "~/new-events/blank-event";
import { AddDatesToEventForm } from "~/new-events/add-dates";
import { CreateEventFromTemplate } from "~/new-events/from-templates";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";

import {
  PlusCircle,
  Calendar as CalendarIcon,
  BetweenHorizonalStart as Template,
} from "lucide-react";

export const EventCreationPage = () => {
  const [selectedType, setSelectedType] = useState<
    "blank" | "add-dates" | "from-template" | null
  >(null);

  return (
    <>
      <Card className='w-full max-w-4xl mx-auto'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl font-bold'>Create an Event</CardTitle>
          <CardDescription>
            Choose how you'd like to create your event
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col space-y-4'>
          <Button
            variant='outline'
            size='lg'
            onClick={() => setSelectedType("blank")}
          >
            <PlusCircle className='mr-2 h-5 w-5' />
            Create New Blank Event
          </Button>
          <Button
            variant='outline'
            size='lg'
            onClick={() => setSelectedType("add-dates")}
          >
            <CalendarIcon className='mr-2 h-5 w-5' />
            Add Dates to Existing Event
          </Button>
          <Button
            variant='outline'
            size='lg'
            onClick={() => setSelectedType("from-template")}
          >
            <Template className='mr-2 h-5 w-5' />
            Create Event from a Template
          </Button>
        </CardContent>
      </Card>
      {selectedType === "blank" ? <BlankEventForm /> : null}
      {selectedType === "add-dates" ? <AddDatesForm /> : null}
      {selectedType === "from-template" ? <FromTemplateForm /> : null}
      {selectedType === "blank" ? <CreateEventForm /> : null}
      {selectedType === "add-dates" ? (
        <AddDatesToEventForm onBack={() => setSelectedType(null)} />
      ) : null}
      {selectedType === "from-template" ? (
        <CreateEventFromTemplate onBack={() => setSelectedType(null)} />
      ) : null}
    </>
  );
};
