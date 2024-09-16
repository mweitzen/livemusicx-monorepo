import { Suspense } from "react";

import Link, { LinkProps } from "next/link";

import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const QuickView = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <section {...props} />
);

export const QuickViewHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="mb-1" {...props} />
);

export const QuickViewTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <TypographyH3 {...props} />
);

export const QuickViewDescription = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <TypographyMuted {...props} />
);

export const QuickViewLinks = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="flex gap-4" {...props} />
);

export const QuickViewLink = (props: LinkProps & React.HTMLAttributes<HTMLAnchorElement>) => (
  <Button variant="link" size="sm" className="px-0" asChild>
    <Link {...props} />
  </Button>
);

export const QuickViewList = ({
  children,
  fallback,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & React.SuspenseProps) => (
  <ScrollArea>
    <div className="flex gap-2 pb-6" {...props}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
);

export const QuickViewItem = () => <div />;

export const QuickViewEmptyState = () => <div />;
