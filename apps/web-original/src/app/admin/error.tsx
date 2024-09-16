"use client";
import Link from "next/link";

import { MainWrapper } from "@/components/shared/main-wrapper";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyLarge, TypographyMuted } from "@/components/shared/typography";

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function AdminRootError({ error, reset }: ErrorPageProps) {
  return (
    <MainWrapper>
      <div className="text-center">
        <TypographyLarge>
          Error <ExclamationTriangleIcon className="h-5 w-5" />
        </TypographyLarge>
        <TypographyH1>Something went wrong (admin)</TypographyH1>
        <TypographyMuted>{error.message}</TypographyMuted>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={reset}>Reset</Button>
          <Link href="/admin">
            <Button type="button" variant="link">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </MainWrapper>
  );
}
