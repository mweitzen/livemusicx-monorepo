import Link from "next/link";

import AuthCard from "../card";
import AuthSeparator from "../separator";

import OAuthButtons from "~/components/auth/oauth";
import CredentialsSignup from "~/components/auth/register";

import { Button } from "@repo/ui/components/button";
import AccountType from "../account-type";

export interface ISignupSearchParams {
  type?: "fan" | "admin";
  account?: "performer" | "venue" | "organizer" | "associate";
  email?: string;
}

export default function SignupPage({
  searchParams,
}: {
  searchParams: ISignupSearchParams;
}) {
  const { type } = searchParams;
  const typeSelected = type === "fan" || type === "admin";

  if (!typeSelected) {
    return (
      <AuthCard
        title={"Create Account"}
        description={"Choose your account type to get started"}
        switchText={"Already have an account? Sign In"}
        switchHref={"/signin"}
      >
        <div className='space-y-4'>
          <Button asChild>
            <Link
              replace
              href={{
                pathname: "signup",
                query: new URLSearchParams({
                  ...searchParams,
                  type: "fan",
                }).toString(),
              }}
              className='w-full'
            >
              Sign Up as a Fan
            </Link>
          </Button>
          <Button
            variant='outline'
            asChild
          >
            <Link
              replace
              href={{
                pathname: "signup",
                query: new URLSearchParams({
                  ...searchParams,
                  type: "admin",
                }).toString(),
              }}
              className='w-full'
            >
              Sign Up as an Admin
            </Link>
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title={"Create Account"}
      description={"Enter your details to create your account"}
      switchText={"Already have an account? Sign In"}
      switchHref={"/signin"}
    >
      <AccountType type={type} />

      <CredentialsSignup {...searchParams} />

      <AuthSeparator />

      <OAuthButtons />
    </AuthCard>
  );
}
