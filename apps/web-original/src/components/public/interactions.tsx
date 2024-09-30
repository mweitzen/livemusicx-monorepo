"use client";
import Link from "next/link";

import { api } from "@repo/trpc/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useAuthStatus } from "~/lib/hooks/auth";

import { toast } from "sonner";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Button, buttonVariants } from "@repo/ui/components/button";
// import { AddToCalendarButton as AddToCalendarButtonPrimitive } from "add-to-calendar-button-react";

import { StarIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import {
  ShareIcon,
  UserPlusIcon,
  ArrowUpRightIcon,
  PhoneArrowUpRightIcon,
  ArrowRightEndOnRectangleIcon,
  StarIcon as StarIconFilled,
  BookmarkIcon as BookmarkIconFilled,
} from "@heroicons/react/20/solid";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@repo/ui/components/dialog";
import { TypographyMuted } from "../shared/typography";

const RequiresAuth = ({
  fallback,
  signedIn,
  signedOut,
}: {
  fallback: React.ReactNode;
  signedIn: React.ReactNode;
  signedOut: React.ReactNode;
}) => {
  const status = useAuthStatus();

  if (status === "loading") return fallback;

  if (status === "authenticated") return signedIn;

  return (
    <div onClick={(e) => e.preventDefault()}>
      <Dialog>
        <DialogTrigger asChild>{signedOut}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You must be logged in</DialogTitle>
            <DialogDescription>
              This feature is only available to users with an account.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <p> Please login to continue.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => signIn("google")}
            >
              Google
            </Button>
            <p>
              Don&apos;t have an account? Sign up for free by logging in above.
            </p>
            <p>
              Looking for an upgraded account to post events?{" "}
              <DialogClose asChild>
                <Button variant="link" asChild>
                  <Link href="/register">Click here</Link>
                </Button>
              </DialogClose>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const FavoriteButton = ({
  id,
  type,
  favorites,
}: {
  id: string;
  type: "venue" | "musician" | "group" | "organizer";
  favorites: { id: string }[];
}) => {
  const isFavorited = !!favorites.find((account) => account.id === id);
  const [selected, setSelected] = useState(isFavorited);

  const { mutate: addAccountToFavorites } =
    api.v1.users.public.addAccountToFavorites.useMutation({
      onSuccess: () => {
        toast("Success", {
          description: "You added an account to your favorites.",
        });
      },
      onError: () => {
        setSelected(false);
        toast("Uh oh!", {
          description: "Something went wrong.",
        });
      },
    });

  const { mutate: removeAccountFromFavorites } =
    api.v1.users.public.removeAccountFromFavorites.useMutation({
      onSuccess: () => {
        toast("Success", {
          description: "You removed an account from your favorites.",
        });
      },
      onError: () => {
        setSelected(false);
        toast("Uh oh!", {
          description: "Something went wrong.",
        });
      },
    });

  async function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setSelected(!selected);

    if (selected) {
      removeAccountFromFavorites({ id, type });
    } else {
      addAccountToFavorites({ id, type });
    }
  }

  return (
    <RequiresAuth
      fallback={
        <Skeleton
          onClick={(e) => e.preventDefault()}
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <StarIcon className="h-4 w-4" />
        </Skeleton>
      }
      signedIn={
        <Button variant="outline" size="icon" onClick={handleButtonClick}>
          {selected ? (
            <StarIconFilled className="h-4 w-4" />
          ) : (
            <StarIcon className="h-4 w-4" />
          )}
        </Button>
      }
      signedOut={
        <Button variant="outline" size="icon">
          <StarIcon className="h-4 w-4" />
        </Button>
      }
    />
  );
};

const BookmarkButton = ({
  id,
  bookmarkedEvents,
}: {
  id: string;
  bookmarkedEvents: { id: string }[];
}) => {
  const isBookmarked = !!bookmarkedEvents.find((event) => event.id === id);
  const [selected, setSelected] = useState(isBookmarked);

  const { mutate: addEventToBookmarks } =
    api.v1.users.public.addEventToBookmarks.useMutation({
      onSuccess: () => {
        toast("Success", {
          description: "You added an event to your bookmarks.",
        });
      },
      onError: () => {
        setSelected(false);
        toast("Uh oh!", {
          description: "Something went wrong.",
        });
      },
    });

  const { mutate: removeEventFromBookmarks } =
    api.v1.users.public.removeEventFromBookmarks.useMutation({
      onSuccess: () => {
        toast("Success", {
          description: "You removed an event from your bookmarks.",
        });
      },
      onError: () => {
        setSelected(true);
        toast("Uh oh!", {
          description: "Something went wrong.",
        });
      },
    });

  async function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSelected(!selected);

    if (selected) {
      removeEventFromBookmarks(id);
    } else {
      addEventToBookmarks(id);
    }
  }

  return (
    <RequiresAuth
      fallback={
        <Skeleton
          onClick={(e) => e.preventDefault()}
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <BookmarkIcon className="h-4 w-4" />
        </Skeleton>
      }
      signedIn={
        <Button variant="outline" size="icon" onClick={handleButtonClick}>
          {selected ? (
            <BookmarkIconFilled className="h-4 w-4" />
          ) : (
            <BookmarkIcon className="h-4 w-4" />
          )}
        </Button>
      }
      signedOut={
        <Button variant="outline" size="icon">
          <BookmarkIcon className="h-4 w-4" />
        </Button>
      }
    />
  );
};

