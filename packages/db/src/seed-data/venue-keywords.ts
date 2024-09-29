import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export const venueKeywords = [
  {
    id: faker.helpers.slugify("Happy hour".toLowerCase()),
    displayName: "Happy hour",
  },
  {
    id: faker.helpers.slugify("Craft cocktails".toLowerCase()),
    displayName: "Craft cocktails",
  },
  {
    id: faker.helpers.slugify("Local beer".toLowerCase()),
    displayName: "Local beer",
  },
  {
    id: faker.helpers.slugify("Wine list".toLowerCase()),
    displayName: "Wine list",
  },
  {
    id: faker.helpers.slugify("Fine dining".toLowerCase()),
    displayName: "Fine dining",
  },
  {
    id: faker.helpers.slugify("Casual dining".toLowerCase()),
    displayName: "Casual dining",
  },
  {
    id: faker.helpers.slugify("Patio seating".toLowerCase()),
    displayName: "Patio seating",
  },
  {
    id: faker.helpers.slugify("Outdoor space".toLowerCase()),
    displayName: "Outdoor space",
  },
  {
    id: faker.helpers.slugify("Indoor space".toLowerCase()),
    displayName: "Indoor space",
  },
  {
    id: faker.helpers.slugify("Family-friendly".toLowerCase()),
    displayName: "Family-friendly",
  },
  {
    id: faker.helpers.slugify("Downtown".toLowerCase()),
    displayName: "Downtown",
  },
  {
    id: faker.helpers.slugify("Historic district".toLowerCase()),
    displayName: "Historic district",
  },
  {
    id: faker.helpers.slugify("Waterfront".toLowerCase()),
    displayName: "Waterfront",
  },
  {
    id: faker.helpers.slugify("City views".toLowerCase()),
    displayName: "City views",
  },
  {
    id: faker.helpers.slugify("Intimate setting".toLowerCase()),
    displayName: "Intimate setting",
  },
  {
    id: faker.helpers.slugify("Spacious".toLowerCase()),
    displayName: "Spacious",
  },
  {
    id: faker.helpers.slugify("Modern".toLowerCase()),
    displayName: "Modern",
  },
  {
    id: faker.helpers.slugify("Rustic".toLowerCase()),
    displayName: "Rustic",
  },
  {
    id: faker.helpers.slugify("Elegant".toLowerCase()),
    displayName: "Elegant",
  },
  {
    id: faker.helpers.slugify("Trendy".toLowerCase()),
    displayName: "Trendy",
  },
  {
    id: faker.helpers.slugify("Casual".toLowerCase()),
    displayName: "Casual",
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
    id: faker.helpers.slugify("Upscale".toLowerCase()),
    displayName: "Upscale",
  },
  {
    id: faker.helpers.slugify("Dive bar".toLowerCase()),
    displayName: "Dive bar",
  },
  {
    id: faker.helpers.slugify("Speakeasy".toLowerCase()),
    displayName: "Speakeasy",
  },
  {
    id: faker.helpers.slugify("Rooftop".toLowerCase()),
    displayName: "Rooftop",
  },
  {
    id: faker.helpers.slugify("Garden".toLowerCase()),
    displayName: "Garden",
  },
  {
    id: faker.helpers.slugify("Brewery tours".toLowerCase()),
    displayName: "Brewery tours",
  },
  {
    id: faker.helpers.slugify("Wine tasting".toLowerCase()),
    displayName: "Wine tasting",
  },
  {
    id: faker.helpers.slugify("Distillery tours".toLowerCase()),
    displayName: "Distillery tours",
  },
  {
    id: faker.helpers.slugify("Art deco".toLowerCase()),
    displayName: "Art deco",
  },
  {
    id: faker.helpers.slugify("Industrial chic".toLowerCase()),
    displayName: "Industrial chic",
  },
  {
    id: faker.helpers.slugify("Vintage".toLowerCase()),
    displayName: "Vintage",
  },
  {
    id: faker.helpers.slugify("Historic".toLowerCase()),
    displayName: "Historic",
  },
  {
    id: faker.helpers.slugify("LGBTQ+ friendly".toLowerCase()),
    displayName: "LGBTQ+ friendly",
  },
  {
    id: faker.helpers.slugify("Dog-friendly".toLowerCase()),
    displayName: "Dog-friendly",
  },
  {
    id: faker.helpers.slugify("Kid-friendly".toLowerCase()),
    displayName: "Kid-friendly",
  },
  {
    id: faker.helpers.slugify("Late-night".toLowerCase()),
    displayName: "Late-night",
  },
  {
    id: faker.helpers.slugify("Brunch".toLowerCase()),
    displayName: "Brunch",
  },
  {
    id: faker.helpers.slugify("Dancing".toLowerCase()),
    displayName: "Dancing",
  },
  {
    id: faker.helpers.slugify("Pool tables".toLowerCase()),
    displayName: "Pool tables",
  },
  {
    id: faker.helpers.slugify("Arcade games".toLowerCase()),
    displayName: "Arcade games",
  },
  {
    id: faker.helpers.slugify("Board games".toLowerCase()),
    displayName: "Board games",
  },
  {
    id: faker.helpers.slugify("Trivia nights".toLowerCase()),
    displayName: "Trivia nights",
  },
  {
    id: faker.helpers.slugify("Comedy nights".toLowerCase()),
    displayName: "Comedy nights",
  },
  {
    id: faker.helpers.slugify("Open mic nights".toLowerCase()),
    displayName: "Open mic nights",
  },
] satisfies Prisma.EventKeywordCreateManyInput[];
