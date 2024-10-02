import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "~/components/ui/form";
import {
  FormStep,
  FormStepContent,
  FormStepDescription,
  FormStepHeader,
  FormStepTitle,
} from "~/components/form-step";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { DatePickerMultiple } from "./components/date-picker-multiple";
import { Input } from "~/components/ui/input";

export const AddDatesFormSchema = z.object({
  eventId: z.string(),
  selectedDates: z.array(z.date().min(new Date())).nonempty(),
});

export const AddDatesForm = () => {
  const [datesAdded, setDatesAdded] = useState(false);

  const form = useForm<z.infer<typeof AddDatesFormSchema>>({
    resolver: zodResolver(AddDatesFormSchema),
    defaultValues: {
      eventId: "",
      selectedDates: [],
    },
  });

  function onSubmit(data: z.infer<typeof AddDatesFormSchema>) {
    console.log(data);
  }

  const eventId = form.watch("eventId");
  const selectedDates = form.watch("selectedDates");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormStep display={!eventId}>
          <FormStepHeader>
            <FormStepTitle>Select Existing Event</FormStepTitle>
            <FormStepDescription>
              Choose an existing event to add dates to
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent className='py-4'>
            <Input
              type='search'
              placeholder='Search for an event'
            />
            <Button
              variant='outline'
              size='lg'
              onClick={() => form.setValue("eventId", "Event 1")}
            >
              Event 1
            </Button>
            <Button
              variant='outline'
              size='lg'
              onClick={() => form.setValue("eventId", "Event 2")}
            >
              Event 2
            </Button>
            <Button
              variant='outline'
              size='lg'
              onClick={() => form.setValue("eventId", "A Final Event")}
            >
              A Final Event
            </Button>
          </FormStepContent>
        </FormStep>
        <FormStep display={!!eventId && !datesAdded}>
          <FormStepHeader>
            <FormStepTitle>Select Dates to Add</FormStepTitle>
            <FormStepDescription>
              Add dates to the selected event
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <Label>Select dates to add</Label>
            <DatePickerMultiple />
            <Button
              type='button'
              onClick={() => setDatesAdded(true)}
              disabled={!selectedDates || !selectedDates.length}
            >
              Next
            </Button>
          </FormStepContent>
        </FormStep>
        <FormStep display={!!eventId && datesAdded}>
          <FormStepHeader>
            <FormStepTitle>Review and Submit</FormStepTitle>
            <FormStepDescription>
              Review the dates you have added and submit
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <div className='space-y-2'>
              <Label>Selected Event</Label>
              <p>{eventId}</p>
            </div>
            <div className='space-y-2'>
              <Label>Selected Dates</Label>
              <div className='flex flex-col gap-2'>
                {selectedDates.map((date) => (
                  <p key={date.toISOString()}>{date.toLocaleDateString()}</p>
                ))}
              </div>
              <Button type='submit'>Submit</Button>
            </div>
          </FormStepContent>
        </FormStep>
      </form>
    </Form>
  );
};
