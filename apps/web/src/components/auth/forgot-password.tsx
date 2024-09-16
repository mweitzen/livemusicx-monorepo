import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

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
