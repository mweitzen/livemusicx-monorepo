import Link from "next/link";

import { Suspense } from "react";
import { LoadingCard } from "./feature-card";
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";
import { Button } from "@repo/ui/components/button";
import { ChevronRight } from "@repo/ui/icons";

interface FeatureSectionProps {
  title: string;
  href: string;
  children?: React.ReactNode | React.ReactNode[];
}

export function FeaturedContent({
  children,
}: {
  children?: React.ReactNode[];
}) {
  return (
    <div className='relative'>
      <ScrollArea>
        <div className='flex space-x-4 pb-4'>{children}</div>
        <ScrollBar
          orientation='horizontal'
          className='mt-2'
        />
      </ScrollArea>
    </div>
  );
}

export function FeaturedSection({
  title,
  href,
  children,
}: FeatureSectionProps) {
  return (
    <section className='py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>
          {title}
        </h2>
        <Button
          variant='ghost'
          asChild
        >
          <Link href={href}>
            View All
            <ChevronRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </Button>
      </div>
      <Suspense
        fallback={
          <FeaturedContent>
            {Array.from({ length: 5 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </FeaturedContent>
        }
      >
        {children}
      </Suspense>
    </section>
  );
}
