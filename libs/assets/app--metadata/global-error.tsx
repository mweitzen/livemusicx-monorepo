"use client";

import Link from "next/link";

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import {
  TypographyH1,
  TypographyLarge,
  TypographyMuted,
} from "@/components/shared/typography";

export default function GlobalError({ error, reset }: ErrorPageProps) {
  return (
    <html>
      <body>
        <main className="grid flex-1 place-items-center px-4 py-24 sm:py-32 md:px-6 lg:px-8">
          <div className="text-center">
            <TypographyLarge>
              <span className="flex gap-2">
                Error <ExclamationTriangleIcon className="h-5 w-5" />
              </span>
            </TypographyLarge>

            <TypographyH1>Catostrophic Meltdown</TypographyH1>
            <TypographyMuted>{error.message}</TypographyMuted>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button onClick={reset}>Reset</Button>
              <Link href="/">
                <Button type="button" variant="link">
                  Head Back Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
