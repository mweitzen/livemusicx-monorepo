import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Switch } from "@repo/ui/components/switch";
import { Button } from "@repo/ui/components/button";
import { Textarea } from "@repo/ui/components/textarea";

import {
  FormStep,
  FormStepContent,
  FormStepDescription,
  FormStepHeader,
  FormStepTitle,
} from "~/components/admin/form-step";

export const EventInformation = () => {
  return (
    <FormStep display>
      <FormStepHeader>
        <FormStepTitle>Event Information</FormStepTitle>
        <FormStepDescription>
          First enter the basic information for your event
        </FormStepDescription>
      </FormStepHeader>
      <FormStepContent>
        <div className="space-y-2">
          <Label htmlFor="event-image">Event Image</Label>
          <Input name="event-image" required type="file" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="event-name">Event Name</Label>
          <Input name="event-name" placeholder="Event Name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="event-description">Event Description</Label>
          <Textarea
            className="min-h-[100px]"
            name="event-description"
            placeholder="Enter a description for your event"
            required
          />
        </div>
        <Button className="w-full" type="submit">
          Next
        </Button>
      </FormStepContent>
    </FormStep>
  );
};

export const EventScheduling = () => {
  return (
    <FormStep display>
      <FormStepHeader>
        <FormStepTitle>Event Scheduling</FormStepTitle>
        <FormStepDescription>
          Next, enter the scheduling information for your event
        </FormStepDescription>
      </FormStepHeader>
      <FormStepContent>
        <div className="space-y-2">
          <Label htmlFor="event-series">Event Series</Label>
          <Input name="event-series" placeholder="Event Series" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="event-date">Event Date</Label>
          <Input name="event-date" required type="date" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time-start">Time Start</Label>
            <Input name="time-start" required type="time" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-end">Time End</Label>
            <Input name="time-end" required type="time" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="door-time">Door Time</Label>
          <Input name="door-time" required type="time" />
        </div>
        <Button className="w-full" type="submit">
          Next
        </Button>
      </FormStepContent>
    </FormStep>
  );
};

export const EventDetails = () => {
  return (
    <FormStep display>
      <FormStepHeader>
        <FormStepTitle>Event Details</FormStepTitle>
        <FormStepDescription>
          Finally, enter the details for your event
        </FormStepDescription>
      </FormStepHeader>
      <FormStepContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="is-free">Is Free?</Label>
            <Switch name="is-free" />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="is-holiday">Is Holiday?</Label>
            <Switch name="is-holiday" />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="is-child-friendly">Is Child Friendly?</Label>
            <Switch name="is-child-friendly" />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="serves-alcohol">Serves Alcohol?</Label>
            <Switch name="serves-alcohol" />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="serves-food">Serves Food?</Label>
            <Switch name="serves-food" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="event-genres">Event Genres</Label>
          <Input name="event-genres" placeholder="Event Genres" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="event-keywords">Event Keywords</Label>
          <Input name="event-keywords" placeholder="Event Keywords" required />
        </div>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </FormStepContent>
    </FormStep>
  );
};

export const EventParticipants = () => {
  return (
    <FormStep display>
      <FormStepHeader>
        <FormStepTitle>Participants</FormStepTitle>
        <FormStepDescription>
          Add venue, performers, and organizer details
        </FormStepDescription>
      </FormStepHeader>
      <FormStepContent>
        <div className="space-y-2">
          <Label htmlFor="venue">Venue</Label>
          <Input name="venue" placeholder="Venue" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="performers">Performers</Label>
          <Input name="performers" placeholder="Performers" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="organizer">Organizer</Label>
          <Input name="organizer" placeholder="Organizer" required />
        </div>
        <Button className="w-full" type="submit">
          Next
        </Button>
      </FormStepContent>
    </FormStep>
  );
};

export const EventConfirmation = () => {
  return (
    <FormStep display>
      <FormStepHeader>
        <FormStepTitle>Confirmation</FormStepTitle>
        <FormStepDescription>
          Please review all the details before submitting
        </FormStepDescription>
      </FormStepHeader>
      <FormStepContent>
        <div className="space-y-4">
          <p className="text-gray-500 dark:text-gray-400">
            Ensure all the details are correct. Once you submit, you will not be
            able to make changes.
          </p>
          <div className="space-y-2">
            <Label htmlFor="event-image">Event Image</Label>
            <Input name="event-image" readOnly required type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-name">Event Name</Label>
            <Input
              name="event-name"
              placeholder="Event Name"
              readOnly
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-description">Event Description</Label>
            <Textarea
              className="min-h-[100px]"
              name="event-description"
              placeholder="Enter a description for your event"
              readOnly
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-series">Event Series</Label>
            <Input name="event-series" placeholder="Event Series" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-date">Event Date</Label>
            <Input name="event-date" readOnly required type="date" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time-start">Time Start</Label>
              <Input name="time-start" readOnly required type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-end">Time End</Label>
              <Input name="time-end" readOnly required type="time" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="door-time">Door Time</Label>
            <Input name="door-time" readOnly required type="time" />
          </div>
          <div className="space y-2">
            <Label htmlFor="venue">Venue</Label>
            <Input name="venue" placeholder="Venue" readOnly required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="performers">Performers</Label>
            <Input
              name="performers"
              placeholder="Performers"
              readOnly
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organizer">Organizer</Label>
            <Input name="organizer" placeholder="Organizer" readOnly required />
          </div>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </div>
      </FormStepContent>
    </FormStep>
  );
};
