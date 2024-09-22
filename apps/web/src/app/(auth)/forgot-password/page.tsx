import AuthCard from "../card";

import ResetPassword from "~/components/auth/forgot-password";

export default function ForgotPassword() {
  return (
    <AuthCard
      title={"Reset Password"}
      description={"Enter your email to reset your password"}
      switchText={"Head back to sign in."}
      switchHref={"/signin"}
    >
      <ResetPassword />
    </AuthCard>
  );
}
