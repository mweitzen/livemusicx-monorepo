import { db } from "../client";

export async function getAllUsers() {
  return await db.user.findMany();
}

export async function getUserDetails() {
  return await db.user.findUnique({ where: {} });
}

export async function createUser() {
  return await db.user.create({ data: {} });
}

export async function deleteUser() {
  return await db.user.create({ data: {} });
}

export async function updateUser() {
  return await db.user.update({ where: {}, data: {} });
}

export async function getUserBookmarkedEvents() {
  return await db.user.findFirst({
    where: {},
    select: { eventsBookmarked: true },
  });
}

export async function getUserFavoritedAccounts() {
  return await db.user.findFirst({
    where: {},
    select: {},
  });
}
