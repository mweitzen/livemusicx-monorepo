"use client";
import * as React from "react";

import { links } from "@repo/constants";
import { usePathname } from "next/navigation";

import Logo from "../logo";
import SidebarLink from "./sidebar-link";
import ThemeSwitcher from "../features/theme-switcher";

import { Separator } from "@repo/ui/components/separator";
import { CircularIconButton } from "@repo/ui/components/circular-icon-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet";

import { Menu } from "@repo/ui/icons";

export function SidebarDesktop() {
  return <Sidebar persistent />;
}

export function SidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CircularIconButton
          icon={<Menu />}
          label='Open Menu'
        />
      </SheetTrigger>
      <SheetContent
        side='left'
        className='flex flex-col gap-0 w-sidebar p-0'
      >
        <SheetTitle className='sr-only'>Sidebar Navigation</SheetTitle>
        <SheetDescription className='sr-only'>
          Navigate the application
        </SheetDescription>
        <div className='flex flex-shrink-0 h-navigation items-center gap-x-1 md:gap-x-3 px-gutter md:px-4'>
          <SheetClose asChild>
            <CircularIconButton
              icon={<Menu />}
              label='Close Menu'
            />
          </SheetClose>
          <Logo />
        </div>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

function Sidebar({ persistent = false }: { persistent?: boolean }) {
  const pathname = usePathname();

  return (
    <div className='h-full overflow-y-auto'>
      <nav className='font-medium'>
        {/* PUBLIC APP */}
        <Section>
          {links.explore.map(({ icon, ...link }) => (
            <SidebarLink
              key={link.href}
              icon={React.createElement(icon, { className: "h-5 w-5" })}
              active={pathname === link.href}
              persistent={persistent}
              {...link}
            />
          ))}
        </Section>

        <Separator />

        {/* ADMIN APP */}
        <Section>
          <SectionHeading>Manage</SectionHeading>
          {links.manage.map(({ icon, ...link }) => (
            <SidebarLink
              key={link.href}
              icon={React.createElement(icon, { className: "h-5 w-5" })}
              active={pathname === link.href}
              persistent={persistent}
              {...link}
            />
          ))}
        </Section>

        <Separator />

        {/* ACCOUNT */}
        <Section>
          <SectionHeading>Engage</SectionHeading>
          {links.account.map(({ icon, ...link }) => (
            <SidebarLink
              key={link.href}
              icon={React.createElement(icon, { className: "h-5 w-5" })}
              active={pathname === link.href}
              persistent={persistent}
              {...link}
            />
          ))}
        </Section>

        <Separator />

        {/* SETTINGS */}
        <Section>
          {links.settings.map(({ icon, ...link }) => (
            <SidebarLink
              key={link.href}
              icon={React.createElement(icon, { className: "h-5 w-5" })}
              active={pathname === link.href}
              persistent={persistent}
              {...link}
            />
          ))}
          <ThemeSwitcher />
        </Section>
      </nav>
    </div>
  );
}

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className='p-3'>{children}</div>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <p className='font-bold px-3 pb-2'>{children}</p>
);
