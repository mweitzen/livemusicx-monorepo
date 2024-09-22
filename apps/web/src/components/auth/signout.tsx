import * as React from "react";

import { handleSignOut } from "./signout-action";
import { Button, ButtonProps } from "@repo/ui/components/button";

const Signout = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "asChild">
>((props, ref) => {
  return (
    <form action={handleSignOut}>
      <Button
        ref={ref}
        type='submit'
        {...props}
      >
        Sign out
      </Button>
    </form>
  );
});
Signout.displayName = "Signout";

export default Signout;
