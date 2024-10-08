"use client";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@repo/ui/components/form";
import { Button } from "@repo/ui/components/button";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";

import { Loader2, AlertCircle, ChevronDown, ChevronUp } from "@repo/ui/icons";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/collapsible";

import {
  AboutTextarea,
  EmailInput,
  FacebookInput,
  InstagramInput,
  NameInput,
  PhoneInput,
  TwitterInput,
  WebsiteInput,
  YouTubeInput,
  SpotifyInput,
  BandcampInput,
  GenresSelect,
} from "../components/basic-info-inputs";
import { FormTextInput } from "../components/form-inputs";
import { MockProfile } from "../lib/use-search-profiles";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  about: z
    .string()
    .max(500, { message: "Bio must not exceed 500 characters." }),
  genres: z.array(z.string()).min(1, { message: "Please select a genre." }),
  website: z.string().url({ message: "Please enter a valid URL." }).optional(),
  basedIn: z
    .string()
    .min(2, { message: "Based in location must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  youtubeUrl: z
    .string()
    .url({ message: "Please enter a valid YouTube URL." })
    .optional(),
  facebookUrl: z
    .string()
    .url({ message: "Please enter a valid Facebook URL." })
    .optional(),
  twitterUrl: z
    .string()
    .url({ message: "Please enter a valid Twitter URL." })
    .optional(),
  instagramUrl: z
    .string()
    .url({ message: "Please enter a valid Instagram URL." })
    .optional(),
  bandcampUrl: z
    .string()
    .url({ message: "Please enter a valid Bandcamp URL." })
    .optional(),
  spotifyUrl: z
    .string()
    .url({ message: "Please enter a valid Spotify URL." })
    .optional(),
});

export default function CreateMusicianProfileForm() {
  const [step, setStep] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState<MockProfile | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isOptionalFieldsOpen, setIsOptionalFieldsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      genres: [],
      basedIn: "",
      bio: "",
      email: "",
      phone: "",
      website: "",
      youtubeUrl: "",
      facebookUrl: "",
      twitterUrl: "",
      instagramUrl: "",
      bandcampUrl: "",
      spotifyUrl: "",
      facebookSync: false,
      youtubeSync: false,
      instagramSync: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      alert("Musician Profile submitted successfully!");
    }, 1500);
  };

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Create Your Musician Profile</CardTitle>
        <CardDescription>
          Get discovered and connect with fans, venues, and organizers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            {step === 1 && (
              <SearchExistingProfiles
                type='musicians'
                setStep={setStep}
                setSelectedProfile={setSelectedProfile}
              />
            )}
            {step === 2 && (
              <div className='space-y-6'>
                {selectedProfile && (
                  <Alert>
                    <AlertCircle className='h-4 w-4' />
                    <AlertTitle>Claiming Existing Profile</AlertTitle>
                    <AlertDescription>
                      You're updating the profile for {selectedProfile.name}.
                      Some information has been pre-filled.
                    </AlertDescription>
                  </Alert>
                )}
                <NameInput label='Performer Name' />
                <GenresSelect />
                <FormTextInput
                  name='basedIn'
                  label='Based In'
                  placeholder='e.g., Los Angeles, CA'
                />
                <AboutTextarea />
                <EmailInput />
                <Collapsible
                  open={isOptionalFieldsOpen}
                  onOpenChange={setIsOptionalFieldsOpen}
                  className='space-y-2'
                >
                  <div className='flex items-center justify-between space-x-4 px-4'>
                    <h4 className='text-sm font-semibold'>
                      Optional Information
                    </h4>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='w-9 p-0'
                      >
                        {isOptionalFieldsOpen ? (
                          <ChevronUp className='h-4 w-4' />
                        ) : (
                          <ChevronDown className='h-4 w-4' />
                        )}
                        <span className='sr-only'>Toggle optional fields</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className='space-y-4'>
                    <PhoneInput />
                    <WebsiteInput />
                    <YouTubeInput />
                    <FacebookInput />
                    <InstagramInput />
                    <TwitterInput />
                    <SpotifyInput />
                    <BandcampInput />
                  </CollapsibleContent>
                </Collapsible>
                <div className='space-y-4'>
                  <h4 className='text-sm font-medium'>
                    Link and sync external accounts
                  </h4>
                  <ConnectExternalServices />
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
                  ) : (
                    "Submit Profile"
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
