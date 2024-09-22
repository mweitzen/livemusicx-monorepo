import { ComponentProps, HtmlHTMLAttributes, ReactElement } from "react";

import Link from "next/link";
import Logo from "~/components/logo";
import { appConfig } from "@repo/constants";

export default function Footer() {
  return (
    <footer className='bg-secondary text-center md:text-start py-12 md:py-16 px-6'>
      <div className='max-w-7xl flex flex-col gap-12 md:gap-16 mx-auto'>
        <div className='flex flex-col md:flex-row items-center justify-between'>
          <Logo />
          <div className='flex gap-4 mt-4 md:mt-0'>
            {appConfig.socialLinks.map((link) => (
              <SocialLink
                key={link.site}
                {...link}
              />
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'>
          <FooterLinkSection heading='Events'>
            <FooterLink href='#'>Upcoming Events</FooterLink>
            <FooterLink href='#'>Past Events</FooterLink>
            <FooterLink href='#'>Featured Events</FooterLink>
            <FooterLink href='#'>Event Calendar</FooterLink>
          </FooterLinkSection>
          <FooterLinkSection heading='Musicians'>
            <FooterLink href='#'>Featured Musicians</FooterLink>
            <FooterLink href='#'>Genre Spotlight</FooterLink>
            <FooterLink href='#'>Artist Interviews</FooterLink>
            <FooterLink href='#'>Musician Profiles</FooterLink>
          </FooterLinkSection>
          <FooterLinkSection heading='Venues'>
            <FooterLink href='#'>Featured Venues</FooterLink>
            <FooterLink href='#'>Venue Guides</FooterLink>
            <FooterLink href='#'>Venue Events</FooterLink>
            <FooterLink href='#'>Venue Profiles</FooterLink>
          </FooterLinkSection>
          <FooterLinkSection heading='Admin'>
            <FooterLink href='#'>Musician Dashboard</FooterLink>
            <FooterLink href='#'>Venue Dashboard</FooterLink>
            <FooterLink href='#'>Event Management</FooterLink>
            <FooterLink href='#'>Analytics</FooterLink>
          </FooterLinkSection>
        </div>

        <p className='text-xs text-muted-foreground'>
          &copy; 2024 {appConfig.title}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className='text-sm text-muted-foreground hover:underline'
      prefetch={false}
    >
      {children}
    </Link>
  );
}

function SocialLink({
  site,
  ...props
}: ComponentProps<typeof Link> & { site: string }) {
  function renderIcon() {
    switch (site) {
      case "Twitter":
        return <TwitterIcon className='h-5 w-5' />;
      case "Facebook":
        return <FacebookIcon className='h-5 w-5' />;
      case "Instagram":
        return <InstagramIcon className='h-5 w-5' />;
      case "YouTube":
        return <YoutubeIcon className='h-5 w-5' />;
      default:
        return null;
    }
  }

  return (
    <Link
      {...props}
      className='text-muted-foreground hover:text-foreground'
      prefetch={false}
    >
      {renderIcon()}
      <span className='sr-only'>{site}</span>
    </Link>
  );
}

function FooterLinkSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactElement | ReactElement[];
}) {
  return (
    <div className='grid gap-4'>
      <h4 className='text-lg font-semibold text-foreground'>{heading}</h4>
      <nav className='grid gap-2'>{children}</nav>
    </div>
  );
}

function FacebookIcon(props: HtmlHTMLAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
    </svg>
  );
}

function InstagramIcon(props: HtmlHTMLAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect
        width='20'
        height='20'
        x='2'
        y='2'
        rx='5'
        ry='5'
      />
      <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
      <line
        x1='17.5'
        x2='17.51'
        y1='6.5'
        y2='6.5'
      />
    </svg>
  );
}

function TwitterIcon(props: HtmlHTMLAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
    </svg>
  );
}

function YoutubeIcon(props: HtmlHTMLAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17' />
      <path d='m10 15 5-3-5-3z' />
    </svg>
  );
}
