"use server";
import { z } from "zod";
import { api } from "@/lib/trpc/server";
import { signOut, signIn } from "@repo/auth";

import { AccountType } from "@repo/db/v1";

export async function upgradeUser(
  prevState: { message: string },
  formData: FormData,
) {
  const schema = z.object({
    accountType: z.nativeEnum(AccountType),
  });
  const parse = schema.safeParse({
    accountType: formData.get("accountType"),
  });

  if (!parse.success) {
    console.log("ERROR: ", parse.error);
    return { message: "Failed to create todo" };
  }

  const data = parse.data;

  let success = false;
  try {
    const user = await api.users.internal.upgrade.mutate({
      verificationCode: "555-555",
      accountType: data.accountType,
    });
    if (!!user) {
      success = true;
    }
  } catch (error) {
    let message = "Unkown error.";
    if (error instanceof Error) {
      message = error.message;
    }
    console.log("ERROR: ", message);
    return { message };
  } finally {
    if (success) {
      await signOut({ redirect: false });
      return await signIn("google", { redirectTo: "/account/new-user" });
    }
  }
  return { message: "success" };
}
