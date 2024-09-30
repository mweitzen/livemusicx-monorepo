import { Fragment } from "react";
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "~/components/public/page";
import { TypographyH2, TypographyP } from "~/components/shared/typography";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";

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
      <PageHeader>
        <PageTitle>{title}</PageTitle>
        <PageDescription>{description}</PageDescription>
      </PageHeader>
      {children ?? null}
      {sections.map((section, index) => (
        <Fragment key={index}>
          <TypographyH2 className={index === 0 ? "mt-0" : ""}>
            {section.header}
          </TypographyH2>
          <SectionContent content={section.content} />
          <MarketingSectionList
            ordered={section.ordered ?? false}
            list={section.list}
          />
          <CTAButton cta={section.cta} ctaLink={section.ctaLink} />
          {/* {section.image && (
              <img
                src={section.image}
                alt={section.imageAlt}
                style={{ float: section.imagePosition }}
              />
            )} */}
        </Fragment>
      ))}
    </>
  );
}

const SectionContent = ({
  content,
}: Pick<MarketingSectionProps, "content">) => {
  if (!content) return null;

  return <TypographyP>{content}</TypographyP>;
};

const CTAButton = ({
  cta,
  ctaLink,
}: Pick<MarketingSectionProps, "cta" | "ctaLink">) => {
  if (!cta || !ctaLink) return null;

  return (
    <div className="py-4">
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
      <ol className="list-letter ml-6 list-inside space-y-2 py-6 [&>li]:mt-2">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="ml-6 list-inside list-disc space-y-2 py-6 [&>li]:mt-2">
      {list.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};
