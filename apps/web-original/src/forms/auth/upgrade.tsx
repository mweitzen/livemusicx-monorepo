"use client";

import { toast } from "sonner";
import { upgradeUser } from "./actions";
import { useFormState, useFormStatus } from "react-dom";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { Label } from "@/components/ui/label";
import { TypographyMuted, TypographyP } from "@/components/shared/typography";

const UpgradeButton = () => {
  const { pending } = useFormStatus();
  return pending ? (
    <Button variant="secondary" disabled>
      Upgrading
      <ArrowPathIcon className="ml-1 h-4 w-4 animate-spin" />
    </Button>
  ) : (
    <Button type="submit">Upgrade</Button>
  );
};

export function UpgradeUserForm() {
  const [state, formAction] = useFormState(upgradeUser, { message: "" });

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div>
        <Label>Select Account Type</Label>
        <Select name="accountType">
          <SelectTrigger>
            <SelectValue placeholder="Select an account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Account Type</SelectLabel>
              <SelectItem value="PERFORMER">Performer (Musician or Group)</SelectItem>
              <SelectItem value="VENUE">Venue</SelectItem>
              <SelectItem value="ORGANIZER">Event Organizer</SelectItem>
              <SelectItem value="ASSOCIATE">Staff or Associate</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <TypographyMuted className="text-center">
        If your upgrade is successful, you will need to sign back in again. You will be
        redirected to the setup screen. We are excited to have you on board!
      </TypographyMuted>
      <UpgradeButton />
    </form>
  );
}
