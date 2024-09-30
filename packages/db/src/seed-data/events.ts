import { faker } from "@faker-js/faker";
import { Prisma, $Enums } from "../generated";
import { locations } from "../seed-data/locations";
import { users } from "../seed-data/users";
import { profiles, venues, stages, organizers } from "../seed-data/profiles";

/**
 * Set seed for consistent results
 */
faker.seed(33);

function generateEvents(count: number) {
  return Array.from({ length: count }).map(() => {
    const user = faker.helpers.arrayElement(
      users.filter((u) => u.type !== "FAN")
    );

    let profile;
    const managedProfiles = profiles.filter((p) => p.managedById === user.id);
    if (!managedProfiles.length) {
      profile = faker.helpers.arrayElement(profiles);
    } else {
      profile = faker.helpers.arrayElement(
        profiles.filter((p) => p.managedById === user.id)
      );
    }

    const isPublished = faker.datatype.boolean(0.7);
    const timeStart = faker.date.future({ years: 1 });
    const timeDoor = new Date(
      new Date(timeStart).setHours(timeStart.getHours() - 1)
    );
    const timeEnd = new Date(
      new Date(timeStart).setHours(
        timeStart.getHours() + faker.number.int({ min: 1, max: 4 })
      )
    );
    const isAgeRestricted = faker.datatype.boolean(0.35);
    const isFree = faker.datatype.boolean(0.65);
    const status = isPublished
      ? "SCHEDULED"
      : faker.helpers.enumValue($Enums.EventStatus);

    const venue =
      profile.type === "VENUE" ? profile : faker.helpers.arrayElement(venues);

    return {
      id: faker.string.uuid(),
      createdAt: faker.date.recent({ days: 60 }),
      createdById: user.id,
      lastUpdatedById: user.id,
      isPublished: isPublished,
      publishedById: isPublished ? user.id : undefined,
      managedById: user.id,
      status,
      name: `${profile.name}`,
      slug: faker.helpers.slugify(
        profile.name.toLowerCase() + " " + faker.word.words()
      ),
      imageUrl: faker.image.urlLoremFlickr({ category: "music" }),
      description: faker.lorem.paragraph(),
      websiteUrl: "#",
      timeDoor,
      timeStart,
      timeStartPrevious:
        status === "RESCHEDULED" ? faker.date.recent({ days: 60 }) : undefined,
      timeEnd,
      isPrivate: faker.datatype.boolean(0.05),
      isFree: faker.datatype.boolean(0.65),
      isChildFriendly: faker.datatype.boolean(0.15),
      isHoliday: faker.datatype.boolean(0.05),
      isAgeRestricted: faker.datatype.boolean(0.35),
      minimumAge: isAgeRestricted
        ? faker.helpers.arrayElement([13, 18, 21])
        : undefined,
      servesAlcohol: faker.datatype.boolean(0.85),
      servesFood: faker.datatype.boolean(0.5),
      requiresRegistration: faker.datatype.boolean(0.5),
      registrationLink: "#",
      requiresTicket: !isFree,
      locationId: faker.helpers.arrayElement(locations).id,
      venueId: venue.id,
      stageId: faker.helpers.arrayElement(
        stages.filter((s) => s.venueId === venue.id)
      ).id,
      organizerId:
        faker.number.float({ min: 0, max: 1 }) > 0.6
          ? profile.type === "ORGANIZER"
            ? profile.id
            : faker.helpers.arrayElement(organizers).id
          : undefined,
    } satisfies Prisma.EventCreateManyInput;
  });
}

function genreateTicketLinks(generatedEvents: typeof events) {
  return generatedEvents
    .filter((e) => e.requiresTicket)
    .map(
      (e) =>
        ({
          id: faker.string.uuid(),
          eventId: e.id,
          price: faker.number.int({ min: 5, max: 150, multipleOf: 5 }),
          url: "#",
        }) satisfies Prisma.TicketLinkCreateManyInput
    );
}

export const events = generateEvents(200);
export const ticketLinks = genreateTicketLinks(events);
