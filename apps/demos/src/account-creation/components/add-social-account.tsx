import { socialSites, type SocialSite } from "../lib/social-sites";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
