import { api } from "@repo/trpc/server";
import { redirect } from "next/navigation";
import type { AccountType } from "@repo/db/schema";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";

async function signInUser(formData: FormData) {
  "use server";

  // TODO: Implement this function.
}

export function SignInForm() {
  return (
    <form action={signInUser}>
      <Select name="accountType">
        <SelectTrigger>
          <SelectValue placeholder="Select an account type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Account Type</SelectLabel>
            <SelectItem value="PERFORMER">
              Performer (Musician or Group)
            </SelectItem>
            <SelectItem value="VENUE">Venue</SelectItem>
            <SelectItem value="ORGANIZER">Event Organizer</SelectItem>
            <SelectItem value="ASSOCIATE">Staff or Associate</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Label>Name</Label>
      <Input name="name" placeholder="Enter name" />
      <Button type="submit">Upgrade</Button>
    </form>
  );
}
