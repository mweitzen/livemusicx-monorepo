import { format } from "date-fns";
import slugify from "slugify";

export const vernonsEvents = [
  {
    date_start: "08 Dec",
    time_start: "11:00 am",
    time_door: "11:00 am",
    time_end: "2:00 pm",
    venue_id: "clpxewpmz001mw7roj1g8513i",
    age_restriction: false,
    serves_food: true,
    serves_alcohol: true,
    stage: "Main Dining",
    stage_id: "clpxewpn0001pw7ro3w9zwix4",
    performer: "JOSUE URRUTIA",
  },

  {
    date_start: "08 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "RYAN BRIDWELL AND FRIENDS",
  },

  {
    date_start: "09 Dec",
    time_start: "11:00 am",
    time_door: "9:00 am",
    time_end: "2:00 pm",
    venue_id: "clpxewpmz001mw7roj1g8513i",
    age_restriction: false,
    serves_food: true,
    serves_alcohol: true,
    stage: "Main Dining",
    stage_id: "clpxewpn0001pw7ro3w9zwix4",
    performer: "RJ PEREZ",
  },

  {
    date_start: "09 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "MICHAEL WEITZENHOFFER",
  },

  {
    date_start: "10 Dec",
    time_start: "11:00 am",
    time_door: "9:00 am",
    time_end: "2:00 pm",
    venue_id: "clpxewpmz001mw7roj1g8513i",
    age_restriction: false,
    serves_food: true,
    serves_alcohol: true,
    stage: "Main Dining",
    stage_id: "clpxewpn0001pw7ro3w9zwix4",
    performer: "OSCAR BUTLER",
  },

  // {
  //   date_start: "10 Dec",
  //   time_start: "6:00 pm",
  //   time_door: "5:00 pm",
  //   time_end: "9:00 pm",
  //   venue_id: "clpxewpc70018w7roglzwvtxo",
  //   requires_rsvp: true,
  //   rsvp_link: "https://www.yougottapassword.com",
  //   age_restriction: true,
  //   minimum_age: 13,
  //   serves_food: true,
  //   serves_alcohol: true,
  //   stage: "Black Diamond Lounge",
  //   stage_id: "clpxewpc8001aw7ro0m4z6pud",
  //   performer: "CHRIS CORDOVA JAZZ: FEATURING JENNA KUCHAR",
  // },

  {
    date_start: "10 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Chamber",
    stage_id: "clpxewpc8001bw7role42bxq0",
    performer: "KARL ZINK",
  },

  {
    date_start: "13 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "TONY CESARANO",
  },

  {
    date_start: "13 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Chamber",
    stage_id: "clpxewpc8001bw7role42bxq0",
    performer: "MICHAEL WEITZENHOFFER",
  },

  {
    date_start: "14 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "ALEX ALUNDAY TRIO",
  },

  {
    date_start: "15 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "RYAN BRIDWELL AND FRIENDS",
  },

  {
    date_start: "16 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "ARTISTRY JAZZ",
  },

  {
    date_start: "17 Dec",
    time_start: "11:00 am",
    time_door: "9:00 am",
    time_end: "2:00 pm",
    venue_id: "clpxewpmz001mw7roj1g8513i",
    age_restriction: false,
    serves_food: true,
    serves_alcohol: true,
    stage: "Main Dining",
    stage_id: "clpxewpn0001pw7ro3w9zwix4",
    performer: "OSCAR BUTLER",
  },

  {
    date_start: "17 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "CHRIS CORDOVA JAZZ: FEATURING JENNA KUCHAR",
  },

  {
    date_start: "20 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "TONY CESARANO",
  },

  {
    date_start: "20 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Chamber",
    stage_id: "clpxewpc8001bw7role42bxq0",
    performer: "MICHAEL WEITZENHOFFER",
  },

  {
    date_start: "21 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "ALEX ALUNDAY TRIO",
  },

  {
    date_start: "22 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "ASHER MUNDO DUO",
  },

  {
    date_start: "23 Dec",
    time_start: "11:00 am",
    time_door: "9:00 am",
    time_end: "2:00 pm",
    venue_id: "clpxewpmz001mw7roj1g8513i",
    age_restriction: false,
    serves_food: true,
    serves_alcohol: true,
    stage: "Main Dining",
    stage_id: "clpxewpn0001pw7ro3w9zwix4",
    performer: "RJ PEREZ",
  },

  {
    date_start: "23 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "RAY ANTHONY & POWERSLYDE",
  },

  {
    date_start: "24 Dec",
    time_start: "11:00 am",
    time_door: "9:00 am",
    time_end: "2:00 pm",
    venue_id: "clpxewpmz001mw7roj1g8513i",
    age_restriction: false,
    serves_food: true,
    serves_alcohol: true,
    stage: "Main Dining",
    stage_id: "clpxewpn0001pw7ro3w9zwix4",
    performer: "MICHAEL WEITZENHOFFER",
  },

  {
    date_start: "24 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "CADE GUTIERREZ TRIO",
  },

  {
    date_start: "24 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Chamber",
    stage_id: "clpxewpc8001bw7role42bxq0",
    performer: "MICHAEL WEITZENHOFFER",
  },

  {
    date_start: "27 Dec",
    time_start: "4:00 pm",
    time_door: "4:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "JONAH MINKUS TRIO",
  },

  {
    date_start: "27 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Chamber",
    stage_id: "clpxewpc8001bw7role42bxq0",
    performer: "MICHAEL WEITZENHOFFER",
  },

  {
    date_start: "28 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "ALEX ALUNDAY TRIO",
  },

  {
    date_start: "28 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Chamber",
    stage_id: "clpxewpc8001bw7role42bxq0",
    performer: "KARL ZINK",
  },

  {
    date_start: "29 Dec",
    time_start: "11:00 am",
    time_door: "11:00 am",
    time_end: "2:00 pm",
    venue_id: "clpxewpmz001mw7roj1g8513i",
    age_restriction: false,
    serves_food: true,
    serves_alcohol: true,
    stage: "Main Dining",
    stage_id: "clpxewpn0001pw7ro3w9zwix4",
    performer: "JOSUE URRUTIA",
  },

  {
    date_start: "29 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "RYAN BRIDWELL AND FRIENDS",
  },

  {
    date_start: "29 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Chamber",
    stage_id: "clpxewpc8001bw7role42bxq0",
    performer: "CALVIN APPLEBERRY",
  },

  {
    date_start: "30 Dec",
    time_start: "11:00 am",
    time_door: "9:00 am",
    time_end: "2:00 pm",
    venue_id: "clpxewpmz001mw7roj1g8513i",
    age_restriction: false,
    serves_food: true,
    serves_alcohol: true,
    stage: "Main Dining",
    stage_id: "clpxewpn0001pw7ro3w9zwix4",
    performer: "RJ PEREZ",
  },

  {
    date_start: "30 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "ASHER MUNDO DUO",
  },

  {
    date_start: "30 Dec",
    time_start: "6:00 pm",
    time_door: "5:00 pm",
    time_end: "9:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Chamber",
    stage_id: "clpxewpc8001bw7role42bxq0",
    performer: "CALVIN APPLEBERRY",
  },

  {
    date_start: "31 Dec",
    time_start: "11:00 am",
    time_door: "9:00 am",
    time_end: "2:00 pm",
    venue_id: "clpxewpmz001mw7roj1g8513i",
    age_restriction: false,
    serves_food: true,
    serves_alcohol: true,
    stage: "Main Dining",
    stage_id: "clpxewpn0001pw7ro3w9zwix4",
    performer: "OSCAR BUTLER",
  },

  {
    date_start: "31 Dec",
    time_start: "4:00 pm",
    time_end: "7:00 pm",
    time_door: "4:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "JONAH MINKUS TRIO",
  },

  {
    date_start: "31 Dec",
    time_start: "4:00 pm",
    time_end: "7:00 pm",
    time_door: "4:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,

    stage: "Chamber",
    stage_id: "clpxewpc8001bw7role42bxq0",
    performer: "CALVIN APPLEBERRY",
  },

  {
    date_start: "31 Dec",
    time_start: "7:00 pm",
    time_door: "7:00 pm",
    time_end: "10:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Black Diamond Lounge",
    stage_id: "clpxewpc8001aw7ro0m4z6pud",
    performer: "ALEX ALUNDAY TRIO",
  },

  {
    date_start: "31 Dec",
    time_start: "7:00 pm",
    time_door: "7:00 pm",
    time_end: "10:00 pm",
    venue_id: "clpxewpc70018w7roglzwvtxo",
    requires_rsvp: true,
    rsvp_link: "https://www.yougottapassword.com",
    age_restriction: true,
    minimum_age: 13,
    serves_food: true,
    serves_alcohol: true,
    stage: "Chamber",
    stage_id: "clpxewpc8001bw7role42bxq0",
    performer: "KARL ZINK",
  },
];

