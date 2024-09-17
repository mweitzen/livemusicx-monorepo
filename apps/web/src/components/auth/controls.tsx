import Link from "next/link";

import { auth } from "@repo/auth";
import { Button } from "../ui/button";

import Notifications from "../features/notifications";
import AccountDropdown from "../features/account-dropdown";

export async function AuthControls() {
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
