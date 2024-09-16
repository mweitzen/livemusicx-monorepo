import Link from "next/link";
import Image from "next/image";

import { MyEvent } from "@/data/mock/events";
import { Venue, venues } from "@/data/mock/venues";
import { Band } from "@/data/mock/bands";
import { Musician } from "@/data/mock/musicians";
import { Organizer } from "@/data/mock/organizers";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MapPin, Music, Star } from "lucide-react";

export function FeatureCard({
  children,
}: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  return (
    <Card className='w-[280px] min-h-[280px] overflow-hidden hover:shadow-lg transition-all duration-300 group'>
      <CardContent className='p-0'>{children}</CardContent>
    </Card>
  );
}

export function FeatureCardContent({
  image = "/assets/placeholder.svg",
  children,
}: {
  children?: React.ReactNode | React.ReactNode[];
  image?: string;
}) {
  return (
    <div className='aspect-square relative overflow-hidden'>
      <Image
        src={image}
        alt={"Featured event image"}
        height={280}
        width={280}
        className='group-hover:scale-105 transition-transform duration-300 object-cover'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
      {children}
    </div>
  );
}

export function FeatureCardFooter({
  children,
}: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className='p-4 bg-background'>
      <div className='h-6 flex justify-between items-center'>{children}</div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <Skeleton>
      <FeatureCard>
        <FeatureCardContent>
          <Skeleton className='h-full w-full' />
        </FeatureCardContent>
        <FeatureCardFooter>
          <div className='flex items-center'>
            <Star className='w-4 h-4 text-yellow-400 fill-yellow-400 mr-1' />
            <Skeleton className='h-5 w-8' />
          </div>
          <Skeleton className='w-24 h-5' />
        </FeatureCardFooter>
      </FeatureCard>
    </Skeleton>
  );
}

export function FeaturedEventCard({ event }: { event: MyEvent }) {
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(event.timeStart)
  );
  const time = new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
    new Date(event.timeStart)
  );
  return (
    <Link href={`/event/${event.slug}`}>
      <FeatureCard>
        <FeatureCardContent>
          <div className='absolute top-2 right-2 rounded-lg p-4 text-white bg-black/30 w-1/2'>
            <p className='font-semibold tracking-tighter'>
              {date.slice(0, date.indexOf(","))}
            </p>
            <p className='tracking-tighter'>{time}</p>
          </div>
          <div className='absolute bottom-0 left-0 right-0 p-4'>
            <h3 className='font-bold text-xl text-white truncate'>
              {event.name}
            </h3>
            <p className='text-sm text-white/80 flex items-center mt-1'>
              <Music className='w-4 h-4 mr-1' />
              {event.genres[0]}
            </p>
          </div>
        </FeatureCardContent>
        <FeatureCardFooter>
          <div className='flex items-center'>
            <Star className='w-4 h-4 text-yellow-400 fill-yellow-400 mr-1' />
            <span className='font-semibold'>{4.8}</span>
          </div>
          <Badge variant='secondary'>
            <MapPin className='h-4 w-4' />
            {venues.find((venue) => venue.id === event.venue)?.name}
          </Badge>
        </FeatureCardFooter>
      </FeatureCard>
    </Link>
  );
}

export function FeaturedPerformerCard({
  performer,
}: {
  performer: Musician | Band;
}) {
  return (
    <Link href={`/performer/${performer.slug}`}>
      <FeatureCard>
        <FeatureCardContent>
          <div className='absolute bottom-0 left-0 right-0 p-4'>
            <h3 className='font-bold text-xl text-white truncate'>
              {performer.name}
            </h3>
            <p className='text-sm text-white/80 flex items-center mt-1'>
              <Music className='w-4 h-4 mr-1' />
              {performer.genres[0]}
            </p>
          </div>
        </FeatureCardContent>
        <FeatureCardFooter></FeatureCardFooter>
      </FeatureCard>
    </Link>
  );
}

export function FeaturedVenueCard({ venue }: { venue: Venue }) {
  return (
    <Link href={`/venue/${venue.slug}`}>
      <FeatureCard>
        <FeatureCardContent>
          <div className='absolute bottom-0 left-0 right-0 p-4'>
            <h3 className='font-bold text-xl text-white truncate'>
              {venue.name}
            </h3>
            <p className='text-sm text-white/80 flex items-center mt-1'>
              <Music className='w-4 h-4 mr-1' />
              {venue.genres[0]}
            </p>
          </div>
        </FeatureCardContent>
        <FeatureCardFooter>
          <div className='flex items-center'>
            <Star className='w-4 h-4 text-yellow-400 fill-yellow-400 mr-1' />
            <span className='font-semibold'>{4.8}</span>
          </div>
          <Badge variant='secondary'>
            <MapPin className='h-4 w-4' />
            {venue.location}
          </Badge>
        </FeatureCardFooter>
      </FeatureCard>
    </Link>
  );
}

export function FeaturedOrganizerCard({ organizer }: { organizer: Organizer }) {
  return (
    <Link href={`/organizer/${organizer.slug}`}>
      <FeatureCard>
        <FeatureCardContent>
          <div className='absolute bottom-0 left-0 right-0 p-4'>
            <h3 className='font-bold text-xl text-white truncate'>
              {organizer.name}
            </h3>
            <p className='text-sm text-white/80 flex items-center mt-1'>
              <Music className='w-4 h-4 mr-1' />
              {organizer.genres[0]}
            </p>
          </div>
        </FeatureCardContent>
        <FeatureCardFooter></FeatureCardFooter>
      </FeatureCard>
    </Link>
  );
}
