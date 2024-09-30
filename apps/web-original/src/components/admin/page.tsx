import { cn } from "@repo/ui/helpers";
import { TypographyH1, TypographyLead } from "../shared/typography";

export const AdminPageHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={cn("py-4 text-center", className)} />
);

export const AdminPageTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <TypographyH1 {...props} className={cn("", className)} />
);

export const AdminPageDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <TypographyLead {...props} className={cn("", className)} />
);
