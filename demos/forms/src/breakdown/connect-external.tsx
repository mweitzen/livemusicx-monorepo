"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@repo/ui/components/button";

import { FormControl, FormField, FormItem } from "@repo/ui/components/form";

import { Switch } from "@repo/ui/components/switch";
import {
  Loader2,
  Facebook,
  Youtube,
  Instagram,
  CheckCircle2,
} from "@repo/ui/icons";
import { Badge } from "@repo/ui/components/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";

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
