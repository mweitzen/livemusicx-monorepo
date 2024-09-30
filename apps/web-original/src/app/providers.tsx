"use client";

import { Toaster } from "@repo/ui/components/sonner";
import { ThemeProvider } from "@repo/ui/theme";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children?: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export { Providers };
