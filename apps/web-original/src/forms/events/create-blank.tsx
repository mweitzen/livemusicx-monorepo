"use client";

import { z } from "zod";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@repo/ui/components/form";
import {
  FormStep,
  FormStepContent,
  FormStepDescription,
  FormStepHeader,
  FormStepTitle,
} from "~/components/admin/form-step";

import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Switch } from "@repo/ui/components/switch";
import { Textarea } from "@repo/ui/components/textarea";
import { SelectGenres } from "~//components/shared/select-genres";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

// library specific imports
import { PublishEventInputSchema } from "~/lib/schema/events";
import { DatePicker } from "./components/date-picker-single";
import { DoorTimePicker } from "./components/door-time";

export const BlankEventForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<z.infer<typeof PublishEventInputSchema>>({
    resolver: zodResolver(PublishEventInputSchema),
    defaultValues: {
      name: "",
      description: "",
      dateStart: new Date(),
      timeStart: "",
      timeEnd: "",
      timeDoor: "",
    },
  });

  function onSubmit(data: z.infer<typeof PublishEventInputSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormStep display={currentStep === 1}>
          <FormStepHeader>
            <FormStepTitle>Event Information</FormStepTitle>
            <FormStepDescription>
              Provide the basic information about your event
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Image</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the image of your event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the title of your event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="resize-none" rows={7} />
                  </FormControl>
                  <FormDescription>
                    This is the description of your event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={() => setCurrentStep(2)}>
              Event Scheduling <ArrowRightIcon className="h-3 w-3" />
            </Button>
          </FormStepContent>
        </FormStep>
        <FormStep display={currentStep === 2}>
          <FormStepHeader>
            <FormStepTitle>Event Scheduling</FormStepTitle>
            <FormStepDescription>
              Provide the date and time for your event
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <DatePicker />
            <FormField
              control={form.control}
              name="dateStart"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={format(value, "yyyy-MM-dd")} // format the date to match the input type
                      onChange={(e) => onChange(new Date(e.target.value))}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="timeStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DoorTimePicker />
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(1)}
              >
                Back to Event Information
              </Button>
              <Button type="button" onClick={() => setCurrentStep(3)}>
                Event Details <ArrowRightIcon className="h-3 w-3" />
              </Button>
            </div>
          </FormStepContent>
        </FormStep>
        <FormStep display={currentStep === 3}>
          <FormStepHeader>
            <FormStepTitle>Event Details</FormStepTitle>
            <FormStepDescription>
              Provide the details for your event
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="isPrivate"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormLabel>Private Event</FormLabel>
                    <FormControl>
                      <Switch
                        checked={value}
                        onCheckedChange={onChange}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFree"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormLabel>Free Event</FormLabel>
                    <FormControl>
                      <Switch
                        checked={value}
                        onCheckedChange={onChange}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isHoliday"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormLabel>Holiday Event</FormLabel>
                    <FormControl>
                      <Switch
                        checked={value}
                        onCheckedChange={onChange}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isChildFriendly"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormLabel>Child Friendly</FormLabel>
                    <FormControl>
                      <Switch
                        checked={value}
                        onCheckedChange={onChange}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="servesAlcohol"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormLabel>Serves Alcohol</FormLabel>
                    <FormControl>
                      <Switch
                        checked={value}
                        onCheckedChange={onChange}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="servesFood"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormLabel>Serves Food</FormLabel>
                    <FormControl>
                      <Switch
                        checked={value}
                        onCheckedChange={onChange}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <SelectGenres />
            <FormField
              control={form.control}
              name="keywords"
              render={() => (
                <FormItem>
                  <FormLabel>Event Keywords</FormLabel>
                  <FormControl>
                    <Input />
                  </FormControl>
                  <FormDescription>
                    Keywords to help find your event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(2)}
              >
                Back to Scheduling
              </Button>
              <Button type="button" onClick={() => setCurrentStep(4)}>
                Event Participants <ArrowRightIcon className="h-3 w-3" />
              </Button>
            </div>
          </FormStepContent>
        </FormStep>
        <FormStep display={currentStep === 4}>
          <FormStepHeader>
            <FormStepTitle>Event Participants</FormStepTitle>
            <FormStepDescription>
              Provide the participants for your event
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <FormField
              control={form.control}
              name="venueId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Where your event will be held
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organizerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizer</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Who is organizing the event</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="musicians"
              render={() => (
                <FormItem>
                  <FormLabel>Performers</FormLabel>
                  <FormControl>
                    <Input />
                  </FormControl>
                  <FormDescription>
                    Who will be performing at your event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groups"
              render={() => (
                <FormItem>
                  <FormLabel>Groups</FormLabel>
                  <FormControl>
                    <Input />
                  </FormControl>
                  <FormDescription>
                    Groups that will be performing at your event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(3)}
              >
                Back to Event Details
              </Button>
              <Button type="button" onClick={() => setCurrentStep(5)}>
                Event Confirmation <ArrowRightIcon className="h-3 w-3" />
              </Button>
            </div>
          </FormStepContent>
        </FormStep>
        <FormStep display={currentStep === 5}>
          <FormStepHeader>
            <FormStepTitle>Event Confirmation</FormStepTitle>
            <FormStepDescription>
              Review and confirm your event details
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(4)}
              >
                Back to Event Participants
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </FormStepContent>
        </FormStep>
      </form>
    </Form>
  );
};
