import { api } from "@/lib/trpc/server";
import { redirect } from "next/navigation";
import type { AccountType } from "@repo/db";

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

async function signUpUser(formData: FormData) {
  "use server";

  // TODO: Implement this function.
}

export function SignUpForm() {
  return (
    <form action={signUpUser}>
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
