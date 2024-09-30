import Link from "next/link";
import Image from "next/image";

import type { Genre } from "@repo/db/schema";

import { Badge } from "@repo/ui/components/badge";
import { ProfileImage } from "~/components/shared/image";
import { Card, CardContent } from "@repo/ui/components/card";

import { CalendarIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";

function ListItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="flex h-96 flex-col gap-2 overflow-hidden sm:flex-row md:h-28">
        {children}
      </Card>
    </Link>
  );
}

function ListItemImage({
  imageSrc,
  imageAlt = "Event item image",
}: {
  imageSrc?: string | null;
  imageAlt?: string;
  event?: boolean;
}) {
  if (!imageSrc) {
    return (
      <div className="grid w-full shrink-0 place-items-center bg-secondary py-8 sm:w-32">
        <p>No image.</p>
      </div>
    );
  }
  return (
    <div className="w-full shrink-0 sm:w-32">
      <Image
        src={imageSrc}
        alt={imageAlt}
        height={512}
        width={512}
        className="h-full max-h-48 object-cover object-top"
      />
    </div>
  );
}

function ListItemContent({ children }: { children: React.ReactNode }) {
  return (
    <CardContent className="shrink overflow-hidden">{children}</CardContent>
  );
}

function ListItemTitle(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className="truncate text-lg font-semibold tracking-tight" {...props} />
  );
}

function ListItemGenres({ genres }: { genres?: Genre[] }) {
  return (
    <div className="gap-2">
      {genres && genres.length ? (
        genres.map((genre) => <Badge key={genre.id}>{genre.displayName}</Badge>)
      ) : (
        <Badge variant="secondary">No genres.</Badge>
      )}
    </div>
  );
}
// function VenueListItem({ venue }: { venue: AllVenues[number] }) {
//   return (
//     <ListItem href={`/venues/${venue.slug}`}>
//       <ListItemImage
//         imageSrc={venue.avatar}
//         imageAlt={`${venue.name} card image`}
//       />
//       <ListItemContent>
//         <ListItemTitle>{venue.name}</ListItemTitle>
//         <TypographyP className="truncate font-semibold">
//           {venue.name}
//         </TypographyP>
//         <TypographyMuted className="uppercase">{venue.type}</TypographyMuted>
//         <p className="truncate align-middle">
//           <TypographySmall>
//             <MapPinIcon className="mr-2 inline-block h-4 w-4" strokeWidth={2} />{" "}
//             {venue.city.name}
//           </TypographySmall>
//         </p>
//         <p className="truncate align-middle">
//           <TypographySmall>
//             <CalendarIcon
//               className="mr-2 inline-block h-4 w-4 flex-shrink-0"
//               strokeWidth={2}
//             />
//             {format(venue.events[0].timeStart, "MMM dd")} |{" "}
//             {venue.events[0].name}
//           </TypographySmall>
//         </p>
//       </ListItemContent>
//       <ListItemGenres genres={["Something", "Else"]} />
//     </ListItem>
//   );
// }

// function PerformerListItem({
//   performer,
// }: {
//   performer: AllPerformers[number];
// }) {
//   return (
//     <ListItem href={`/${performer.performerType}s/${performer.slug}`}>
//       <ListItemImage
//         imageSrc={performer.avatar}
//         imageAlt={`${performer.name} card image`}
//       />
//       <ListItemContent>
//         <TypographyP className="truncate font-semibold">
//           {performer.name}
//         </TypographyP>
//         <TypographyMuted className="uppercase">
//           {performer.performerType}
//         </TypographyMuted>
//         <p className="truncate align-middle">
//           <TypographySmall>
//             <CalendarIcon
//               className="mr-2 inline-block h-4 w-4"
//               strokeWidth={2}
//             />{" "}
//             {format(performer.events[0].timeStart, "MMM dd")}
//           </TypographySmall>
//         </p>
//         <p className="truncate align-middle">
//           <TypographySmall>
//             <MapPinIcon className="mr-2 inline-block h-4 w-4" strokeWidth={2} />{" "}
//             {(performer.events[0] as any).venue.name}
//           </TypographySmall>
//         </p>
//       </ListItemContent>
//       <ListItemGenres genres={["Something", "Else"]} />
//     </ListItem>
//   );
// }

