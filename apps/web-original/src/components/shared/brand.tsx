import { cn } from "@repo/ui/helpers";

import Link from "next/link";
import Image from "next/image";

// import icon from "~/app/icon.png";
// import iconDark from "~/app/icon-dark.png";

export default function Brand({ displayText }: { displayText?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-1.5 rounded-lg bg-background/30 hover:bg-background/90"
    >
      <span className="relative inline">
        <Image
          src="/brand.png"
          alt="brand"
          className="h-8 w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          height={32}
          width={32}
          priority
        />
        <Image
          src="/brand-dark.png"
          alt="brand"
          className="absolute h-8 w-8 -translate-y-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          height={32}
          width={32}
          priority
        />
      </span>
      <span
        className={cn(
          "mr-2.5 hidden align-bottom text-sm font-semibold tracking-tight md:inline",
          displayText ? "inline" : "",
        )}
      >
        Live Music X
      </span>
    </Link>
  );
}
