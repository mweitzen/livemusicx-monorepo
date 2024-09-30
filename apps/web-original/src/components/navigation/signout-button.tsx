"use client";
import React from "react";
import Link from "next/link";

import { signOut } from "./signout";
import { useAuthStatus } from "~/lib/hooks/auth";

import { Button, type ButtonProps } from "@repo/ui/components/button";
import {
  ArrowPathIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/20/solid";

export const SignOutButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    const status = useAuthStatus();
    if (status === "loading")
      return (
        <Button disabled>
          Loading <ArrowPathIcon className="ml-1 h-4 w-4 animate-spin" />
        </Button>
      );

    if (status === "unauthenticated") {
      return (
        <Button {...props} ref={ref} asChild>
          <Link href="/login">
            Sign Up
            <ArrowRightStartOnRectangleIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      );
    }

    return (
      <Button
        {...props}
        ref={ref}
        variant="secondary"
        onClick={() => signOut()}
      >
        <span className="hidden lg:mr-1 lg:block">Go to</span>
        Sign Out
        <ArrowRightStartOnRectangleIcon className="ml-2 h-4 w-4" />
      </Button>
    );
  },
);
SignOutButton.displayName = "SignOutButton";
