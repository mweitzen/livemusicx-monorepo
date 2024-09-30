import { socialSites, type SocialSite } from "@repo/constants";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";

export const AddSocialAccount = ({ site }: { site: SocialSite }) => {
  return (
    <div className="space-y-2">
      <Label>{socialSites[site].name}</Label>
      <div className="flex gap-1">
        <Input
          name={`social-${socialSites[site].name}`}
          placeholder={`${socialSites[site].baseUrl}[ID]`}
        />
        <Button variant="outline">Connect</Button>
      </div>
    </div>
  );
};
