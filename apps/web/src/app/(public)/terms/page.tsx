import { MarketingPageBase } from "../base";
import { typography } from "@repo/constants";
import { termsAndConditions } from "@repo/content";

export default function TermsAndConditionsPage() {
  return (
    <>
      <MarketingPageBase {...termsAndConditions}>
        <div className='text-center mb-8'>
          <p className={typography.p}>
            <strong>Effective Date: </strong>
            {termsAndConditions.effectiveDate}
          </p>
          <p className={typography.small}>{termsAndConditions.p}</p>
        </div>
      </MarketingPageBase>
      <div className='text-center mt-8'>
        <p className={typography.muted}>{termsAndConditions.disclaimer}</p>
        <p className={typography.small}>
          {termsAndConditions.p}
          {termsAndConditions.contact}
        </p>
      </div>
    </>
  );
}
