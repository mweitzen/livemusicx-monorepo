import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { routes } from "@/routes";

import Brand from "@/components/shared/brand";

import { ModeToggle } from "./mode-toggle";
import { MobileMenu } from "./menu-mobile";
import { DashboardButton } from "./dashboard-button";

const navigationSpacerClass = "pt-14";

const Navigation = () => {
  return (
    <header className="h-14 bg-header/50 fixed inset-x-0 top-0 z-40 border-b border-border/50 backdrop-blur-md">
      <div className="h-full container flex max-w-screen-2xl items-center justify-between px-4 py-2 md:px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Brand />
        </div>

        <nav className="hidden lg:flex lg:gap-x-2">
          {routes
            .filter((route) => route.navigation.main)
            .map((route) => (
              <NavigationLink
                key={route.name}
                href={route.href}
                className="text-sm font-semibold"
              >
                {route.name}
              </NavigationLink>
            ))}
        </nav>

        <div className="flex flex-1 justify-end gap-2">
          <ModeToggle />
          <MobileMenu />
          <span className="hidden lg:inline">
            <DashboardButton />
          </span>
        </div>
      </div>
    </header>
  );
};

type NavigationLinkProps = LinkProps & React.HTMLAttributes<HTMLAnchorElement>;
const NavigationLink = ({ className, children, ...props }: NavigationLinkProps) => {
  return (
    <Link
      className={cn(
        "rounded-full bg-background/30 px-1 md:px-4 py-1 hover:bg-background/90",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export { Navigation, NavigationLink, navigationSpacerClass };
