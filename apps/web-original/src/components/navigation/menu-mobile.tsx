import Link, { LinkProps } from "next/link";
import { routes } from "~/routes";

import Brand from "~/components/shared/brand";
import { SignOutButton } from "./signout-button";
import { DashboardButton } from "./dashboard-button";

import { Button } from "@repo/ui/components/button";
import { Separator } from "@repo/ui/components/separator";
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@repo/ui/components/sheet";

import { Bars3Icon } from "@heroicons/react/20/solid";
import { MenuSection } from "./client-components";

export function MobileMenu() {
  // const isAuthenticated = true;
  // const isAuthorized = true;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Bars3Icon className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex max-h-screen flex-col">
        <SheetClose asChild>
          <Brand displayText />
        </SheetClose>
        <SheetClose asChild>
          <DashboardButton />
        </SheetClose>
        <Separator />
        <ScrollArea>
          <div className="flex flex-col divide-y divide-border pb-4">
            <MenuSection type="public">
              <MenuSectionTitle>Public Pages</MenuSectionTitle>
              <MenuSectionLinks>
                {routes
                  .filter(
                    (route) =>
                      route.navigation.mobile === true &&
                      route.section === "core",
                  )
                  .map((route) => (
                    <MenuSectionLink key={route.href} href={route.href}>
                      {route.icon ?? null}
                      {route.name}
                    </MenuSectionLink>
                  ))}
              </MenuSectionLinks>
            </MenuSection>

            <MenuSection type="authorized">
              <MenuSectionTitle>Admin Pages</MenuSectionTitle>
              <MenuSectionLinks>
                {routes
                  .filter(
                    (route) =>
                      route.navigation.mobile && route.section === "admin",
                  )
                  .map((route) => (
                    <MenuSectionLink key={route.href} href={route.href}>
                      {route.icon ?? null}
                      {route.name}
                    </MenuSectionLink>
                  ))}
              </MenuSectionLinks>
            </MenuSection>

            <MenuSection type="authenticated">
              <MenuSectionTitle>Account Pages</MenuSectionTitle>
              <MenuSectionLinks>
                {routes
                  .filter(
                    (route) =>
                      route.navigation.mobile && route.section === "auth",
                  )
                  .map((route) => (
                    <MenuSectionLink key={route.href} href={route.href}>
                      {route.icon ?? null}
                      {route.name}
                    </MenuSectionLink>
                  ))}
              </MenuSectionLinks>
            </MenuSection>
            <SheetClose asChild>
              <SignOutButton />
            </SheetClose>
          </div>
          <ScrollBar />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

// interface MenuSectionProps extends React.HTMLAttributes<HTMLDivElement> {
//   hidden?: boolean;
// }
// const MenuSection = (props: MenuSectionProps) => {
//   if (props.hidden) return null;
//   return <div className="py-4" {...props} />;
// };

const MenuSectionTitle = (
  props: React.HTMLAttributes<HTMLParagraphElement>,
) => {
  return (
    <p className="mb-2 px-4 text-lg font-semibold tracking-tight" {...props} />
  );
};

const MenuSectionLinks = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className="flex flex-col" {...props} />;
};

const MenuSectionLink = (
  props: LinkProps & React.HTMLAttributes<HTMLAnchorElement>,
) => {
  return (
    <SheetClose asChild>
      <Button variant="ghost" className="justify-start" asChild>
        <Link {...props} />
      </Button>
    </SheetClose>
  );
};
