// import { createSlug } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { format, addHours } from "date-fns";
function createSlug(input: string): string {
  const slug = input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with "-"
    .replace(/--+/g, "-"); // Replace multiple "-" with a single "-"

  return slug;
}
export const newEvents = [
  {
    timeStart: new Date("Jan 24, 2024 4:00 pm GMT-7"),
    timeEnd: addHours(new Date("Jan 24, 2024 4:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Jonah Minkus Trio",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/64c0bb124491253ac97e9103_E31BB941-F751-431A-B11C-BF2A6D19CDEE0V5A5533.jpeg",
  },
  {
    timeStart: new Date("Jan 25, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Jan 25, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Alex Alunday Trio",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6270a5a085b18360aed7bcf8_Alex%20Alunday.png",
  },
  {
    timeStart: new Date("Jan 26, 2024 11:00 am GMT-7"),
    timeEnd: addHours(new Date("Jan 26, 2024 11:00 am GMT-7"), 3),
    stage: "Cafe 6855 Brunch",
    performer: "Michael Weitzenhoffer",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6451539c5225f33003d47979_IMG_4906.jpeg",
  },
  {
    timeStart: new Date("Jan 26, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Jan 26, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Ryan Bridwell and Friends",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/63315c6caf0a326841265acf_Unknown-1.jpeg",
  },
  {
    timeStart: new Date("Jan 26, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Jan 26, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6270a3db1ec8da46385fe678_calvin_appleberry_band_sandia-700x450.jpg",
  },
  {
    timeStart: new Date("Jan 27, 2024 11:00 am GMT-7"),
    timeEnd: addHours(new Date("Jan 27, 2024 11:00 am GMT-7"), 3),
    stage: "Cafe 6855 Brunch",
    performer: "Josue Urrutia",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6463d6b575501b0a4fc9f7de_Josue%20Urrutia.jpg",
  },
  {
    timeStart: new Date("Jan 27, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Jan 27, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6270a3db1ec8da46385fe678_calvin_appleberry_band_sandia-700x450.jpg",
  },
  {
    timeStart: new Date("Jan 27, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Jan 27, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "John Funkhouser Trio",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6284815d8e5e4724fe157988_Screen%20Shot%202022-05-17%20at%2011.17.11%20PM.png",
  },
  {
    timeStart: new Date("Jan 28, 2024 11:00 am GMT-7"),
    timeEnd: addHours(new Date("Jan 28, 2024 11:00 am GMT-7"), 3),
    stage: "Cafe 6855 Brunch",
    performer: "RJ Perez",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/64d29a8b3694c1dc0f75b5d5_IMG_6038.jpeg",
  },
  {
    timeStart: new Date("Jan 28, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Jan 28, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Chris Hagedorn Connection",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/65832a3841cdcde8405cc3e2_Chris%20Hagedorn%20Connection.jpeg",
  },
  {
    timeStart: new Date("Jan 28, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Jan 28, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Karl Zink",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/62ba0a92da8b8f03588937c8_304055_300935036599700_338755723_n.jpg",
  },
  {
    timeStart: new Date("Jan 31, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Jan 31, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Tony Cesarano Trio",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/659fadc9e952530926b15b8e_Tony%20%26%20Keenan.jpeg",
  },
  {
    timeStart: new Date("Feb 01, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 01, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Karl Zink",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/62ba0a92da8b8f03588937c8_304055_300935036599700_338755723_n.jpg",
  },
  {
    timeStart: new Date("Feb 01, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 01, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "John Funkhouser Trio",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6284815d8e5e4724fe157988_Screen%20Shot%202022-05-17%20at%2011.17.11%20PM.png",
  },
  {
    timeStart: new Date("Feb 02, 2024 11:00 am GMT-7"),
    timeEnd: addHours(new Date("Feb 02, 2024 11:00 am GMT-7"), 3),
    stage: "Cafe 6855 Brunch",
    performer: "Michael Weitzenhoffer",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6451539c5225f33003d47979_IMG_4906.jpeg",
  },
  {
    timeStart: new Date("Feb 02, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 02, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Ryan Bridwell and Friends",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/63315c6caf0a326841265acf_Unknown-1.jpeg",
  },
  {
    timeStart: new Date("Feb 02, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 02, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6270a3db1ec8da46385fe678_calvin_appleberry_band_sandia-700x450.jpg",
  },
  {
    timeStart: new Date("Feb 03, 2024 11:00 am GMT-7"),
    timeEnd: addHours(new Date("Feb 03, 2024 11:00 am GMT-7"), 3),
    stage: "Cafe 6855 Brunch",
    performer: "Seth Hoffman",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/658bc4104e14b75d3267a09c_Seth%20Hoffman.jpg",
  },
  {
    timeStart: new Date("Feb 03, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 03, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Artistry Jazz",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/650d3025e836d79a25bd2776_Artistry%20Jazz%202.JPG",
  },
  {
    timeStart: new Date("Feb 03, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 03, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6270a3db1ec8da46385fe678_calvin_appleberry_band_sandia-700x450.jpg",
  },
  {
    timeStart: new Date("Feb 04, 2024 11:00 am GMT-7"),
    timeEnd: addHours(new Date("Feb 04, 2024 11:00 am GMT-7"), 3),
    stage: "Cafe 6855 Brunch",
    performer: "RJ Perez",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/64d29a8b3694c1dc0f75b5d5_IMG_6038.jpeg",
  },
  {
    timeStart: new Date("Feb 04, 2024 4:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 04, 2024 4:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Jonah Minkus Trio",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/64c0bb124491253ac97e9103_E31BB941-F751-431A-B11C-BF2A6D19CDEE0V5A5533.jpeg",
  },
  {
    timeStart: new Date("Feb 04, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 04, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Karl Zink",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/62ba0a92da8b8f03588937c8_304055_300935036599700_338755723_n.jpg",
  },
  {
    timeStart: new Date("Feb 07, 2024 4:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 07, 2024 4:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Jonah Minkus Trio",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/64c0bb124491253ac97e9103_E31BB941-F751-431A-B11C-BF2A6D19CDEE0V5A5533.jpeg",
  },
  {
    timeStart: new Date("Feb 07, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 07, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Michael Weitzenhoffer",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/63bcc82ef4779c3618568336_unnamed-4.jpg",
  },
  {
    timeStart: new Date("Feb 08, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 08, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Alex Alunday Trio",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6270a5a085b18360aed7bcf8_Alex%20Alunday.png",
  },
  {
    timeStart: new Date("Feb 08, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 08, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Karl Zink",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/62ba0a92da8b8f03588937c8_304055_300935036599700_338755723_n.jpg",
  },
  {
    timeStart: new Date("Feb 09, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 09, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Ray Anthony & PowerSlyde",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/65131b40fd64ac008bfaad10_Ray%20Anthony%20%26%20PowerSlyde.jpg",
  },
  {
    timeStart: new Date("Feb 09, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 09, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6270a3db1ec8da46385fe678_calvin_appleberry_band_sandia-700x450.jpg",
  },
  {
    timeStart: new Date("Feb 10, 2024 7:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 10, 2024 7:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Chris Cordova Jazz: featuring Jenna Kuchar",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/646c2e8889356fc40b06e8a4_Kuchar-Cordova.jpeg",
  },
  {
    timeStart: new Date("Feb 14, 2024 4:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 14, 2024 4:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6270a3db1ec8da46385fe678_calvin_appleberry_band_sandia-700x450.jpg",
  },
  {
    timeStart: new Date("Feb 14, 2024 4:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 14, 2024 4:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Tony Cesarano Jazz Brasileiro Duo",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/634dd0cdcf028e86c4c0506a_Jazz%20Brasileiro%202%20Under%20the%20Stars.JPG",
  },
  {
    timeStart: new Date("Feb 14, 2024 7:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 14, 2024 7:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Artistry Jazz",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/650d3025e836d79a25bd2776_Artistry%20Jazz%202.JPG",
  },
  {
    timeStart: new Date("Feb 14, 2024 7:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 14, 2024 7:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Michael Weitzenhoffer",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/63bcc82ef4779c3618568336_unnamed-4.jpg",
  },
  {
    timeStart: new Date("Feb 15, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 15, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Alex Alunday Trio",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6270a5a085b18360aed7bcf8_Alex%20Alunday.png",
  },
  {
    timeStart: new Date("Feb 15, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 15, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Karl Zink",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/62ba0a92da8b8f03588937c8_304055_300935036599700_338755723_n.jpg",
  },
  {
    timeStart: new Date("Feb 16, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 16, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Ryan Bridwell and Friends",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/63315c6caf0a326841265acf_Unknown-1.jpeg",
  },
  {
    timeStart: new Date("Feb 16, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 16, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6270a3db1ec8da46385fe678_calvin_appleberry_band_sandia-700x450.jpg",
  },
  {
    timeStart: new Date("Feb 17, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 17, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Artistry Jazz",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/650d3025e836d79a25bd2776_Artistry%20Jazz%202.JPG",
  },
  {
    timeStart: new Date("Feb 17, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 17, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Calvin Appleberry",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/6270a3db1ec8da46385fe678_calvin_appleberry_band_sandia-700x450.jpg",
  },
  {
    timeStart: new Date("Feb 18, 2024 11:00 am GMT-7"),
    timeEnd: addHours(new Date("Feb 18, 2024 11:00 am GMT-7"), 3),
    stage: "Cafe 6855 Brunch",
    performer: "RJ Perez",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/64d29a8b3694c1dc0f75b5d5_IMG_6038.jpeg",
  },
  {
    timeStart: new Date("Feb 21, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 21, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Tony Cesarano Trio",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/659fadc9e952530926b15b8e_Tony%20%26%20Keenan.jpeg",
  },
  {
    timeStart: new Date("Feb 21, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 21, 2024 6:00 pm GMT-7"), 3),
    stage: "Chamber",
    performer: "Michael Weitzenhoffer",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/63bcc82ef4779c3618568336_unnamed-4.jpg",
  },
  {
    timeStart: new Date("Feb 23, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 23, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Ryan Bridwell and Friends",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/63315c6caf0a326841265acf_Unknown-1.jpeg",
  },
  {
    timeStart: new Date("Feb 24, 2024 11:00 am GMT-7"),
    timeEnd: addHours(new Date("Feb 24, 2024 11:00 am GMT-7"), 3),
    stage: "Cafe 6855 Brunch",
    performer: "Seth Hoffman",
    solo: true,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/658bc4104e14b75d3267a09c_Seth%20Hoffman.jpg",
  },
  {
    timeStart: new Date("Feb 25, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 25, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Chris Cordova Jazz: featuring Jenna Kuchar",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/646c2e8889356fc40b06e8a4_Kuchar-Cordova.jpeg",
  },
  {
    timeStart: new Date("Feb 28, 2024 6:00 pm GMT-7"),
    timeEnd: addHours(new Date("Feb 28, 2024 6:00 pm GMT-7"), 3),
    stage: "Black Diamond Lounge",
    performer: "Tony Cesarano Trio",
    solo: false,
    image:
      "https://assets-global.website-files.com/62228518404c49aebf6fa41e/659fadc9e952530926b15b8e_Tony%20%26%20Keenan.jpeg",
  },
] as const;

export const newEventsFormatted: Prisma.EventCreateInput[] = newEvents.map((event) => {
  const nameAppend =
    event.stage === "Cafe 6855 Brunch" ? " for Brunch @ Cafe 6855" : ` in the ${event.stage}`;
  const name = `${event.performer}${nameAppend}`;
  const slugPrepend = `${format(event.timeStart, "yyyy-MM-dd")}-`;
  const slug = createSlug(`${slugPrepend}${name}`);

  const venue = event.stage === "Cafe 6855 Brunch" ? "cafe-6855" : "vernons-speakeasy";
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
      connectOrCreate: {
        where: {
          slug: stageSlug,
        },
        create: {
          slug: stageSlug,
          name: stageName,
          type: stageType,
          active: true,
          venue: {
            connect: {
              slug: venue,
            },
          },
        },
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
