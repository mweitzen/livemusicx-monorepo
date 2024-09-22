import { Fragment } from "react";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import { typography } from "~/constants/typography";
import { cn } from "@repo/ui/helpers";

interface MarketingSectionProps {
  header: string;
  content?: string;
  list?: string[] | undefined;
  ordered?: boolean;
  cta?: string;
  ctaLink?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
}
interface MarketingPageProps {
  title: string;
  description: string;
  sections: MarketingSectionProps[];
  children?: React.ReactNode;
}

export function MarketingPageBase({
  title,
  description,
  sections,
  children,
}: MarketingPageProps) {
  return (
    <>
      <section className='mx-auto flex max-w-3xl flex-col items-center gap-2 py-8 text-center md:py-12 lg:py-24'>
        <h1 className={typography.h1}>{title}</h1>
        <p className={typography.lead}>{description}</p>
      </section>
      {children ?? null}
      {sections.map((section, index) => (
        <Fragment key={index}>
          <h2 className={cn(typography.h2, index === 0 && "mt-0")}>
            {section.header}
          </h2>
          <SectionContent content={section.content} />
          <MarketingSectionList
            ordered={section.ordered ?? false}
            list={section.list}
          />
          <CTAButton
            cta={section.cta}
            ctaLink={section.ctaLink}
          />
        </Fragment>
      ))}
    </>
  );
}

const SectionContent = ({
  content,
}: Pick<MarketingSectionProps, "content">) => {
  if (!content) return null;

  return <p className={typography.p}>{content}</p>;
};

const CTAButton = ({
  cta,
  ctaLink,
}: Pick<MarketingSectionProps, "cta" | "ctaLink">) => {
  if (!cta || !ctaLink) return null;

  return (
    <div className='py-4'>
      <Button asChild>
        <Link href={ctaLink}>{cta}</Link>
      </Button>
    </div>
  );
};

const MarketingSectionList = ({
  ordered,
  list,
}: Pick<MarketingSectionProps, "ordered" | "list">) => {
  if (!list || list.length === 0) return null;

  if (ordered) {
    return (
      <ol className='ml-6 list-inside list-letter space-y-2 py-6 [&>li]:mt-2'>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    );
  }
  return (
    <ul className='ml-6 list-inside list-disc space-y-2 py-6 [&>li]:mt-2'>
      {list.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};
