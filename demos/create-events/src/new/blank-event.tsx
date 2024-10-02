"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  Music,
  Users,
  DollarSign,
  Image as ImageIcon,
  Search,
  AlertTriangle,
  Utensils,
  Beer,
  Gift,
  Lock,
  X,
  Check,
  Globe,
} from "lucide-react";
import { cn } from "@repo/ui/helpers";
import { Button } from "@repo/ui/components/button";
import { Calendar } from "@repo/ui/components/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { Textarea } from "@repo/ui/components/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Checkbox } from "@repo/ui/components/checkbox";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Switch } from "@repo/ui/components/switch";
import { Slider } from "@repo/ui/components/slider";
import { Separator } from "@repo/ui/components/separator";
import { Badge } from "@repo/ui/components/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@repo/ui/components/command";
import { ScrollArea } from "@repo/ui/components/scroll-area";

// Mock data for affiliated venues and performers
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

// Mock data for external services
const externalServices = [
  { id: "facebook", name: "Facebook" },
  { id: "instagram", name: "Instagram" },
  { id: "twitter", name: "Twitter" },
  { id: "ticketmaster", name: "Ticketmaster" },
  { id: "eventbrite", name: "Eventbrite" },
];

const formSchema = z.object({
  eventName: z
    .string()
    .min(2, { message: "Event name must be at least 2 characters." }),
  date: z.date({ required_error: "A date is required." }),
  doorTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format.",
  }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format.",
  }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format.",
  }),
  venue: z.string().min(1, { message: "Please select a venue." }),
  performers: z
    .array(z.string())
    .min(1, { message: "Please select at least one performer." }),
  genres: z
    .array(z.string())
    .min(1, { message: "Please add at least one genre." }),
  capacity: z
    .number()
    .min(1, { message: "Capacity must be at least 1." })
    .max(100000, { message: "Capacity cannot exceed 100,000." }),
  ticketPrice: z
    .number()
    .min(0, { message: "Ticket price must be 0 or greater." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  image: z.instanceof(File).optional(),
  ageRestriction: z.enum(["all-ages", "family-friendly", "18+", "21+"]),
  isHoliday: z.boolean(),
  servesAlcohol: z.boolean(),
  servesFood: z.boolean(),
  isPrivateEvent: z.boolean(),
  reservationRequired: z.boolean(),
  reservationLink: z.string().url().optional(),
  ticketRequired: z.boolean(),
  ticketLink: z.string().url().optional(),
  publishNow: z.boolean(),
  externalServices: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

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
  const [genres, setGenres] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      date: new Date(),
      doorTime: "",
      startTime: "",
      endTime: "",
      venue: "",
      performers: [],
      genres: [],
      capacity: 100,
      ticketPrice: 0,
      description: "",
      ageRestriction: "all-ages",
      isHoliday: false,
      servesAlcohol: false,
      servesFood: false,
      isPrivateEvent: false,
      reservationRequired: false,
      ticketRequired: false,
      publishNow: false,
      externalServices: [],
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    // Here you would typically send the form data to your backend
    alert("Event created successfully!");
  };

  const nextStep = useCallback(
    () => setStep((s) => Math.min(s + 1, steps.length)),
    []
  );
  const prevStep = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);

  const addGenre = useCallback(
    (genre: string) => {
      if (genre && !genres.includes(genre)) {
        setGenres((prev) => [...prev, genre]);
        form.setValue("genres", [...genres, genre]);
      }
    },
    [genres, form]
  );

  const removeGenre = useCallback(
    (genre: string) => {
      setGenres((prev) => prev.filter((g) => g !== genre));
      form.setValue(
        "genres",
        genres.filter((g) => g !== genre)
      );
    },
    [genres, form]
  );

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader className='bg-primary text-primary-foreground p-6'>
        <CardTitle className='text-2xl font-bold text-center'>
          Create New Event
        </CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='mb-8'>
          <div className='flex justify-between mb-2'>
            {steps.map((s, index) => (
              <div
                key={index}
                className={`flex flex-col items-center space-y-2 ${index + 1 === step ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${index + 1 === step ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  {s.icon}
                </div>
                <span className='text-xs font-medium hidden md:inline'>
                  {s.name}
                </span>
              </div>
            ))}
          </div>
          <div className='w-full bg-muted h-2 rounded-full mt-4'>
            <div
              className='bg-primary h-2 rounded-full transition-all duration-300 ease-in-out'
              style={{ width: `${(step / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <ScrollArea className='h-[calc(100vh-300px)] pr-4'>
              {step === 1 && (
                <div className='space-y-6'>
                  <FormField
                    control={form.control}
                    name='eventName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Summer Music Festival'
                            {...field}
                            className='text-base'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Describe your event...'
                            className='resize-none h-32 text-base'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='genres'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genres</FormLabel>
                        <FormControl>
                          <div className='space-y-2'>
                            <div className='flex space-x-2'>
                              <Input
                                placeholder='Add a genre'
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addGenre(
                                      (e.target as HTMLInputElement).value
                                    );
                                    (e.target as HTMLInputElement).value = "";
                                  }
                                }}
                                className='text-base'
                              />
                              <Button
                                type='button'
                                onClick={() => {
                                  const input = document.querySelector(
                                    'input[placeholder="Add a genre"]'
                                  ) as HTMLInputElement;
                                  addGenre(input.value);
                                  input.value = "";
                                }}
                              >
                                Add
                              </Button>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                              {genres.map((genre) => (
                                <Badge
                                  key={genre}
                                  variant='secondary'
                                  className='text-base'
                                >
                                  {genre}
                                  <Button
                                    type='button'
                                    variant='ghost'
                                    size='sm'
                                    className='ml-2 h-auto p-0 text-base'
                                    onClick={() => removeGenre(genre)}
                                  >
                                    <X className='h-3 w-3' />
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='image'
                    render={({ field: { value, onChange, ...field } }) => (
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
                              className='text-base'
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
                                  "w-full pl-3 text-left font-normal text-base",
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
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date("1900-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <FormField
                      control={form.control}
                      name='doorTime'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Door Time</FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <Input
                                type='time'
                                placeholder='19:00'
                                {...field}
                                className='text-base'
                              />
                              <Clock className='absolute right-3 top-2.5 h-4 w-4 opacity-50' />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='startTime'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <Input
                                type='time'
                                placeholder='20:00'
                                {...field}
                                className='text-base'
                              />
                              <Clock className='absolute right-3 top-2.5 h-4 w-4 opacity-50' />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='endTime'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <Input
                                type='time'
                                placeholder='23:00'
                                {...field}
                                className='text-base'
                              />
                              <Clock className='absolute right-3 top-2.5 h-4 w-4 opacity-50' />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className='space-y-6'>
                  <FormField
                    control={form.control}
                    name='venue'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Venue</FormLabel>
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
                                {field.value
                                  ? affiliatedVenues.find(
                                      (venue) => venue.id === field.value
                                    )?.name
                                  : "Select venue"}
                                <Search className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-[300px] p-0'>
                            <Command>
                              <CommandInput
                                placeholder='Search venue...'
                                className='h-9'
                              />
                              <CommandEmpty>No venue found.</CommandEmpty>
                              <CommandGroup heading='Your Affiliates'>
                                {affiliatedVenues.map((venue) => (
                                  <CommandItem
                                    key={venue.id}
                                    onSelect={() => {
                                      form.setValue("venue", venue.id);
                                    }}
                                    className='text-sm'
                                  >
                                    {venue.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                              <CommandGroup heading='Actions'>
                                <CommandItem className='text-sm'>
                                  Search for more venues
                                </CommandItem>
                                <CommandItem className='text-sm'>
                                  Add new venue
                                </CommandItem>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='performers'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Performers</FormLabel>
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
                                      form.setValue("performers", updatedValue);
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
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='capacity'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <div className='flex items-center space-x-4'>
                            <Slider
                              min={1}
                              max={100000}
                              step={10}
                              value={[field.value]}
                              onValueChange={(value) =>
                                field.onChange(value[0])
                              }
                              className='flex-grow'
                            />
                            <Input
                              type='number'
                              className='w-20 text-base'
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Set the maximum number of attendees (max 100,000)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {step === 4 && (
                <div className='space-y-6'>
                  <FormField
                    control={form.control}
                    name='ticketRequired'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                        <div className='space-y-0.5'>
                          <FormLabel className='text-base'>
                            Ticket Required
                          </FormLabel>
                          <FormDescription>
                            Is a ticket required for this event?
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
                  {form.watch("ticketRequired") && (
                    <div className='space-y-4 pl-4 border-l-2 border-primary'>
                      <FormField
                        control={form.control}
                        name='ticketPrice'
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
                                  className='text-base'
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
                        name='ticketLink'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ticket Link</FormLabel>
                            <FormControl>
                              <Input
                                type='url'
                                placeholder='https://...'
                                {...field}
                                className='text-base'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  <FormField
                    control={form.control}
                    name='reservationRequired'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                        <div className='space-y-0.5'>
                          <FormLabel className='text-base'>
                            Reservation Required
                          </FormLabel>
                          <FormDescription>
                            Is a reservation required for this event?
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
                  {form.watch("reservationRequired") && (
                    <div className='pl-4 border-l-2 border-primary'>
                      <FormField
                        control={form.control}
                        name='reservationLink'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reservation Link</FormLabel>
                            <FormControl>
                              <Input
                                type='url'
                                placeholder='https://...'
                                {...field}
                                className='text-base'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              )}
              {step === 5 && (
                <div className='space-y-6'>
                  <FormField
                    control={form.control}
                    name='ageRestriction'
                    render={({ field }) => (
                      <FormItem className='space-y-3'>
                        <FormLabel>Age Restriction</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className='flex flex-col space-y-1'
                          >
                            <FormItem className='flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value='all-ages' />
                              </FormControl>
                              <FormLabel className='font-normal text-base'>
                                All Ages
                              </FormLabel>
                            </FormItem>
                            <FormItem className='flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value='family-friendly' />
                              </FormControl>
                              <FormLabel className='font-normal text-base'>
                                Family Friendly
                              </FormLabel>
                            </FormItem>
                            <FormItem className='flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value='18+' />
                              </FormControl>
                              <FormLabel className='font-normal text-base'>
                                18+
                              </FormLabel>
                            </FormItem>
                            <FormItem className='flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value='21+' />
                              </FormControl>
                              <FormLabel className='font-normal text-base'>
                                21+
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <FormField
                      control={form.control}
                      name='isHoliday'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Holiday Event
                            </FormLabel>
                            <FormDescription>
                              Is this a holiday-themed event?
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
                      name='isPrivateEvent'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Private Event
                            </FormLabel>
                            <FormDescription>
                              Is this a private event?
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
                      name='servesAlcohol'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Serves Alcohol
                            </FormLabel>
                            <FormDescription>
                              Will alcohol be served at this event?
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
                      name='servesFood'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                          <div className='space-y-0.5'>
                            <FormLabel className='text-base'>
                              Serves Food
                            </FormLabel>
                            <FormDescription>
                              Will food be served at this event?
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
                          <FormLabel className='text-base'>
                            Publish Now
                          </FormLabel>
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
                          <FormLabel className='text-base'>
                            External Services
                          </FormLabel>
                          <FormDescription>
                            Select the external services you want to publish
                            this event to.
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
                                      checked={field.value?.includes(
                                        service.id
                                      )}
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
            </ScrollArea>
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
