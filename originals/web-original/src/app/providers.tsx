"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

import type { ThemeProviderProps } from "next-themes/dist/types";
const themeProviderProps: ThemeProviderProps = {
  attribute: "class",
  defaultTheme: "system",
  enableSystem: true,
};

const Providers = ({ children }: { children?: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider {...themeProviderProps}>
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export { Providers };
