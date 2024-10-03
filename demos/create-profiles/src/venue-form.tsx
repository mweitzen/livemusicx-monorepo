"use client";

import { z } from "zod";

import { Dispatch, SetStateAction, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Switch } from "@repo/ui/components/switch";
import { Loader2, AlertCircle } from "@repo/ui/icons";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";

import { Separator } from "@repo/ui/components/separator";
import {
  AboutTextarea,
  BookingEmailInput,
  BookingPhoneInput,
  EmailInput,
  GenresSelect,
  GoogleBusinessInput,
  NameInput,
  OpenTableInput,
  PhoneInput,
  TripAdvisorInput,
  VenueKeywordsSelect,
  WebsiteInput,
  YelpInput,
} from "./basic-info-inputs";

// Mock function to simulate Google Places API search
const searchGooglePlaces = async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: "place1",
      name: "The Jazz Lounge",
      address: "123 Melody St, New York, NY 10001",
    },
    {
      id: "place2",
      name: "Rock Arena",
      address: "456 Guitar Ave, Los Angeles, CA 90001",
    },
    {
      id: "place3",
      name: "Classical Hall",
      address: "789 Symphony Rd, Chicago, IL 60601",
    },
  ].filter((place) => place.name.toLowerCase().includes(query.toLowerCase()));
};
type SearchResults = Awaited<ReturnType<typeof searchGooglePlaces>>;

// Mock function to check if a venue already exists in the app
const checkExistingVenue = async (placeId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { exists: placeId === "place2", claimed: placeId === "place1" };
};

const venueFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Venue name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  zipCode: z.string().min(5, { message: "Please enter a valid ZIP code." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  website: z.string().url({ message: "Please enter a valid URL." }).optional(),
  capacity: z.number().min(1, { message: "Capacity must be at least 1." }),
  venueType: z.string().min(1, { message: "Please select a venue type." }),
  description: z
    .string()
    .max(500, { message: "Description must not exceed 500 characters." }),
  genres: z
    .array(z.object({ id: z.string() }))
    .min(1, { message: "Please select at least one keyword." }),
  keywords: z
    .array(z.string())
    .min(1, { message: "Please select at least one keyword." }),
  servesAlcohol: z.boolean(),
  servesFood: z.boolean(),
  ageRestriction: z.boolean(),
  minimumAge: z.number().min(0).max(21),
  requiresReservation: z.boolean(),
  reservationLink: z.string().url().optional(),
  privateAccess: z.boolean(),
  bookingPhoneNumber: z.string().optional(),
  bookingEmail: z.string().email().optional(),
  googleBusinessUrl: z.string().url().optional(),
  tripadvisorUrl: z.string().url().optional(),
  opentableUrl: z.string().url().optional(),
  yelpUrl: z.string().url().optional(),
});

type VenueFormValues = z.infer<typeof venueFormSchema>;

