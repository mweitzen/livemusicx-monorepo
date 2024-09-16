import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  MapPin,
  Calendar,
  Clock,
  Ticket,
  Share2,
  Heart,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import PageHeader from "../../_components/page-header";

export default function EventDetailsPageDemo() {
  const event = {
    id: "1",
    title: "Summer Vibes Music Festival",
    date: new Date("2023-07-15T14:00:00"),
    endDate: new Date("2023-07-15T23:00:00"),
    venue: {
      name: "Sunset Park Amphitheater",
      address: "123 Melody Lane, Harmony City, HC 12345",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    imageUrl: "/assets/placeholder.svg",
    description:
      "Get ready for the hottest music festival of the summer! Featuring top artists from around the globe, food trucks, art installations, and more. Don't miss out on this unforgettable experience!",
    lineup: [
      {
        name: "The Melodic Waves",
        time: "14:00 - 15:00",
        imageUrl: "/assets/placeholder.svg",
      },
      {
        name: "Neon Pulse",
        time: "15:30 - 16:30",
        imageUrl: "/assets/placeholder.svg",
      },
      {
        name: "Acoustic Serenity",
        time: "17:00 - 18:00",
        imageUrl: "/assets/placeholder.svg",
      },
      {
        name: "Electric Dreams",
        time: "18:30 - 19:30",
        imageUrl: "/assets/placeholder.svg",
      },
      {
        name: "Rhythm Revolution",
        time: "20:00 - 21:30",
        imageUrl: "/assets/placeholder.svg",
      },
      {
        name: "Starlight Serenade",
        time: "22:00 - 23:00",
        imageUrl: "/assets/placeholder.svg",
      },
    ],
    ticketUrl: "https://example.com/buy-tickets",
    organizer: {
      name: "Harmony Events Co.",
      logo: "/assets/placeholder.svg",
      description: "Creating unforgettable music experiences since 2010.",
    },
    tags: ["Music Festival", "Live Music", "Outdoor Event", "Summer"],
    relatedEvents: [
      {
        id: "2",
        title: "Jazz in the Park",
        date: new Date("2023-07-22T18:00:00"),
        imageUrl: "/assets/placeholder.svg",
      },
      {
        id: "3",
        title: "Rock the Night Away",
        date: new Date("2023-07-29T20:00:00"),
        imageUrl: "/assets/placeholder.svg",
      },
      {
        id: "4",
        title: "Classical Melodies",
        date: new Date("2023-08-05T19:00:00"),
        imageUrl: "/assets/placeholder.svg",
      },
    ],
  };

  return (
    <div className='space-y-8'>
      <PageHeader
        imageUrl={event.imageUrl}
        title={event.title}
      >
        <div className='flex items-center'>
          <Calendar className='mr-2 h-5 w-5' />
          {format(event.date, "MMMM d, yyyy")}
        </div>
        <div className='flex items-center'>
          <Clock className='mr-2 h-5 w-5' />
          {format(event.date, "h:mm a")} - {format(event.endDate, "h:mm a")}
        </div>
        <div className='flex items-center'>
          <MapPin className='mr-2 h-5 w-5' />
          {event.venue.name}
        </div>
      </PageHeader>

      {/* Action Buttons */}
      <div className='flex flex-col sm:flex-row gap-4 items-stretch sm:items-center'>
        <Button
          className='flex-1 w-full order-1 sm:order-none'
          asChild
        >
          <Link href={event.ticketUrl}>
            <Ticket className='mr-2 h-4 w-4' />
            Buy Tickets
          </Link>
        </Button>
        <div className='flex flex-1 gap-2'>
          <Button
            variant='outline'
            className='flex-1'
          >
            <Share2 className='mr-2 h-4 w-4' />
            Share
          </Button>
          <Button
            variant='outline'
            className='flex-1'
          >
            <Heart className='mr-2 h-4 w-4' />
            Interested
          </Button>
          <Button
            variant='outline'
            className='flex-1'
          >
            <MessageCircle className='mr-2 h-4 w-4' />
            Discuss
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 space-y-8'>
          {/* Event Description and Lineup */}
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl'>Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue='description'
                className='w-full'
              >
                <TabsList className='w-full justify-start'>
                  <TabsTrigger
                    value='description'
                    className='flex-1'
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value='lineup'
                    className='flex-1'
                  >
                    Lineup
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value='description'
                  className='mt-4'
                >
                  <p className='text-muted-foreground leading-relaxed'>
                    {event.description}
                  </p>
                  <div className='mt-6 flex flex-wrap gap-2'>
                    {event.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant='secondary'
                        className='text-sm'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent
                  value='lineup'
                  className='mt-4'
                >
                  <ScrollArea className='h-[300px] pr-4'>
                    <ul className='space-y-4'>
                      {event.lineup.map((artist) => (
                        <li
                          key={artist.name}
                          className='flex items-center space-x-4 p-2 rounded-md hover:bg-muted transition-colors'
                        >
                          <Avatar className='h-12 w-12'>
                            <AvatarImage
                              src={artist.imageUrl}
                              alt={artist.name}
                            />
                            <AvatarFallback>{artist.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className='font-semibold'>{artist.name}</p>
                            <p className='text-sm text-muted-foreground'>
                              {artist.time}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Venue Information */}
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl'>Venue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-start space-x-4 mb-4'>
                <MapPin className='mt-1 h-5 w-5 text-primary' />
                <div>
                  <h3 className='font-semibold'>{event.venue.name}</h3>
                  <p className='text-muted-foreground'>{event.venue.address}</p>
                </div>
              </div>
              <div className='h-[300px] bg-muted rounded-md overflow-hidden'>
                <div className='h-full flex items-center justify-center text-muted-foreground'>
                  Interactive Map Placeholder
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organizer Information */}
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl'>Organizer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center space-x-4'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage
                    src={event.organizer.logo}
                    alt={event.organizer.name}
                  />
                  <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-semibold text-lg'>
                    {event.organizer.name}
                  </h3>
                  <p className='text-muted-foreground'>
                    {event.organizer.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-8'>
          {/* Related Events */}
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl'>Related Events</CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <ul className='divide-y'>
                {event.relatedEvents.map((relatedEvent) => (
                  <li key={relatedEvent.id}>
                    <Link
                      href={`/events/${relatedEvent.id}`}
                      className='flex items-center space-x-4 p-4 hover:bg-muted transition-colors'
                    >
                      <Image
                        src={relatedEvent.imageUrl}
                        alt={relatedEvent.title}
                        width={80}
                        height={45}
                        className='rounded object-cover'
                      />
                      <div className='flex-grow'>
                        <p className='font-semibold'>{relatedEvent.title}</p>
                        <p className='text-sm text-muted-foreground'>
                          {format(relatedEvent.date, "MMMM d, yyyy")}
                        </p>
                      </div>
                      <ChevronRight className='h-5 w-5 text-muted-foreground' />
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
