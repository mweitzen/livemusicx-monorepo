import { routes } from "@/routes";

import { AdminLink } from "@/components/admin/link";
import { MainWrapper } from "@/components/shared/main-wrapper";
import { BasicFooter } from "@/components/shared/footer-basic";

import { TRPCReactProvider } from "@repo/trpc/react";

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <TRPCReactProvider>
      <MainWrapper>
        <div className="fixed inset-x-0 top-14 flex gap-4 overflow-auto border-b  border-border/40 bg-background/60 px-6 py-2 backdrop-blur-md lg:px-8">
          {routes
            .filter((route) => route.navigation.admin)
            .map((route) => (
              <AdminLink key={route.href} {...route} />
            ))}
        </div>
        <div className="mt-[1px] pt-14">
          <div className="py-4">{children}</div>
        </div>
      </MainWrapper>
      <BasicFooter />
    </TRPCReactProvider>
  );
}
