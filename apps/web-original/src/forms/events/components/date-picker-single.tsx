import { cn } from "@repo/ui/helpers";
import { format } from "date-fns";
import { useState } from "react";

import { Button } from "@repo/ui/components/button";
import { Calendar } from "@repo/ui/components/calendar";
import { CalendarIcon } from "@heroicons/react/20/solid";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@repo/ui/components/dialog";

export const DatePicker = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto p-6">
        <p className="font-semibold tracking-tight">Select a Date</p>
        <div className="rounded-md border">
          <Calendar
            mode={"single"}
            selected={date}
            onSelect={setDate}
            initialFocus
            fixedWeeks
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDate(undefined);
              }}
            >
              Clear
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button size="sm">Done</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
