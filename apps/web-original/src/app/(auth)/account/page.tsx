import Link from "next/link";
import Image from "next/image";

import { auth } from "@repo/auth";
import { api } from "@repo/trpc/server";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import {
  TypographyLarge,
  TypographyMuted,
} from "~/components/shared/typography";

export default async function UserAccountPage() {
  const session = await auth();
  const currentUser = await api.v1.users.internal.getCurrent();

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
        <Input readOnly defaultValue={session.user.type} />
      </div>

      {session.user.type === "PUBLIC" ? (
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
