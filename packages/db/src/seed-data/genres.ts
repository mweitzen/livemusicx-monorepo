import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export const genres = [
  {
    id: faker.helpers.slugify("Alternative".toLowerCase()),
    displayName: "Alternative",
  },
  {
    id: faker.helpers.slugify("Anime".toLowerCase()),
    displayName: "Anime",
  },
  {
    id: faker.helpers.slugify("Blues".toLowerCase()),
    displayName: "Blues",
  },
  {
    id: faker.helpers.slugify("Classical".toLowerCase()),
    displayName: "Classical",
  },
  {
    id: faker.helpers.slugify("Avant Garde".toLowerCase()),
    displayName: "Avant Garde",
  },
  {
    id: faker.helpers.slugify("Country".toLowerCase()),
    displayName: "Country",
  },
  {
    id: faker.helpers.slugify("Dance".toLowerCase()),
    displayName: "Dance",
  },
  {
    id: faker.helpers.slugify("Easy Listening".toLowerCase()),
    displayName: "Easy Listening",
  },
  {
    id: faker.helpers.slugify("Electronic".toLowerCase()),
    displayName: "Electronic",
  },
  {
    id: faker.helpers.slugify("Folk".toLowerCase()),
    displayName: "Folk",
  },
  {
    id: faker.helpers.slugify("Hip Hop".toLowerCase()),
    displayName: "Hip Hop",
  },
  {
    id: faker.helpers.slugify("Rap".toLowerCase()),
    displayName: "Rap",
  },
  {
    id: faker.helpers.slugify("Indie".toLowerCase()),
    displayName: "Indie",
  },
  {
    id: faker.helpers.slugify("J-Pop".toLowerCase()),
    displayName: "J-Pop",
  },
  {
    id: faker.helpers.slugify("K-Pop".toLowerCase()),
    displayName: "K-Pop",
  },
  {
    id: faker.helpers.slugify("Jazz".toLowerCase()),
    displayName: "Jazz",
  },
  {
    id: faker.helpers.slugify("Karaoke".toLowerCase()),
    displayName: "Karaoke",
  },
  {
    id: faker.helpers.slugify("Latin".toLowerCase()),
    displayName: "Latin",
  },
  {
    id: faker.helpers.slugify("Metal".toLowerCase()),
    displayName: "Metal",
  },
  {
    id: faker.helpers.slugify("New Age".toLowerCase()),
    displayName: "New Age",
  },
  {
    id: faker.helpers.slugify("Opera".toLowerCase()),
    displayName: "Opera",
  },
  {
    id: faker.helpers.slugify("Pop".toLowerCase()),
    displayName: "Pop",
  },
  {
    id: faker.helpers.slugify("Progressive".toLowerCase()),
    displayName: "Progressive",
  },
  {
    id: faker.helpers.slugify("R&B".toLowerCase()),
    displayName: "R&B",
  },
  {
    id: faker.helpers.slugify("Soul".toLowerCase()),
    displayName: "Soul",
  },
  {
    id: faker.helpers.slugify("Reggae".toLowerCase()),
    displayName: "Reggae",
  },
  {
    id: faker.helpers.slugify("Rock".toLowerCase()),
    displayName: "Rock",
  },
  {
    id: faker.helpers.slugify("Singer Songwriter".toLowerCase()),
    displayName: "Singer Songwriter",
  },
  {
    id: faker.helpers.slugify("Tex Mex".toLowerCase()),
    displayName: "Tex Mex",
  },
  {
    id: faker.helpers.slugify("Vocal".toLowerCase()),
    displayName: "Vocal",
  },
  {
    id: faker.helpers.slugify("World".toLowerCase()),
    displayName: "World",
  },
] satisfies Prisma.GenreCreateManyInput[];
