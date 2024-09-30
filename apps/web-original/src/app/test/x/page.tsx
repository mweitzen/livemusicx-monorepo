"use client";
import { cn } from "@repo/ui/helpers";

import { Badge } from "@repo/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@repo/ui/components/separator";
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";

const events = [
  {
    id: "clsa55f5c000l11g6yok4bx8z",
    slug: "2024-02-21-tony-cesarano-trio-in-the-black-diamond-lounge",
    name: "Tony Cesarano Trio in the Black Diamond Lounge",
    timeStart: "2024-02-22T01:00:00.000Z",
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/659fadc9e952530926b15b8e_Tony%20%26%20Keenan.jpeg",
    genres: [],
    status: "SCHEDULED",
    isFree: true,
    isHoliday: false,
    isChildFriendly: false,
    organizer: null,
    venue: { name: "Vernon's Speakeasy" },
    musicians: [],
    groups: [{ name: "Tony Cesarano Trio" }],
  },
  {
    id: "clsa55ffx000n11g6kyt7eo6l",
    slug: "2024-02-21-michael-weitzenhoffer-in-the-chamber",
    name: "Michael Weitzenhoffer in the Chamber",
    timeStart: "2024-02-22T01:00:00.000Z",
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/63bcc82ef4779c3618568336_unnamed-4.jpg",
    genres: [],
    status: "SCHEDULED",
    isFree: true,
    isHoliday: false,
    isChildFriendly: false,
    organizer: null,
    venue: { name: "Vernon's Speakeasy" },
    musicians: [{ name: "Michael Weitzenhoffer" }],
    groups: [],
  },
  {
    id: "clsa55fse000o11g6v6eur8t5",
    slug: "2024-02-22-alex-alunday-trio-in-the-black-diamond-lounge",
    name: "Alex Alunday Trio in the Black Diamond Lounge",
    timeStart: "2024-02-23T01:00:00.000Z",
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6270a5a085b18360aed7bcf8_Alex%20Alunday.png",
    genres: [],
    status: "SCHEDULED",
    isFree: true,
    isHoliday: false,
    isChildFriendly: false,
    organizer: null,
    venue: { name: "Vernon's Speakeasy" },
    musicians: [],
    groups: [{ name: "Alex Alunday Trio" }],
  },
  {
    id: "clsa55fv1000q11g63sgef37u",
    slug: "2024-02-23-michael-weitzenhoffer-for-brunch-cafe-6855",
    name: "Michael Weitzenhoffer for Brunch @ Cafe 6855",
    timeStart: "2024-02-23T18:00:00.000Z",
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6451539c5225f33003d47979_IMG_4906.jpeg",
    genres: [],
    status: "SCHEDULED",
    isFree: true,
    isHoliday: false,
    isChildFriendly: false,
    organizer: null,
    venue: { name: "Cafe 6855" },
    musicians: [{ name: "Michael Weitzenhoffer" }],
    groups: [],
  },
  {
    id: "clsa4zpm00004rrwbvfrsh8s0",
    slug: "2024-02-23-calvin-appleberry-in-the-chamber",
    name: "Calvin Appleberry in the Chamber",
    timeStart: "2024-02-24T01:00:00.000Z",
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6270a3db1ec8da46385fe678_calvin_appleberry_band_sandia-700x450.jpg",
    genres: [],
    status: "SCHEDULED",
    isFree: true,
    isHoliday: false,
    isChildFriendly: false,
    organizer: null,
    venue: { name: "Vernon's Speakeasy" },
    musicians: [{ name: "Calvin Appleberry" }],
    groups: [],
  },
  {
    id: "clsa55g7u000s11g6qirmkjtr",
    slug: "2024-02-23-ryan-bridwell-and-friends-in-the-black-diamond-lounge",
    name: "Ryan Bridwell And Friends in the Black Diamond Lounge",
    timeStart: "2024-02-24T01:00:00.000Z",
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/63315c6caf0a326841265acf_Unknown-1.jpeg",
    genres: [],
    status: "SCHEDULED",
    isFree: true,
    isHoliday: false,
    isChildFriendly: false,
    organizer: null,
    venue: { name: "Vernon's Speakeasy" },
    musicians: [],
    groups: [{ name: "Ryan Bridwell And Friends" }],
  },
  {
    id: "clsa4zq1b0005rrwb04e4pqgg",
    slug: "2024-02-24-seth-hoffman-for-brunch-cafe-6855",
    name: "Seth Hoffman for Brunch @ Cafe 6855",
    timeStart: "2024-02-24T18:00:00.000Z",
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/658bc4104e14b75d3267a09c_Seth%20Hoffman.jpg",
    genres: [],
    status: "SCHEDULED",
    isFree: true,
    isHoliday: false,
    isChildFriendly: false,
    organizer: null,
    venue: { name: "Cafe 6855" },
    musicians: [{ name: "Seth Hoffman" }],
    groups: [],
  },
  {
    id: "clsa4zqbc0006rrwbblvmj7cg",
    slug: "2024-02-24-karl-zink-in-the-chamber",
    name: "Karl Zink in the Chamber",
    timeStart: "2024-02-25T01:00:00.000Z",
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/62ba0a92da8b8f03588937c8_304055_300935036599700_338755723_n.jpg",
    genres: [],
    status: "SCHEDULED",
    isFree: true,
    isHoliday: false,
    isChildFriendly: false,
    organizer: null,
    venue: { name: "Vernon's Speakeasy" },
    musicians: [{ name: "Karl Zink" }],
    groups: [],
  },
  {
    id: "clsa55gjv000w11g68s1y5l7x",
    slug: "2024-02-24-chris-hagedorn-connection-in-the-black-diamond-lounge",
    name: "Chris Hagedorn Connection in the Black Diamond Lounge",
    timeStart: "2024-02-25T01:00:00.000Z",
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/65832a3841cdcde8405cc3e2_Chris%20Hagedorn%20Connection.jpeg",
    genres: [],
    status: "SCHEDULED",
    isFree: true,
    isHoliday: false,
    isChildFriendly: false,
    organizer: null,
    venue: { name: "Vernon's Speakeasy" },
    musicians: [],
    groups: [{ name: "Chris Hagedorn Connection" }],
  },
  {
    id: "clsa5ipwv000d1pyxqorwandy",
    slug: "2024-02-25-gilbert-uribe-for-brunch-cafe-6855",
    name: "Gilbert Uribe for Brunch @ Cafe 6855",
    timeStart: "2024-02-25T18:00:00.000Z",
    image: null,
    genres: [],
    status: "SCHEDULED",
    isFree: true,
    isHoliday: false,
    isChildFriendly: false,
    organizer: null,
    venue: { name: "Cafe 6855" },
    musicians: [{ name: "Gilbert Uribe" }],
    groups: [],
  },
];

