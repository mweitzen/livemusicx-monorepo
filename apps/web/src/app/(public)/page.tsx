import Link from "next/link";

import { MarketingSection, SectionImage } from "./section";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Music2, Share, Ticket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

function HeroSection() {
  const heroTitle = "Connecting the Music Community";
  const heroDescription =
    "Live Music X is the ultimate platform for performers, venues, organizers, and fans to discover, connect, and thrive in the vibrant local music scene.";
  const ExploreButton = () => (
    <Link
      href='/explore'
      className='inline-flex w-full h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
      prefetch={false}
    >
      Explore
    </Link>
  );
  const GetStartedButton = () => (
    <Link
      href='/signup'
      className='inline-flex w-full h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
      prefetch={false}
    >
      Get Started
    </Link>
  );
  return (
    <MarketingSection className='bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe]'>
      <div className='space-y-4 text-center md:text-start'>
        <h1 className='text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl'>
          {heroTitle}
        </h1>
        <p className='max-w-[600px] text-lg text-primary-foreground/90'>
          {heroDescription}
        </p>
        <div className='flex flex-col gap-2 sm:flex-row'>
          <ExploreButton />
          <GetStartedButton />
        </div>
      </div>
      <SectionImage
        alt='Soundscape Hero Image'
        src='/assets/placeholder.svg'
      >
        <div className='absolute -bottom-6 -right-6 rounded-lg bg-muted p-4 shadow-xl'>
          <div className='flex items-center gap-2'>
            <Avatar className='h-8 w-8 border-2 border-background'>
              <AvatarImage
                src='/assets/placeholder-user.jpg'
                alt='@shadcn'
              />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium'>Acme Band</p>
              <p className='text-xs text-muted-foreground'>
                Upcoming Event: June 15th
              </p>
            </div>
          </div>
        </div>
      </SectionImage>
    </MarketingSection>
  );
}

function GettingStartedSection() {
  return (
    <MarketingSection>
      <SectionImage
        className='mb-4 md:mb-0'
        alt='Soundscape Features Image'
        src='/assets/placeholder.svg'
      >
        <div className='absolute -bottom-6 -left-6 rounded-lg bg-muted p-4 shadow-xl'>
          <div className='flex items-center gap-2'>
            <Avatar className='h-8 w-8 border-2 border-background'>
              <AvatarImage
                src='/assets/placeholder-user.jpg'
                alt='@shadcn'
              />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium'>Venue Spotlight</p>
              <p className='text-xs text-muted-foreground'>
                The Soundstage - June 18th
              </p>
            </div>
          </div>
        </div>
      </SectionImage>
      <div className='space-y-4 text-center md:text-start'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Discover, Connect, and Thrive
        </h2>
        <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
          Soundscape provides a comprehensive platform for musicians, venues,
          event organizers, and fans to connect, discover new talent, and grow
          their local music community.
        </p>
        <div className='grid gap-4 text-start'>
          <div className='flex items-start gap-4'>
            <div className='flex flex-shrink-0 h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground'>
              <Music2 className='h-5 w-5' />
            </div>
            <div>
              <h3 className='text-lg font-medium'>Discover New Music</h3>
              <p className='text-muted-foreground'>
                Explore a vibrant network of local musicians, venues, and events
                to find your new favorite artists.
              </p>
            </div>
          </div>
          <div className='flex items-start gap-4'>
            <div className='flex flex-shrink-0 h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground'>
              <Users className='h-5 w-5' />
            </div>
            <div>
              <h3 className='text-lg font-medium'>
                Connect with the Community
              </h3>
              <p className='text-muted-foreground'>
                Build relationships with musicians, venues, and event organizers
                to expand your reach and grow your audience.
              </p>
            </div>
          </div>
          <div className='flex items-start gap-4'>
            <div className='flex flex-shrink-0 h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground'>
              <Ticket className='h-5 w-5' />
            </div>
            <div>
              <h3 className='text-lg font-medium'>Attend Local Events</h3>
              <p className='text-muted-foreground'>
                Discover and attend the best local music events, from concerts
                to festivals, all in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MarketingSection>
  );
}

