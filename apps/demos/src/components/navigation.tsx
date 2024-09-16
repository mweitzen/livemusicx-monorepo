import { Link } from "react-router-dom";
import { routes } from "@/main";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/dark-mode";
import { Separator } from "@/components/ui/separator";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { AccountTypeTest } from "@/user-account";

export function Navigation() {
  return (
    <header className="w-full h-14 px-4 container flex justify-between items-center ">
      <Brand />
      <div className="flex items-center gap-1">
        <AccountTypeTest />
        <ModeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Bars3Icon className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Live Music X - Demos</SheetTitle>
            </SheetHeader>
            <div className="mt-2 space-y-4 flex flex-col">
              <div>
                <SheetClose asChild>
                  <Link to="/" className="block rounded-lg py-2 px-4 hover:bg-secondary">
                    Home
                  </Link>
                </SheetClose>
                {routes.map((route) => (
                  <SheetClose asChild key={route.path}>
                    <Link
                      to={route.path}
                      className="block rounded-lg py-2 px-4 hover:bg-secondary"
                    >
                      {route.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <Separator />
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
