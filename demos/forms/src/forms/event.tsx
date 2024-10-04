"use client";
import { api } from "@repo/trpc/react";

import { z } from "zod";
import { cn } from "@repo/ui/helpers";
import { useState, Dispatch, SetStateAction } from "react";

import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { CreateEventInput } from "@repo/validators/events";

import { Form } from "@repo/ui/components/form";
import {
  CalendarIcon,
  Music,
  Users,
  DollarSign,
  AlertTriangle,
  Globe,
} from "@repo/ui/icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  AboutTextarea,
  EndTimeInput,
  EventKeywordsSelect,
  GenresSelect,
  NameInput,
  RsvpLink,
  StartTimeInput,
} from "../components/basic-info-inputs";
import {
  DoorTimePicker,
  EventMinimumAge,
  ParticipantSelect,
} from "../components/event-inputs";
import {
  FormDollarInput,
  FormSwitch,
  FormTextInput,
} from "../components/form-inputs";
import { Separator } from "@repo/ui/components/separator";
import { Button } from "@repo/ui/components/button";
import { Progress } from "@repo/ui/components/progress";

const steps = [
  { name: "Basic Info", icon: <AlertTriangle className='w-4 h-4' /> },
  { name: "Date & Time", icon: <CalendarIcon className='w-4 h-4' /> },
  { name: "Venue & Performers", icon: <Music className='w-4 h-4' /> },
  { name: "Ticketing", icon: <DollarSign className='w-4 h-4' /> },
  { name: "Details", icon: <Users className='w-4 h-4' /> },
  { name: "Publish", icon: <Globe className='w-4 h-4' /> },
];

export function CreateEventForm() {
  const [step, setStep] = useState(1);

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-center'>
          Create New Event
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormStepper
          step={step}
          steps={steps}
        />
        <EventForm
          step={step}
          setStep={setStep}
        />
      </CardContent>
    </Card>
  );
}

interface FormStepperProps {
  step: number;
  steps: {
    name: string;
    icon: JSX.Element;
  }[];
}

