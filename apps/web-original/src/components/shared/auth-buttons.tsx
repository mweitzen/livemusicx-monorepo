import { signIn, signOut } from "auth";
import type { AccountType } from "@prisma/client";

import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button>Sign In</Button>
    </form>
  );
}

function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        toast("Signed out", { description: "You have been signed out." });
      }}
    >
      <Button variant="secondary">
        <ArrowLeftStartOnRectangleIcon className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </form>
  );
}

function RegisterButton({ accountType, ...props }: { accountType: AccountType } & ButtonProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: `/account/upgrade?accountType=${accountType}` });
      }}
    >
      <Button variant="outline" type="submit" {...props}>
        Register
      </Button>
    </form>
  );
}

function GoogleButton({ accountType, ...props }: { accountType?: AccountType } & ButtonProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant="outline" type="submit" {...props}>
        Google
      </Button>
    </form>
  );
}

export { SignInButton, SignOutButton, RegisterButton, GoogleButton };
