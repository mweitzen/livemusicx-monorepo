import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { api } from "@/lib/trpc/server";
import { notFound } from "next/navigation";
import { format, isThisYear } from "date-fns";

import StructuredData from "@/components/shared/structured-data";
import { generateEventPageMetadata } from "@/lib/metadata";
import { generateEventStructuredData } from "@/lib/structured-data";

import { Badge } from "@/components/ui/badge";
import { ProfileImage } from "@/components/shared/image";
import { ClockIcon } from "@heroicons/react/20/solid";
import { Card, CardContent } from "@/components/ui/card";

export async function generateMetadata({ params }: PublicDetailPageProps): Promise<Metadata> {
  const event = await api.events.main.getDetails.query({
    slug: params.slug,
  });
  if (!event) return notFound();
  return generateEventPageMetadata(event);
}

export default async function EventDetailPage({ params }: PublicDetailPageProps) {
  const event = await api.events.main.getDetails.query({
    slug: params.slug,
  });
  if (!event) return notFound();

  const jsonLd = generateEventStructuredData(event);
  const performers = [...event.musicians, ...event.groups];

  return (
    <Card className="mt-4 overflow-hidden">
      <StructuredData jsonLd={jsonLd} />
      {/*
       *
       *
       * IMAGE HEADER (WITH DATE AND EVENT STATUS)
       *
       *
       */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden rounded-t-lg bg-gray-700">
        {!event.image ? (
          <div className="absolute inset-0 flex items-center justify-center">No Image</div>
        ) : (
          <Image
            src={event.image}
            alt={`${event.name} main image`}
            width={1024}
            height={1024}
            className="absolute top-0"
          />
        )}

        <div className="absolute bottom-0 left-0 flex flex-col rounded-tr-xl bg-black/50 p-3 text-white backdrop-blur-sm">
          <span className="text-4xl">{format(event.timeStart, "d")}</span>
          <span className="text-lg font-semibold uppercase">
            {format(event.timeStart, "MMM")}
            {!isThisYear(event.timeStart) ? (
              <span className="font-normal">{format(event.timeStart, " yyyy")}</span>
            ) : null}
          </span>
        </div>
        {event.status !== "SCHEDULED" ? (
          <span className="absolute bottom-0 right-0 bg-black/50 p-3 text-white backdrop-blur-sm">
            {event.status}
          </span>
        ) : null}
      </section>
      <CardContent className="pt-4">
        {/*
         *
         *
         * EVENT INFORMATION (NAME, DESCRIPTION, BOOKMARK BUTTON)
         *
         *
         */}
        <section className="mb-4">
          <span className="flex w-full gap-4">
            <h1 className="flex-1 truncate text-3xl">{event.name}</h1>
            {/* {"userLoggedIn" ? <BookmarkEventButton id={event.id} /> : null} */}
          </span>
          <p className="text-sm">{event.description}</p>
          <ul className="flex gap-1 py-1">
            {event.keywords.length ? (
              event.keywords.map((keyword) => (
                <Badge key={keyword.id} variant="outline">
                  {keyword.displayName}
                </Badge>
              ))
            ) : (
              <Badge variant="outline">Music Event</Badge>
            )}
            {event.genres.length ? (
              event.genres.map((genre) => <Badge key={genre.id}>{genre.displayName}</Badge>)
            ) : (
              <Badge>Live Music</Badge>
            )}
          </ul>
        </section>

        {/*
         *
         *
         * EVENT TIME
         *
         *
         */}
        <section className="mb-4">
          <h2 className="text-sm font-semibold uppercase">Event Time</h2>
          <div className="grid grid-cols-2 md:grid-cols-3">
            <span className="inline-flex items-center gap-1 text-sm uppercase">
              Start <ClockIcon className="h-4 w-4" />{" "}
              <span className="text-base">{format(event.timeStart, "h:mm a")}</span>
            </span>
            {event.timeEnd ? (
              <span className="inline-flex items-center gap-1 text-sm uppercase">
                End <ClockIcon className="h-4 w-4" />{" "}
                <span className="text-base">{format(event.timeEnd, "h:mm a")}</span>
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1 text-sm uppercase">
              Door <ClockIcon className="h-4 w-4" />
              <span className="text-base">
                {event.timeDoor
                  ? format(event.timeDoor, "h:mm a")
                  : format(event.timeStart, "h:mm a")}
              </span>
            </span>
          </div>
          {event.timeStartPrevious ? (
            <span className="inline-flex items-center gap-1 text-sm uppercase">
              Previous Start Time <ClockIcon className="h-4 w-4" />
              <span className="text-base">
                {format(event.timeStartPrevious, "MMMM d, yyyy h:mm a")}
              </span>
            </span>
          ) : null}
        </section>

        <hr className="my-4" />
        {/*
         *
         *
         * VENUE
         *
         *
         */}
        <section className="mb-4">
          <h2 className="text-sm font-semibold uppercase">Venue</h2>
          <Link href={`/venues/${event.venue.slug}`} className="flex gap-2">
            <ProfileImage src={event.venue.avatar!} className="h-16 w-16 flex-shrink-0" />
            <div>
              <p className="text-lg">{event.venue.name}</p>
              <p className="text-sm">{event.venue.type}</p>
              <p>{event.stage.name}</p>
              <p>{event.venue.addressLong.split(",").slice(0, 2).join(", ")}</p>
            </div>
          </Link>
        </section>

        <hr className="my-4" />
        {/*
         *
         *
         * PERFORMERS
         *
         *
         */}
        <section className="mb-4">
          <h2 className="text-sm font-semibold uppercase">Performers</h2>

          <ul className="flex gap-2">
            {performers.length
              ? performers.map((performer) => (
                  <li key={performer.id}>
                    <Link
                      href={`/${performer.performerType}s/${performer.slug}`}
                      className="flex gap-2"
                    >
                      <ProfileImage
                        src={performer.avatar!}
                        className="h-16 w-16 flex-shrink-0"
                      />
                      <div>
                        <p className="text-lg">{performer.name}</p>
                        <p className="text-copy-secondary text-sm uppercase">
                          {performer.performerType}
                        </p>
                        <p>{performer.about}</p>
                      </div>
                    </Link>
                  </li>
                ))
              : "no performers."}
          </ul>
        </section>

        {/*
         *
         *
         * ORGANIZER
         *
         *
         */}
        {event.organizer ? (
          <section>
            <h2 className="text-sm font-semibold uppercase">Organizers</h2>
            <p>{event.organizer.name}</p>
          </section>
        ) : null}

        {/*
         *
         *
         * EVENT DETAILS
         *
         *
         */}
        {/* <section>
        <h2>Additional Details</h2>
        <p>isPrivate: {String(event.isPrivate)}</p>
        <p>isFree: {String(event.isFree)}</p>
        <p>isChildFriendly: {String(event.isChildFriendly)}</p>
        <p>isHoliday: {String(event.isHoliday)}</p>
        <p>ageRestriction: {String(event.ageRestriction)}</p>
        <p>minimumAge: {String(event.minimumAge)}</p>
        <p>servesAlcohol: {String(event.servesAlcohol)}</p>
        <p>servesFood: {String(event.servesFood)}</p>
        <p>requiresReservation: {String(event.requiresReservation)}</p>
        <p>reservationLink: {String(event.reservationLink)}</p>
        <p>requiresRsvp: {String(event.requiresRsvp)}</p>
        <p>rsvpLink: {String(event.rsvpLink)}</p>
        <p>requiresTicket: {String(event.requiresTicket)}</p>
        <p>ticketLinks: {event.ticketLinksString(}</p)>
      </section> */}
      </CardContent>
    </Card>
  );
}
