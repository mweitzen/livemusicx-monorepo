"use client";
import * as React from "react";

import Link from "next/link";
import { cn } from "@repo/ui/helpers";

import { SheetClose } from "@repo/ui/components/sheet";
// import { Button } from "@repo/ui/components/button";

interface SidebarLinkProps extends React.ComponentProps<typeof Link> {
  icon: React.ReactElement;
  name: string;
  active?: boolean;
  persistent?: boolean;
}

const LinkComponent = React.forwardRef<HTMLAnchorElement, SidebarLinkProps>(
  (
    {
      name,
      icon,
      active = false,
      ...props
    }: Omit<SidebarLinkProps, "persistent">,
    ref
  ) => (
    <Link
      ref={ref}
      {...props}
      className={cn(
        "flex items-center gap-4 p-2.5 text-muted-foreground hover:text-accent-foreground rounded-md hover:bg-accent text-sm",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        active && "bg-secondary ring-1 ring-border text-foreground"
      )}
    >
      {icon}
      {name}
    </Link>
  )
);
LinkComponent.displayName = "LinkComponent";

const SidebarLink = ({ persistent, ...props }: SidebarLinkProps) => {
  if (!persistent) {
    return (
      <SheetClose asChild>
        <LinkComponent {...props} />
      </SheetClose>
    );
  }

  return <LinkComponent {...props} />;
};

export default SidebarLink;
