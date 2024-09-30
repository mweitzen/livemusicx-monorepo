import "@repo/ui/ui.css";
import "@repo/ui/styles.css";

import { Outlet } from "react-router-dom";
import { Navigation } from "~/components/navigation";

import { Toaster } from "@repo/ui/components/sonner";
import { ThemeProvider } from "@repo/ui/theme";
import { TRPCReactProvider } from "@repo/trpc/react";

export function AppLayout() {
  return (
    <TRPCReactProvider>
      <ThemeProvider>
        <Navigation />
        <div className='px-4 container py-4'>
          <Outlet />
        </div>
        <Toaster />
      </ThemeProvider>
    </TRPCReactProvider>
  );
}
