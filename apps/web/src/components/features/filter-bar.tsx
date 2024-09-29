"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

import { api } from "@repo/trpc/react";
import { cn } from "@repo/ui/helpers";

import {
  Search,
  MapPin,
  SlidersHorizontal,
  ArrowUpDown,
  Loader2,
  Home,
  Navigation,
  List,
  Map,
} from "@repo/ui/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@repo/ui/components/sheet";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Toggle } from "@repo/ui/components/toggle";
import { SearchInput } from "./filters";

export default function FilterBar() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery("");
    }
  };

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  return (
    <div className='sticky top-navigation bg-background z-10 -mx-gutter md:-mx-gutter-lg -mt-6'>
      <div
        className={cn(
          "px-gutter md:px-gutter-lg py-2",
          !isSearchExpanded && "border-b border-border"
        )}
      >
        <div className='flex items-center space-x-2'>
          {pathname !== "/explore" && (
            <Button
              variant='outline'
              size='icon'
              className='shrink-0'
              onClick={toggleSearch}
              aria-label={isSearchExpanded ? "Close search" : "Expand search"}
            >
              <Search className='h-4 w-4' />
            </Button>
          )}
          <SelectLocation />
          {pathname !== "/explore" && (
            <>
              <SortList />
              <FilterList />
              <ToggleListView />
            </>
          )}
        </div>
      </div>
      {isSearchExpanded && (
        <div className='border-b border-border px-gutter md:px-gutter-lg py-2 transition-all duration-300 ease-in-out'>
          <SearchInput ref={searchInputRef} />
        </div>
      )}
    </div>
  );
}

function SelectLocation() {
  const { data: cities, isLoading } = api.location.getCities.useQuery();

  const [location, setLocation] = useState("Select Location");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState("");
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);

  const filteredLocations = cities
    ? cities.filter((city) =>
        city.name.toLowerCase().includes(locationSearchQuery.toLowerCase())
      )
    : [];

  const handleLocationSelect = (selectedLocation: string) => {
    if (selectedLocation === "Current") {
      setIsLoadingLocation(true);
      // Simulating geolocation API call
      setTimeout(() => {
        setLocation("Current Location");
        setIsLoadingLocation(false);
      }, 1000);
    } else if (selectedLocation === "Home") {
      setLocation("Home Location");
    } else {
      setLocation(selectedLocation);
    }
    setIsLocationDialogOpen(false);
  };

  return (
    <Dialog
      open={isLocationDialogOpen}
      onOpenChange={setIsLocationDialogOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='flex-grow justify-start'
        >
          <MapPin className='h-4 w-4 mr-1 shrink-0' />
          <span className='truncate hidden sm:block'>
            {isLoadingLocation ? "Loading..." : location}
          </span>
          {isLoadingLocation && (
            <Loader2 className='h-3 w-3 ml-1 animate-spin shrink-0' />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
        </DialogHeader>
        <div className='py-4'>
          <Input
            type='text'
            placeholder='Search locations...'
            value={locationSearchQuery}
            onChange={(e) => setLocationSearchQuery(e.target.value)}
            className='mb-4'
          />
          <ScrollArea className='h-48 pr-4'>
            <div className='space-y-2'>
              <Button
                variant='ghost'
                className='w-full justify-start'
                onClick={() => handleLocationSelect("Current")}
              >
                <Navigation className='h-4 w-4 mr-2' />
                Use Current Location
              </Button>
              <Button
                variant='ghost'
                className='w-full justify-start'
                onClick={() => handleLocationSelect("Home")}
              >
                <Home className='h-4 w-4 mr-2' />
                Use Home Location
              </Button>
              {filteredLocations.map((city) => (
                <Button
                  key={city.id}
                  variant='ghost'
                  className='w-full justify-start'
                  onClick={() => handleLocationSelect(city.name)}
                >
                  {city.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SortList() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='shrink-0'
          aria-label='Sort options'
        >
          <ArrowUpDown className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>Date</DropdownMenuItem>
        <DropdownMenuItem>Popularity</DropdownMenuItem>
        <DropdownMenuItem>Price</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FilterList() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='shrink-0'
          aria-label='Open filters'
        >
          <SlidersHorizontal className='h-4 w-4' />
        </Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <h3 className='text-lg font-semibold mb-4'>Filters</h3>
        <div className='space-y-4'>
          <div>
            <h4 className='font-medium mb-2'>Event Type</h4>
            <div className='space-y-2'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='mr-2'
                />
                Concert
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='mr-2'
                />
                Festival
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='mr-2'
                />
                Club Night
              </label>
            </div>
          </div>
          <div>
            <h4 className='font-medium mb-2'>Genre</h4>
            <div className='space-y-2'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='mr-2'
                />
                Rock
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='mr-2'
                />
                Pop
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='mr-2'
                />
                Electronic
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='mr-2'
                />
                Hip Hop
              </label>
            </div>
          </div>
          <div>
            <h4 className='font-medium mb-2'>Date Range</h4>
            <div className='space-y-2'>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='dateRange'
                  className='mr-2'
                />
                This Week
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='dateRange'
                  className='mr-2'
                />
                This Month
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='dateRange'
                  className='mr-2'
                />
                Next 3 Months
              </label>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ToggleListView() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  return (
    <div className='flex items-center border rounded-md'>
      <Toggle
        pressed={viewMode === "list"}
        onPressedChange={() => setViewMode("list")}
        aria-label='List view'
        className='h-9 w-9 px-0'
      >
        <List className='h-4 w-4' />
      </Toggle>
      <Toggle
        pressed={viewMode === "map"}
        onPressedChange={() => setViewMode("map")}
        aria-label='Map view'
        className='h-9 w-9 px-0'
      >
        <Map className='h-4 w-4' />
      </Toggle>
    </div>
  );
}
