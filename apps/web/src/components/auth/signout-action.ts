"use server";
import { signOut } from "@repo/auth";

export const handleSignOut = async () => {
  await signOut({ redirectTo: "/signin" });
};
