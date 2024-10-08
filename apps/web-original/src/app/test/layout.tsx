import { TRPCContextProvider } from "@repo/trpc/react";
import { cookies } from "next/headers";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieString = cookies().toString();
  return (
    <div>
      <TRPCContextProvider cookies={cookieString}>
        {children}
      </TRPCContextProvider>
    </div>
  );
}
