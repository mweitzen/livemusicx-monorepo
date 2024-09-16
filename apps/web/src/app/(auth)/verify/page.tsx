import AuthCard from "../card";
import EnterVerification from "@/components/auth/verify-account";

export default function VerifyAccount() {
  return (
    <AuthCard
      title={"Enter Verification Code"}
      description={"You have been sent a code to your email"}
      switchText={"Can't find email? Resend email"}
      switchHref={"#"}
    >
      <EnterVerification />
    </AuthCard>
  );
}
