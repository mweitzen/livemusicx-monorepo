import { db } from "../client";

export async function getAllEvents() {
  return await db.event.findMany();
}

export async function getEventDetails() {
  return await db.event.findUnique({ where: {} });
}

export async function createEvent() {
  return await db.event.create({ data: {} });
}

export async function deleteEvent() {
  return await db.event.create({ data: {} });
}

export async function updateEvent() {
  return await db.event.update({ where: {}, data: {} });
}

export async function updateEventParticipants() {
  return await db.event.update({ where: {}, data: {} });
}
