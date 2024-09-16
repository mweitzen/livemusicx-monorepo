import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Download, LogOut, ShieldAlert, UserCog } from "lucide-react";

export default function UserButtons() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <Button
        variant='outline'
        className='w-full'
      >
        <Download className='mr-2 h-4 w-4' />
        Export Data
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='outline'
            className='w-full'
          >
            <UserCog className='mr-2 h-4 w-4' />
            Upgrade to Admin Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Request Admin Access</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to request admin access? This will be
              reviewed by our team.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm Request</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='outline'
            className='w-full text-yellow-600 hover:text-yellow-700'
          >
            <ShieldAlert className='mr-2 h-4 w-4' />
            Deactivate Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deactivate your account? This action can
              be reversed within 30 days.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Deactivate</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='destructive'
            className='w-full'
          >
            <LogOut className='mr-2 h-4 w-4' />
            Log Out
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out of your account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Log Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
