"use client";

import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/components/drawer";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  MapPin,
  Home,
  Navigation,
  Search,
  Clock,
  X,
  Loader2,
} from "@repo/ui/icons";
import { useToast } from "@repo/ui/hooks/use-toast";

type Location = {
  id: string;
  name: string;
  type: "home" | "current" | "recent" | "suggestion";
};

export function AdvancedLocationSelector() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    id: "home",
    name: "New York, NY",
    type: "home",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [recentLocations, setRecentLocations] = useState<Location[]>([
    { id: "recent1", name: "Los Angeles, CA", type: "recent" },
    { id: "recent2", name: "Chicago, IL", type: "recent" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const locationOptions: Location[] = [
    { id: "home", name: "New York, NY", type: "home" },
    { id: "current", name: "Use Current Location", type: "current" },
  ];

  const suggestionLocations: Location[] = [
    { id: "suggestion1", name: "Nashville, TN", type: "suggestion" },
    { id: "suggestion2", name: "Austin, TX", type: "suggestion" },
    { id: "suggestion3", name: "New Orleans, LA", type: "suggestion" },
  ];

  const filteredLocations = [
    ...locationOptions,
    ...recentLocations,
    ...suggestionLocations,
  ].filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLocation = (location: Location) => {
    if (location.type === "current") {
      getCurrentLocation();
    } else {
      setSelectedLocation(location);
      if (location.type === "suggestion" || location.type === "recent") {
        setRecentLocations((prev) =>
          [location, ...prev.filter((loc) => loc.id !== location.id)].slice(
            0,
            3
          )
        );
      }
      setIsOpen(false);
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=YOUR_API_KEY`
            );
            const data = await response.json();
            if (data && data[0]) {
              const newLocation: Location = {
                id: "current",
                name: `${data[0].name}, ${data[0].country}`,
                type: "current",
              };
              setSelectedLocation(newLocation);
              setRecentLocations((prev) =>
                [
                  newLocation,
                  ...prev.filter((loc) => loc.id !== "current"),
                ].slice(0, 3)
              );
            }
          } catch (error) {
            console.error("Error fetching location name:", error);
            toast({
              title: "Error",
              description:
                "Unable to fetch your current location. Please try again.",
              variant: "destructive",
            });
          } finally {
            setIsLoading(false);
            setIsOpen(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
          toast({
            title: "Location Access Denied",
            description: "Please enable location services to use this feature.",
            variant: "destructive",
          });
        }
      );
    } else {
      setIsLoading(false);
      toast({
        title: "Geolocation Unavailable",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
    }
  };

  const LocationIcon = ({ type }: { type: Location["type"] }) => {
    switch (type) {
      case "home":
        return <Home className='w-4 h-4 mr-2' />;
      case "current":
        return <Navigation className='w-4 h-4 mr-2' />;
      case "recent":
        return <Clock className='w-4 h-4 mr-2' />;
      default:
        return <MapPin className='w-4 h-4 mr-2' />;
    }
  };

  const LocationContent = () => (
    <div className='flex flex-col space-y-4'>
      <div className='relative'>
        <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Search locations'
          className='pl-8 pr-8'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button
            variant='ghost'
            size='icon'
            className='absolute right-2 top-2 h-4 w-4 rounded-full'
            onClick={() => setSearchQuery("")}
          >
            <X className='h-3 w-3' />
            <span className='sr-only'>Clear search</span>
          </Button>
        )}
      </div>
      <ScrollArea className='h-[calc(100vh-12rem)] md:h-[300px]'>
        <div className='pr-4'>
          {filteredLocations.map((location) => (
            <Button
              key={location.id}
              variant='ghost'
              className='w-full justify-start mb-2'
              onClick={() => handleSelectLocation(location)}
            >
              <LocationIcon type={location.type} />
              {location.name}
            </Button>
          ))}
          {filteredLocations.length === 0 && (
            <p className='text-center text-muted-foreground'>
              No locations found
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );

  const MobileDrawer = () => (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DrawerTrigger asChild>
        <Button
          variant='outline'
          className='w-full justify-start md:w-[250px]'
        >
          <MapPin className='mr-2 h-4 w-4' />
          {selectedLocation.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent className='h-[85vh] max-h-[85vh]'>
        <DrawerHeader className='pb-2'>
          <DrawerTitle>Select Location</DrawerTitle>
        </DrawerHeader>
        <div className='px-4 pb-4 flex-grow overflow-hidden'>
          <LocationContent />
        </div>
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  const DesktopPopover = () => (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='w-[250px] justify-start'
        >
          <MapPin className='mr-2 h-4 w-4' />
          {selectedLocation.name}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
        <div className='p-4'>
          <LocationContent />
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className='flex items-center space-x-2'>
      <span className='text-sm font-medium'>Location:</span>
      {isLoading ? (
        <Button
          variant='outline'
          className='w-[250px] justify-start'
          disabled
        >
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Getting location...
        </Button>
      ) : isMobile ? (
        <MobileDrawer />
      ) : (
        <DesktopPopover />
      )}
    </div>
  );
}
