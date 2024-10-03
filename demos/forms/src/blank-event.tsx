"use client";

import { api } from "@repo/trpc/react";
import { cn } from "@repo/ui/helpers";
import { format } from "date-fns";
import { z } from "zod";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import { Progress } from "@repo/ui/components/progress";
import { Checkbox } from "@repo/ui/components/checkbox";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import { Separator } from "@repo/ui/components/separator";
import { Switch } from "@repo/ui/components/switch";
import { Badge } from "@repo/ui/components/badge";
import { CreateEventInput } from "@repo/validators/events";

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

type FormValues = Omit<z.infer<typeof CreateEventInput>, "imageUrl"> & {
  date: Date;
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
  const [genres, setGenres] = useState<string[]>([]);

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
      timeStart: new Date(),
      timeDoor: new Date(),
      timeEnd: new Date(),
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
    mutate(values);

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
        form.setValue("genreIds", [...genres, genre]);
      }
    },
    [genres, form]
  );

  const removeGenre = useCallback(
    (genre: string) => {
      setGenres((prev) => prev.filter((g) => g !== genre));
      form.setValue(
        "genreIds",
        genres.filter((g) => g !== genre)
      );
    },
    [genres, form]
  );

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
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='An Evening with Bruno Mars'
                          {...field}
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
                          className='resize-none'
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* TODO: Field Array */}
                <FormField
                  control={form.control}
                  name='genreIds'
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
                              >
                                {genre}
                                <Button
                                  type='button'
                                  variant='ghost'
                                  size='sm'
                                  className='ml-2 h-auto p-0 '
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
                  name='keywordIds'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords</FormLabel>
                      <FormControl>
                        <div className='space-y-2'>
                          <div className='flex space-x-2'>
                            <Input
                              placeholder='Add a keyword'
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addGenre(
                                    (e.target as HTMLInputElement).value
                                  );
                                  (e.target as HTMLInputElement).value = "";
                                }
                              }}
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
                              >
                                {genre}
                                <Button
                                  type='button'
                                  variant='ghost'
                                  size='sm'
                                  className='ml-2 h-auto p-0 '
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
                  <FormField
                    control={form.control}
                    name='timeStart'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input
                            type='time'
                            placeholder='20:00'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='timeEnd'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input
                            type='time'
                            placeholder='23:00'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='timeDoor'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Door Time</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          placeholder='19:00'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {step === 3 && (
              <div className='space-y-6'>
                <FormField
                  control={form.control}
                  name='venueId'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Venue</FormLabel>
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
                                ? affiliatedVenues.find(
                                    (venue) => venue.id === field.value
                                  )?.name
                                : "Select venue"}
                              <Search className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Command>
                            <CommandInput
                              placeholder='Search venue...'
                              className='h-9'
                            />
                            <CommandEmpty>No venue found.</CommandEmpty>
                            <CommandList>
                              <CommandGroup heading='Your Affiliates'>
                                {affiliatedVenues.map((venue) => (
                                  <CommandItem
                                    key={venue.id}
                                    onSelect={() => {
                                      form.setValue("venueId", venue.id);
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
                  name='venueId'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Organizer</FormLabel>
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
                                ? affiliatedVenues.find(
                                    (venue) => venue.id === field.value
                                  )?.name
                                : "Select organizer"}
                              <Search className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Command>
                            <CommandInput
                              placeholder='Search organizer...'
                              className='h-9'
                            />
                            <CommandEmpty>No organizer found.</CommandEmpty>
                            <CommandList>
                              <CommandGroup heading='Your Affiliates'>
                                {affiliatedVenues.map((venue) => (
                                  <CommandItem
                                    key={venue.id}
                                    onSelect={() => {
                                      form.setValue("venueId", venue.id);
                                    }}
                                    className='text-sm'
                                  >
                                    {venue.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                              <CommandGroup heading='Actions'>
                                <CommandItem className='text-sm'>
                                  Search for more organizers
                                </CommandItem>
                                <CommandItem className='text-sm'>
                                  Add new organizer
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
                                      const updatedValue = field.value.includes(
                                        performer.id
                                      )
                                        ? field.value.filter(
                                            (id) => id !== performer.id
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
                <FormField
                  control={form.control}
                  name='requiresTicket'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel>Ticket Required</FormLabel>
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
                <FormField
                  control={form.control}
                  name='requiresRsvp'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel>Reservation Required</FormLabel>
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
                {form.watch("requiresRsvp") && (
                  <div className='pl-4 border-l-2 border-primary'>
                    <FormField
                      control={form.control}
                      name='rsvpLink'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reservation Link</FormLabel>
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
                          defaultValue={field.value}
                          className='flex flex-col space-y-1'
                        >
                          <FormItem className='flex items-center space-x-3'>
                            <FormControl>
                              <RadioGroupItem value={1} />
                            </FormControl>
                            <FormLabel>All Ages</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3'>
                            <FormControl>
                              <RadioGroupItem value={0} />
                            </FormControl>
                            <FormLabel>Family Friendly</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3'>
                            <FormControl>
                              <RadioGroupItem value={13} />
                            </FormControl>
                            <FormLabel>13+</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3'>
                            <FormControl>
                              <RadioGroupItem value={18} />
                            </FormControl>
                            <FormLabel>18+</FormLabel>
                          </FormItem>
                          <FormItem className='flex items-center space-x-3'>
                            <FormControl>
                              <RadioGroupItem value={21} />
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
                  <FormField
                    control={form.control}
                    name='isHoliday'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                        <div className='space-y-0.5'>
                          <FormLabel>Holiday Event</FormLabel>
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
                    name='isPrivate'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                        <div className='space-y-0.5'>
                          <FormLabel>Private Event</FormLabel>
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
                          <FormLabel>Serves Alcohol</FormLabel>
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
                          <FormLabel>Serves Food</FormLabel>
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
