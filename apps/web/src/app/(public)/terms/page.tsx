import * as content from "~/content/terms";
import { MarketingPageBase } from "../base";
import { typography } from "~/constants/typography";

export default function TermsAndConditionsPage() {
  return (
    <>
      <MarketingPageBase {...content}>
        <div className='text-center mb-8'>
          <p className={typography.p}>
            <strong>Effective Date: </strong>
            {content.effectiveDate}
          </p>
          <p className={typography.small}>{content.p}</p>
        </div>
      </MarketingPageBase>
      <div className='text-center mt-8'>
        <p className={typography.muted}>{content.disclaimer}</p>
        <p className={typography.small}>
          {content.p}
          {content.contact}
        </p>
      </div>
    </>
  );
}
