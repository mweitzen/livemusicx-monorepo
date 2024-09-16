"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const AdminLink = ({ href, name }: { href: string; name: string }) => {
  const pathname = usePathname();
  if (!pathname) return null;

  return (
    <Link
      href={href}
      className={cn("py-2 text-sm font-semibold text-secondary-foreground", {
        "font-bold text-inherit underline underline-offset-8":
          href === "/admin" ? pathname === href : pathname.includes(href),
      })}
    >
      {name}
    </Link>
  );
};

AdminLink.displayName = "AdminLink";
