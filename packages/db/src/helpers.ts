import { db } from "./client";

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
  type: "band" | "musician" | "venue" | "organizer" | "event"
) {
  if (!["band", "musician", "venue", "organizer", "event"].includes(type))
    return "";
  let slug = createSlug(text);
  const where = { slug };
  // db
  // @ts-ignore
  let exists = await db[type].findUnique({ where });
  let x = 1;
  while (exists) {
    slug = `${slug}-${x}`;

    // @ts-ignore
    exists = await db[type].findUnique({ where });
    x++;
  }
  return slug;
}
