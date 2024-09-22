import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";

export default function ResetPassword() {
  const handleResetPassword = async () => {
    "use server";
  };

  return (
    <form
      action={handleResetPassword}
      className='space-y-4'
    >
      <div className='space-y-2'>
        <Label>Email Address</Label>
        <Input
          id='email'
          name='email'
          type='email'
          placeholder='you@example.com'
          required
          className='w-full'
        />
      </div>
      <Button className='w-full'>Reset Password</Button>
    </form>
  );
}
