import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

import type { Genre } from "@repo/db";
import type { QuickViewEvents } from "@/server/api/events/main";
import type { QuickViewVenues } from "@/server/api/accounts/venues";
import type { QuickViewPerformers } from "@/server/api/accounts/performers";
import type { QuickViewOrganizers } from "@/server/api/accounts/organizers";

import { Skeleton } from "../ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ProfileImage } from "@/components/shared/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter, CardContent } from "@/components/ui/card";
import {
  TypographyMuted,
  TypographySmall,
} from "@/components/shared/typography";
import { CalendarIcon, ClockIcon, MapPinIcon } from "@heroicons/react/20/solid";

function QuickViewItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="w-60 overflow-hidden">{children}</Card>
    </Link>
  );
}

function QuickViewItemImage({
  imageSrc = "",
  imageAlt,
}: {
  imageSrc?: string | null;
  imageAlt?: string;
}) {
  return (
    <AspectRatio ratio={16 / 9}>
      <div className="grid h-full w-full place-items-center">
        <ProfileImage src={imageSrc} className="h-24 w-24" />
      </div>
    </AspectRatio>
  );
}

function QuickViewItemContent({ children }: { children: React.ReactNode }) {
  return <CardContent className="pt-3">{children}</CardContent>;
}

function QuickViewItemTitle(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className="truncate font-semibold tracking-tight" {...props} />;
}

function CardGenresFooter({ genres }: { genres?: Genre[] }) {
  return (
    <CardFooter className="gap-2">
      {genres && genres.length ? (
        genres.map((genre) => <Badge key={genre.id}>{genre.displayName}</Badge>)
      ) : (
        <Badge variant="secondary">No genres.</Badge>
      )}
    </CardFooter>
  );
}
function VenueQuickViewItem({ venue }: { venue: QuickViewVenues[number] }) {
  return (
    <QuickViewItem href={`/venues/${venue.slug}`}>
      <QuickViewItemImage
        imageSrc={venue.avatar}
        imageAlt={`${venue.name} card image`}
      />
      <QuickViewItemContent>
        <QuickViewItemTitle>{venue.name}</QuickViewItemTitle>
        <TypographyMuted className="uppercase">{venue.type}</TypographyMuted>
        <p className="truncate align-middle">
          <TypographySmall>
            <MapPinIcon className="mr-2 inline-block h-4 w-4" strokeWidth={2} />{" "}
            {venue.city.name}
          </TypographySmall>
        </p>
        <p className="truncate align-middle">
          <TypographySmall>
            <CalendarIcon
              className="mr-2 inline-block h-4 w-4 flex-shrink-0"
              strokeWidth={2}
            />
            {format(venue.events[0].timeStart, "MMM d")} |{" "}
            {venue.events[0].name}
          </TypographySmall>
        </p>
      </QuickViewItemContent>
      <CardGenresFooter genres={venue.genres} />
    </QuickViewItem>
  );
}

function PerformerQuickViewItem({
  performer,
}: {
  performer: QuickViewPerformers[number];
}) {
  return (
    <QuickViewItem href={`/${performer.performerType}s/${performer.slug}`}>
      <QuickViewItemImage
        imageSrc={performer.avatar}
        imageAlt={`${performer.name} card image`}
      />
      <QuickViewItemContent>
        <QuickViewItemTitle>{performer.name}</QuickViewItemTitle>
        <TypographyMuted className="uppercase">
          {performer.performerType}
        </TypographyMuted>
        <p className="truncate align-middle">
          <TypographySmall>
            <CalendarIcon
              className="mr-2 inline-block h-4 w-4"
              strokeWidth={2}
            />{" "}
            {format(performer.events[0].timeStart, "MMM d")}
          </TypographySmall>
        </p>
        <p className="truncate align-middle">
          <TypographySmall>
            <MapPinIcon className="mr-2 inline-block h-4 w-4" strokeWidth={2} />{" "}
            {(performer.events[0] as any).venue.name}
          </TypographySmall>
        </p>
      </QuickViewItemContent>
      <CardGenresFooter genres={performer.genres} />
    </QuickViewItem>
  );
}

function OrganizerQuickViewItem({
  organizer,
}: {
  organizer: QuickViewOrganizers[number];
}) {
  return (
    <QuickViewItem href={`/organizers/${organizer.slug}`}>
      <QuickViewItemImage
        imageSrc={organizer.avatar}
        imageAlt={`${organizer.name} card image`}
      />
      <QuickViewItemContent>
        <QuickViewItemTitle className="truncate font-semibold">
          {organizer.name}
        </QuickViewItemTitle>
        {/* <p className="truncate align-middle">
          <TypographySmall>
            <CalendarIcon className="mr-2 inline-block h-4 w-4" strokeWidth={2} />{" "}
            {format(organizer.events[0].timeStart, "MMM d")}
          </TypographySmall>
        </p>
        <p className="truncate align-middle">
          <TypographySmall>
            <MapPinIcon className="mr-2 inline-block h-4 w-4" strokeWidth={2} />{" "}
            {(organizer.events[0] as any).venue.name}
          </TypographySmall>
        </p> */}
      </QuickViewItemContent>
      <CardGenresFooter genres={organizer.genres} />
    </QuickViewItem>
  );
}

