import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function EnterVerification() {
  const handleVerifyAccount = async () => {
    "use server";
  };

  return (
    <form
      action={handleVerifyAccount}
      className='space-y-4'
    >
      <div className='space-y-2'>
        <Label>Code</Label>
        <Input
          id='verification-code'
          name='verification-code'
          type='text'
          placeholder='0000'
          required
          className='w-full'
        />
      </div>
      <Button className='w-full'>Verify Account</Button>
    </form>
  );
}
