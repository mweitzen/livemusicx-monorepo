import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

import { genres } from "./seed-data/genres";
import { eventKeywords } from "./seed-data/event-keywords";
import { venueKeywords } from "./seed-data/venue-keywords";
import { locations } from "./seed-data/locations";
import { users } from "./seed-data/users";
import {
  profiles,
  musicians,
  bands,
  venues,
  stages,
  organizers,
} from "./seed-data/profiles";
import { events, ticketLinks } from "./seed-data/events";
import { faker } from "@faker-js/faker";

(async () => {
  try {
    /**
     * Seed with all initial resources
     */
    await db.genre.createMany({
      data: genres,
      skipDuplicates: true,
    });
    await db.eventKeyword.createMany({
      data: eventKeywords,
      skipDuplicates: true,
    });
    await db.venueKeyword.createMany({
      data: venueKeywords,
      skipDuplicates: true,
    });
    await db.location.createMany({
      data: locations,
      skipDuplicates: true,
    });
    await db.user.createMany({
      data: users,
      skipDuplicates: true,
    });
    await db.profile.createMany({
      data: profiles,
      skipDuplicates: true,
    });
    await db.musician.createMany({
      data: musicians,
      skipDuplicates: true,
    });
    await db.band.createMany({
      data: bands,
      skipDuplicates: true,
    });
    await db.venue.createMany({
      data: venues,
      skipDuplicates: true,
    });
    await db.stage.createMany({
      data: stages,
      skipDuplicates: true,
    });
    await db.organizer.createMany({
      data: organizers,
      skipDuplicates: true,
    });
    await db.event.createMany({
      data: events,
      skipDuplicates: true,
    });
    await db.ticketLink.createMany({
      data: ticketLinks,
      skipDuplicates: true,
    });

    /**
     * Retrieve the created resources
     */
    const createdEvents = await db.event.findMany({
      include: {
        createdBy: { include: { managedProfiles: true } },
        venue: { include: { profile: true } },
        organizer: { include: { profile: true } },
      },
    });
    // const createdProfiles = await db.profile.findMany();

    /**
     * Assign many-to-many relationships
     */

    // Add performers to events, adjust event name
    for (let event of createdEvents) {
      let performer: {
        id: string;
        name: string;
        type: "MUSICIAN" | "BAND" | "VENUE" | "ORGANIZER";
      };
      if (event.createdBy.type === "PERFORMER") {
        performer = event.createdBy.managedProfiles.find((p) =>
          event.name.includes(p.name)
        )!;
        if (!performer) console.log("PROFILE MISSING", event.createdBy.type);
      } else {
        performer = faker.helpers.arrayElement(
          profiles.filter((p) => p.type === "MUSICIAN" || p.type === "BAND")
        );
      }
      const eventNameFormats = [
        `${performer.name} at ${event.venue?.profile.name}`,
        `${event.organizer?.profile.name} Presents: ${performer.name}`,
        `${performer.name} Live in Concert`,
        `${performer.name} - ${faker.lorem.words(3)} Tour`,
        `An Evening with ${performer.name}`,
        `${event.venue?.profile.name} Summer Concert Series: ${performer.name}`,
      ];
      await db.event.update({
        where: {
          id: event.id,
        },
        data: {
          name: faker.helpers.arrayElement(eventNameFormats),
          musicians: {
            connect:
              performer.type === "MUSICIAN"
                ? {
                    id: performer.id,
                  }
                : undefined,
          },
          bands: {
            connect:
              performer.type === "BAND"
                ? {
                    id: performer.id,
                  }
                : undefined,
          },
        },
      });
    }

    // Add musicians to bands

    // Add bookmarked events to fan users

    // Add favorite profiles to fan users

    // Add affiliated profiles

    // Add associate users

    // Add Keywords to Venues

    // Add Genres to All
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
})();
