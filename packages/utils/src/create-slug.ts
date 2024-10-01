import { format } from "date-fns";

export function createSlug(input: string): string {
  const slug = input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with "-"
    .replace(/--+/g, "-"); // Replace multiple "-" with a single "-"

  return slug;
}

export function createEventSlug(event: { timeStart: Date; name: string }) {
  return createSlug(`${format(event.timeStart, "yyyy-MM-dd")} ${event.name}`);
}
