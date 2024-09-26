"use server";
import { api } from "@repo/trpc/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function addToBookmarked(id: string, path = "/demo-1") {
  await api.events.addToBookmarked({ id });
  revalidateTag(`event-${id}`);
}

export async function removeFromBookmarked(id: string, path = "/demo-1") {
  await api.events.removeFromBookmarked({ id });
  revalidateTag(`event-${id}`);
}

export async function createEvent() {}
export async function updateEvent() {}

export async function publishEvent() {}

export async function addKeywordsToEvent() {}
export async function removeKeywordsToEvent() {}

export async function addGenresToEvent() {}
export async function removeGenresToEvent() {}

export async function addParticipantToEvent() {}
export async function removeParticipantsToEvent() {}

export async function addDatesToEvent() {}
