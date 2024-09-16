import Link from "next/link";
import { auth } from "auth";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageHeader, PageTitle } from "@/components/public/page";
export default async function UserAccountLayout({ children }: LayoutProps) {
  const session = await auth();
  if (!session) return redirect("/login");

  return (
    <>
      <PageHeader>
        <PageTitle>Your Account</PageTitle>
      </PageHeader>
      <Card>
        <CardHeader>
          <div className="flex gap-2">
            <Button variant="link" asChild>
              <Link href="/account">Account</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/account/settings">Settings</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </>
  );
}