const ContactButton = () => {
  return (
    <RequiresAuth
      fallback={
        <Skeleton
          onClick={(e) => e.preventDefault()}
          className={buttonVariants({ variant: "outline" })}
        >
          <PhoneArrowUpRightIcon className="h-4 w-4" /> Contact
        </Skeleton>
      }
      signedIn={
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PhoneArrowUpRightIcon className="mr-1 h-4 w-4" />
              Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact</DialogTitle>
              <DialogDescription>Contact this thing.</DialogDescription>
              <div className="divide-y divide-border">
                <div className="flex items-center justify-between py-2">
                  <p>Phone</p>
                  <DialogClose asChild>
                    <Button>Call</Button>
                  </DialogClose>
                </div>
                <div className="flex items-center justify-between py-2">
                  <p>Text</p>
                  <DialogClose asChild>
                    <Button>Message</Button>
                  </DialogClose>
                </div>
                <div className="flex items-center justify-between py-2">
                  <p>Email</p>
                  <DialogClose asChild>
                    <Button>Message</Button>
                  </DialogClose>
                </div>
                <div className="flex items-center justify-between py-2">
                  <p>Facebook</p>
                  <DialogClose asChild>
                    <Button>Message</Button>
                  </DialogClose>
                </div>
                <div className="flex items-center justify-between py-2">
                  <p>Instagram</p>
                  <DialogClose asChild>
                    <Button>Message</Button>
                  </DialogClose>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      }
      signedOut={
        <Button variant="outline">
          <PhoneArrowUpRightIcon className="h-4 w-4" /> Contact
        </Button>
      }
    />
  );
};

const ShareButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <ShareIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>Share this thing.</DialogDescription>
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between py-2">
              <p>URL</p>
              <DialogClose asChild>
                <Button>Share</Button>
              </DialogClose>
            </div>
            <div className="flex items-center justify-between py-2">
              <p>Facebook</p>
              <DialogClose asChild>
                <Button>Share</Button>
              </DialogClose>
            </div>
            <div className="flex items-center justify-between py-2">
              <p>Other Places</p>
              <DialogClose asChild>
                <Button>Share</Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

// const AddToCalendarButton = (
//   props: Pick<
//     React.ComponentProps<typeof AddToCalendarButtonPrimitive>,
//     | "name"
//     | "description"
//     | "startDate"
//     | "startTime"
//     | "endDate"
//     | "endTime"
//     | "timeZone"
//     | "location"
//     | "status"
//     | "sequence"
//     | "uid"
//     | "dates"
//     | "recurrence"
//     | "recurrence_interval"
//     | "recurrence_until"
//     | "recurrence_count"
//     | "recurrence_byDay"
//     | "recurrence_byMonthDay"
//     | "recurrence_byMonth"
//     | "recurrence_weekstart"
//     | "subscribe"
//     | "icsFile"
//     | "iCalFileName"
//   >
// ) => {
//   return (
//     <AddToCalendarButtonPrimitive
//       listStyle="modal"
//       pastDateHandling="hide"
//       hideCheckmark
//       hideTextLabelButton
//       options={["Apple", "Google"]}
//       {...props}
//     />
//   );
// };

const BuyTicketsButton = ({
  ticketLinks = ["ticket link 1", "ticket link 2"],
}: {
  ticketLinks?: any[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Buy Tickets</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy Event Tickets</DialogTitle>
          <DialogDescription>
            Select a link below to purchase a ticket from a *third-party
            provider.
          </DialogDescription>
          <div className="flex flex-col gap-y-2 py-4">
            {ticketLinks.map((link, i) => (
              <div key={i} className="flex items-center justify-between">
                <p>Ticket URL</p>
                <DialogClose asChild>
                  <Button>
                    <a href="#" target="_blank">
                      Go to Site
                    </a>
                  </Button>
                </DialogClose>
              </div>
            ))}
          </div>
          <DialogFooter className="flex flex-col gap-2 text-center">
            <TypographyMuted className="text-xs">
              * Tickets are sold through third-party providers. Live Music X
              bears no responsibility for ticket purchases made through external
              links. Review the third-party provider&apos;s terms and policies
              before buying.
            </TypographyMuted>
            <TypographyMuted className="text-xs">
              <a
                href={`${process.env.NEXT_PUBLIC_SITE_URL}/terms`}
                target="_blank"
              >
                Learn More
                <ArrowUpRightIcon className="ml-1 inline-block h-3 w-3" />
              </a>
            </TypographyMuted>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export {
  FavoriteButton,
  BookmarkButton,
  ContactButton,
  ShareButton,
  // AddToCalendarButton,
  BuyTicketsButton,
};
