import * as content from "~/lib/content/privacy";
import { MarketingPageBase } from "../base";
import {
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from "~/components/shared/typography";

export default function PrivacyPolicyPage() {
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
      <div className="mt-8">
        <TypographyMuted>{content.disclaimer}</TypographyMuted>
      </div>
    </>
  );
}