vernonsEvents.map((event) => {
  const time_start = new Date(`${event.date_start}, 2023 ${event.time_start}`);
  const time_door = new Date(`${event.date_start}, 2023 ${event.time_door}`);
  const time_end = new Date(`${event.date_start}, 2023 ${event.time_end}`);
  const performer = event.performer
    .split(" ")
    .map((x) => (x === "RJ" ? "RJ" : x.charAt(0) + x.slice(1).toLowerCase()))
    .join(" ");
  const event_name = `${performer} ${
    event.venue_id === "clpxewpc70018w7roglzwvtxo"
      ? `in the ${event.stage}`
      : `for Brunch @ Cafe 6855`
  }`;
  const slug = `${format(time_start, "yyyy-MM-dd")}-${slugify(event_name, {
    strict: true,
    lower: true,
  })}`;

  return {
    name: event_name,
    slug,
    time_start,
    time_door,
    time_end,
    performer,
    description: `${performer} plays live music ${
      event.venue_id === "clpxewpc70018w7roglzwvtxo"
        ? `in the ${event.stage} at Vernon's Speakeasy.`
        : `for Brunch at Cafe 6855.`
    }`,
    created_by: {
      connect: {
        id: "clpxifyx00000g0y8jcqofjtk",
      },
    },
  };
});

// const events = vernonsEvents.map((event) => {
//   const time_start = new Date(
//     `${event.date_start}, 2023 ${event.time_start}`,
//   );
//   const time_door = new Date(`${event.date_start}, 2023 ${event.time_door}`);
//   const time_end = event.time_end
//     ? new Date(`${event.date_start}, 2023 ${event.time_end}`)
//     : undefined;
//   const performer = event.performer
//     .split(" ")
//     .map((x) => (x === "RJ" ? "RJ" : x.charAt(0) + x.slice(1).toLowerCase()))
//     .join(" ");
//   const event_name = `${performer} ${
//     event.venue_id === "clpxewpc70018w7roglzwvtxo"
//       ? `in the ${event.stage}`
//       : `for Brunch @ Cafe 6855`
//   }`;
//   const slug = `${format(time_start, "yyyy-MM-dd")}-${slugify(event_name, {
//     strict: true,
//     lower: true,
//   })}`;

//   return {
//     name: event_name,
//     slug,
//     time_start,
//     time_door,
//     time_end,
//     // performer,
//     description: `${performer} plays live music ${
//       event.venue_id === "clpxewpc70018w7roglzwvtxo"
//         ? `in the ${event.stage} at Vernon's Speakeasy.`
//         : `for Brunch at Cafe 6855.`
//     }`,
//     created_by: {
//       connect: {
//         id: "clpxifyx00000g0y8jcqofjtk",
//       },
//     },
//     venue: {
//       connect: {
//         id: event.venue_id,
//       },
//     },
//     stage: {
//       connect: {
//         id: event.stage_id,
//       },
//     },
//     age_restriction: event.age_restriction,
//     serves_food: true,
//     serves_alcohol: true,
//   };
// });
// events.forEach(async (event) => {
//   await prisma.event.create({
//     data: event,
//   });
// });
