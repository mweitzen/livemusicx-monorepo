import { MainWrapper } from "~/components/shared/main-wrapper";
import { cookies } from "next/headers";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  cookies();
  //
  return <MainWrapper>{children}</MainWrapper>;
}
