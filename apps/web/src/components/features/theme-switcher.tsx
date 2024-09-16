"use client";
import { capitalize } from "@/lib/utils";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  const handleToggle = () => {
    switch (theme) {
      case "light":
        return setTheme("dark");
      case "dark":
        return setTheme("system");
      case "system":
        return setTheme("light");
    }
  };

  if (!theme)
    return (
      <Button
        variant='ghost'
        size='lg'
        className='justify-start gap-4 p-2.5 text-muted-foreground hover:text-foreground rounded-md text-sm w-full'
      >
        <Sun className='w-5 h-5' />
        Toggle Mode: {capitalize("light")}
      </Button>
    );

  return (
    <Button
      variant='ghost'
      size='lg'
      className='justify-start gap-4 p-2.5 text-muted-foreground hover:text-foreground rounded-md text-sm w-full'
      onClick={handleToggle}
    >
      {theme === "light" && <Sun className='w-5 h-5' />}
      {theme === "dark" && <Moon className='w-5 h-5' />}
      {theme === "system" && <Monitor className='w-5 h-5' />}
      Toggle Mode: {capitalize(theme!)}
    </Button>
  );
}
