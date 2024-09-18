import { TRPCContextProvider } from "@repo/trpc/react";

interface ListPageProps {
  children: React.ReactNode;
  cookies: string;
}

export const ListPage = ({ children, cookies }: ListPageProps) => {
  return (
    <TRPCContextProvider cookies={cookies}>{children}</TRPCContextProvider>
  );
};
