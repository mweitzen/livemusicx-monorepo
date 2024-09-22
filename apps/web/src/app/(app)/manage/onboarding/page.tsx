"use client";

import { useState, useCallback, useEffect, createElement } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Textarea } from "@repo/ui/components/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Checkbox } from "@repo/ui/components/checkbox";
import { toast } from "~/hooks/use-toast";
import { Progress } from "@repo/ui/components/progress";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Upload,
  Facebook,
  Instagram,
  Twitter,
  Globe,
  MapPin,
  Calendar,
  Music,
  Users,
} from "@repo/ui/icons";
import { Combobox } from "@repo/ui/components/combobox";
import { Switch } from "@repo/ui/components/switch";

const genres = [
  "Rock",
  "Pop",
  "Hip Hop",
  "R&B",
  "Country",
  "Electronic",
  "Jazz",
  "Classical",
  "Folk",
  "Blues",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

type AccountType = "performer" | "venue" | "organizer" | "associate";

const accountTypeInfo = {
  performer: {
    icon: Music,
    title: "Performer Profile",
    description: "Set up your artist or band profile",
  },
  venue: {
    icon: MapPin,
    title: "Venue Profile",
    description: "Create your venue's online presence",
  },
  organizer: {
    icon: Calendar,
    title: "Organizer Profile",
    description: "Establish your event organization profile",
  },
  associate: {
    icon: Users,
    title: "Associate Profile",
    description: "Set up your staff account",
  },
};

export default function AdminOnboarding() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  // For demo purposes, allow switching between account types
  const [accountType, setAccountType] = useState<AccountType>("performer");

  // Form state
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [website, setWebsite] = useState("");
  const [location] = useState("");
  const [capacity, setCapacity] = useState("");
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [facebookConnected, setFacebookConnected] = useState(false);
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const totalSteps = 5;
    setProgress((step / totalSteps) * 100);
  }, [step]);

  const handleNext = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Submit all data
      toast({
        title: "Onboarding Complete",
        description: "Your profile has been set up successfully!",
      });
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleSocialConnect = async (
    platform: "facebook" | "instagram" | "twitter"
  ) => {
    setIsLoading(true);
    // Simulate OAuth connection
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    switch (platform) {
      case "facebook":
        setFacebookConnected(true);
        break;
      case "instagram":
        setInstagramConnected(true);
        break;
      case "twitter":
        setTwitterConnected(true);
        break;
    }
    toast({
      title: "Account Connected",
      description: `Your ${platform} account has been successfully connected.`,
    });
  };

  const handleProfilePictureUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePicture(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const renderStepContent = () => {
    const { icon: Icon } = accountTypeInfo[accountType];

    switch (step) {
      case 1:
        return (
          <div className='space-y-6'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='relative w-32 h-32 rounded-full overflow-hidden bg-gray-100'>
                {profilePicture ? (
                  <Image
                    src={profilePicture}
                    alt='Profile'
                    height={128}
                    width={128}
                  />
                ) : (
                  <div className='flex items-center justify-center w-full h-full text-gray-400'>
                    <Icon className='w-16 h-16' />
                  </div>
                )}
              </div>
              <Button
                variant='outline'
                onClick={() =>
                  document.getElementById("profile-picture-upload")?.click()
                }
              >
                <Upload className='mr-2 h-4 w-4' />
                Upload Picture
              </Button>
              <input
                id='profile-picture-upload'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleProfilePictureUpload}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                placeholder={
                  accountType === "performer" ? "Artist or Band Name" : "Name"
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='bio'>Bio</Label>
              <Textarea
                id='bio'
                placeholder={`Tell us about your ${
                  accountType === "performer" ? "music" : accountType
                }`}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className='space-y-6'>
            {accountType === "performer" && (
              <div className='space-y-2'>
                <Label>Select Your Genres (up to 3)</Label>
                <div className='grid grid-cols-2 gap-2'>
                  {genres.map((genre) => (
                    <div
                      key={genre}
                      className='flex items-center space-x-2'
                    >
                      <Checkbox
                        id={genre}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={(checked) => {
                          setSelectedGenres(
                            checked
                              ? [...selectedGenres, genre].slice(0, 3)
                              : selectedGenres.filter((g) => g !== genre)
                          );
                        }}
                      />
                      <label
                        htmlFor={genre}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        {genre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {accountType === "venue" && (
              <div className='space-y-2'>
                <Label htmlFor='capacity'>Venue Capacity</Label>
                <Input
                  id='capacity'
                  type='number'
                  placeholder='Enter venue capacity'
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </div>
            )}
            {(accountType === "organizer" || accountType === "venue") && (
              <div className='space-y-2'>
                <Label>Event Types</Label>
                <div className='grid grid-cols-2 gap-2'>
                  {[
                    "Concerts",
                    "Festivals",
                    "Private Events",
                    "Corporate Events",
                  ].map((type) => (
                    <div
                      key={type}
                      className='flex items-center space-x-2'
                    >
                      <Checkbox
                        id={type}
                        checked={eventTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          setEventTypes(
                            checked
                              ? [...eventTypes, type]
                              : eventTypes.filter((t) => t !== type)
                          );
                        }}
                      />
                      <label
                        htmlFor={type}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className='space-y-2'>
              <Label htmlFor='location'>Location</Label>
              <Combobox
                items={cities.map((city) => ({ label: city, value: city }))}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='website'>Website</Label>
              <Input
                id='website'
                type='url'
                placeholder='https://www.example.com'
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <Label>Connect Your Social Accounts</Label>
            <div className='space-y-4'>
              <Button
                variant='outline'
                className='w-full justify-start'
                onClick={() => handleSocialConnect("facebook")}
                disabled={facebookConnected || isLoading}
              >
                <Facebook className='mr-2 h-4 w-4' />
                {facebookConnected ? "Facebook Connected" : "Connect Facebook"}
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start'
                onClick={() => handleSocialConnect("instagram")}
                disabled={instagramConnected || isLoading}
              >
                <Instagram className='mr-2 h-4 w-4' />
                {instagramConnected
                  ? "Instagram Connected"
                  : "Connect Instagram"}
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start'
                onClick={() => handleSocialConnect("twitter")}
                disabled={twitterConnected || isLoading}
              >
                <Twitter className='mr-2 h-4 w-4' />
                {twitterConnected ? "Twitter Connected" : "Connect Twitter"}
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className='space-y-6'>
            <div className='flex items-center space-x-2'>
              <Switch
                id='notifications'
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
              <Label htmlFor='notifications'>Enable notifications</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='terms'
                checked={termsAccepted}
                onCheckedChange={(checked) =>
                  setTermsAccepted(checked as boolean)
                }
              />
              <Label htmlFor='terms'>
                I agree to the{" "}
                <a
                  href='/terms'
                  className='text-primary hover:underline'
                >
                  Terms and Conditions
                </a>
              </Label>
            </div>
          </div>
        );
      case 5:
        return (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium'>Review Your Profile</h3>
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <div className='relative w-16 h-16 rounded-full overflow-hidden bg-gray-100'>
                  {profilePicture ? (
                    <Image
                      src={profilePicture}
                      alt='Profile'
                      height={64}
                      width={64}
                    />
                  ) : (
                    <div className='flex items-center justify-center w-full h-full text-gray-400'>
                      <Icon className='w-8 h-8' />
                    </div>
                  )}
                </div>
                <div>
                  <p className='font-semibold'>{name}</p>
                  <p className='text-sm text-gray-500'>{accountType}</p>
                </div>
              </div>
              <p>
                <strong>Bio:</strong> {bio}
              </p>
              {accountType === "performer" && (
                <p>
                  <strong>Genres:</strong> {selectedGenres.join(", ")}
                </p>
              )}
              {accountType === "venue" && (
                <p>
                  <strong>Capacity:</strong> {capacity}
                </p>
              )}
              {(accountType === "organizer" || accountType === "venue") && (
                <p>
                  <strong>Event Types:</strong> {eventTypes.join(", ")}
                </p>
              )}
              <p>
                <strong>Website:</strong> {website}
              </p>
              <p>
                <strong>Location:</strong> {location}
              </p>
              <p>
                <strong>Connected Accounts:</strong>{" "}
                {[
                  facebookConnected && "Facebook",
                  instagramConnected && "Instagram",
                  twitterConnected && "Twitter",
                ]
                  .filter(Boolean)
                  .join(", ") || "None"}
              </p>
              <p>
                <strong>Notifications:</strong>{" "}
                {notificationsEnabled ? "Enabled" : "Disabled"}
              </p>
              <p>
                <strong>Terms Accepted:</strong> {termsAccepted ? "Yes" : "No"}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='container mx-auto p-4 max-w-2xl'>
      <Select
        value={accountType}
        onValueChange={(value: AccountType) => setAccountType(value)}
      >
        <SelectTrigger className='w-full mb-4'>
          <SelectValue placeholder='Select account type' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='performer'>Performer</SelectItem>
          <SelectItem value='venue'>Venue</SelectItem>
          <SelectItem value='organizer'>Organizer</SelectItem>
          <SelectItem value='associate'>Associate</SelectItem>
        </SelectContent>
      </Select>

      <Card className='w-full'>
        <CardHeader>
          <div className='flex items-center space-x-2'>
            {createElement(accountTypeInfo[accountType].icon, {
              className: "w-6 h-6",
            })}
            <div>
              <CardTitle className='text-2xl font-bold'>
                {accountTypeInfo[accountType].title}
              </CardTitle>
              <CardDescription>
                {accountTypeInfo[accountType].description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress
            value={progress}
            className='mb-6'
          />
          <div className='mt-6'>{renderStepContent()}</div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            variant='outline'
            onClick={handleBack}
            disabled={step === 1 || isLoading}
            className='w-[120px]'
          >
            <ChevronLeft className='mr-2 h-4 w-4' />
            Back
          </Button>
          <div className='space-x-2'>
            {step < 5 && (
              <Button
                variant='ghost'
                onClick={handleSkip}
                disabled={isLoading}
                className='w-[120px]'
              >
                Skip
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={isLoading}
              className='w-[120px]'
            >
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {!isLoading &&
                (step < 5 ? (
                  <ChevronRight className='mr-2 h-4 w-4' />
                ) : (
                  <Globe className='mr-2 h-4 w-4' />
                ))}
              {step < 5 ? "Next" : "Finish"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
