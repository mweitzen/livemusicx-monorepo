import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@repo/ui/components/dialog";
export const MessagesDemoPage = () => {
  return (
    <div>
      <h1>Messages Demo Page</h1>
      <Button>Does it work</Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Dialog</Button>
        </DialogTrigger>
        <DialogContent>Hello</DialogContent>
      </Dialog>
    </div>
  );
};
