import Link from "next/link";
import Image from "next/image";

import { auth } from "auth";
import { api } from "@/lib/trpc/server";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypographyLarge, TypographyMuted } from "@/components/shared/typography";

export default async function UserAccountPage() {
  const session = await auth();
  const currentUser = await api.users.internal.getCurrent.query();

  if (!session || !session.user || !currentUser) return "Error";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "user image"}
            width={42}
            height={42}
            className="rounded-full"
          />
        ) : null}
        <div>
          <TypographyLarge>{session.user.name}</TypographyLarge>
          <TypographyMuted>{session.user.email}</TypographyMuted>
        </div>
      </div>

      <div>
        <Label>Account Type</Label>
        <Input readOnly defaultValue={session.user.accountType} />
      </div>

      {session.user.accountType === "PUBLIC" ? (
        <Button variant="outline" asChild>
          <Link href="/account/upgrade">Upgrade</Link>
        </Button>
      ) : (
        <Button variant="outline" asChild>
          <Link href="/account/upgrade">Manage</Link>
        </Button>
      )}
    </div>
  );
}
