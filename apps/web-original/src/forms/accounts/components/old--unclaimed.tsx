"use client";

import { api } from "@repo/trpc/react";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  TypographyH2,
  TypographyH3,
  TypographyLarge,
  TypographyMuted,
} from "@/components/shared/typography";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { capitalize } from "@/lib/utils";

export default function SelectUnclaimedAccount({
  accountType,
}: {
  accountType: "musician" | "group" | "organizer";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [newItemText, setNewItemText] = useState("");
  const [query] = useDebounce(newItemText, 300);
  const { data: accounts, isLoading } =
    api.v1.users.authorized.checkForExistingAccounts.useQuery(
      { accountType, name: query },
      { refetchOnWindowFocus: false },
    );

  // TODO: Remove this when i finally get rid of 'pages'
  if (!searchParams) return null;
  return (
    <div className="space-y-8 px-6">
      <TypographyH2>Account Name</TypographyH2>
      <div className="flex flex-col gap-2">
        <TypographyH3>Enter {capitalize(accountType)} Name</TypographyH3>

        <Label>Name</Label>
        <div>
          <Input
            className="mb-1"
            name="name"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
          />
          <TypographyMuted>
            Enter a publicly displayed name for your {accountType} (or search
            for different variations if you think you may already have been
            added).
          </TypographyMuted>
        </div>
        <Button
          onClick={() =>
            router.replace(
              `${pathname}?${searchParams.toString()}&submitType=create`,
            )
          }
        >
          Create New Account
        </Button>
      </div>
      <section>
        <TypographyH3>Unclaimed Accounts</TypographyH3>
        <TypographyMuted>
          Accounts can be created by other users referencing you in their
          events. Unclaimed accounts that match your search will appear below.
        </TypographyMuted>
        <ul className="space-y-4 py-4">
          {isLoading
            ? "Loading baby..."
            : accounts && accounts.length
              ? accounts.map((account) => (
                  <li
                    key={account.id}
                    className="flex items-center justify-between"
                  >
                    <span>
                      <TypographyLarge>{account.name}</TypographyLarge>
                      <TypographyMuted className="items-center text-sm">
                        <MapPinIcon className="h-4 w-4" />{" "}
                        {account.basedIn?.name || "undesignated"}
                      </TypographyMuted>
                    </span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Claim</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Claim Account</DialogTitle>
                          <DialogDescription>
                            Verify you have selected the correct acccount, and
                            click cliam to continue.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <TypographyLarge>{account.name}</TypographyLarge>
                          {account.basedIn ? (
                            <TypographyMuted>
                              {account.basedIn.name}
                            </TypographyMuted>
                          ) : null}
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              onClick={() =>
                                router.replace(
                                  `${pathname}?${searchParams.toString()}&submitType=claim&claimId=${
                                    account.id
                                  }`,
                                )
                              }
                            >
                              Claim
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </li>
                ))
              : "No accounts."}
        </ul>
      </section>
    </div>
  );
}
