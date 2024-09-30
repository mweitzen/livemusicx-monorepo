import { Mail } from "~/messages/shadcn/components/mail";
import { accounts, mails } from "~/messages/shadcn/data";

export default function MailPage() {
  return (
    <Mail
      accounts={accounts}
      mails={mails}
      defaultLayout={[265, 440, 655]}
      defaultCollapsed={true}
      navCollapsedSize={4}
    />
  );
}
