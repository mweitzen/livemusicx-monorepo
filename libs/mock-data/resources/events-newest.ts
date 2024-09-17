import type { Prisma } from "@prisma/client";
import { newEvents as oldEvents } from "./events";
import { format, addHours } from "date-fns";
function createSlug(input: string): string {
  const slug = input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with "-"
    .replace(/--+/g, "-"); // Replace multiple "-" with a single "-"

  return slug;
}

export const eventsRaw = [
  {
    date: "Feb 07",
    time: "4:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Jonah Minkus Trio",
    solo: false,
  },

  {
    date: "Feb 07",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Michael Weitzenhoffer",
    solo: true,
  },

  {
    date: "Feb 08",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Alex Alunday Trio",
    solo: false,
  },

  {
    date: "Feb 08",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Karl Zink",
    solo: true,
  },

  {
    date: "Feb 09",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "Josue Urrutia",
    solo: true,
  },

  {
    date: "Feb 09",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Ray Anthony & Powerslyde",
    solo: false,
  },

  {
    date: "Feb 09",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Feb 10",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "RJ Perez",
    solo: true,
  },

  {
    date: "Feb 10",
    time: "4:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Feb 10",
    time: "4:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Karl Zink",
    solo: true,
  },

  {
    date: "Feb 10",
    time: "7:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Chris Cordova Jazz: Featuring Jenna Kuchar",
    solo: false,
  },

  {
    date: "Feb 10",
    time: "7:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Michael Weitzenhoffer",
    solo: true,
  },

  {
    date: "Feb 11",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "Michael Weitzenhoffer",
    solo: true,
  },

  {
    date: "Feb 14",
    time: "4:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Feb 14",
    time: "4:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Tony Cesarano Jazz Brasileiro Duo",
    solo: false,
  },

  {
    date: "Feb 14",
    time: "7:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Artistry Jazz",
    solo: false,
  },

  {
    date: "Feb 14",
    time: "7:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Michael Weitzenhoffer",
    solo: true,
  },

  {
    date: "Feb 15",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Alex Alunday Trio",
    solo: false,
  },

  {
    date: "Feb 15",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Karl Zink",
    solo: true,
  },

  {
    date: "Feb 16",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "Michael Weitzenhoffer",
    solo: true,
  },

  {
    date: "Feb 16",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Ryan Bridwell And Friends",
    solo: false,
  },

  {
    date: "Feb 16",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Feb 17",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "Michael Weitzenhoffer",
    solo: true,
  },

  {
    date: "Feb 17",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Artistry Jazz",
    solo: false,
  },

  {
    date: "Feb 17",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Feb 18",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "RJ Perez",
    solo: true,
  },

  {
    date: "Feb 21",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Tony Cesarano Trio",
    solo: false,
  },

  {
    date: "Feb 21",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Michael Weitzenhoffer",
    solo: true,
  },

  {
    date: "Feb 22",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Alex Alunday Trio",
    solo: false,
  },

  {
    date: "Feb 23",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "Michael Weitzenhoffer",
    solo: true,
  },

  {
    date: "Feb 23",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Ryan Bridwell And Friends",
    solo: false,
  },

  {
    date: "Feb 23",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Feb 24",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "Seth Hoffman",
    solo: true,
  },

  {
    date: "Feb 24",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Karl Zink",
    solo: true,
  },

  {
    date: "Feb 24",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Chris Hagedorn Connection",
    solo: false,
  },

  {
    date: "Feb 25",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "Gilbert Uribe",
    solo: true,
  },

  {
    date: "Feb 25",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Chris Cordova Jazz: Featuring Jenna Kuchar",
    solo: false,
  },

  {
    date: "Feb 25",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Feb 28",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Tony Cesarano Trio",
    solo: false,
  },

  {
    date: "Feb 28",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Michael Weitzenhoffer",
    solo: true,
  },

  {
    date: "Feb 29",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Alex Alunday Trio",
    solo: false,
  },

  {
    date: "Mar 01",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "Michael Weitzenhoffer",
    solo: true,
  },

  {
    date: "Mar 01",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Mar 01",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Tony Cesarano Trio",
    solo: false,
  },

  {
    date: "Mar 02",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "Josue Urrutia",
    solo: true,
  },

  {
    date: "Mar 02",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Artistry Jazz",
    solo: false,
  },

  {
    date: "Mar 02",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Mar 08",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Ryan Bridwell And Friends",
    solo: false,
  },

  {
    date: "Mar 08",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Mar 09",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Ray Anthony & Powerslyde",
    solo: false,
  },

  {
    date: "Mar 09",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Mar 10",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "RJ Perez",
    solo: true,
  },

  {
    date: "Mar 10",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Chris Cordova Jazz: Featuring Jenna Kuchar",
    solo: false,
  },
  {
    date: "Mar 10",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Karl Zink",
    solo: true,
  },

  {
    date: "Mar 13",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "John Funkhouser Trio",
    solo: false,
  },

  {
    date: "Mar 13",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Michael Weitzenhoffer",
    solo: true,
  },

  {
    date: "Mar 14",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Alex Alunday Trio",
    solo: false,
  },

  {
    date: "Mar 14",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Karl Zink",
    solo: true,
  },

  {
    date: "Mar 15",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Ryan Bridwell And Friends",
    solo: false,
  },

  {
    date: "Mar 15",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Mar 16",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "Seth Hoffman",
    solo: true,
  },

  {
    date: "Mar 16",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Artistry Jazz",
    solo: false,
  },

  {
    date: "Mar 16",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Mar 17",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "RJ Perez",
    solo: true,
  },

  {
    date: "Mar 17",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Jonah Minkus Trio",
    solo: false,
  },

  {
    date: "Mar 20",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Tony Cesarano Trio",
    solo: false,
  },

  {
    date: "Mar 20",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Michael Weitzenhoffer",
    solo: true,
  },

  {
    date: "Mar 21",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Alex Alunday Trio",
    solo: false,
  },

  {
    date: "Mar 22",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Ryan Bridwell And Friends",
    solo: false,
  },

  {
    date: "Mar 22",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Mar 23",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Artistry Jazz",
    solo: false,
  },

  {
    date: "Mar 23",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Mar 24",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Chris Cordova Jazz: Featuring Jenna Kuchar",
    solo: false,
  },

  {
    date: "Mar 27",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Jonah Minkus Trio",
    solo: false,
  },

  {
    date: "Mar 28",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Alex Alunday Trio",
    solo: false,
  },

  {
    date: "Mar 28",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Karl Zink",
    solo: true,
  },

  {
    date: "Mar 29",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Tony Cesarano Trio",
    solo: false,
  },

  {
    date: "Mar 29",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Mar 30",
    time: "11:00 am",
    venue: "cafe-6855",
    stage: "Cafe 6855 Brunch",
    performer: "Seth Hoffman",
    solo: true,
  },

  {
    date: "Mar 30",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "Chris Hagedorn Connection",
    solo: false,
  },

  {
    date: "Mar 30",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
  },

  {
    date: "Mar 31",
    time: "6:00 pm",
    venue: "vernons-speakeasy",
    stage: "Black Diamond Lounge",
    performer: "John Funkhouser Trio",
    solo: false,
  },
];

