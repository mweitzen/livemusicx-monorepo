import { Separator } from "@repo/ui/components/separator";
import { TypographyMuted } from "~/components/shared/typography";

export const BasicFooter = () => (
  <footer className="bg-footer w-full px-4 md:px-6 lg:px-8">
    <Separator />

    <TypographyMuted className="py-8 text-center sm:text-left">
      © 2024 LiveMusicX.com <br className="sm:hidden" />
      All rights reserved.
    </TypographyMuted>
  </footer>
);
