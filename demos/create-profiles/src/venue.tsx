import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIProvider } from "~/google-maps/provider";

import { Form } from "@repo/ui/components/form";
import {
  FormStep,
  FormStepHeader,
  FormStepTitle,
  FormStepDescription,
  FormStepContent,
} from "~/components/form-step";
import { Label } from "@repo/ui/components/label";
import { Button } from "@repo/ui/components/button";
import { GooglePlacesAutocomplete } from "~/google-maps/components/google-maps";
import type { GooglePlaceResult } from "~/google-maps/lib/google-maps";
import { VenueAccountStatus } from "./components/venue-account-status";
import { Separator } from "@repo/ui/components/separator";

const CreateVenueAccountFormSchema = z.object({});

export const CreateVenueAccount = () => {
  const [venue, setVenue] = useState<GooglePlaceResult | null>(null);

  const form = useForm<z.infer<typeof CreateVenueAccountFormSchema>>({
    resolver: zodResolver(CreateVenueAccountFormSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof CreateVenueAccountFormSchema>) {
    console.log(values);
  }

  return (
    <APIProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormStep display={!venue}>
            <FormStepHeader>
              <FormStepTitle>Create Venue Account</FormStepTitle>
              <FormStepDescription>
                Begin by searching your venue with Google Places
              </FormStepDescription>
            </FormStepHeader>
            <FormStepContent>
              <div>
                <Label>Search Venue Name</Label>
                <GooglePlacesAutocomplete setSelectedPlace={setVenue} />
                <p className='text-sm text-muted-foreground mt-2'>
                  Select your venue from the list of suggestions to continue.
                </p>
              </div>
              <Separator />
              <Label>Venue Not on Google?</Label>
              <Button
                type='button'
                variant='outline'
                onClick={() => alert("no luck. sorry.")}
              >
                Create Venue Manually
              </Button>
            </FormStepContent>
          </FormStep>
          <FormStep display={!!venue}>
            <FormStepHeader>
              <FormStepTitle>Confirm Venue</FormStepTitle>
              <FormStepDescription>
                Confirm your venue before continuing
              </FormStepDescription>
            </FormStepHeader>
            <FormStepContent>
              <VenueAccountStatus venue={{ name: "Restaurant 4" }} />
              <div>
                <p>{venue?.name}</p>
                <p>{venue?.addressShort}</p>
                <p>{venue?.phone}</p>
                <p>{venue?.website}</p>
              </div>
              <Button
                onClick={() => {
                  setVenue(null);
                }}
              >
                Go Back
              </Button>
            </FormStepContent>
          </FormStep>
        </form>
      </Form>
    </APIProvider>
  );
};
