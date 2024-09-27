"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@repo/ui/helpers";
import { Button } from "@repo/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@repo/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { Badge } from "@repo/ui/components/badge";

const venueTypes = [
  { value: "bar", label: "Bar" },
  { value: "club", label: "Club" },
  { value: "concert-hall", label: "Concert Hall" },
  { value: "arena", label: "Arena" },
  { value: "stadium", label: "Stadium" },
  { value: "theater", label: "Theater" },
  { value: "outdoor-venue", label: "Outdoor Venue" },
  { value: "festival-grounds", label: "Festival Grounds" },
  { value: "cafe", label: "Cafe" },
  { value: "restaurant", label: "Restaurant" },
];

export function VenueTypeFilter() {
  const [open, setOpen] = React.useState(false);
  const [selectedVenues, setSelectedVenues] = React.useState<string[]>([]);

  const toggleVenue = React.useCallback((venue: string) => {
    setSelectedVenues((current) =>
      current.includes(venue)
        ? current.filter((v) => v !== venue)
        : [...current, venue]
    );
  }, []);

  const removeVenue = React.useCallback((venue: string) => {
    setSelectedVenues((current) => current.filter((v) => v !== venue));
  }, []);

  const clearAllVenues = React.useCallback(() => {
    setSelectedVenues([]);
  }, []);

  return (
    <div className='space-y-2'>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between md:w-[250px] text-left font-normal'
          >
            <span className='truncate'>
              {selectedVenues.length > 0
                ? `${selectedVenues.length} venue type${
                    selectedVenues.length > 1 ? "s" : ""
                  } selected`
                : "Select venue types"}
            </span>
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0 md:w-[250px]'>
          <Command className='max-h-[300px] overflow-y-auto'>
            <CommandInput placeholder='Search venue types...' />
            <CommandList>
              <CommandEmpty>No venue type found.</CommandEmpty>
              <CommandGroup>
                {venueTypes.map((venue) => (
                  <CommandItem
                    key={venue.value}
                    onSelect={() => toggleVenue(venue.value)}
                    className='cursor-pointer'
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 flex-shrink-0",
                        selectedVenues.includes(venue.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <span className='flex-grow'>{venue.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          {selectedVenues.length > 0 && (
            <div className='border-t p-2'>
              <Button
                variant='ghost'
                size='sm'
                className='w-full justify-center text-sm text-muted-foreground hover:text-foreground'
                onClick={clearAllVenues}
              >
                Clear all
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
      {selectedVenues.length > 0 && (
        <div className='flex flex-wrap gap-2 mt-2'>
          {selectedVenues.map((venue) => {
            const venueLabel = venueTypes.find((v) => v.value === venue)?.label;
            return venueLabel ? (
              <Badge
                key={venue}
                variant='secondary'
                className='px-2 py-1 text-sm'
              >
                {venueLabel}
                <Button
                  variant='ghost'
                  size='sm'
                  className='ml-1 h-auto p-0 text-muted-foreground hover:text-foreground'
                  onClick={() => removeVenue(venue)}
                >
                  <X className='h-3 w-3' />
                  <span className='sr-only'>Remove {venueLabel}</span>
                </Button>
              </Badge>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}
