"use server";
import { api } from "@repo/trpc/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function setHomeLocation(id: string) {
  await api.user.setHomeLocation({ id });
  revalidateTag(`user`);
}
