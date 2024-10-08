import Link from "next/link";

import { auth, signIn } from "@repo/auth";
import { redirect } from "next/navigation";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@repo/ui/components/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";

import { Button } from "@repo/ui/components/button";
import { RegisterButton } from "~/components/shared/auth-buttons";
import {
  PageHeader,
  PageTitle,
  PageDescription,
} from "~/components/public/page";
import { TypographyMuted, TypographyP } from "~/components/shared/typography";

async function register() {
  "use server";
  await signIn("google", { redirectTo: "/account/upgrade" });
}

export default async function SignUpPage() {
  const session = await auth();
  if (!!session) {
    const user = session.user!;
    if (user.type !== "PUBLIC") return redirect("/admin");

    return redirect("/account");
  }
  return (
    <div>
      <PageHeader>
        <PageTitle>Join the Team</PageTitle>
        <PageDescription>{`You're just a few steps away from posting events!`}</PageDescription>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Upgrade Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p>First, select the account you want to upgrade to</p>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Account Type</SelectLabel>
                <SelectItem value="PERFORMER">
                  Performer (Musician or Group)
                </SelectItem>
                <SelectItem value="VENUE">Venue</SelectItem>
                <SelectItem value="ORGANIZER">Event Organizer</SelectItem>
                <SelectItem value="ASSOCIATE">Staff or Associate</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <TypographyP>Then log in with your email provider.</TypographyP>
          <RegisterButton accountType="PERFORMER" className="w-full" />
          <TypographyP>
            After you login, you will be prompted to verify your identity.
          </TypographyP>
        </CardContent>
      </Card>
      <div className="mt-8 text-center">
        <TypographyMuted>
          Not looking to post events, and want a regular account?
        </TypographyMuted>
        <Button variant="link" asChild>
          <Link href="/login">Head Back to Login</Link>
        </Button>
      </div>
    </div>
  );
}
