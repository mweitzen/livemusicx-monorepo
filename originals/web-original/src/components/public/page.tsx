import Link, { type LinkProps } from "next/link";
import { TypographyH1, TypographyLead } from "../shared/typography";

const PageHeader = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <section
      className="mx-auto flex max-w-3xl flex-col items-center gap-2 py-8 text-center md:py-12 lg:py-24"
      {...props}
    />
  );
};

const PageTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <TypographyH1 {...props} />;
};

const PageDescription = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <TypographyLead {...props} />;
};

const HomepageTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1
      className="text-center text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-6xl lg:leading-[1.1]"
      {...props}
    />
  );
};

const HomepageDescription = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className="inline-block max-w-xl text-center align-top text-lg text-muted-foreground sm:text-xl"
      {...props}
    />
  );
};

const HomepageCTA = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="flex w-full items-center justify-center space-x-4 py-2 md:pb-10"
      {...props}
    />
  );
};

const Disclaimer = (props: LinkProps & React.HTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      className="mb-1 inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
      {...props}
    />
  );
};

export {
  PageHeader,
  PageTitle,
  PageDescription,
  HomepageTitle,
  HomepageDescription,
  HomepageCTA,
  Disclaimer,
};
