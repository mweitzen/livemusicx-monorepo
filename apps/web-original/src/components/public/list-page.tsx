import { TRPCContextProvider } from "@/lib/trpc/client";

interface ListPageProps {
  children: React.ReactNode;
  cookies: string;
}

export const ListPage = ({ children, cookies }: ListPageProps) => {
  return <TRPCContextProvider cookies={cookies}>{children}</TRPCContextProvider>;
};
