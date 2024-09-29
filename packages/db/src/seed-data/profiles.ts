import { faker } from "@faker-js/faker";
import { Prisma, $Enums } from "@prisma/client";
import { users } from "./users";
import { locations } from "./locations";
import { bandNames, organizerNames, venueNames } from "./_helpers";

/**
 * Set seed for consistent results
 */
faker.seed(33);

/**
 * Track used names
 */
const usedNames = {
  MUSICIAN: [] as string[],
  BAND: [] as string[],
  VENUE: [] as string[],
  ORGANIZER: [] as string[],
};

function generateProfiles(count: number) {
  /**
   * Map over given length to create profiles
   */
  return Array.from({ length: count }).map(() => {
    /**
     * Get Profile Type
     */
    const profileType = faker.helpers.enumValue($Enums.ProfileType);

    /**
     * Find a User that can manage this Profile Type
     */
    const userType =
      profileType === "MUSICIAN" || profileType === "BAND"
        ? "PERFORMER"
        : profileType;

    /**
     * 80% chance profile is managed and claimed
     */
    const user =
      faker.number.float({ min: 0, max: 1 }) > 0.2
        ? faker.helpers.arrayElement(
            users.filter((user) => user.type === userType)
          )
        : undefined;

    /**
     * Return profile
     */
    const name = generateName(profileType, user?.name);
    return {
      id: faker.string.uuid(),
      name,
      slug: faker.helpers.slugify(name.toLowerCase()),
      type: profileType,
      imageUrl: faker.image.urlLoremFlickr({
        width: 360,
        height: 360,
        category: profileType,
      }),
      managedById: user?.id,
      accountVerified: !!user?.id && faker.datatype.boolean(0.8),
      createdAt: faker.date.past({ years: 2 }),
      phoneNumber: faker.phone.number({ style: "national" }),
      isActive: !!user?.id,
      about: faker.lorem.paragraphs(2),
    } satisfies Prisma.ProfileCreateManyInput;
  });
}

function generateName(profileType: $Enums.ProfileType, userName?: string) {
  let name: string;
  do {
    switch (profileType) {
      case "MUSICIAN":
        if (userName && usedNames[profileType].includes(userName)) {
          name = faker.person.fullName();
          break;
        }
        name = userName ?? faker.person.fullName();
        break;
      case "BAND":
        name = faker.helpers.arrayElement(bandNames);
        break;
      case "VENUE":
        name = faker.helpers.arrayElement(venueNames).name;
        break;
      case "ORGANIZER":
        name = faker.helpers.arrayElement(organizerNames);
        break;
    }
  } while (usedNames[profileType].includes(name));

  usedNames[profileType].push(name);
  return name;
}

function generateMusicians(generatedProfiles: typeof profiles) {
  return generatedProfiles
    .filter((p) => p.type === "MUSICIAN")
    .map(
      (p) =>
        ({
          id: p.id,
          profileId: p.id,
          basedInId: faker.helpers.arrayElement(locations).id,
          instruments: faker.helpers.uniqueArray(
            [
              "Piano",
              "Keyboards",
              "Electric Guitar",
              "Acoustic Guitar",
              "Saxophone",
              "Trumpet",
              "Ukelele",
              "Drums",
              "Percussion",
              "Vocals",
            ],
            faker.number.int({ min: 1, max: 3 })
          ),
        }) satisfies Prisma.MusicianCreateManyInput
    );
}

function generateBands(generatedProfiles: typeof profiles) {
  return generatedProfiles
    .filter((p) => p.type === "BAND")
    .map(
      (p) =>
        ({
          id: p.id,
          profileId: p.id,
          basedInId: faker.helpers.arrayElement(locations).id,
        }) satisfies Prisma.BandCreateManyInput
    );
}

function generateVenues(generatedProfiles: typeof profiles) {
  return generatedProfiles
    .filter((p) => p.type === "VENUE")
    .map(
      (p) =>
        ({
          id: p.id,
          profileId: p.id,
          type: venueNames.find((v) => v.name === p.name)?.type,
          locationId: faker.helpers.arrayElement(locations).id,
          addressShort: faker.location.streetAddress(false),
          addressLong: "",
          // servesAlcohol: ,
          // servesFood: ,
          // ageRestriction: ,
          // minimumAge: ,
          // requiresReservation: ,
          // reservationLink: ,
          // privateAccess: ,
          // googleBusinessUrl: ,
          // tripadvisorUrl: ,
          // opentableUrl: ,
          // yelpUrl: ,
        }) satisfies Prisma.VenueCreateManyInput
    );
}

function generateStages(generatedVenues: typeof venues) {
  const stages = [];

  for (let venue of generatedVenues) {
    const count = faker.number.int({ min: 1, max: 2 });

    stages.push({
      id: faker.string.uuid(),
      name: "Main Stage",
      slug: faker.helpers.slugify("Main Stage".toLowerCase()),
      venueId: venue.id,
      capacity: faker.number.int({ min: 25, max: 500, multipleOf: 5 }),
      type: faker.helpers.enumValue($Enums.StageType),
    } satisfies Prisma.StageCreateManyInput);

    count === 2 &&
      stages.push({
        id: faker.string.uuid(),
        name: "Second Stage",
        slug: faker.helpers.slugify("Second Stage".toLowerCase()),
        venueId: venue.id,
        capacity: faker.number.int({ min: 25, max: 500, multipleOf: 5 }),
        type: faker.helpers.enumValue($Enums.StageType),
      } satisfies Prisma.StageCreateManyInput);
  }

  return stages;
}

function generateOrganizers(generatedProfiles: typeof profiles) {
  return generatedProfiles
    .filter((p) => p.type === "ORGANIZER")
    .map(
      (p) =>
        ({
          id: p.id,
          profileId: p.id,
          basedInId: faker.helpers.arrayElement(locations).id,
          experienceSummary: faker.lorem.paragraphs(3),
        }) satisfies Prisma.OrganizerCreateManyInput
    );
}

export const profiles = generateProfiles(100);
export const musicians = generateMusicians(profiles);
export const bands = generateBands(profiles);
export const venues = generateVenues(profiles);
export const stages = generateStages(venues);
export const organizers = generateOrganizers(profiles);
