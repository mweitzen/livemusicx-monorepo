"use server";
import { signOut as signOutPrimitive } from "@repo/auth";
import { toast } from "sonner";

export async function signOut() {
  await signOutPrimitive();
  return toast("Signed out", { description: "You have been signed out." });
}
