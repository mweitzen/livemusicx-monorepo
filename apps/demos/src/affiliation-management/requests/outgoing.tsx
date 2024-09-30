import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

export const OutgoingAffiliateRequests = () => {
  return <div>OutgoingAffiliateRequests</div>;
};

export const RequestAffiliation = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Request Affiliation</Button>
      </DialogTrigger>
      <DialogContent>
        <div>Request Affiliation</div>
      </DialogContent>
    </Dialog>
  );
};