export default function CreateVenueProfileForm() {
  const [step, setStep] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [isManualEntry, setIsManualEntry] = useState(false);

  const form = useForm<VenueFormValues>({
    resolver: zodResolver(venueFormSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      website: "",
      capacity: 50,
      venueType: "",
      description: "",
      genres: [],
      keywords: [],
      servesAlcohol: false,
      servesFood: false,
      ageRestriction: false,
      minimumAge: 0,
      requiresReservation: false,
      reservationLink: "",
      privateAccess: false,
      bookingPhoneNumber: "",
      bookingEmail: "",
      googleBusinessUrl: "",
      tripadvisorUrl: "",
      opentableUrl: "",
      yelpUrl: "",
    },
  });

  const onSubmit = (values: VenueFormValues) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      alert(
        isManualEntry
          ? "Venue profile submitted for approval!"
          : "Venue profile created successfully!"
      );
    }, 1500);
  };

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Create Your Venue Profile</CardTitle>
        <CardDescription>
          Get discovered by performers and music lovers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            {step === 1 && (
              <SearchProfilesInput
                setStep={setStep}
                setIsManualEntry={setIsManualEntry}
              />
            )}
            {step === 2 && (
              <div className='space-y-6'>
                {isManualEntry && (
                  <Alert>
                    <AlertCircle className='h-4 w-4' />
                    <AlertTitle>Manual Entry</AlertTitle>
                    <AlertDescription>
                      Your venue will be submitted for approval before being
                      listed.
                    </AlertDescription>
                  </Alert>
                )}
                <NameInput
                  label='Venue Name'
                  placeholder='The Rock Cafe'
                />
                <AboutTextarea placeholder='Tell us about your venue' />
                <GenresSelect />
                <VenueKeywordsSelect />
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='state'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='zipCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <PhoneInput />
                <EmailInput />
                <WebsiteInput />
                <Separator />
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Venue Details</h3>
                  <FormField
                    control={form.control}
                    name='venueType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select venue type' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='BAR'>Bar</SelectItem>
                            <SelectItem value='CLUB'>Club</SelectItem>
                            <SelectItem value='THEATER'>Theater</SelectItem>
                            <SelectItem value='ARENA'>Arena</SelectItem>
                            <SelectItem value='OUTDOOR'>Outdoor</SelectItem>
                          </SelectContent>
                        </Select>
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
                          <Input
                            type='number'
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='keywords'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keywords (comma-separated)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value.split(",").map((k) => k.trim())
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Enter keywords that describe your venue, e.g., "live
                          music, jazz, cocktails"
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name='servesAlcohol'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                          <div className='space-y-0.5'>
                            <FormLabel>Serves Alcohol</FormLabel>
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
                        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                          <div className='space-y-0.5'>
                            <FormLabel>Serves Food</FormLabel>
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
                  <FormField
                    control={form.control}
                    name='ageRestriction'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                        <div className='space-y-0.5'>
                          <FormLabel>Age Restriction</FormLabel>
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
                  {form.watch("ageRestriction") && (
                    <FormField
                      control={form.control}
                      name='minimumAge'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Age</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value, 10))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name='requiresReservation'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                        <div className='space-y-0.5'>
                          <FormLabel>Requires Reservation</FormLabel>
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
                  {form.watch("requiresReservation") && (
                    <FormField
                      control={form.control}
                      name='reservationLink'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reservation Link</FormLabel>
                          <FormControl>
                            <Input
                              type='url'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name='privateAccess'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                        <div className='space-y-0.5'>
                          <FormLabel>Private Access Only</FormLabel>
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
                <Separator />
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Booking Information</h3>
                  <BookingPhoneInput />
                  <BookingEmailInput />
                </div>
                <Separator />
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>External Links</h3>
                  <GoogleBusinessInput />
                  <OpenTableInput />
                  <TripAdvisorInput />
                  <YelpInput />
                </div>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Please wait
                    </>
                  ) : isManualEntry ? (
                    "Submit for Approval"
                  ) : (
                    "Create Venue Profile"
                  )}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

interface SearchProfilesInputProps {
  setStep: Dispatch<SetStateAction<number>>;
  setIsManualEntry: Dispatch<SetStateAction<boolean>>;
}

function SearchProfilesInput({
  setStep,
  setIsManualEntry,
}: SearchProfilesInputProps) {
  const [, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults>([]);
  const [selectedPlace, setSelectedPlace] = useState<
    SearchResults[number] | null
  >(null);
  const [existingVenueCheck, setExistingVenueCheck] = useState<{
    claimed: boolean;
    exists: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useFormContext();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length >= 3) {
      setIsLoading(true);
      const results = await searchGooglePlaces(query);
      setSearchResults(results);
      setIsLoading(false);
    } else {
      setSearchResults([]);
    }
  };

  const handlePlaceSelect = async (place: SearchResults[number]) => {
    setSelectedPlace(place);
    setIsLoading(true);
    const checkResult = await checkExistingVenue(place.id);
    setExistingVenueCheck(checkResult);
    setIsLoading(false);
    if (!checkResult.exists && !checkResult.claimed) {
      form.reset({
        ...form.getValues(),
        name: place.name,
        address: place.address,
        // You would parse the address to fill these fields in a real implementation
        city: "",
        state: "",
        zipCode: "",
      });
      setStep(2);
    }
  };

  const handleManualEntry = () => {
    setIsManualEntry(true);
    setStep(2);
  };

  return (
    <div className='space-y-4'>
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Search for your venue</FormLabel>
            <FormControl>
              <Input
                placeholder='Enter venue name'
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleSearch(e.target.value);
                }}
              />
            </FormControl>
            <FormDescription>
              We'll search Google Places for your venue.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {isLoading && <Loader2 className='w-4 h-4 animate-spin mx-auto' />}
      {searchResults.length > 0 && (
        <div className='space-y-2'>
          {searchResults.map((place) => (
            <Card
              key={place.id}
              className='cursor-pointer hover:bg-accent'
              onClick={() => handlePlaceSelect(place)}
            >
              <CardHeader>
                <CardTitle className='text-lg'>{place.name}</CardTitle>
                <CardDescription>{place.address}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
      {existingVenueCheck && (
        <Alert variant={existingVenueCheck.claimed ? "destructive" : "default"}>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>
            {existingVenueCheck.claimed
              ? "Venue Already Claimed"
              : "Venue Already Exists"}
          </AlertTitle>
          <AlertDescription>
            {existingVenueCheck.claimed
              ? "This venue has already been claimed. If you believe this is an error, please report it."
              : "This venue already exists in our system. You can claim it if you're the owner."}
          </AlertDescription>
          <div className='mt-2'>
            {existingVenueCheck.claimed ? (
              <Button
                variant='outline'
                size='sm'
              >
                Report an Issue
              </Button>
            ) : (
              <Button
                variant='outline'
                size='sm'
              >
                Claim This Venue
              </Button>
            )}
          </div>
        </Alert>
      )}
      <div className='flex justify-between items-center'>
        <Button
          variant='outline'
          onClick={handleManualEntry}
        >
          My venue isn't listed
        </Button>
        <Button
          onClick={() => setStep(2)}
          disabled={!selectedPlace}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
