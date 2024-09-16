import { format } from "date-fns";
import slugify from "slugify";

const mtuccisEvents = [
  {
    date_start: "12/10",
    time_door: "12:00 pm",
    time_start: "1:00 pm",
    venue_id: "clpxewon5000ow7robqxv0vit",
    stage_id: "clpz58c5e0001z5b8c8ubwyms",
    group: "The Dee Brown Situation",
  },

  {
    date_start: "12/17",
    time_door: "12:00 pm",
    time_start: "1:00 pm",
    venue_id: "clpxewon5000ow7robqxv0vit",
    stage_id: "clpz58c5e0001z5b8c8ubwyms",
    group: "The Dee Brown Situation",
  },
  {
    date_start: "12/24",
    time_door: "12:00 pm",
    time_start: "1:00 pm",
    venue_id: "clpxewon5000ow7robqxv0vit",
    stage_id: "clpz58c5e0001z5b8c8ubwyms",
    group: "The Dee Brown Situation",
  },
  {
    date_start: "12/31",
    time_door: "12:00 pm",
    time_start: "1:00 pm",
    venue_id: "clpxewon5000ow7robqxv0vit",
    stage_id: "clpz58c5e0001z5b8c8ubwyms",
    group: "The Dee Brown Situation",
  },
  {
    date_start: "12/13",
    time_door: "6:00 pm",
    time_start: "6:30 pm",
    venue_id: "clpxewon5000ow7robqxv0vit",
    stage_id: "clpz58c5e0001z5b8c8ubwyms",
    musician: "Alex Maryol",
  },
  {
    date_start: "12/20",
    time_door: "6:00 pm",
    time_start: "6:30 pm",
    venue_id: "clpxewon5000ow7robqxv0vit",
    stage_id: "clpz58c5e0001z5b8c8ubwyms",
    musician: "Gilbert Uribe",
  },
  {
    date_start: "12/27",
    time_door: "6:00 pm",
    time_start: "6:30 pm",
    venue_id: "clpxewon5000ow7robqxv0vit",
    stage_id: "clpz58c5e0001z5b8c8ubwyms",
    musician: "RJ Perez ",
  },
  // {
  //   date_start: "12/8",
  //   time_door: "7:00 pm",
  //   time_start: "7:30 pm",
  //   musician: "Marty York",
  //   venue_id: "M'tucci's Moderno",
  // },

  // {
  //   date_start: "12/14",
  //   time_door: "6:00 pm",
  //   time_start: "6:30 pm",
  //   musician: "Shane Wallin",
  //   venue_id: "M'tucci's Moderno",
  // },

  // {
  //   date_start: "12/15",
  //   time_door: "7:00 pm",
  //   time_start: "7:30 pm",
  //   musician: "Matt Jones",
  //   venue_id: "M'tucci's Moderno",
  // },

  // {
  //   date_start: "12/21",
  //   time_door: "6:00 pm",
  //   time_start: "6:30 pm",
  //   musician: "Javier Ortega ",
  //   venue_id: "M'tucci's Moderno",
  // },

  // {
  //   date_start: "12/22",
  //   time_door: "7:00 pm",
  //   time_start: "7:30 pm",
  //   musician: "Cali Shaw",
  //   venue_id: "M'tucci's Moderno",
  // },

  // {
  //   date_start: "12/28",
  //   time_door: "6:00 pm",
  //   time_start: "6:30 pm",
  //   musician: "RJ Perez ",
  //   venue_id: "M'tucci's Moderno",
  // },

  // {
  //   date_start: "12/29",
  //   time_door: "7:00 pm",
  //   time_start: "7:30 pm",
  //   musician: "Shane Wallin",
  //   venue_id: "M'tucci's Moderno",
  // },
  {
    date_start: "12/8",
    time_door: "7:00 pm",
    time_start: "7:30 pm",
    venue_id: "clpxewp1l0010w7ro8rskqcbl",
    stage_id: "clpz58bup0000z5b8r7sv4cs3",
    musician: "Cali Shaw ",
  },

  {
    date_start: "12/14",
    time_door: "6:00 pm",
    time_start: "6:30 pm",
    venue_id: "clpxewp1l0010w7ro8rskqcbl",
    stage_id: "clpz58bup0000z5b8r7sv4cs3",
    musician: "RJ Perez ",
  },

  {
    date_start: "12/15",
    time_door: "7:00 pm",
    time_start: "7:30 pm",
    venue_id: "clpxewp1l0010w7ro8rskqcbl",
    stage_id: "clpz58bup0000z5b8r7sv4cs3",
    musician: "Gilbert Uribe ",
  },

  {
    date_start: "12/21",
    time_door: "6:00 pm",
    time_start: "6:30 pm",
    venue_id: "clpxewp1l0010w7ro8rskqcbl",
    stage_id: "clpz58bup0000z5b8r7sv4cs3",
    musician: "Johnny Lloyd ",
  },

  {
    date_start: "12/22",
    time_door: "7:00 pm",
    time_start: "7:30 pm",
    venue_id: "clpxewp1l0010w7ro8rskqcbl",
    stage_id: "clpz58bup0000z5b8r7sv4cs3",
    musician: "Oscar Butler ",
  },

  {
    date_start: "12/28",
    time_door: "6:00 pm",
    time_start: "6:30 pm",
    venue_id: "clpxewp1l0010w7ro8rskqcbl",
    stage_id: "clpz58bup0000z5b8r7sv4cs3",
    musician: "Shane Wallin ",
  },

  {
    date_start: "12/29",
    time_door: "7:00 pm",
    time_start: "7:30 pm",
    venue_id: "clpxewp1l0010w7ro8rskqcbl",
    stage_id: "clpz58bup0000z5b8r7sv4cs3",
    musician: "Matt Jones",
  },
];

const eventsx = mtuccisEvents.map((event) => {
  const time_start = new Date(`${event.date_start}, 2023 ${event.time_start}`);
  const time_door = new Date(`${event.date_start}, 2023 ${event.time_door}`);
  const performer = event.musician || event.group;
  const event_name = `${performer}`;
  const slug = `${format(time_start, "yyyy-MM-dd")}-${slugify(event_name, {
    strict: true,
    lower: true,
  })}`;

  return {
    name: event_name,
    slug,
    time_start,
    time_door,
    performer,
    created_by: {
      connect: {
        id: "clpxifyx00000g0y8jcqofjtk",
      },
    },
    venue: {
      connect: {
        id: event.venue_id,
      },
    },
    stage: {
      connect: {
        id: event.stage_id,
      },
    },
    age_restriction: false,
    serves_food: true,
    serves_alcohol: true,
  };
});

console.log(eventsx);
// events.forEach(async (event) => {
//   await prisma.event.create({
//     data: event,
//   });
// });
