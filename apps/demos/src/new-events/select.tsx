"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  PlusCircle,
  Calendar as CalendarIcon,
  Template,
  ArrowLeft,
} from "lucide-react";
import { CreateEventForm } from "./create-event-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const addDatesSchema = z.object({
  eventId: z.string().min(1, "Please select an event"),
  dates: z.array(z.date()).min(1, "Please select at least one date"),
});

const templateSchema = z.object({
  templateId: z.string().min(1, "Please select a template"),
  eventName: z.string().min(2, "Event name must be at least 2 characters"),
  eventDate: z.date({
    required_error: "Please select a date",
  }),
});

type AddDatesValues = z.infer<typeof addDatesSchema>;
type TemplateValues = z.infer<typeof templateSchema>;

export function EventCreationFlow() {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);

  const renderSelectedForm = () => {
    switch (selectedFlow) {
      case "new":
        return <CreateEventForm />;
      case "addDates":
        return <AddDatesToEventForm onBack={() => setSelectedFlow(null)} />;
      case "template":
        return (
          <CreateEventFromTemplateForm onBack={() => setSelectedFlow(null)} />
        );
      default:
        return null;
    }
  };

  if (selectedFlow) {
    return renderSelectedForm();
  }

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader className='text-center'>
        <CardTitle className='text-3xl font-bold'>Create an Event</CardTitle>
        <CardDescription>
          Choose how you'd like to create your event
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col space-y-4'>
        <Button
          onClick={() => setSelectedFlow("new")}
          className='h-20 text-lg'
          variant='outline'
        >
          <PlusCircle className='mr-2 h-6 w-6' />
          Create a New Blank Event
        </Button>
        <Button
          onClick={() => setSelectedFlow("addDates")}
          className='h-20 text-lg'
          variant='outline'
        >
          <CalendarIcon className='mr-2 h-6 w-6' />
          Add Dates to an Existing Event
        </Button>
        <Button
          onClick={() => setSelectedFlow("template")}
          className='h-20 text-lg'
          variant='outline'
        >
          <Template className='mr-2 h-6 w-6' />
          Create an Event from a Template
        </Button>
      </CardContent>
    </Card>
  );
}

function AddDatesToEventForm({ onBack }: { onBack: () => void }) {
  const form = useForm<AddDatesValues>({
    resolver: zodResolver(addDatesSchema),
    defaultValues: {
      eventId: "",
      dates: [],
    },
  });

  function onSubmit(data: AddDatesValues) {
    console.log(data);
    // Here you would typically send the form data to your backend
    alert("Dates added successfully!");
  }

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          Add Dates to Existing Event
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='eventId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Event</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select an event' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='1'>Summer Music Festival</SelectItem>
                      <SelectItem value='2'>Tech Conference 2023</SelectItem>
                      <SelectItem value='3'>Art Exhibition</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='dates'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Event Dates</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value?.length > 0 ? (
                            field.value.length > 3 ? (
                              `${field.value.length} dates selected`
                            ) : (
                              field.value
                                .map((date) => format(date, "PPP"))
                                .join(", ")
                            )
                          ) : (
                            <span>Pick event dates</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-auto p-0'
                      align='start'
                    >
                      <Calendar
                        mode='multiple'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-between'>
              <Button
                type='button'
                variant='outline'
                onClick={onBack}
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back
              </Button>
              <Button type='submit'>Add Dates</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function CreateEventFromTemplateForm({ onBack }: { onBack: () => void }) {
  const form = useForm<TemplateValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      templateId: "",
      eventName: "",
      eventDate: new Date(),
    },
  });

  function onSubmit(data: TemplateValues) {
    console.log(data);
    // Here you would typically send the form data to your backend
    alert("Event created from template successfully!");
  }

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          Create Event from Template
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='templateId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Template</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a template' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='1'>Concert</SelectItem>
                      <SelectItem value='2'>Conference</SelectItem>
                      <SelectItem value='3'>Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='eventName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter event name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='eventDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-auto p-0'
                      align='start'
                    >
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-between'>
              <Button
                type='button'
                variant='outline'
                onClick={onBack}
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back
              </Button>
              <Button type='submit'>Create Event</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
