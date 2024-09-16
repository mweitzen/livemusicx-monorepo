import Link from "next/link";
import Image from "next/image";

import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/20/solid";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { TypographyH2, TypographyMuted } from "@/components/shared/typography";
import {
  Disclaimer,
  HomepageCTA,
  HomepageDescription,
  HomepageTitle,
  PageHeader,
} from "@/components/public/page";
import {
  ctaLink,
  ctaText,
  disclaimerIcon,
  disclaimerLong,
  disclaimerShort,
  h1,
  p,
  authorizedFeatures,
  publicFeatures,
  publicH2,
  publicP,
  authorizedH2,
  authorizedP,
} from "@/lib/content/homepage";
import {
  QuickView,
  QuickViewDescription,
  QuickViewHeader,
  QuickViewLink,
  QuickViewLinks,
  QuickViewList,
  QuickViewTitle,
} from "@/components/public/quick-view";
import { EventLoadingItem, AccountLoadingItem } from "@/components/public/quick-view-item";
import { EventsItems, OrganizersItems, PerformersItems, VenuesItems } from "./quick-views";
import { cookies } from "next/headers";

export default async function Home() {
  cookies();
  //
  return (
    <>
      <PageHeader>
        <Disclaimer href="/help-out">
          {disclaimerIcon} <Separator orientation="vertical" className="mx-2 h-4" />
          <span className="sm:hidden">{disclaimerShort}</span>
          <span className="hidden sm:inline">{disclaimerLong}</span>
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Disclaimer>
        <HomepageTitle>{h1}</HomepageTitle>
        <HomepageDescription>{p}</HomepageDescription>
        <HomepageCTA className="md:py-4">
          <Button size="sm" className="px-4 md:hidden" asChild>
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>
          <Button className="px-4 hidden md:block" asChild>
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>
        </HomepageCTA>
      </PageHeader>

      <TypographyH2 className="mt-0">
        <span className="sm:hidden">Events happening soon</span>
        <span className="hidden sm:inline-block">Check out events happening soon</span>
      </TypographyH2>

      <QuickView>
        <QuickViewHeader>
          <QuickViewTitle>Upcoming Events</QuickViewTitle>
          <QuickViewLink href="/events">See All</QuickViewLink>
        </QuickViewHeader>
        <QuickViewList
          fallback={[1, 2, 3, 4, 5].map((_, i) => (
            <EventLoadingItem key={i} />
          ))}
        >
          <EventsItems />
        </QuickViewList>
      </QuickView>

      <TypographyH2>
        <span className="sm:hidden">Discover new events</span>
        <span className="hidden sm:inline-block">Discover new events around town</span>
      </TypographyH2>

      <QuickView>
        <QuickViewHeader>
          <QuickViewTitle>Local Performers</QuickViewTitle>
          <QuickViewDescription>With Upcoming Events</QuickViewDescription>
          <QuickViewLinks>
            <QuickViewLink href="/performers">See All</QuickViewLink>
            <QuickViewLink href="/musicians">Musicians</QuickViewLink>
            <QuickViewLink href="/groups">Groups</QuickViewLink>
          </QuickViewLinks>
        </QuickViewHeader>
        <QuickViewList
          fallback={[1, 2, 3, 4, 5].map((_, i) => (
            <AccountLoadingItem key={i} />
          ))}
        >
          <PerformersItems />
        </QuickViewList>
      </QuickView>

      <QuickView>
        <QuickViewHeader>
          <QuickViewTitle>Local Venues</QuickViewTitle>
          <QuickViewDescription>With Upcoming Events</QuickViewDescription>
          <QuickViewLink href="/venues">See All</QuickViewLink>
        </QuickViewHeader>
        <QuickViewList
          fallback={[1, 2, 3, 4, 5].map((_, i) => (
            <AccountLoadingItem key={i} />
          ))}
        >
          <VenuesItems />
        </QuickViewList>
      </QuickView>

      <QuickView>
        <QuickViewHeader>
          <QuickViewTitle>Organizers</QuickViewTitle>
          <QuickViewLink href="/organizers">See All</QuickViewLink>
        </QuickViewHeader>
        <QuickViewList
          fallback={[1, 2, 3, 4, 5].map((_, i) => (
            <AccountLoadingItem key={i} />
          ))}
        >
          <OrganizersItems />
        </QuickViewList>
      </QuickView>

      <section className="mt-16 flex flex-col gap-y-2">
        <TypographyH2>{publicH2}</TypographyH2>
        <TypographyMuted className="text-lg">{publicP}</TypographyMuted>
        <ul className="space-y-2 py-4">
          {publicFeatures.map((item, i) => (
            <li key={`x-${item}`} className="flex items-center  gap-4 leading-7">
              <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <Button size="lg" asChild>
          <Link href="/login">Sign Up Now</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/features">Learn More</Link>
        </Button>
      </section>
      <section className="mt-16 flex flex-col gap-y-2">
        <TypographyH2>{authorizedH2}</TypographyH2>
        <TypographyMuted className="text-lg">{authorizedP}</TypographyMuted>
        <ul className="space-y-2 py-4">
          {authorizedFeatures.map((item, i) => (
            <li key={`x-${item}`} className="flex items-center  gap-4 leading-7">
              <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <Button size="lg" asChild>
          <Link href="/register">Sign Up to Post Events</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/features">Learn More</Link>
        </Button>
      </section>
    </>
  );
}
