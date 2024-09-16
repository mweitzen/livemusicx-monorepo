import { TypographyH2 } from "@/components/shared/typography";
import { UpgradeUserForm } from "@/forms/auth/upgrade";

export default function UpgradeUserPage() {
  return (
    <>
      <TypographyH2 className="mb-4">Upgrade Your Account</TypographyH2>
      <UpgradeUserForm />
    </>
  );
}
