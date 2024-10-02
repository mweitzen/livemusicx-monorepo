"use client";
import { z } from "zod";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
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
  CardFooter,
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
  Twitter,
  Globe,
  Phone,
  Mail,
  MapPin,
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

const mockExistingProfiles = [
  { id: 1, name: "John Doe", genre: "Rock", location: "New York" },
  { id: 2, name: "Jane Smith", genre: "Pop", location: "Los Angeles" },
  { id: 3, name: "Bob Johnson", genre: "Jazz", location: "Chicago" },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  genre: z.string().min(1, { message: "Please select a genre." }),
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
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState({
    facebook: false,
    youtube: false,
    instagram: false,
  });
  const [isOptionalFieldsOpen, setIsOptionalFieldsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      genre: "",
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

  const performerName = form.watch("name");

  useEffect(() => {
    if (performerName.length >= 2) {
      const results = mockExistingProfiles.filter((profile) =>
        profile.name.toLowerCase().includes(performerName.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [performerName]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      alert("Profile submitted successfully!");
    }, 1500);
  };

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    form.reset({
      name: profile.name,
      genre: profile.genre,
      location: profile.location,
      basedIn: profile.location,
      bio: "",
    });
    setStep(2);
  };

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
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Performer Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your performer name'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        We'll check if a profile already exists for this name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {searchResults.length > 0 && (
                  <div className='space-y-2'>
                    <p className='text-sm font-medium'>
                      Existing profiles found:
                    </p>
                    {searchResults.map((profile) => (
                      <Card
                        key={profile.id}
                        className='flex justify-between items-center p-4'
                      >
                        <div>
                          <h3 className='font-medium'>{profile.name}</h3>
                          <p className='text-sm text-muted-foreground'>
                            {profile.genre} • {profile.location}
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
                  disabled={performerName.length < 2}
                >
                  {searchResults.length > 0 ? "Create New Profile" : "Continue"}
                </Button>
              </div>
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
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Performer Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='genre'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select your primary genre' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='rock'>Rock</SelectItem>
                          <SelectItem value='pop'>Pop</SelectItem>
                          <SelectItem value='jazz'>Jazz</SelectItem>
                          <SelectItem value='electronic'>Electronic</SelectItem>
                          <SelectItem value='classical'>Classical</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Performance Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., New York City'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='basedIn'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Based In</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., Los Angeles, CA'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='bio'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Tell us about yourself and your music'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Max 500 characters. You can always edit this later.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='your@email.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                    <FormField
                      control={form.control}
                      name='phone'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              type='tel'
                              placeholder='+1 (555) 123-4567'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='website'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              type='url'
                              placeholder='https://www.yourwebsite.com'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='youtubeUrl'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>YouTube Channel</FormLabel>
                          <FormControl>
                            <Input
                              type='url'
                              placeholder='https://www.youtube.com/channel/...'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='facebookUrl'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook Page</FormLabel>
                          <FormControl>
                            <Input
                              type='url'
                              placeholder='https://www.facebook.com/...'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='twitterUrl'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Profile</FormLabel>
                          <FormControl>
                            <Input
                              type='url'
                              placeholder='https://twitter.com/...'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='instagramUrl'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram Profile</FormLabel>
                          <FormControl>
                            <Input
                              type='url'
                              placeholder='https://www.instagram.com/...'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='bandcampUrl'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bandcamp Page</FormLabel>
                          <FormControl>
                            <Input
                              type='url'
                              placeholder='https://yourbandname.bandcamp.com'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='spotifyUrl'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Spotify Artist Page</FormLabel>
                          <FormControl>
                            <Input
                              type='url'
                              placeholder='https://open.spotify.com/artist/...'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CollapsibleContent>
                </Collapsible>
                <div className='space-y-4'>
                  <h4 className='text-sm font-medium'>
                    Link and sync external accounts
                  </h4>
                  <div className='space-y-2'>
                    {["facebook", "youtube", "instagram"].map((platform) => (
                      <div
                        key={platform}
                        className='flex flex-row items-center justify-between rounded-lg border p-3'
                      >
                        <div className='flex items-center space-x-2'>
                          {platform === "facebook" && (
                            <Facebook className='h-4 w-4' />
                          )}
                          {platform === "youtube" && (
                            <Youtube className='h-4 w-4' />
                          )}
                          {platform === "instagram" && (
                            <Instagram className='h-4 w-4' />
                          )}
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
                                  <p>
                                    Keep your {platform} profile in sync with
                                    LMX
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        ) : (
                          <Button
                            onClick={() =>
                              handleExternalLink(
                                platform as "facebook" | "youtube" | "instagram"
                              )
                            }
                            variant='outline'
                            size='sm'
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
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
