"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  ChevronRight,
  ChevronDown,
  Search,
  MapPin,
  Globe,
  Map,
  Building,
  Home,
  Landmark,
  Clock,
  Music,
  Calendar,
  X,
} from "lucide-react";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet";
import { motion, AnimatePresence } from "framer-motion";

enum LocationType {
  REGION = "REGION",
  SUBREGION = "SUBREGION",
  AREA = "AREA",
  CITY = "CITY",
  NEIGHBORHOOD = "NEIGHBORHOOD",
}

type Location = {
  id: string;
  slug: string;
  name: string;
  uniqueName: string;
  description?: string;
  type: LocationType;
  parentId: string | null;
  children?: Location[];
};

type Event = {
  id: string;
  name: string;
  date: string;
  venue: string;
  locationId: string;
  genre: string;
  ticketPrice: string;
  description: string;
};

const fetchLocations = async (): Promise<Location[]> => {
  // Simulated API response based on the provided dataset
  const locationsData = [
    {
      id: "1",
      slug: "northeast",
      name: "Northeast",
      uniqueName: "northeast",
      type: LocationType.REGION,
      parentId: null,
    },
    {
      id: "2",
      slug: "midwest",
      name: "Midwest",
      uniqueName: "midwest",
      type: LocationType.REGION,
      parentId: null,
    },
    {
      id: "3",
      slug: "new-england",
      name: "New England",
      uniqueName: "new-england",
      type: LocationType.SUBREGION,
      parentId: "1",
    },
    {
      id: "4",
      slug: "mid-atlantic",
      name: "Mid-Atlantic",
      uniqueName: "mid-atlantic",
      type: LocationType.SUBREGION,
      parentId: "1",
    },
    {
      id: "5",
      slug: "great-lakes",
      name: "Great Lakes",
      uniqueName: "great-lakes",
      type: LocationType.SUBREGION,
      parentId: "2",
    },
    {
      id: "6",
      slug: "east-north-central",
      name: "East North Central",
      uniqueName: "east-north-central",
      type: LocationType.SUBREGION,
      parentId: "2",
    },
    {
      id: "7",
      slug: "west-north-central",
      name: "West North Central",
      uniqueName: "west-north-central",
      type: LocationType.SUBREGION,
      parentId: "2",
    },
    {
      id: "8",
      slug: "plains",
      name: "Plains",
      uniqueName: "plains",
      type: LocationType.SUBREGION,
      parentId: "2",
    },
    {
      id: "9",
      slug: "boston-metro",
      name: "Boston Metro",
      uniqueName: "boston-metro",
      type: LocationType.AREA,
      parentId: "3",
    },
    {
      id: "10",
      slug: "nyc-metro",
      name: "NYC Metro",
      uniqueName: "nyc-metro",
      type: LocationType.AREA,
      parentId: "4",
    },
    {
      id: "11",
      slug: "philadelphia-metro",
      name: "Philadelphia Metro",
      uniqueName: "philadelphia-metro",
      type: LocationType.AREA,
      parentId: "4",
    },
    {
      id: "12",
      slug: "chicago-metro",
      name: "Chicago Metro",
      uniqueName: "chicago-metro",
      type: LocationType.AREA,
      parentId: "5",
    },
    {
      id: "21",
      slug: "boston",
      name: "Boston",
      uniqueName: "boston",
      type: LocationType.CITY,
      parentId: "9",
    },
    {
      id: "23",
      slug: "new-york-city",
      name: "New York City",
      uniqueName: "new-york-city",
      type: LocationType.CITY,
      parentId: "10",
    },
    {
      id: "26",
      slug: "chicago",
      name: "Chicago",
      uniqueName: "chicago",
      type: LocationType.CITY,
      parentId: "12",
    },
    {
      id: "42",
      slug: "back-bay",
      name: "Back Bay",
      uniqueName: "back-bay",
      type: LocationType.NEIGHBORHOOD,
      parentId: "21",
    },
    {
      id: "44",
      slug: "midtown-manhattan",
      name: "Midtown Manhattan",
      uniqueName: "midtown-manhattan",
      type: LocationType.NEIGHBORHOOD,
      parentId: "23",
    },
    {
      id: "47",
      slug: "wicker-park",
      name: "Wicker Park",
      uniqueName: "wicker-park",
      type: LocationType.NEIGHBORHOOD,
      parentId: "26",
    },
    {
      id: "48",
      slug: "lincoln-park",
      name: "Lincoln Park",
      uniqueName: "lincoln-park",
      type: LocationType.NEIGHBORHOOD,
      parentId: "26",
    },
  ];

  const buildLocationTree = (
    locations: Location[],
    parentId: string | null = null
  ): Location[] => {
    return locations
      .filter((location) => location.parentId === parentId)
      .map((location) => ({
        ...location,
        children: buildLocationTree(locations, location.id),
      }));
  };

  return buildLocationTree(locationsData);
};

