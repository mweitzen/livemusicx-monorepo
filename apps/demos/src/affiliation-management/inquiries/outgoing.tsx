import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "~/components/ui/dialog";
import { LinkIcon } from "@heroicons/react/20/solid";
import { cn } from "~/lib/utils";

type InquiryStatus = "unread" | "read" | "response" | "archived";

interface OutgoingInquiry {
  from: string; // user id
  to: string; // user id
  message: string;
  referenceLinks: string[];
  status: InquiryStatus;
  sentOn: Date;
  readOn: Date;
  responseOn: Date;
  archivedOn: Date;
  responseId: string; // id of the response
}

type InquiryPriority = "high" | "medium" | "low" | undefined;
interface IncomingInquiry extends OutgoingInquiry {
  priority: InquiryPriority;
}

export const OutgoingInquiries = () => {
  return (
    <div>
      <p>Outgoing Inquiries</p>
      <div className='flex flex-col'>
        <Button
          variant='outline'
          className='justify-between p-6'
        >
          <div>
            <p>
              You sent inquiry to:{" "}
              <span className='font-semibold'>John Doe</span>
            </p>
            <p>
              Date: <span className='font-semibold'>2021-07-01</span>
            </p>
          </div>
          <div>
            <p>Status</p>
            <Badge variant='outline'>Unread</Badge>
          </div>
        </Button>
        <Button
          variant='outline'
          className='justify-between p-6'
        >
          <div>
            <p>
              You sent inquiry to:{" "}
              <span className='font-semibold'>John Doe</span>
            </p>
            <p>
              Date: <span className='font-semibold'>2021-07-01</span>
            </p>
          </div>
          <div>
            <p>Status</p>
            <Badge variant='outline'>Read</Badge>
          </div>
        </Button>
        <Button
          variant='outline'
          className='justify-between p-6'
        >
          <div>
            <p>
              You sent inquiry to:{" "}
              <span className='font-semibold'>John Doe</span>
            </p>
            <p>
              Date: <span className='font-semibold'>2021-07-01</span>
            </p>
          </div>
          <div>
            <p>Status</p>
            <Badge>Response</Badge>
          </div>
        </Button>
      </div>
    </div>
  );
};

export const SendInquiry = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Send Inquiry</Button>
      </DialogTrigger>
      <DialogContent>
        <div>Send Inquiry</div>

        <QuickResponseTextarea />

        {/* up to three links to video/recorded content */}
        <ReferenceLink />
        <ReferenceLink />
        <ReferenceLink />
        <DialogClose asChild>
          <Button>Send</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export const QuickResponseTextarea = () => {
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacterCount = 240;
  const warningCharacterCount = 260;
  return (
    <>
      <Label>
        Message{" "}
        <span className='text-muted-foreground'>
          (
          <span
            className={cn(
              characterCount > maxCharacterCount &&
                characterCount < warningCharacterCount &&
                "font-semibold text-yellow-500",
              characterCount >= warningCharacterCount &&
                "font-bold text-red-500"
            )}
          >
            {characterCount}
          </span>
          /{maxCharacterCount})
        </span>
        <Textarea
          className='resize-none'
          rows={5}
          onChange={(e) =>
            setCharacterCount(e.target.value.split(" ").join("").length)
          }
        />
      </Label>
      <p className='text-sm text-muted-foreground'>
        Hint: Keep your message short and to the point. The recipient will be
        able to view your profile.
      </p>
    </>
  );
};
export const ReferenceLink = () => {
  return (
    <Label>
      <span className='flex gap-1 items-center'>
        <LinkIcon className='h-4 w-4' /> Reference Link
      </span>
      <Input />
    </Label>
  );
};
