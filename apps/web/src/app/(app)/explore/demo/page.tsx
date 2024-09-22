"use client";
// import { events } from "~/data/mock/events";

import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Slider } from "@repo/ui/components/slider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet";
import {
  Calendar,
  MapPin,
  Music,
  Filter,
  List,
  Map as MapIcon,
  Star,
  DollarSign,
  Users,
} from "@repo/ui/icons";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Checkbox } from "@repo/ui/components/checkbox";
import SearchBar from "~/components/search-bar";

// Mock data for events (expanded)
const generateEvents = (count: number) => {
  const genres = [
    "Rock",
    "Pop",
    "Jazz",
    "Classical",
    "Electronic",
    "Hip Hop",
    "Country",
    "R&B",
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
  ];
  const tags = ["Child friendly", "Holiday", "Free", "Theme"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Event ${i + 1}`,
    date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    location: `${cities[Math.floor(Math.random() * cities.length)]}, USA`,
    genre: genres[Math.floor(Math.random() * genres.length)],
    price: Math.floor(Math.random() * 200) + 20,
    rating: (Math.random() * 2 + 3).toFixed(1),
    attendees: Math.floor(Math.random() * 1000) + 50,
    longitude: Math.random() * 50 - 125,
    latitude: Math.random() * 25 + 25,
    tags: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => tags[Math.floor(Math.random() * tags.length)]
    ),
  }));
};

const events = generateEvents(100);

export default function ExploreEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [dateRange, setDateRange] = useState([
    new Date(),
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  ]);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [sortBy, setSortBy] = useState("date");
  const [displayedEvents, setDisplayedEvents] = useState(events.slice(0, 12));
  const [mapViewport, setMapViewport] = useState({
    latitude: 39.8283,
    longitude: -98.5795,
    zoom: 3,
  });
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [ref, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  const loadMore = () => {
    const currentLength = displayedEvents.length;
    const nextEvents = events.slice(currentLength, currentLength + 12);
    setDisplayedEvents((prev) => [...prev, ...nextEvents]);
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre === "" || event.genre === selectedGenre) &&
      event.price >= priceRange[0] &&
      event.price <= priceRange[1] &&
      new Date(event.date) >= dateRange[0] &&
      new Date(event.date) <= dateRange[1] &&
      (selectedLocation === "" || event.location.includes(selectedLocation)) &&
      (selectedTags.length === 0 ||
        selectedTags.every((tag) => event.tags.includes(tag)))
  );

  const sortedEvents = filteredEvents.sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "price":
        return a.price - b.price;
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      default:
        return 0;
    }
  });

  const EventCard = ({ event }: { event: (typeof events)[0] }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className='overflow-hidden h-full'>
        <CardHeader className='bg-primary text-primary-foreground'>
          <CardTitle className='flex justify-between items-center'>
            <span>{event.name}</span>
            <span className='text-lg flex items-center'>
              <Star className='w-4 h-4 mr-1 fill-current' />
              {event.rating}
            </span>
          </CardTitle>
          <CardDescription className='text-primary-foreground/80'>
            <div className='flex items-center'>
              <Calendar className='w-4 h-4 mr-2' />
              {format(new Date(event.date), "MMMM d, yyyy")}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-4'>
          <div className='flex items-center mb-2'>
            <MapPin className='w-4 h-4 mr-2' />
            <span>{event.location}</span>
          </div>
          <div className='flex items-center mb-2'>
            <Music className='w-4 h-4 mr-2' />
            <span>{event.genre}</span>
          </div>
          <div className='flex items-center mb-2'>
            <DollarSign className='w-4 h-4 mr-2' />
            <span className='font-bold text-lg'>${event.price}</span>
          </div>
          <div className='flex items-center mb-2'>
            <Users className='w-4 h-4 mr-2' />
            <span>{event.attendees} attendees</span>
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {event.tags.map((tag, index) => (
              <span
                key={index}
                className='bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full'
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full'>Get Tickets</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );

  const FilterSheet = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          className='lg:hidden'
        >
          <Filter className='w-4 h-4 mr-2' />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='w-[300px] sm:w-[400px]'
      >
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Refine your event search</SheetDescription>
        </SheetHeader>
        <div className='space-y-4 mt-4'>
          <div>
            <Label htmlFor='mobile-genre'>Genre</Label>
            <Select
              value={selectedGenre}
              onValueChange={setSelectedGenre}
            >
              <SelectTrigger id='mobile-genre'>
                <SelectValue placeholder='Select genre' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='All'>All Genres</SelectItem>
                <SelectItem value='Rock'>Rock</SelectItem>
                <SelectItem value='Pop'>Pop</SelectItem>
                <SelectItem value='Jazz'>Jazz</SelectItem>
                <SelectItem value='Classical'>Classical</SelectItem>
                <SelectItem value='Electronic'>Electronic</SelectItem>
                <SelectItem value='Hip Hop'>Hip Hop</SelectItem>
                <SelectItem value='Country'>Country</SelectItem>
                <SelectItem value='R&B'>R&B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='mobile-price-range'>
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Label>
            <Slider
              id='mobile-price-range'
              min={0}
              max={200}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className='mt-2'
            />
          </div>
          <div>
            <Label htmlFor='mobile-date-range'>Date Range</Label>
            <div className='flex flex-col space-y-2'>
              <Input
                type='date'
                value={dateRange[0].toISOString().split("T")[0]}
                onChange={(e) =>
                  setDateRange([new Date(e.target.value), dateRange[1]])
                }
              />
              <Input
                type='date'
                value={dateRange[1].toISOString().split("T")[0]}
                onChange={(e) =>
                  setDateRange([dateRange[0], new Date(e.target.value)])
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor='mobile-location'>Location</Label>
            <Input
              id='mobile-location'
              type='text'
              placeholder='Enter city or venue'
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
          </div>
          <div>
            <Label>Tags</Label>
            <div className='grid grid-cols-2 gap-2 mt-2'>
              {["Child friendly", "Holiday", "Free", "Theme"].map((tag) => (
                <div
                  key={tag}
                  className='flex items-center space-x-2'
                >
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={(checked) => {
                      setSelectedTags(
                        checked
                          ? [...selectedTags, tag]
                          : selectedTags.filter((t) => t !== tag)
                      );
                    }}
                  />
                  <label
                    htmlFor={`tag-${tag}`}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className='w-full'>
      <h1 className='text-4xl font-bold mb-8 text-center'>Explore Events</h1>

      <div className='flex flex-col md:flex-row gap-4 mb-8'>
        <SearchBar
          label='Search events'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSheet />
        <div className='hidden lg:flex lg:space-x-2'>
          <Select
            value={selectedGenre}
            onValueChange={setSelectedGenre}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select genre' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All Genres</SelectItem>
              <SelectItem value='Rock'>Rock</SelectItem>
              <SelectItem value='Pop'>Pop</SelectItem>
              <SelectItem value='Jazz'>Jazz</SelectItem>
              <SelectItem value='Classical'>Classical</SelectItem>
              <SelectItem value='Electronic'>Electronic</SelectItem>
              <SelectItem value='Hip Hop'>Hip Hop</SelectItem>
              <SelectItem value='Country'>Country</SelectItem>
              <SelectItem value='R&B'>R&B</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sortBy}
            onValueChange={setSortBy}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='date'>Date</SelectItem>
              <SelectItem value='price'>Price</SelectItem>
              <SelectItem value='rating'>Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size='icon'
            onClick={() => setViewMode("list")}
            aria-label='List view'
          >
            <List className='h-4 w-4' />
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size='icon'
            onClick={() => setViewMode("map")}
            aria-label='Map view'
          >
            <MapIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <Tabs
        value={viewMode}
        onValueChange={(value) => setViewMode(value as "list" | "map")}
      >
        <TabsList className='hidden'>
          <TabsTrigger value='list'>List</TabsTrigger>
          <TabsTrigger value='map'>Map</TabsTrigger>
        </TabsList>
        <TabsContent
          value='list'
          className='mt-0'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <AnimatePresence>
              {sortedEvents.slice(0, displayedEvents.length).map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ))}
            </AnimatePresence>
          </div>
          {sortedEvents.length > displayedEvents.length && (
            <div
              ref={ref}
              className='flex justify-center mt-8'
            >
              <Button
                onClick={loadMore}
                variant='outline'
              >
                Load More
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent
          value='map'
          className='mt-0'
        >
          <div className='h-[600px] rounded-lg overflow-hidden'>
            <Map
              {...mapViewport}
              onMove={(evt) => setMapViewport(evt.viewState)}
              style={{ width: "100%", height: "100%" }}
              mapStyle='mapbox://styles/mapbox/streets-v11'
              mapboxAccessToken='YOUR_MAPBOX_ACCESS_TOKEN_HERE'
            >
              {sortedEvents.map((event) => (
                <Marker
                  key={event.id}
                  longitude={event.longitude}
                  latitude={event.latitude}
                >
                  <Button
                    variant='outline'
                    size='sm'
                    className='rounded-full p-0 w-8 h-8'
                  >
                    <Music className='h-4 w-4' />
                  </Button>
                </Marker>
              ))}
            </Map>
          </div>
        </TabsContent>
      </Tabs>

      {sortedEvents.length === 0 && (
        <div className='text-center mt-8'>
          <p className='text-xl font-semibold'>No events found</p>
          <p className='text-gray-500'>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
