import * as content from "~/content/privacy";
import { MarketingPageBase } from "../base";
import { typography } from "~/constants/typography";

export default function PrivacyPolicyPage() {
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
      <div className='mt-8'>
        <p className={typography.muted}>{content.disclaimer}</p>
      </div>
    </>
  );
}
