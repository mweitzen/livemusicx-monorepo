import { events } from "@repo/mock-data";
import { venues } from "@repo/mock-data";
import { organizers } from "@repo/mock-data";

import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";

import PageHeader from "../../_components/page-header";
import {
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  Heart,
  Share2,
  Ticket,
} from "@repo/ui/icons";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";

export default function EventDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  // Return event details
  const event = events.find((event) => event.slug === params.slug);
  const venue = venues.find((venue) => venue?.id === event?.venue);
  const organizer = organizers.find(
    (organizer) => organizer?.id === event?.organizer
  );

  // Profile not found
  if (!event) return notFound();

  // Generate structured data

  // Return Event Details
  return (
    <div className='space-y-8'>
      {/* Hero Section */}
      <PageHeader
        imageUrl={undefined}
        title={event.name}
      >
        <div className='flex items-center'>
          <Calendar className='mr-2 h-5 w-5' />
          {format(event.timeStart, "MMMM d, yyyy")}
        </div>
        <div className='flex items-center'>
          <Clock className='mr-2 h-5 w-5' />
          {format(event.timeStart, "h:mm a")} -{" "}
          {format(event.timeEnd, "h:mm a")}
        </div>
        <div className='flex items-center'>
          <MapPin className='mr-2 h-5 w-5' />
          {venue?.name}
        </div>
      </PageHeader>

      {/* Action Buttons */}
      <div className='flex flex-col sm:flex-row gap-4 items-stretch sm:items-center'>
        <Button
          className='flex-1 w-full order-1 sm:order-none'
          asChild
        >
          <Link href={event.ticketLinks[0] ?? "https://example.com"}>
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
                    {event.keywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant='secondary'
                        className='text-sm'
                      >
                        {keyword}
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
                      {/* {event.lineup.map((artist) => (
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
                      ))} */}
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
                  <h3 className='font-semibold'>{venue?.name}</h3>
                  <p className='text-muted-foreground'>{venue?.location}</p>
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
                    src={organizer?.avatar}
                    alt={organizer?.name}
                  />
                  <AvatarFallback>{organizer?.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-semibold text-lg'>{organizer?.name}</h3>
                  <p className='text-muted-foreground'>{organizer?.about}</p>
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
                {/* {event.relatedEvents.map((relatedEvent) => (
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
                ))} */}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