const fetchEvents = async (locationId: string): Promise<Event[]> => {
  // Simulated API call
  return [
    {
      id: "1",
      name: "Jazz Night at Blue Note",
      date: "2023-06-15T20:00:00",
      venue: "Blue Note Jazz Club",
      locationId: "44", // Midtown Manhattan
      genre: "Jazz",
      ticketPrice: "$30-$50",
      description: "An evening of smooth jazz with top local performers.",
    },
    {
      id: "2",
      name: "Rock the Park",
      date: "2023-06-17T18:00:00",
      venue: "Central Park",
      locationId: "44", // Midtown Manhattan
      genre: "Rock",
      ticketPrice: "$25",
      description: "Annual outdoor rock concert featuring indie bands.",
    },
  ];
};

const LocationIcon = ({ type }: { type: LocationType }) => {
  switch (type) {
    case LocationType.REGION:
      return <Globe className='h-4 w-4 mr-2' />;
    case LocationType.SUBREGION:
      return <Map className='h-4 w-4 mr-2' />;
    case LocationType.AREA:
      return <Landmark className='h-4 w-4 mr-2' />;
    case LocationType.CITY:
      return <Building className='h-4 w-4 mr-2' />;
    case LocationType.NEIGHBORHOOD:
      return <Home className='h-4 w-4 mr-2' />;
    default:
      return <MapPin className='h-4 w-4 mr-2' />;
  }
};

