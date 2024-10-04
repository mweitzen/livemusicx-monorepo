"use client";
import { z } from "zod";

import { useState, Dispatch, SetStateAction } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@repo/ui/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Switch } from "@repo/ui/components/switch";
import {
  Loader2,
  Facebook,
  Youtube,
  Instagram,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "@repo/ui/icons";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { Badge } from "@repo/ui/components/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
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
} from "../basic-info-inputs";
import { FormTextInput } from "../form-inputs";
import { MockProfile, useSearchProfiles } from "../use-search-profiles";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  genres: z.array(z.string()).min(1, { message: "Please select a genre." }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  basedIn: z
    .string()
    .min(2, { message: "Based in location must be at least 2 characters." }),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }),
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

export default function ComprehensivePerformerProfileForm() {
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
      location: "",
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
      alert("Profile submitted successfully!");
    }, 1500);
  };

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Create Your Performer Profile</CardTitle>
        <CardDescription>
          Get discovered and connect with fans and venues
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

function ConnectExternalServices() {
  const [isLoading, setIsLoading] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState({
    facebook: false,
    youtube: false,
    instagram: false,
  });

  const form = useFormContext();

  const handleExternalLink = (
    platform: "facebook" | "youtube" | "instagram"
  ) => {
    setIsLoading(true);
    setTimeout(() => {
      setLinkedAccounts((prev) => ({ ...prev, [platform]: true }));
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className='space-y-2'>
      {(["facebook", "youtube", "instagram"] as const).map((platform) => (
        <div
          key={platform}
          className='flex flex-row items-center justify-between rounded-lg border p-3'
        >
          <div className='flex items-center space-x-2'>
            {platform === "facebook" && <Facebook className='h-4 w-4' />}
            {platform === "youtube" && <Youtube className='h-4 w-4' />}
            {platform === "instagram" && <Instagram className='h-4 w-4' />}
            <span className='capitalize'>{platform}</span>
          </div>
          {linkedAccounts[platform] ? (
            <div className='flex items-center space-x-2'>
              <Badge
                variant='outline'
                className='text-green-600 border-green-600'
              >
                <CheckCircle2 className='h-3 w-3 mr-1' />
                Connected
              </Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='flex items-center space-x-2'>
                      <span className='text-sm'>Sync</span>
                      <FormField
                        control={form.control}
                        name={
                          `${platform}Sync` as
                            | "facebookSync"
                            | "youtubeSync"
                            | "instagramSync"
                        }
                        render={({ field }) => (
                          <FormItem>
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
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Keep your {platform} profile in sync with LMX</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ) : (
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => handleExternalLink(platform)}
            >
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </>
              ) : (
                "Connect"
              )}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

interface SearchExistingProfilesProps {
  type: "musicians" | "bands" | "organizers";
  setStep: Dispatch<SetStateAction<number>>;
  setSelectedProfile: Dispatch<SetStateAction<MockProfile | null>>;
}

function SearchExistingProfiles({
  type,
  setStep,
  setSelectedProfile,
}: SearchExistingProfilesProps) {
  const form = useFormContext();
  const query = form.watch("name");

  // const {} = api.accounts.searchUnclaimed.useQuery()
  const searchResults = useSearchProfiles(type, query);

  const handleProfileSelect = (profile: MockProfile) => {
    setSelectedProfile(profile);
    form.reset({
      name: profile.name,
      genres: profile.genres,
      location: profile.location,
      basedIn: profile.location,
      bio: "",
    });
    setStep(2);
  };

  return (
    <div className='space-y-4'>
      <NameInput description="We'll check if a profile already exists for this name." />
      {searchResults && searchResults.length > 0 && (
        <div className='space-y-2'>
          <p className='text-sm font-medium'>Existing profiles found:</p>
          {searchResults.map((profile) => (
            <Card
              key={profile.id}
              className='flex justify-between items-center p-4'
            >
              <div>
                <h3 className='font-medium'>{profile.name}</h3>
                <p className='text-sm text-muted-foreground'>
                  {profile.genres[0]} • {profile.location}
                </p>
              </div>
              <Button onClick={() => handleProfileSelect(profile)}>
                Claim Account
              </Button>
            </Card>
          ))}
        </div>
      )}
      <Button
        onClick={() => setStep(2)}
        className='w-full'
        disabled={query.length < 2}
      >
        Create New Profile
      </Button>
    </div>
  );
}
