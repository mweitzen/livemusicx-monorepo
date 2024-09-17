import { prisma } from "./client.v1";

export function createSlug(input: string): string {
  const slug = input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with "-"
    .replace(/--+/g, "-"); // Replace multiple "-" with a single "-"

  return slug;
}

export async function generateUniqueSlug(
  text: string,
  type: "musicGroup" | "musician" | "venue" | "organizer" | "event"
) {
  let slug = createSlug(text);
  const where = { slug } as const;
  // prisma
  let exists = await prisma[type].findUnique({ where });
  let x = 1;
  while (exists) {
    slug = `${slug}-${x}`;

    exists = await prisma[type].findUnique({ where });
    x++;
  }
  return slug;
}
