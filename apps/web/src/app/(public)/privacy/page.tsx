import { privacy } from "@repo/content";
import { MarketingPageBase } from "../base";
import { typography } from "@repo/constants";

export default function PrivacyPolicyPage() {
  return (
    <>
      <MarketingPageBase {...privacy}>
        <div className='text-center mb-8'>
          <p className={typography.p}>
            <strong>Effective Date: </strong>
            {privacy.effectiveDate}
          </p>
          <p className={typography.small}>{privacy.p}</p>
        </div>
      </MarketingPageBase>
      <div className='mt-8'>
        <p className={typography.muted}>{privacy.disclaimer}</p>
      </div>
    </>
  );
}