function FeaturesSection() {
  return (
    <MarketingSection className='bg-muted '>
      <div className='space-y-4 text-center md:text-start'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Empower Your Music Career
        </h2>
        <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
          Soundscape provides the tools and platform for musicians, venues, and
          event organizers to connect, promote, and grow their local presence.
        </p>
        <div className='grid gap-4 text-start'>
          <div className='flex items-start gap-4'>
            <div className='flex flex-shrink-0 h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground'>
              <Users className='h-5 w-5' />
            </div>
            <div>
              <h3 className='text-lg font-medium'>Create a Profile</h3>
              <p className='text-muted-foreground'>
                Showcase your music, venue, or event with a professional profile
                and connect with the community.
              </p>
            </div>
          </div>
          <div className='flex items-start gap-4'>
            <div className='flex flex-shrink-0 h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground'>
              <Calendar className='h-5 w-5' />
            </div>
            <div>
              <h3 className='text-lg font-medium'>Manage Events</h3>
              <p className='text-muted-foreground'>
                Easily create and promote your events, sell tickets, and connect
                with attendees.
              </p>
            </div>
          </div>
          <div className='flex items-start gap-4'>
            <div className='flex flex-shrink-0 h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground'>
              <Share className='h-5 w-5' />
            </div>
            <div>
              <h3 className='text-lg font-medium'>Expand Your Reach</h3>
              <p className='text-muted-foreground'>
                Leverage the Soundscape platform to connect with new audiences
                and grow your fanbase.
              </p>
            </div>
          </div>
        </div>
      </div>
      <SectionImage
        alt='Soundscape Empowerment Image'
        src='/assets/placeholder.svg'
      >
        <div className='absolute -bottom-6 -right-6 rounded-lg bg-muted p-4 shadow-xl'>
          <div className='flex items-center gap-2'>
            <Avatar className='h-8 w-8 border-2 border-background'>
              <AvatarImage
                src='/assets/placeholder-user.jpg'
                alt='@shadcn'
              />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium'>Event Organizer</p>
              <p className='text-xs text-muted-foreground'>
                Upcoming Event: July 1st
              </p>
            </div>
          </div>
        </div>
      </SectionImage>
    </MarketingSection>
  );
}

function SignupSection() {
  return (
    <MarketingSection>
      <SectionImage
        className='mb-4 md:mb-0'
        alt='Soundscape Community Image'
        src='/assets/placeholder.svg'
      >
        <div className='absolute -bottom-6 -left-6 rounded-lg bg-muted p-4 shadow-xl'>
          <div className='flex items-center gap-2'>
            <Avatar className='h-8 w-8 border-2 border-background'>
              <AvatarImage
                src='/assets/placeholder-user.jpg'
                alt='@shadcn'
              />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium'>Fan Spotlight</p>
              <p className='text-xs text-muted-foreground'>
                Attending Event: June 25th
              </p>
            </div>
          </div>
        </div>
      </SectionImage>
      <div className='space-y-4 text-center md:text-start'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Join the Vibrant Music Community
        </h2>
        <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
          Soundscape brings together musicians, venues, event organizers, and
          fans to create a thriving local music ecosystem. Join the community
          and discover new talent, connect with like-minded individuals, and
          support the arts.
        </p>
        <div className='flex flex-col gap-2 lg:flex-row'>
          <Button
            className='flex-1'
            asChild
          >
            <Link
              href='#'
              prefetch={false}
            >
              Join as a Musician
            </Link>
          </Button>
          <Button
            variant='outline'
            className='flex-1'
            asChild
          >
            <Link
              href='#'
              prefetch={false}
            >
              Join as a Venue
            </Link>
          </Button>
          <Button
            variant='outline'
            className='flex-1'
            asChild
          >
            <Link
              href='#'
              prefetch={false}
            >
              Join as a Fan
            </Link>
          </Button>
        </div>
      </div>
    </MarketingSection>
  );
}

export default function LandingPage() {
  return (
    <main>
      <HeroSection />

      <GettingStartedSection />

      <FeaturesSection />

      <SignupSection />
    </main>
  );
}
