import * as content from "~/lib/content/terms";
import { MarketingPageBase } from "../base";
import {
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from "~/components/shared/typography";

export default function TermsAndConditionsPage() {
  return (
    <>
      <MarketingPageBase {...content}>
        <div className="mb-8 text-center">
          <TypographyP>
            <strong>Effective Date: </strong>
            {content.effectiveDate}
          </TypographyP>
          <TypographySmall>{content.p}</TypographySmall>
        </div>
      </MarketingPageBase>
      <div className="mt-8 text-center">
        <TypographyMuted>{content.disclaimer}</TypographyMuted>
        <TypographySmall>{content.contact}</TypographySmall>
      </div>
    </>
  );
}
