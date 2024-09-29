import Link from "next/link";
import Image from "next/image";
// import { Event as MyEvent,Venue, } from "@repo/db/schema";
import { RouterOutputs } from "@repo/trpc";

import { Card, CardContent } from "@repo/ui/components/card";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Badge } from "@repo/ui/components/badge";
import { MapPin, Music, Star } from "@repo/ui/icons";

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
        className='group-hover:scale-105 transition-transform duration-300 object-cover object-top h-full'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/90 to-transparent' />
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

export function FeaturedEventCard({
  event,
}: {
  event: RouterOutputs["events"]["getFeatured"][number];
}) {
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    event.timeStart!
  );
  const time = new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
    event.timeStart!
  );
  return (
    <Link href={`/event/${event.slug}`}>
      <FeatureCard>
        <FeatureCardContent image={event.imageUrl ?? undefined}>
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
              {"event.genres[0]"}
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
            {event.venue?.profile.name}
          </Badge>
        </FeatureCardFooter>
      </FeatureCard>
    </Link>
  );
}

export function FeaturedPerformerCard({
  performer,
}: {
  performer: RouterOutputs["accounts"]["getFeatured"][number];
}) {
  return (
    <Link href={`/${performer.profile.type}/${performer.profile.slug}`}>
      <FeatureCard>
        <FeatureCardContent image={performer.profile.imageUrl ?? undefined}>
          <div className='absolute bottom-0 left-0 right-0 p-4'>
            <h3 className='font-bold text-xl text-white truncate'>
              {performer.profile.name}
            </h3>
            <p className='text-sm text-white/80 flex items-center mt-1'>
              <Music className='w-4 h-4 mr-1' />
              {"performer.genres[0]"}
            </p>
          </div>
        </FeatureCardContent>
        <FeatureCardFooter></FeatureCardFooter>
      </FeatureCard>
    </Link>
  );
}

export function FeaturedVenueCard({
  venue,
}: {
  venue: RouterOutputs["accounts"]["getFeatured"][number];
}) {
  return (
    <Link href={`/${venue.profile.type}/${venue.profile.slug}`}>
      <FeatureCard>
        <FeatureCardContent image={venue.profile.imageUrl ?? undefined}>
          <div className='absolute bottom-0 left-0 right-0 p-4'>
            <h3 className='font-bold text-xl text-white truncate'>
              {venue.profile.name}
            </h3>
            <p className='text-sm text-white/80 flex items-center mt-1'>
              <Music className='w-4 h-4 mr-1' />
              {"venue.genres[0]"}
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

export function FeaturedOrganizerCard({
  organizer,
}: {
  organizer: RouterOutputs["accounts"]["getFeatured"][number];
}) {
  return (
    <Link href={`/organizer/${organizer.profile.slug}`}>
      <FeatureCard>
        <FeatureCardContent image={organizer.profile.imageUrl ?? undefined}>
          <div className='absolute bottom-0 left-0 right-0 p-4'>
            <h3 className='font-bold text-xl text-white truncate'>
              {organizer.profile.name}
            </h3>
            <p className='text-sm text-white/80 flex items-center mt-1'>
              <Music className='w-4 h-4 mr-1' />
              {"organizer.profile.genres[0]"}
            </p>
          </div>
        </FeatureCardContent>
        <FeatureCardFooter></FeatureCardFooter>
      </FeatureCard>
    </Link>
  );
}
