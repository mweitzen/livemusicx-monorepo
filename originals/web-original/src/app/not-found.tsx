import PublicFooter from "@/components/public/footer";
import {
  TypographyH1,
  TypographyLead,
  TypographyLarge,
} from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RootNotFound() {
  return (
    <>
      <main className="grid max-w-full flex-1 place-items-center px-4 py-24 sm:py-32 md:px-6 lg:px-8">
        <div className="text-center">
          <TypographyLarge>404</TypographyLarge>
          <TypographyH1>Page not found</TypographyH1>
          <TypographyLead className="mt-2">
            {`Sorry, we couldn't find the page you're looking for.`}
          </TypographyLead>

          <div className="mt-10 flex flex-col items-center justify-center gap-y-2 md:flex-row md:gap-x-6">
            <Button asChild>
              <Link href="/">Head Back Home</Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/">
                Contact support <span aria-hidden="true">&rarr;</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
