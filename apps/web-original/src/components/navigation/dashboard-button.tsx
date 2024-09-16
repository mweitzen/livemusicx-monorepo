"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStatus, useCurrentUser } from "@/lib/hooks/auth";

import { Button, type ButtonProps } from "../ui/button";
import { ArrowPathIcon, ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import React from "react";
import { capitalize } from "@/lib/utils";
import { ProfileImage } from "../shared/image";

export const DashboardButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    const pathname = usePathname();
    const status = useAuthStatus();
    const currentUser = useCurrentUser();

    if (!pathname) return null;

    if (status === "loading")
      return (
        <Button disabled>
          Loading <ArrowPathIcon className="ml-1 h-4 w-4 animate-spin" />
        </Button>
      );

    if (status === "unauthenticated") {
      if (pathname === "/login" || pathname === "/register")
        return (
          <Button variant="ghost" disabled>
            {capitalize(pathname.slice(1))}
          </Button>
        );
      return (
        <Button {...props} ref={ref} variant="outline" asChild>
          <Link href="/login">
            Login
            <ArrowRightCircleIcon className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      );
    }

    if (status !== "authorized") {
      if (pathname.startsWith("/account"))
        return (
          <Button variant="ghost" className="justify-start gap-2" disabled>
            {currentUser?.image ? (
              <ProfileImage src={currentUser.image} className="h-8 w-8" />
            ) : null}
            {currentUser?.name ?? "Account Page"}
          </Button>
        );
      return (
        <Button {...props} ref={ref} variant="outline" asChild>
          <Link href="/account">
            Your Account
            <ArrowRightCircleIcon className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      );
    }

    if (pathname.startsWith("/admin"))
      return (
        <Button variant="ghost" disabled>
          Admin Pages
        </Button>
      );

    return (
      <Button {...props} ref={ref} variant="outline" asChild>
        <Link href="/admin">
          <span className="hidden lg:block lg:mr-1">Go to</span>
          Dashboard
          <ArrowRightCircleIcon className="ml-2 w-4 h-4" />
        </Link>
      </Button>
    );
  }
);
DashboardButton.displayName = "DashboardButton";
