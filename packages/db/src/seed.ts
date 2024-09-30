import { PrismaClient } from "./generated";

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

import {
  addRelationshipsToEvents,
  addGenresToProfiles,
  addMusiciansToBands,
  addRelationshipsToUsers,
  addAffiliatedProfiles,
  addKeywordsToVenues,
} from "./seed-data/_many-to-many";

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
     * Assign many-to-many relationships
     */

    // Add performers to events, adjust event name
    await addRelationshipsToEvents(db);

    // Add musicians to bands
    await addMusiciansToBands(db);

    // Add bookmarked events to fan users
    // Add favorite profiles to fan users
    await addRelationshipsToUsers(db);

    // Add affiliated profiles
    await addAffiliatedProfiles(db);

    // Add associate users

    // Add Keywords to Venues
    await addKeywordsToVenues(db);

    // Add Genres to Profiles
    await addGenresToProfiles(db);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
})();
