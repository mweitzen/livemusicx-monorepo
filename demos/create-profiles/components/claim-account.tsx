import { Button } from "@repo/ui/components/button";
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

export const ClaimAccountButton = ({
  account,
  callback,
}: {
  account: { id: string; name: string; basedIn: { name: string } | null };
  callback: (createType: "create" | "claim") => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
        >
          Claim Account
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Claim Account</DialogTitle>
          <DialogDescription>
            Verify you have selected the correct acccount, and click cliam to
            continue.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <p>{account.name}</p>
          {account.basedIn ? <p>{account.basedIn.name}</p> : null}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='button'
              onClick={() => callback("claim")}
            >
              Claim
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