const EventCard = ({ horizontal }: { horizontal?: boolean }) => {
  const event = events[1];
  return (
    <Link href={"#"}>
      <Card
        className={cn(
          "overflow-hidden hover:shadow-lg",
          horizontal ? "w-full" : "w-72",
        )}
      >
        <div className="relative isolate h-44 w-full bg-green-200">
          <Image
            src={event.image!}
            className="h-full w-full object-cover object-top"
            alt="words"
            height={712}
            width={712}
          />
          <span className="absolute bottom-0 left-0 flex flex-col items-center rounded-t-lg bg-black/50 text-primary-foreground backdrop-blur-sm">
            <span className="flex items-center gap-0.5 p-2">
              <CalendarDaysIcon className="h-8 w-8" />
              <p className="text-4xl font-medium">12</p>
            </span>
            <p className="bg-black/50 px-4 py-1 text-center text-sm font-semibold">
              December
            </p>
          </span>
          {/* <span className="absolute bottom-0 right-0 bg-black/50 px-4 py-1 text-sm font-semibold text-primary-foreground backdrop-blur-sm">
            Main Tag
          </span> */}
        </div>
        <CardHeader>
          <CardTitle className="truncate">{event.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            Event description underneath the title, line clamped to ensure no
            over.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <span className="flex gap-1">
            <ClockIcon className="h-4 w-4" />
            <Separator orientation="vertical" className="h-4" />
            Time
          </span>
          <span className="flex gap-1">
            <MapPinIcon className="h-4 w-4" />
            <Separator orientation="vertical" className="h-4" />
            Location
          </span>
          <span className="flex gap-1">
            <UserGroupIcon className="h-4 w-4" />
            <Separator orientation="vertical" className="h-4" />
            Performer(s)
          </span>
          <span className="flex gap-1">
            <PuzzlePieceIcon className="h-4 w-4" />
            <Separator orientation="vertical" className="h-4" />
            Organizer
          </span>
        </CardContent>
        <CardFooter className="gap-2">
          <Badge>Genre #1</Badge>
          <Badge>Genre #2</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default function TestXPage() {
  return (
    <div className="px-4 py-12">
      <ScrollArea className="p-2">
        <div className="flex gap-2">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