const Breadcrumbs = ({
  location,
  locations,
  onNavigate,
}: {
  location: Location;
  locations: Location[];
  onNavigate: (location: Location) => void;
}) => {
  const getBreadcrumbs = useCallback(
    (loc: Location, allLocs: Location[]): Location[] => {
      const breadcrumbs = [loc];
      let parent = allLocs.find((l) => l.id === loc.parentId);
      while (parent) {
        breadcrumbs.unshift(parent);
        parent = allLocs.find((l) => l.id === parent?.parentId);
      }
      return breadcrumbs;
    },
    []
  );

  const breadcrumbs = useMemo(
    () => getBreadcrumbs(location, locations),
    [location, locations, getBreadcrumbs]
  );

  return (
    <nav
      aria-label='Breadcrumb'
      className='mb-4'
    >
      <ol className='flex flex-wrap items-center space-x-2 text-sm text-gray-500'>
        {breadcrumbs.map((crumb, index) => (
          <li
            key={crumb.id}
            className='flex items-center'
          >
            {index > 0 && <ChevronRight className='h-4 w-4 mx-1' />}
            <Button
              variant='link'
              className='p-0 h-auto text-sm font-medium'
              onClick={() => onNavigate(crumb)}
            >
              {crumb.name}
            </Button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

const LocationTree = ({
  locations,
  onSelect,
  selectedId,
  expandedIds,
  onToggle,
  level = 0,
}: {
  locations: Location[];
  onSelect: (location: Location) => void;
  selectedId: string | null;
  expandedIds: string[];
  onToggle: (id: string) => void;
  level?: number;
}) => {
  return (
    <ul
      className={`pl-${level * 2}`}
      role='tree'
    >
      {locations.map((location) => (
        <motion.li
          key={location.id}
          className='py-1'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          role='treeitem'
          aria-expanded={expandedIds.includes(location.id)}
        >
          <div className='flex items-center'>
            {location.children?.length > 0 && (
              <Button
                variant='ghost'
                size='icon'
                className='h-6 w-6'
                onClick={() => onToggle(location.id)}
                aria-label={
                  expandedIds.includes(location.id) ? "Collapse" : "Expand"
                }
              >
                {expandedIds.includes(location.id) ? (
                  <ChevronDown className='h-4 w-4' />
                ) : (
                  <ChevronRight className='h-4 w-4' />
                )}
              </Button>
            )}
            <Button
              variant='ghost'
              className={`ml-1 flex items-center text-sm ${selectedId === location.id ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => onSelect(location)}
            >
              <LocationIcon type={location.type} />
              {location.name}
            </Button>
          </div>
          <AnimatePresence>
            {expandedIds.includes(location.id) &&
              location.children?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <LocationTree
                    locations={location.children}
                    onSelect={onSelect}
                    selectedId={selectedId}
                    expandedIds={expandedIds}
                    onToggle={onToggle}
                    level={level + 1}
                  />
                </motion.div>
              )}
          </AnimatePresence>
        </motion.li>
      ))}
    </ul>
  );
};

const EventList = ({ events }: { events: Event[] }) => {
  return (
    <ul className='space-y-4'>
      {events.map((event) => (
        <li
          key={event.id}
          className='border-b pb-4'
        >
          <h3 className='font-semibold'>{event.name}</h3>
          <p className='text-sm text-gray-500'>{event.venue}</p>
          <p className='text-sm'>{new Date(event.date).toLocaleDateString()}</p>
          <Badge>{event.genre}</Badge>
        </li>
      ))}
    </ul>
  );
};

export default function LocationEventExplorer() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        setIsLoading(true);
        const fetchedLocations = await fetchLocations();
        setLocations(fetchedLocations);
        setError(null);
      } catch (err) {
        setError("Failed to load locations. Please try again later.");
        console.error("Error loading locations:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadLocations();
  }, []);

  const handleSelect = useCallback((location: Location) => {
    setSelectedLocation(location);
    setRecentlyViewed((prev) => {
      const newRecent = [
        location,
        ...prev.filter((l) => l.id !== location.id),
      ].slice(0, 5);
      return newRecent;
    });
    fetchEvents(location.id).then(setEvents).catch(console.error);
    setIsMobileDetailOpen(true);
  }, []);

  const handleToggle = useCallback((id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const filterLocations = useCallback(
    (locs: Location[], term: string): Location[] => {
      return locs
        .filter(
          (loc) =>
            loc.name.toLowerCase().includes(term.toLowerCase()) ||
            (loc.children.length > 0 &&
              filterLocations(loc.children, term).length > 0)
        )
        .map((loc) => ({
          ...loc,
          children: filterLocations(loc.children, term),
        }));
    },
    []
  );

  const filteredLocations = useMemo(
    () => (searchTerm ? filterLocations(locations, searchTerm) : locations),
    [locations, searchTerm, filterLocations]
  );

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        Loading locations...
      </div>
    );
  }

  if (error) {
    return <div className='text-red-500 text-center'>{error}</div>;
  }

  const LocationDetails = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {selectedLocation && (
        <>
          <Breadcrumbs
            location={selectedLocation}
            locations={locations}
            onNavigate={handleSelect}
          />
          <div className='flex items-center mb-4'>
            <LocationIcon type={selectedLocation.type} />
            <h3 className='text-xl font-semibold ml-2'>
              {selectedLocation.name}
            </h3>
          </div>
          <div className='flex items-center mb-4'>
            <Badge className='mr-2'>{selectedLocation.type}</Badge>
            <span className='text-sm text-gray-600'>
              {selectedLocation.uniqueName}
            </span>
          </div>
          {selectedLocation.description && (
            <p className='text-sm mb-4'>{selectedLocation.description}</p>
          )}
          <div className='flex items-center text-sm text-blue-600 mb-6'>
            <MapPin className='h-4 w-4 mr-1' />
            <span>{selectedLocation.slug}</span>
          </div>
          <h4 className='text-lg font-semibold mb-4'>Upcoming Events</h4>
          {events.length > 0 ? (
            <EventList events={events} />
          ) : (
            <p className='text-sm text-gray-500'>
              No upcoming events in this location.
            </p>
          )}
        </>
      )}
    </motion.div>
  );

  return (
    <div className='flex flex-col lg:flex-row gap-4 p-4'>
      <Card className='w-full lg:w-1/2'>
        <CardHeader>
          <CardTitle>Select Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-4'>
            <Input
              type='text'
              placeholder='Search locations...'
              value={searchTerm}
              onChange={handleSearch}
              className='w-full'
            />
          </div>
          {recentlyViewed.length > 0 && (
            <div className='mb-4'>
              <h3 className='text-sm font-semibold mb-2 flex items-center'>
                <Clock className='h-4 w-4 mr-1' />
                Recently Viewed
              </h3>
              <div className='flex flex-wrap gap-2'>
                {recentlyViewed.map((location) => (
                  <Button
                    key={location.id}
                    variant='outline'
                    size='sm'
                    className='flex items-center text-xs'
                    onClick={() => handleSelect(location)}
                  >
                    <LocationIcon type={location.type} />
                    {location.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <ScrollArea className='h-[calc(100vh-300px)] lg:h-[400px]'>
            <LocationTree
              locations={filteredLocations}
              onSelect={handleSelect}
              selectedId={selectedLocation?.id ?? null}
              expandedIds={expandedIds}
              onToggle={handleToggle}
            />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Desktop view */}
      <Card className='hidden lg:block w-1/2'>
        <CardHeader>
          <CardTitle>Location Information</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedLocation ? (
            <LocationDetails />
          ) : (
            <p className='text-gray-500'>
              Select a location to view details and events
            </p>
          )}
        </CardContent>
      </Card>

      {/* Mobile view */}
      <Sheet
        open={isMobileDetailOpen}
        onOpenChange={setIsMobileDetailOpen}
      >
        <SheetContent
          side='bottom'
          className='h-[80vh] lg:hidden'
        >
          <SheetHeader>
            <SheetTitle>Location Information</SheetTitle>
          </SheetHeader>
          <ScrollArea className='h-full mt-4'>
            {selectedLocation ? (
              <LocationDetails />
            ) : (
              <p className='text-gray-500'>
                Select a location to view details and events
              </p>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
