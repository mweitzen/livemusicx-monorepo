"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";

import { FormTextInput } from "../breakdown/form-input";
import { MockProfile, useSearchProfiles } from "../lib/use-search-profiles";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";

import {
  NameInput,
  AboutTextarea,
  GenresSelect,
  InstrumentsSelect,
} from "../breakdown/create-text-inputs";
import {
  CheckCircle2,
  Facebook,
  Instagram,
  Loader2,
  Youtube,
} from "@repo/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { FormControl, FormField, FormItem } from "@repo/ui/components/form";
import { Switch } from "@repo/ui/components/switch";

interface SearchExistingProfilesProps {
  type: "musicians" | "bands" | "organizers";
  setStep: Dispatch<SetStateAction<number>>;
  setSelectedProfile: Dispatch<SetStateAction<MockProfile | null>>;
}

export function SearchExistingProfiles({
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

export function PerformerBasicInfo({ musician }: { musician?: boolean }) {
  // const form = useFormContext();
  return (
    <div className='space-y-6'>
      <NameInput />
      <FormTextInput
        name='basedIn'
        label='Based In'
        placeholder='e.g., Los Angeles, CA'
      />
      <AboutTextarea />
      <GenresSelect />
      {musician && <InstrumentsSelect />}
    </div>
  );
}

export function PerformerImage() {
  // const form = useFormContext();
  return <div className='space-y-6'>Image</div>;
}

export function MusicianJoinBands() {
  // const form = useFormContext();
  return <div className='space-y-6'>Join Bands</div>;
}

export function BandAddMembers() {
  // const form = useFormContext();
  return <div className='space-y-6'>Add Members</div>;
}

export function ConnectExternalServices() {
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
    <div className='space-y-4'>
      <h4 className='text-sm font-medium'>Link and sync external accounts</h4>

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
    </div>
  );
}
