import Link from "next/link";
import Logo from "../logo";
import Topbar from "./topbar";

import { auth } from "@repo/auth";
import { Suspense } from "react";

import { Button } from "@repo/ui/components/button";
import { SidebarMobile } from "./sidebar";
import { NavigationMenuDemo } from "./marketing-dropdown";

import Search from "../features/search";
import Notifications from "../features/notifications";
import AccountDropdown from "../features/account-dropdown";

export function MarketingNavigation() {
  return (
    <Topbar>
      <div className='flex-shrink-0 flex-1 md:flex-none'>
        <Logo />
      </div>
      <div className='flex-1 hidden md:block'>
        <NavigationMenuDemo />
      </div>
      <div className='flex gap-1 mr-2 justify-end'>
        <Button
          variant='outline'
          asChild
        >
          <Link href='/signup'>Sign Up</Link>
        </Button>
        <Button asChild>
          <Link href='/explore'>Explore →</Link>
        </Button>
      </div>
    </Topbar>
  );
}

export async function AppNavigation() {
  return (
    <Topbar>
      <div className='flex sm:gap-3 flex-shrink-0 items-center'>
        <span className='lg:hidden flex items-center'>
          <SidebarMobile />
        </span>
        <Logo />
      </div>
      <div className='flex flex-1 items-center justify-end md:justify-center'>
        <Search />
      </div>
      <Suspense fallback={<AuthPlaceholder />}>
        <AuthControls />
      </Suspense>
    </Topbar>
  );
}

function AuthPlaceholder() {
  return (
    <div className='flex gap-1 mr-2 items-center'>
      <Button
        className='hidden md:block'
        variant='outline'
        disabled
      >
        Sign Up
      </Button>
      <Button disabled>Sign In</Button>
    </div>
  );
}

async function AuthControls() {
  const session = await auth();

  if (!session)
    return (
      <div className='flex gap-1 mr-2 items-center'>
        <Button
          className='hidden md:block'
          variant='outline'
          asChild
        >
          <Link href='/signup'>Sign Up</Link>
        </Button>
        <Button asChild>
          <Link href='/signin'>Sign In</Link>
        </Button>
      </div>
    );

  return (
    <div className='flex gap-1 mr-2 items-center'>
      <Notifications />
      <AccountDropdown />
    </div>
  );
}
