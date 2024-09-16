import { Prisma } from "@prisma/client";

type EventInput = Prisma.EventCreateInput;

const eventData: EventInput = {
  name: "",
  slug: "",
  time_start: "",
  time_door: "",
  time_end: "",
  description: "",
  created_by: {
    connect: {
      id: "clpxifyx00000g0y8jcqofjtk",
    },
  },
  venue: {
    connect: {
      id: "",
    },
  },
  stage: {
    connect: {
      id: "",
    },
  },
  age_restriction: false,
  groups: { connect: [{ id: "" }] },
  musicians: { connect: [{ id: "" }] },
  requires_rsvp: false,
  rsvp_link: "",
  requires_ticket: false,
  // ticket_links: [],
};
