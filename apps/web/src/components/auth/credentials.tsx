import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@repo/auth";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ISigninSearchParams } from "@/app/(auth)/signin/page";

export default function CredentialsSignin({
  email,
  callbackUrl,
}: // error,
// code,
ISigninSearchParams) {
  const handleCredentialSignin = async (formData: FormData) => {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: callbackUrl ?? "/explore",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(
          `signin?email=${formData.get("email")}&error=${error.type}&code=${
            error.message
          }`
        );
      }
      throw error;
    }
  };

  return (
    <form
      action={handleCredentialSignin}
      className='space-y-4'
    >
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          type='email'
          defaultValue={email}
          placeholder='you@example.com'
          required
          className='w-full'
        />
      </div>
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <Label htmlFor='password'>Password</Label>
          <Link
            href='forgot-password'
            className='p-0 text-xs font-normal'
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id='password'
          name='password'
          type='password'
          required
          className='w-full'
        />
      </div>
      <Button
        type='submit'
        className='w-full'
      >
        Sign In with Email
      </Button>
    </form>
  );
}
