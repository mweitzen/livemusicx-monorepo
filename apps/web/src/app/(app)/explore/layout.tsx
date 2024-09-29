import { TRPCReactProvider } from "@repo/trpc/react";
import FilterBar from "~/components/features/filter-bar";

export default function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <FilterBar />
      {children}
    </TRPCReactProvider>
  );
}
