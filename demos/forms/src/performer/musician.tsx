"use client";
import { z } from "zod";

import { useState, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MockProfile } from "../lib/use-search-profiles";

import {
  MusicianJoinBands,
  PerformerBasicInfo,
  ConnectExternalServices,
  PerformerImage,
  SearchExistingProfiles,
} from "./sections";
import { Form } from "@repo/ui/components/form";
import { Button } from "@repo/ui/components/button";
import { AlertCircle, Loader2 } from "@repo/ui/icons";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";

type PerformerType = "musician" | "band" | null;

export function MusicianProfileForm({
  setType,
}: {
  setType: Dispatch<SetStateAction<PerformerType>>;
}) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<MockProfile | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      about: "",
      genres: [],
      basedIn: "",
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
      alert("Profile submitted successfully!");
    }, 1500);
  };

  return (
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
        {selectedProfile && (
          <Alert>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Claiming Existing Profile</AlertTitle>
            <AlertDescription>
              You're updating the profile for {selectedProfile.name}. Some
              information has been pre-filled.
            </AlertDescription>
          </Alert>
        )}
        {step === 2 && <PerformerBasicInfo musician />}
        {step === 3 && <PerformerImage />}
        {step === 4 && <MusicianJoinBands />}
        {step === 5 && <ConnectExternalServices />}
        <div className='flex gap-4'>
          <Button
            type='button'
            onClick={() => setType(null)}
          >
            Cancel
          </Button>
          <Button
            type='button'
            onClick={() => setStep((s) => s + 1)}
          >
            Next
          </Button>
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
      </form>
    </Form>
  );
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  genres: z.array(z.string()).min(1, { message: "Please select a genre." }),
  basedIn: z
    .string()
    .min(2, { message: "Based in location must be at least 2 characters." }),
  about: z
    .string()
    .max(500, { message: "Bio must not exceed 500 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL." }).optional(),
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
  facebookSync: z.boolean().default(false),
  youtubeSync: z.boolean().default(false),
  instagramSync: z.boolean().default(false),
});
