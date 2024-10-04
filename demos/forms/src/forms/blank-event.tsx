"use client";
import { api } from "@repo/trpc/react";

import { z } from "zod";
import { cn } from "@repo/ui/helpers";
import { format } from "date-fns";

import { useState, useCallback } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CalendarIcon,
  Music,
  Users,
  DollarSign,
  Image as ImageIcon,
  Search,
  AlertTriangle,
  Globe,
} from "@repo/ui/icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Calendar } from "@repo/ui/components/calendar";
import { Progress } from "@repo/ui/components/progress";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Separator } from "@repo/ui/components/separator";
import { Switch } from "@repo/ui/components/switch";

import { CreateEventInput } from "@repo/validators/events";
import {
  AboutTextarea,
  EndTimeInput,
  EventKeywordsSelect,
  GenresSelect,
  NameInput,
  RsvpLink,
  StartTimeInput,
} from "../components/basic-info-inputs";
import { FormSwitch, FormTextInput } from "../components/form-inputs";

const affiliatedVenues = [
  { id: "1", name: "Starlight Arena" },
  { id: "2", name: "Harmony Hall" },
  { id: "3", name: "Rhythm Room" },
];

const affiliatedPerformers = [
  { id: "1", name: "The Melodic Minds" },
  { id: "2", name: "Sonic Waves" },
  { id: "3", name: "Harmony Heights" },
];

const externalServices = [
  { id: "facebook", name: "Facebook" },
  { id: "instagram", name: "Instagram" },
  { id: "twitter", name: "Twitter" },
  { id: "ticketmaster", name: "Ticketmaster" },
  { id: "eventbrite", name: "Eventbrite" },
];

