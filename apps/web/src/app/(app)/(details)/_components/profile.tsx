import Link from "next/link";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { BaseShape } from "@/data/mock/bands";
import {
  Airplay,
  Apple,
  Barcode,
  Facebook,
  Instagram,
  MapPin,
  Youtube,
  Star,
  Twitter,
  Play,
} from "@repo/ui/icons";

export function ProfilePage({
  children,
}: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className='grid md:grid-cols-[1fr_300px] gap-8 md:gap-12'>
      {children}
    </div>
  );
}

export function ProfilePageContent({
  children,
}: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  return <div className='grid gap-6'>{children}</div>;
}

export function ProfilePageSidebar({
  children,
}: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  return <div className='grid gap-6'>{children}</div>;
}

export function ProfilePageGrid({
  children,
}: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  return <div className='grid gap-4'>{children}</div>;
}

export function ProfilePageSection({
  children,
}: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  return <div className='grid gap-2'>{children}</div>;
}

export function ProfilePageSectionHeader({
  children,
}: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  return <h2 className='text-lg font-semibold'>{children}</h2>;
}

export function QuickDisplay({
  children,
}: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'> {children}</div>
  );
}

export function BasicInfo({
  profile: { name, genres, location, about },
}: {
  profile: BaseShape;
}) {
  return (
    <>
      <div className='flex flex-col items-center gap-4'>
        <Avatar className='h-32 w-32 border-4 border-primary'>
          <AvatarImage
            src='/assets/placeholder-user.jpg'
            alt='Musician'
          />
          <AvatarFallback>
            {name
              .split(" ")
              .map((w) => w.slice(0, 1))
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className='grid gap-1 text-center'>
          <h1 className='text-2xl font-bold'>{name}</h1>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <MapPin className='h-4 w-4' />
            <span>{location}</span>
          </div>
          <Link
            href='#'
            className='hover:underline text-sm text-muted-foreground'
            prefetch={false}
          >
            example.com
          </Link>
        </div>
        <div className='flex gap-2'>
          {genres.map((genre) => (
            <Badge
              key={genre}
              variant='secondary'
            >
              {genre}
            </Badge>
          ))}
        </div>
      </div>
      <ProfilePageGrid>
        <ProfilePageSection>
          <ProfilePageSectionHeader>About</ProfilePageSectionHeader>
          <p className='text-muted-foreground'>{about}</p>
        </ProfilePageSection>
        <ProfilePageSection>
          <ProfilePageSectionHeader>Social</ProfilePageSectionHeader>
          <div className='flex items-center gap-4'>
            <Link
              href='#'
              className='text-muted-foreground hover:text-primary'
              prefetch={false}
            >
              <Twitter className='h-6 w-6' />
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-primary'
              prefetch={false}
            >
              <Instagram className='h-6 w-6' />
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-primary'
              prefetch={false}
            >
              <Facebook className='h-6 w-6' />
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-primary'
              prefetch={false}
            >
              <Youtube className='h-6 w-6' />
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-primary'
              prefetch={false}
            >
              <Airplay className='h-6 w-6' />
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-primary'
              prefetch={false}
            >
              <Barcode className='h-6 w-6' />
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-primary'
              prefetch={false}
            >
              <Apple className='h-6 w-6' />
            </Link>
          </div>
        </ProfilePageSection>
      </ProfilePageGrid>
    </>
  );
}

export default function Component() {
  return (
    <ProfilePage>
      <ProfilePageContent>
        <ProfilePageGrid>
          <div className='flex items-center justify-between'>
            <ProfilePageSectionHeader>Upcoming Events</ProfilePageSectionHeader>
            <Link
              href='#'
              className='text-sm font-medium text-primary hover:underline'
              prefetch={false}
            >
              View all
            </Link>
          </div>
          <ProfilePageGrid>
            <div className='grid grid-cols-[100px_1fr] items-center gap-4'>
              <div className='bg-muted rounded-lg p-2 text-center'>
                <div className='text-2xl font-bold'>23</div>
                <div className='text-sm text-muted-foreground'>Sep</div>
              </div>
              <div>
                <h3 className='text-base font-semibold'>Live at The Venue</h3>
                <p className='text-sm text-muted-foreground'>
                  123 Main St, Los Angeles, CA 90001
                </p>
                <p className='text-sm text-muted-foreground'>8:00 PM</p>
              </div>
            </div>
            <div className='grid grid-cols-[100px_1fr] items-center gap-4'>
              <div className='bg-muted rounded-lg p-2 text-center'>
                <div className='text-2xl font-bold'>15</div>
                <div className='text-sm text-muted-foreground'>Oct</div>
              </div>
              <div>
                <h3 className='text-base font-semibold'>Open Mic Night</h3>
                <p className='text-sm text-muted-foreground'>
                  456 Oak St, Los Angeles, CA 90002
                </p>
                <p className='text-sm text-muted-foreground'>7:00 PM</p>
              </div>
            </div>
          </ProfilePageGrid>
        </ProfilePageGrid>
        <ProfilePageGrid>
          <ProfilePageSectionHeader>Media</ProfilePageSectionHeader>
          <QuickDisplay>
            <div className='relative group'>
              <Link
                href='#'
                className='absolute inset-0 z-10'
                prefetch={false}
              >
                <span className='sr-only'>View</span>
              </Link>
              <img
                src='/assets/placeholder.svg'
                alt='Cover image'
                width={200}
                height={200}
                className='rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='bg-white/50 hover:bg-white/75'
                >
                  <Play className='h-8 w-8' />
                </Button>
              </div>
            </div>
            <div className='relative group'>
              <Link
                href='#'
                className='absolute inset-0 z-10'
                prefetch={false}
              >
                <span className='sr-only'>View</span>
              </Link>
              <img
                src='/assets/placeholder.svg'
                alt='Cover image'
                width={200}
                height={200}
                className='rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='bg-white/50 hover:bg-white/75'
                >
                  <Play className='h-8 w-8' />
                </Button>
              </div>
            </div>
            <div className='relative group'>
              <Link
                href='#'
                className='absolute inset-0 z-10'
                prefetch={false}
              >
                <span className='sr-only'>View</span>
              </Link>
              <img
                src='/assets/placeholder.svg'
                alt='Cover image'
                width={200}
                height={200}
                className='rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='bg-white/50 hover:bg-white/75'
                >
                  <Play className='h-8 w-8' />
                </Button>
              </div>
            </div>
          </QuickDisplay>
        </ProfilePageGrid>
        <ProfilePageGrid>
          <ProfilePageSectionHeader>Related Musicians</ProfilePageSectionHeader>
          <QuickDisplay>
            <div className='relative group'>
              <Link
                href='#'
                className='absolute inset-0 z-10'
                prefetch={false}
              >
                <span className='sr-only'>View</span>
              </Link>
              <img
                src='/assets/placeholder.svg'
                alt='Cover image'
                width={200}
                height={200}
                className='rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='grid gap-2'>
                  <div className='text-lg font-semibold'>Jane Doe</div>
                  <div className='flex gap-2'>
                    <Badge variant='secondary'>Folk</Badge>
                    <Badge variant='secondary'>Indie</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative group'>
              <Link
                href='#'
                className='absolute inset-0 z-10'
                prefetch={false}
              >
                <span className='sr-only'>View</span>
              </Link>
              <img
                src='/assets/placeholder.svg'
                alt='Cover image'
                width={200}
                height={200}
                className='rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='grid gap-2'>
                  <div className='text-lg font-semibold'>Bob Smith</div>
                  <div className='flex gap-2'>
                    <Badge variant='secondary'>Blues</Badge>
                    <Badge variant='secondary'>Rock</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative group'>
              <Link
                href='#'
                className='absolute inset-0 z-10'
                prefetch={false}
              >
                <span className='sr-only'>View</span>
              </Link>
              <img
                src='/assets/placeholder.svg'
                alt='Cover image'
                width={200}
                height={200}
                className='rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='grid gap-2'>
                  <div className='text-lg font-semibold'>Emily Johnson</div>
                  <div className='flex gap-2'>
                    <Badge variant='secondary'>Singer-Songwriter</Badge>
                    <Badge variant='secondary'>Acoustic</Badge>
                  </div>
                </div>
              </div>
            </div>
          </QuickDisplay>
        </ProfilePageGrid>
        <ProfilePageGrid>
          <ProfilePageSectionHeader>
            Affiliated Accounts
          </ProfilePageSectionHeader>
          <QuickDisplay>
            <div className='relative group'>
              <Link
                href='#'
                className='absolute inset-0 z-10'
                prefetch={false}
              >
                <span className='sr-only'>View</span>
              </Link>
              <img
                src='/assets/placeholder.svg'
                alt='Cover image'
                width={200}
                height={200}
                className='rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='grid gap-2'>
                  <div className='text-lg font-semibold'>The Venue</div>
                  <div className='flex gap-2'>
                    <Badge variant='secondary'>Music Venue</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative group'>
              <Link
                href='#'
                className='absolute inset-0 z-10'
                prefetch={false}
              >
                <span className='sr-only'>View</span>
              </Link>
              <img
                src='/assets/placeholder.svg'
                alt='Cover image'
                width={200}
                height={200}
                className='rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='grid gap-2'>
                  <div className='text-lg font-semibold'>Local Music Fest</div>
                  <div className='flex gap-2'>
                    <Badge variant='secondary'>Music Festival</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative group'>
              <Link
                href='#'
                className='absolute inset-0 z-10'
                prefetch={false}
              >
                <span className='sr-only'>View</span>
              </Link>
              <img
                src='/assets/placeholder.svg'
                alt='Cover image'
                width={200}
                height={200}
                className='rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='grid gap-2'>
                  <div className='text-lg font-semibold'>
                    Local Radio Station
                  </div>
                  <div className='flex gap-2'>
                    <Badge variant='secondary'>Radio Station</Badge>
                  </div>
                </div>
              </div>
            </div>
          </QuickDisplay>
        </ProfilePageGrid>
      </ProfilePageContent>
      <ProfilePageSidebar>
        <Card className='p-6 bg-muted'>
          <div className='grid gap-4'>
            <h2 className='text-lg font-semibold'>Discography</h2>
            <div className='grid gap-4'>
              <iframe
                src='https://open.spotify.com/embed/artist/123'
                width='100%'
                height='380'
                allow='encrypted-media'
              />
            </div>
          </div>
        </Card>
        <Card className='p-6 bg-muted'>
          <div className='grid gap-4'>
            <h2 className='text-lg font-semibold'>Reviews</h2>
            <div className='grid gap-4'>
              <div className='flex gap-4'>
                <Avatar className='w-10 h-10 border'>
                  <AvatarImage
                    src='/assets/placeholder-user.jpg'
                    alt='@shadcn'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='grid gap-4'>
                  <div className='flex gap-4 items-start'>
                    <div className='grid gap-0.5 text-sm'>
                      <h3 className='font-semibold'>Sarah Johnson</h3>
                      <time className='text-sm text-muted-foreground'>
                        2 days ago
                      </time>
                    </div>
                    <div className='flex items-center gap-0.5 ml-auto'>
                      <Star className='w-5 h-5 fill-primary' />
                      <Star className='w-5 h-5 fill-primary' />
                      <Star className='w-5 h-5 fill-primary' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </ProfilePageSidebar>
    </ProfilePage>
  );
}
