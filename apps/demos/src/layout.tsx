import { Outlet } from "react-router-dom";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/dark-mode";
import { Toaster } from "./components/ui/sonner";

export function AppLayout() {
  return (
    <ThemeProvider>
      <Navigation />
      <div className="px-4 container py-4">
        <Outlet />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