// function OrganizerListItem({
//   organizer,
// }: {
//   organizer: AllOrganizers[number];
// }) {
//   return (
//     <ListItem href={`/organizers/${organizer.slug}`}>
//       <ListItemImage
//         imageSrc={organizer.avatar}
//         imageAlt={`${organizer.name} card image`}
//       />
//       <ListItemContent>
//         <TypographyP className="truncate font-semibold">
//           {organizer.name}
//         </TypographyP>
//         <p className="truncate align-middle">
//           <TypographySmall>
//             <CalendarIcon
//               className="mr-2 inline-block h-4 w-4"
//               strokeWidth={2}
//             />{" "}
//             {format(organizer.events[0].timeStart, "MMM dd")}
//           </TypographySmall>
//         </p>
//         <p className="truncate align-middle">
//           <TypographySmall>
//             <MapPinIcon className="mr-2 inline-block h-4 w-4" strokeWidth={2} />{" "}
//             {(organizer.events[0] as any).venue.name}
//           </TypographySmall>
//         </p>
//       </ListItemContent>
//       <ListItemGenres genres={["Something", "Else"]} />
//     </ListItem>
//   );
// }

// function EventListItem({ event }: { event: UpcomingEvents[number] }) {
//   return (
//     <ListItem href={`/events/${event.slug}`}>
//       <AspectRatio ratio={16 / 9} className="relative overflow-hidden">
//         <span className="absolute left-0 top-0 inline-flex gap-1 rounded-br-xl bg-black/50 py-2 pl-2 pr-4 font-bold uppercase text-white backdrop-blur-sm">
//           <CalendarIcon className="h-5 w-5" />{" "}
//           {format(event.timeStart, "MMM dd")}
//         </span>

//         <EventTag event={event} />

//         <Image
//           src={event.image || ""}
//           alt={`${event.name} card image`}
//           className="object-cover object-center"
//           width={208}
//           height={208 / (16 / 9)}
//         />
//       </AspectRatio>
//       <ListItemContent>
//         <TypographyP className="truncate font-semibold">
//           {event.name}
//         </TypographyP>
//         <p className="truncate align-middle">
//           <TypographySmall>
//             <ClockIcon className="mr-2 inline-block h-4 w-4" strokeWidth={2} />{" "}
//             {format(event.timeStart, "h:mm a")}
//           </TypographySmall>
//         </p>
//         <p className="truncate align-middle">
//           <TypographySmall>
//             <MapPinIcon className="mr-2 inline-block h-4 w-4" strokeWidth={2} />{" "}
//             {event.venue.name}
//           </TypographySmall>
//         </p>
//       </ListItemContent>
//       <CardFooter className="gap-2">
//         {event.genres && event.genres.length ? (
//           event.genres.map((genre) => (
//             <Badge key={genre.name}>{genre.displayName}</Badge>
//           ))
//         ) : (
//           <Badge variant="secondary">No genres.</Badge>
//         )}
//       </CardFooter>
//     </ListItem>
//   );
// }

// function getEventTag(event: UpcomingEvents[number]) {
//   // determine order of which renders first
//   if (event.status === "RESCHEDULED") return "Rescheduled";
//   if (event.isHoliday) return "Holiday";
//   if (event.isChildFriendly) return "Child Friendly";
//   if (event.isFree) return "Free";
// }

// function EventTag({ event }: { event: UpcomingEvents[number] }) {
//   const tag = getEventTag(event);
//   return (
//     <span className="absolute bottom-0 right-0 inline-flex gap-1 rounded-tl-xl bg-black/50 px-4 py-2 font-bold uppercase text-white backdrop-blur-sm">
//       {tag}
//     </span>
//   );
// }

export {
  ListItem,
  ListItemImage,
  ListItemContent,
  ListItemTitle,
  ListItemGenres,
};