function EventQuickViewItem({ event }: { event: QuickViewEvents[number] }) {
  return (
    <QuickViewItem href={`/events/${event.slug}`}>
      <AspectRatio ratio={16 / 9} className="relative overflow-hidden">
        <span className="absolute left-0 top-0 inline-flex gap-1 rounded-br-xl bg-black/50 py-2 pl-2 pr-4 font-bold uppercase text-white backdrop-blur-sm">
          <CalendarIcon className="h-5 w-5" />{" "}
          {format(event.timeStart, "MMM d")}
        </span>

        <EventTag event={event} />

        <Image
          src={event.image || ""}
          alt={`${event.name} card image`}
          className="h-full object-cover object-top"
          width={512}
          height={512}
        />
      </AspectRatio>
      <QuickViewItemContent>
        <QuickViewItemTitle>{event.name}</QuickViewItemTitle>
        <p className="truncate align-middle">
          <TypographySmall>
            <ClockIcon className="mr-2 inline-block h-4 w-4" strokeWidth={2} />{" "}
            {format(event.timeStart, "h:mm a")}
          </TypographySmall>
        </p>
        <p className="truncate align-middle">
          <TypographySmall>
            <MapPinIcon className="mr-2 inline-block h-4 w-4" strokeWidth={2} />{" "}
            {event.venue.name}
          </TypographySmall>
        </p>
      </QuickViewItemContent>
      <CardFooter className="gap-2">
        {event.genres && event.genres.length ? (
          event.genres.map((genre) => (
            <Badge key={genre.name}>{genre.displayName}</Badge>
          ))
        ) : (
          <Badge variant="secondary">No genres.</Badge>
        )}
      </CardFooter>
    </QuickViewItem>
  );
}

function getEventTag(event: QuickViewEvents[number]) {
  // determine order of which renders first
  if (event.status === "RESCHEDULED") return "Rescheduled";
  if (event.isHoliday) return "Holiday";
  if (event.isChildFriendly) return "Child Friendly";
  if (event.isFree) return "Free";
}

function EventTag({ event }: { event: QuickViewEvents[number] }) {
  const tag = getEventTag(event);
  return (
    <span className="absolute bottom-0 right-0 inline-flex gap-1 rounded-tl-xl bg-black/50 px-4 py-2 font-bold uppercase text-white backdrop-blur-sm">
      {tag}
    </span>
  );
}

function QuickViewEmptyState() {
  return (
    <QuickViewItem href="#">
      <QuickViewItemContent>
        <div className="py-4">
          <QuickViewItemTitle>No content.</QuickViewItemTitle>
          <p>There is nothing here right now. Check back later.</p>
        </div>
      </QuickViewItemContent>
    </QuickViewItem>
  );
}

function EventLoadingItem() {
  return (
    <Card className="flex min-h-32 w-60 flex-shrink-0 flex-col gap-1">
      <Skeleton className="h-32 w-full" />
      <CardContent>
        <Skeleton className="h-7 w-full rounded-full" />
        <span className="flex items-end gap-2">
          <ClockIcon className="h-4 w-4" />
          <Skeleton className="h-3 w-24 rounded-full" />
        </span>
        <span className="flex items-end gap-2">
          <MapPinIcon className="h-4 w-4" />
          <Skeleton className="h-3 w-24 rounded-full" />
        </span>
      </CardContent>
    </Card>
  );
}

function AccountLoadingItem() {
  return (
    <Card className="min-h-32 w-60 flex-shrink-0 flex-col gap-1">
      <Skeleton className="h-32 w-32 flex-shrink-0 rounded-full" />
      <Skeleton className="h-7 w-full rounded-full" />
      <span className="flex items-end gap-2">
        <ClockIcon className="h-4 w-4" />
        <Skeleton className="h-3 w-24 rounded-full" />
      </span>
      <span className="flex items-end gap-2">
        <MapPinIcon className="h-4 w-4" />
        <Skeleton className="h-3 w-24 rounded-full" />
      </span>
    </Card>
  );
}

export {
  VenueQuickViewItem,
  EventQuickViewItem,
  PerformerQuickViewItem,
  OrganizerQuickViewItem,
  QuickViewEmptyState,
  EventLoadingItem,
  AccountLoadingItem,
};
