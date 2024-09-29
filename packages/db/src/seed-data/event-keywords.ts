import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export const eventKeywords = [
  {
    id: faker.helpers.slugify("All ages".toLowerCase()),
    displayName: "All ages",
  },
  {
    id: faker.helpers.slugify("Family-friendly".toLowerCase()),
    displayName: "Family-friendly",
  },
  {
    id: faker.helpers.slugify("Album Release".toLowerCase()),
    displayName: "Album Release",
  },
  {
    id: faker.helpers.slugify("Reunion".toLowerCase()),
    displayName: "Reunion",
  },
  {
    id: faker.helpers.slugify("Residency".toLowerCase()),
    displayName: "Residency",
  },
  {
    id: faker.helpers.slugify("Background".toLowerCase()),
    displayName: "Background",
  },
  {
    id: faker.helpers.slugify("Outdoor".toLowerCase()),
    displayName: "Outdoor",
  },
  {
    id: faker.helpers.slugify("Indoor".toLowerCase()),
    displayName: "Indoor",
  },
  {
    id: faker.helpers.slugify("Party".toLowerCase()),
    displayName: "Party",
  },
  {
    id: faker.helpers.slugify("Exhibition".toLowerCase()),
    displayName: "Exhibition",
  },
  {
    id: faker.helpers.slugify("Dancing".toLowerCase()),
    displayName: "Dancing",
  },
  {
    id: faker.helpers.slugify("Networking".toLowerCase()),
    displayName: "Networking",
  },
  {
    id: faker.helpers.slugify("Educational".toLowerCase()),
    displayName: "Educational",
  },
  {
    id: faker.helpers.slugify("Interactive".toLowerCase()),
    displayName: "Interactive",
  },
  {
    id: faker.helpers.slugify("Creative".toLowerCase()),
    displayName: "Creative",
  },
  {
    id: faker.helpers.slugify("Formal".toLowerCase()),
    displayName: "Formal",
  },
  {
    id: faker.helpers.slugify("Casual".toLowerCase()),
    displayName: "Casual",
  },
  {
    id: faker.helpers.slugify("Intimate".toLowerCase()),
    displayName: "Intimate",
  },
  {
    id: faker.helpers.slugify("Lively".toLowerCase()),
    displayName: "Lively",
  },
  {
    id: faker.helpers.slugify("Relaxed".toLowerCase()),
    displayName: "Relaxed",
  },
  {
    id: faker.helpers.slugify("Romantic".toLowerCase()),
    displayName: "Romantic",
  },
  {
    id: faker.helpers.slugify("Festive".toLowerCase()),
    displayName: "Festive",
  },
  {
    id: faker.helpers.slugify("Charity".toLowerCase()),
    displayName: "Charity",
  },
  {
    id: faker.helpers.slugify("Fundraiser".toLowerCase()),
    displayName: "Fundraiser",
  },
  {
    id: faker.helpers.slugify("Community".toLowerCase()),
    displayName: "Community",
  },
] satisfies Prisma.VenueKeywordCreateManyInput[];
