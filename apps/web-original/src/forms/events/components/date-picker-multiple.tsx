import { z } from "zod";
import { cn } from "@/lib/utils";
import { useFormContext, useWatch } from "react-hook-form";
import { AddDatesFormSchema } from "@/forms/events/create-add-dates";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDaysIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export const DatePickerMultiple = () => {
  const { setValue } = useFormContext();

  const dates = useWatch<z.infer<typeof AddDatesFormSchema>, "selectedDates">({
    name: "selectedDates",
  });

  return (
    <div className="grid gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !dates && "text-muted-foreground"
            )}
          >
            <CalendarDaysIcon className="mr-2 h-4 w-4" />
            <span>Select dates</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-auto p-6">
          <p className="tracking-tight font-semibold">Select Dates</p>
          <div className="rounded-md border">
            <Calendar
              mode="multiple"
              selected={dates}
              onSelect={(newDates) => setValue("selectedDates", newDates)}
              initialFocus
              fixedWeeks
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setValue("selectedDates", undefined);
              }}
            >
              Clear
            </Button>
            <DialogClose asChild>
              <Button size="sm">Done</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <Separator className="my-2" />
      {dates && dates.length
        ? dates
            .sort((a, b) => a.getTime() - b.getTime())
            .map((date) => (
              <div
                key={date.toISOString()}
                className="rounded-md bg-primary-foreground text-primary-background p-4 flex justify-between items-center"
              >
                <span>{date.toLocaleDateString()}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setValue(
                      "selectedDates",
                      dates.filter((d) => d !== date)
                    );
                  }}
                >
                  <XMarkIcon className="h-4 w-4" />
                </Button>
              </div>
            ))
        : "No dates selected"}
    </div>
  );
};
