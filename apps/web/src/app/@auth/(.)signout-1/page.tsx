"use client";
import { useRouter } from "next/navigation";

import Signout from "@/components/auth/signout";
import {
  Dialog,
  DialogHeader,
  DialogDescription,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@repo/ui/components/dialog";

export default function SignOutDialog() {
  const router = useRouter();

  const handleClose = () => {
    setTimeout(() => router.back(), 300);
  };

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => !open && handleClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You are logging out of your account.
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Signout />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
