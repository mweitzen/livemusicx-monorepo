import { cn } from "@repo/ui/helpers";

const typography = {
  h1: "text-4xl font-bold tracking-tight lg:text-5xl",
  h2: "border-b mt-12 pb-2 text-2xl font-semibold tracking-tight first:mt-0",
  h3: "mt-8 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  blockquote: "border-l-2 pl-6 italic",
  lead: "text-lg sm:text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
};

const TypographyH1 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h1 className={cn(typography.h1, className)} {...props} />;
};

const TypographyH2 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h2 className={cn(typography.h2, className)} {...props} />;
};

const TypographyH3 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h3 className={cn(typography.h3, className)} {...props} />;
};

const TypographyP = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <p className={cn(typography.p, className)} {...props} />;
};

const TypographyBlockquote = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) => {
  return (
    <blockquote className={cn(typography.blockquote, className)} {...props} />
  );
};

const TypographyLead = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <p className={cn(typography.lead, className)} {...props} />;
};

const TypographyLarge = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn(typography.large, className)} {...props} />;
};

const TypographySmall = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <small className={cn(typography.small, className)} {...props} />;
};

const TypographyMuted = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <p className={cn(typography.muted, className)} {...props} />;
};

export {
  typography,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyLead,
  TypographyP,
  TypographyBlockquote,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
};