type FormValues = Omit<
  z.infer<typeof CreateEventInput>,
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

  const { mutate } = api.events.test.useMutation({
    onSuccess: (data) => {
      console.log(">>> Success ", data);
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(CreateEventInput),
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

  const onSubmit = (values: FormValues) => {
    console.log(values);

    // mutate(values);

    // Here you would typically send the form data to your backend
    alert("Event created successfully!");
  };

  const nextStep = useCallback(
    () => setStep((s) => Math.min(s + 1, steps.length)),
    []
  );
  const prevStep = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-center'>
          Create New Event
        </CardTitle>
      </CardHeader>
      <CardContent>
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            {step === 1 && (
              <div className='space-y-6'>
                <NameInput
                  label='Event Name'
                  placeholder='An Evening with Bruno Mars'
                />
                <AboutTextarea placeholder='Describe your event...' />
                <GenresSelect />
                <EventKeywordsSelect />

                <FormField
                  control={form.control}
                  name='image'
                  render={({ field: { value: _, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Event Image</FormLabel>
                      <FormControl>
                        <div className='flex items-center space-x-4'>
                          <Input
                            type='file'
                            accept='image/*'
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              onChange(file);
                            }}
                            {...field}
                          />
                          <ImageIcon className='h-6 w-6 opacity-50' />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload an image for your event (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {step === 2 && (
              <div className='space-y-6'>
                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left",
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
                        <PopoverContent align='start'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='grid grid-cols-2 gap-4'>
                  <StartTimeInput />
                  <EndTimeInput />
                </div>
                <FormTextInput
                  name='doorTime'
                  label='Door Time (Optional)'
                  placeholder='12:00 PM'
                />
              </div>
            )}
            {step === 3 && (
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

                <FormField
                  control={form.control}
                  name='musicianIds'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Musicians</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value && field.value.length > 0
                                ? `${field.value.length} performer(s) selected`
                                : "Select performers"}
                              <Search className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[300px] p-0'>
                          <Command>
                            <CommandInput
                              placeholder='Search performers...'
                              className='h-9'
                            />
                            <CommandEmpty>No performer found.</CommandEmpty>
                            <CommandList>
                              <CommandGroup heading='Your Affiliates'>
                                {affiliatedPerformers.map((performer) => (
                                  <CommandItem
                                    key={performer.id}
                                    onSelect={() => {
                                      const updatedValue =
                                        field.value?.includes({
                                          id: performer.id,
                                        })
                                          ? field.value.filter(
                                              (item) => item.id !== performer.id
                                            )
                                          : [...field.value, performer.id];
                                      form.setValue(
                                        "musicianIds",
                                        updatedValue
                                      );
                                    }}
                                    className='text-sm'
                                  >
                                    <Checkbox
                                      checked={field.value.includes(
                                        performer.id
                                      )}
                                      className='mr-2'
                                    />
                                    {performer.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                              <CommandGroup heading='Actions'>
                                <CommandItem className='text-sm'>
                                  Search for more performers
                                </CommandItem>
                                <CommandItem className='text-sm'>
                                  Add new performer
                                </CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='bandIds'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Bands</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value && field.value.length > 0
                                ? `${field.value.length} performer(s) selected`
                                : "Select performers"}
                              <Search className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[300px] p-0'>
                          <Command>
                            <CommandInput
                              placeholder='Search performers...'
                              className='h-9'
                            />
                            <CommandEmpty>No performer found.</CommandEmpty>
                            <CommandList>
                              <CommandGroup heading='Your Affiliates'>
                                {affiliatedPerformers.map((performer) => (
                                  <CommandItem
                                    key={performer.id}
                                    onSelect={() => {
                                      const updatedValue = field.value.includes(
                                        performer.id
                                      )
                                        ? field.value.filter(
                                            (id) => id !== performer.id
                                          )
                                        : [...field.value, performer.id];
                                      form.setValue("bandIds", updatedValue);
                                    }}
                                    className='text-sm'
                                  >
                                    <Checkbox
                                      checked={field.value.includes(
                                        performer.id
                                      )}
                                      className='mr-2'
                                    />
                                    {performer.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                              <CommandGroup heading='Actions'>
                                <CommandItem className='text-sm'>
                                  Search for more performers
                                </CommandItem>
                                <CommandItem className='text-sm'>
                                  Add new performer
                                </CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {step === 4 && (
              <div className='space-y-6'>
                <FormSwitch
                  name='requiresTicket'
                  label='Ticket Required'
                  description='Is a ticket required for this event?'
                />
                {form.watch("requiresTicket") && (
                  <div className='space-y-4 pl-4 border-l-2 border-primary'>
                    <FormField
                      control={form.control}
                      name='ticketLinks[0].price'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ticket Price</FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <Input
                                type='number'
                                placeholder='25.00'
                                {...field}
                                onChange={(e) =>
                                  field.onChange(+e.target.value)
                                }
                              />
                              <DollarSign className='absolute right-3 top-2.5 h-4 w-4 opacity-50' />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Enter 0 for free events
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='ticketLink[0].url'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ticket Link</FormLabel>
                          <FormControl>
                            <Input
                              type='url'
                              placeholder='https://...'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
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
            )}
            {step === 5 && (
              <div className='space-y-6'>
                <FormField
                  control={form.control}
                  name='minimumAge'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormLabel>Age Restriction</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString()}
                          className='flex flex-col space-y-1'
                        >
                          <FormItem className='flex items-center space-x-3'>
                            <FormControl>
                              <RadioGroupItem value='1' />
                            </FormControl>
                            <FormLabel>All Ages</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3'>
                            <FormControl>
                              <RadioGroupItem value='0' />
                            </FormControl>
                            <FormLabel>Family Friendly</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3'>
                            <FormControl>
                              <RadioGroupItem value='13' />
                            </FormControl>
                            <FormLabel>13+</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3'>
                            <FormControl>
                              <RadioGroupItem value='18' />
                            </FormControl>
                            <FormLabel>18+</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3'>
                            <FormControl>
                              <RadioGroupItem value='21' />
                            </FormControl>
                            <FormLabel>21+</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
            )}
            {step === 6 && (
              <div className='space-y-6'>
                <FormField
                  control={form.control}
                  name='publishNow'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel>Publish Now</FormLabel>
                        <FormDescription>
                          Do you want to publish this event immediately?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='externalServices'
                  render={() => (
                    <FormItem>
                      <div className='mb-4'>
                        <FormLabel>External Services</FormLabel>
                        <FormDescription>
                          Select the external services you want to publish this
                          event to.
                        </FormDescription>
                      </div>
                      {externalServices.map((service) => (
                        <FormField
                          key={service.id}
                          control={form.control}
                          name='externalServices'
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={service.id}
                                className='flex flex-row items-start space-x-3 space-y-0'
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(service.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            service.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== service.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  {service.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

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
                  type='submit'
                  className='ml-auto'
                >
                  Create Event
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export function FormSelectDate() {}

export function FormTimeSelect() {}

interface ParticipantSelectProps {
  name: string;
  label: string;
  items: any[];
}
export function ParticipantSelect({
  name,
  label,
  items,
}: ParticipantSelectProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  role='combobox'
                  variant='outline'
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? items.find((item) => item.id === field.value)?.name
                    : `Select ${label.toLowerCase()}`}
                  <Search className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput
                  placeholder={`Search ${label.toLowerCase()}...`}
                  className='h-9'
                />
                <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                <CommandList>
                  <CommandGroup heading='Your Affiliates'>
                    {items.map((item) => (
                      <CommandItem
                        key={item.id}
                        onSelect={() => {
                          form.setValue(name, item.id);
                        }}
                        className='text-sm'
                      >
                        {item.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandGroup heading='Actions'>
                    <CommandItem className='text-sm'>
                      Search for more {label.toLowerCase()}s
                    </CommandItem>
                    <CommandItem className='text-sm'>
                      Add new {label.toLowerCase()}
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
