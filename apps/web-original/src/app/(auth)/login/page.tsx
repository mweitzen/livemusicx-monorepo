import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { GoogleButton } from "@/components/shared/auth-buttons";
import { TypographyLarge, TypographyMuted, TypographyP } from "@/components/shared/typography";
import { PageHeader, PageTitle, PageDescription } from "@/components/public/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LoginPage() {
  const session = await auth();
  if (!!session) {
    const user = session.user!;
    if (user.accountType !== "PUBLIC") return redirect("/admin");

    return redirect("/account");
  }

  return (
    <>
      <PageHeader>
        <PageTitle>Welcome Back</PageTitle>
        <PageDescription>Log in to your account to continue.</PageDescription>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Select an Email Provider to Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <GoogleButton className="w-full" />
        </CardContent>
      </Card>
      <div className="text-center mt-4">
        <TypographyMuted className="mb-4">{`Don't have an account? Simply log in above to begin!`}</TypographyMuted>
        <TypographyLarge className="mb-1">Want to post events?</TypographyLarge>
        <Button variant="outline" asChild>
          <Link href="/register">Register to Post Events</Link>
        </Button>
      </div>
    </>
  );
}
