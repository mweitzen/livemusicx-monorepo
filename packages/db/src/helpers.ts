import { PrismaClient } from "./generated";
import { createSlug } from "@repo/utils";

export async function generateUniqueSlug(
  db: PrismaClient,
  text: string,
  type: "band" | "musician" | "venue" | "organizer"
) {
  if (!(type in ["band", "musician", "venue", "organizer"])) return "";

  let slug = createSlug(text);
  const where = { slug } as const;

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
