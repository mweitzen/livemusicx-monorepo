import type { PrismaClient } from "../generated";
import { faker } from "@faker-js/faker";

import { musicians, profiles } from "./profiles";
import { genres } from "./genres";
import { events } from "./events";
import { eventKeywords } from "./event-keywords";
import { venueKeywords } from "./venue-keywords";

export async function addRelationshipsToEvents(db: PrismaClient) {
  (
    await db.event.findMany({
      include: {
        createdBy: { include: { managedProfiles: true } },
        venue: { include: { profile: true } },
        organizer: { include: { profile: true } },
        ticketLinks: true,
      },
    })
  ).forEach(async (event) => {
    let performer: {
      id: string;
      name: string;
      type: "MUSICIAN" | "BAND" | "VENUE" | "ORGANIZER";
    };

    /**
     * Get performer from profiles if user is performer
     */
    if (event.createdBy.type === "PERFORMER") {
      // @ts-ignore
      performer = event.createdBy.managedProfiles.find((p) =>
        event.name.includes(p.name)
      )!;
      if (!performer) console.log("PROFILE MISSING", event.createdBy.type);
    } else {
      performer = faker.helpers.arrayElement(
        profiles.filter((p) => p.type === "MUSICIAN" || p.type === "BAND")
      );
    }

    /**
     * Adjust Event Name to Include Performer
     */
    const eventNameFormats = [
      `${performer.name} at ${event.venue?.profile.name}`,
      `${event.organizer?.profile.name} Presents: ${performer.name}`,
      `${performer.name} Live in Concert`,
      `${performer.name} - ${faker.lorem.words(3)} Tour`,
      `An Evening with ${performer.name}`,
      `${event.venue?.profile.name} Summer Concert Series: ${performer.name}`,
    ];

    const newName = faker.helpers.arrayElement(eventNameFormats);

    /**
     * Update event
     */
    await db.event.update({
      where: {
        id: event.id,
      },
      data: {
        name: newName,
        slug: faker.helpers.slugify(
          `${newName.toLowerCase()} ${faker.word.words(4)}`
        ),
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
        genres: {
          connect: faker.helpers.arrayElements(genres, { min: 1, max: 4 }),
        },
        keywords: {
          connect: faker.helpers.arrayElements(eventKeywords, {
            min: 1,
            max: 3,
          }),
        },
      },
    });
  });
}

export async function addMusiciansToBands(db: PrismaClient) {
  (await db.profile.findMany({ where: { type: "BAND" } })).forEach(
    async (band) => {
      /**
       * Get a musician from the user managed profiles, if exists
       */
      const musician =
        (await db.profile.findFirst({
          where: { managedById: band.managedById, type: "MUSICIAN" },
        })) ?? faker.helpers.arrayElement(musicians);

      /**
       * Add musicians to band
       */
      await db.band.update({
        where: { id: band.id },
        data: {
          members: {
            connect: [
              { id: musician.id },
              ...faker.helpers
                .arrayElements(profiles, { min: 1, max: 3 })
                .filter((p) => p.type === "MUSICIAN" && p.id !== musician.id)
                .map((p) => ({ id: p.id })),
            ],
          },
        },
      });
    }
  );
}

export async function addRelationshipsToUsers(db: PrismaClient) {
  (await db.user.findMany()).forEach(async (user) => {
    await db.user.update({
      where: { id: user.id },
      data: {
        bookmarkedEvents: {
          connect: faker.helpers
            .arrayElements(events, { min: 1, max: 10 })
            .map((e) => ({ id: e.id })),
        },
        favoritedProfiles: {
          connect: faker.helpers
            .arrayElements(profiles, { min: 1, max: 10 })
            .map((p) => ({ id: p.id })),
        },
      },
    });
  });
}

export async function addAffiliatedProfiles(db: PrismaClient) {
  db;
}

export async function addKeywordsToVenues(db: PrismaClient) {
  (await db.venue.findMany()).forEach(async (venue) => {
    await db.venue.update({
      where: { id: venue.id },
      data: {
        keywords: {
          connect: faker.helpers.arrayElements(venueKeywords, {
            min: 1,
            max: 4,
          }),
        },
      },
    });
  });
}

// Add Genres to Profiles
export async function addGenresToProfiles(db: PrismaClient) {
  (await db.profile.findMany()).forEach(async (profile) => {
    await db.profile.update({
      where: { id: profile.id },
      data: {
        genres: {
          connect: faker.helpers.arrayElements(genres, { min: 1, max: 4 }),
        },
      },
    });
  });
}
