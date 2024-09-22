import { cn } from "@repo/ui/helpers";

export default function Topbar({
  children,
}: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        "border-b border-border/50",
        "bg-background/50",
        "backdrop-blur"
      )}
    >
      <div
        className={cn(
          "flex gap-1 items-center flex-nowrap",
          "h-navigation px-gutter md:px-4"
        )}
      >
        {children}
      </div>
    </header>
  );
}
