import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TRPCContext } from "@/server/trpc/context";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(string?: string | null) {
  if (!string) return null;
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createSlug(input: string): string {
  const slug = input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with "-"
    .replace(/--+/g, "-"); // Replace multiple "-" with a single "-"

  return slug;
}

type PrismBase = TRPCContext["prisma"];
export async function generateUniqueSlug(
  text: string,
  prismaBase:
    | PrismBase["musicGroup"]
    | PrismBase["musician"]
    | PrismBase["venue"]
    | PrismBase["organizer"]
    | PrismBase["event"]
) {
  let slug = createSlug(text);
  const where = { slug } as const;
  // @ts-ignore
  let exists = await prismaBase.findUnique({ where });
  let x = 1;
  while (exists) {
    slug = `${slug}-${x}`;
    // @ts-ignore
    exists = await prismaBase.findUnique({ where });
    x++;
  }
  return slug;
}

export function getSocialLinks(resource: { [key: string]: any }): string[] {
  return Object.keys(resource)
    .filter((key) => key.startsWith("social"))
    .filter((key) => !!resource[key])
    .map((key) => resource[key] as string);
}

export function convertSearchParamsToQuery(searchParams: SearchParams) {
  let query: { [key: string]: any } = {};
  Object.keys(searchParams).forEach((key) => {
    const value = searchParams[key];
    // skip empty strings
    if (value === "" || value === undefined) return;

    if (typeof value === "string") {
      // handle boolean conversion
      if (["include", "true"].includes(value)) {
        return (query[key] = true);
      }
      if (["false", "exclude"].includes(value)) {
        return (query[key] = false);
      }

      // handle date conversion
      if (key.includes("date") || key.includes("time")) {
        return (query[key] = new Date(value));
      }

      // handle number conversion
      if (key === "minimumAge") {
        return (query[key] = parseInt(value));
      }

      // return original string
      return (query[key] = value);
    } else {
      // handle string array
    }
  });
  return query;
}

// function generateZodObject<T>(typeDefinition: T): z.ZodObject<T> {
//   const zodFields: Record<keyof T, z.ZodType<any>> = {} as any;

//   for (const key in typeDefinition) {
//     if (Object.prototype.hasOwnProperty.call(typeDefinition, key)) {
//       const fieldType = typeDefinition[key as keyof T];
//       // Map each field from the type definition to Zod types
//       if (fieldType === String) {
//         zodFields[key] = z.string();
//       } else if (fieldType === Number) {
//         zodFields[key] = z.number();
//       } else if (fieldType === Boolean) {
//         zodFields[key] = z.boolean();
//       } else {
//         // Handle other field types as needed
//         zodFields[key] = z.unknown();
//       }
//     }
//   }

//   return z.object(zodFields);
// }
