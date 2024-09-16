import { Toaster } from "@/components/ui/sonner";
import { Toaster as OtherToaster } from "@/components/ui/toaster";

import { AppNavigation } from "@/components/navigation";
import { SidebarDesktop } from "@/components/navigation/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='relative min-h-screen'>
        <AppNavigation />

        <aside className='fixed inset-y-0 pt-navigation w-sidebar p-0 hidden lg:block'>
          <SidebarDesktop />
        </aside>
        <main className='p-3 sm:p-6 lg:ml-sidebar'>{children}</main>
      </div>

      <Toaster />
      <OtherToaster />
    </>
  );
}