// convert the array to match other events
const newestEventsFormatted = eventsRaw.map((event) => {
  const old = oldEvents.find(
    (oldEvent) =>
      `${createSlug(oldEvent.performer)} ${createSlug(oldEvent.stage)}` ===
        `${createSlug(event.performer)} ${createSlug(event.stage)}` ||
      `${createSlug(oldEvent.performer)}` === `${createSlug(event.performer)}`
  );

  return {
    timeStart: new Date(`${event.date} 2024 ${event.time} GMT-7`),
    timeEnd: addHours(new Date(`${event.date} 2024 ${event.time} GMT-7`), 3),
    venue: event.venue,
    stage: event.stage,
    performer: event.performer,
    solo: event.solo,
    image: old?.image ?? undefined,
  };
});

export const events: Prisma.EventCreateInput[] = newestEventsFormatted.map((event) => {
  const nameAppend =
    event.stage === "Cafe 6855 Brunch" ? " for Brunch @ Cafe 6855" : ` in the ${event.stage}`;
  const name = `${event.performer}${nameAppend}`;
  const slugPrepend = `${format(event.timeStart, "yyyy-MM-dd")}-`;
  const slug = createSlug(`${slugPrepend}${name}`);

  const venue = event.venue;
  const stageName = event.stage === "Cafe 6855 Brunch" ? "Main Dining" : event.stage;
  const stageSlug = `${createSlug(event.stage)}-${venue}` as const;
  const stageType =
    event.stage === "Cafe 6855 Brunch" ? "AREA" : event.stage === "Chamber" ? "ROOM" : "STAGE";

  return {
    name,
    slug,
    image: event.image,
    timeStart: event.timeStart,
    timeDoor: event.timeStart,
    timeEnd: event.timeEnd,
    description: `${event.performer} plays live music ${nameAppend}`,
    publishedBy: {
      connect: {
        email: "mweitzenhoffer@gmail.com",
      },
    },
    venue: {
      connect: {
        slug: venue,
      },
    },
    stage: {
      connect: {
        slug: stageSlug,
      },
    },
    ageRestriction: venue === "vernons-speakeasy",
    minimumAge: venue === "vernons-speakeasy" ? 13 : 0,
    isHoliday:
      event.timeStart.getMonth() === 1 &&
      (event.timeStart.getDate() === 13 || event.timeStart.getDate() === 14),
    groups: !event.solo ? { connect: [{ slug: createSlug(event.performer) }] } : undefined,
    musicians: event.solo ? { connect: [{ slug: createSlug(event.performer) }] } : undefined,
    requiresRsvp: venue === "vernons-speakeasy",
    rsvpLink:
      venue === "vernons-speakeasy"
        ? "https://www.yougottapassword.com/reservations"
        : undefined,
    requiresTicket: false,
    // ticketLinks: [],
  } satisfies Prisma.EventCreateInput;
});