export function FormStepper({ step, steps }: FormStepperProps) {
  return (
    <div className='mb-8'>
      <div className='flex justify-between mb-2 px-4'>
        {steps.map((s, index) => (
          <div
            key={index}
            className={cn(
              `flex flex-col items-center space-y-2`,
              index + 1 === step ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div
              className={cn(
                `flex items-center justify-center w-8 h-8 rounded-full`,
                index + 1 === step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {s.icon}
            </div>
            <span className='text-xs font-medium hidden md:inline'>
              {s.name}
            </span>
          </div>
        ))}
      </div>
      <Progress value={(step / steps.length) * 100} />
    </div>
  );
}
const Test = z.object({
  imageUrl: z.string(),
  timeStart: z.string(),
  timeEnd: z.string(),
  timeDoor: z.string(),
});

type FormValues = Omit<
  z.infer<typeof Test>,
  "imageUrl" | "timeStart" | "timeEnd" | "timeDoor"
> & {
  date: Date;
  startTime: string;
  endTime?: string;
  doorTime?: string;
  image?: File | undefined;
  publishNow: boolean;
  externalServices: string[];
};

interface EventFormProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export function EventForm({ step, setStep }: EventFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(z.object({})),
    defaultValues: {
      name: "",
      image: undefined,
      date: new Date(),
      startTime: "",
      endTime: "",
      doorTime: "",
      venueId: "",
      stageId: "",
      organizerId: "",
      musicianIds: [],
      bandIds: [],
      genreIds: [],
      keywordIds: [],
      // capacity: 100,
      // ticketPrice: 0,
      ticketLinks: [],
      description: "",
      ageRestriction: false,
      minimumAge: 0,
      isHoliday: false,
      servesAlcohol: false,
      servesFood: false,
      isPrivate: false,
      requiresRsvp: false,
      requiresTicket: false,
      publishNow: false,
      externalServices: [],
    },
  });

  const { mutate } = api.events.test.useMutation({
    onSuccess: (data) => {
      console.log(">>> Success ", data);
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    // mutate(values);

    // Here you would typically send the form data to your backend
    alert("Event created successfully!");
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        {step === 1 && <EventBasicInfo />}
        {step === 2 && <EventDateTime />}
        {step === 3 && <EventParticipants />}
        {step === 4 && <EventTicketing />}
        {step === 5 && <EventDetails />}
        {step === 6 && <EventPublishing />}

        <div className='flex justify-between mt-8'>
          {step > 1 && (
            <Button
              type='button'
              onClick={prevStep}
              variant='outline'
            >
              Previous
            </Button>
          )}
          {step < steps.length ? (
            <Button
              type='button'
              onClick={nextStep}
              className='ml-auto'
            >
              Next
            </Button>
          ) : (
            <Button
              type='button'
              onClick={form.handleSubmit(onSubmit)}
              className='ml-auto'
            >
              Create Event
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export function EventBasicInfo() {
  return (
    <div className='space-y-6'>
      <NameInput
        label='Event Name'
        placeholder='An Evening with Bruno Mars'
      />
      <AboutTextarea placeholder='Describe your event...' />
      <GenresSelect />
      <EventKeywordsSelect />
      <div>Image input</div>
    </div>
  );
}

export function EventDateTime() {
  return (
    <div className='space-y-6'>
      <div>Date Input</div>
      <div className='grid grid-cols-2 gap-4'>
        <StartTimeInput />
        <EndTimeInput />
      </div>
      <DoorTimePicker />
      <FormTextInput
        name='doorTime'
        label='Door Time (Optional)'
        placeholder='12:00 PM'
      />
    </div>
  );
}

const affiliatedVenues = [
  { id: "1", name: "Starlight Arena" },
  { id: "2", name: "Harmony Hall" },
  { id: "3", name: "Rhythm Room" },
];

export function EventParticipants() {
  return (
    <div className='space-y-6'>
      <ParticipantSelect
        name='venueId'
        label='Venue'
        items={affiliatedVenues}
      />
      <ParticipantSelect
        name='organizerId'
        label='Organizer'
        items={affiliatedVenues}
      />
    </div>
  );
}

export function EventTicketing() {
  const form = useFormContext();

  return (
    <div className='space-y-6'>
      <FormSwitch
        name='requiresTicket'
        label='Ticket Required'
        description='Is a ticket required for this event?'
      />
      {form.watch("requiresTicket") && (
        <div className='space-y-4 pl-4 border-l-2 border-primary'>
          <FormDollarInput
            name='ticketLinks[0].price'
            label='Ticket Price'
            description='Enter 0 for a free event'
          />
          <FormTextInput
            type='url'
            name='ticketLink[0].url'
            label='Ticket Link'
            placeholder='https://...'
          />
        </div>
      )}
      <FormSwitch
        name='requiresRsvp'
        label='Reservation Required'
        description='Is a reservation required for this event?'
      />
      {form.watch("requiresRsvp") && (
        <div className='pl-4 border-l-2 border-primary'>
          <RsvpLink />
        </div>
      )}
    </div>
  );
}

export function EventDetails() {
  return (
    <div className='space-y-6'>
      <EventMinimumAge />
      <Separator />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <FormSwitch
          name='isHoliday'
          label='Holiday Event'
          description='Is this a holiday-themed event?'
        />
        <FormSwitch
          name='isPrivate'
          label='Private Event'
          description='Is this a private event?'
        />
        <FormSwitch
          name='servesAlcohol'
          label='Serves Alcohol'
          description='Will alcohol be served at this event?'
        />
        <FormSwitch
          name='servesFood'
          label='Serves Food'
          description='Will food be served at this event?'
        />
      </div>
    </div>
  );
}

export function EventPublishing() {
  return null;
}
