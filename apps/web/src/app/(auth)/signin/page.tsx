import AuthCard from "../card";
import AuthSeparator from "../separator";

import OAuthSignin from "@/components/auth/oauth";
import CredentialsSignin from "@/components/auth/credentials";

export interface ISigninSearchParams {
  email?: string;
  callbackUrl?: string;
  error?: string;
  code?: string;
}

export default function SigninPage({
  searchParams,
}: {
  searchParams?: ISigninSearchParams;
}) {
  return (
    <AuthCard
      title={"Welcome Back"}
      description={"Sign in to your account to continue"}
      switchText={"Don't have an account? Sign Up"}
      switchHref={"/signup"}
    >
      <CredentialsSignin {...searchParams} />

      <AuthSeparator />

      <OAuthSignin />
    </AuthCard>
  );
}
