import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ISignupSearchParams } from "@/app/(auth)/signup/page";

export default function CredentialsSignup({
  type,
  account,
  email,
}: ISignupSearchParams) {
  const handleSignup = async () => {
    "use server";
  };

  return (
    <form
      action={handleSignup}
      className='space-y-4'
    >
      {type === "admin" && (
        <div className='space-y-2'>
          <Label htmlFor='name'>Account Type</Label>
          <Select
            name='account'
            defaultValue={account}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select the type of account' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='performer'>Performer</SelectItem>
              <SelectItem value='venue'>Venue</SelectItem>
              <SelectItem value='organizer'>Organizer</SelectItem>
              <SelectItem value='associate'>Associate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className='space-y-2'>
        <Label htmlFor='name'>Name (Optional)</Label>
        <Input
          id='name'
          name='name'
          type='text'
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          type='email'
          defaultValue={email}
          placeholder='you@example.com'
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          name='password'
          type='password'
          required
        />
      </div>
      <Button
        type='submit'
        className='w-full'
      >
        Sign Up
      </Button>
    </form>
  );
}
