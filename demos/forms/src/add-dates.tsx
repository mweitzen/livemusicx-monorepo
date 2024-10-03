"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, addDays, isBefore, parseISO } from "date-fns";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@repo/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { Calendar } from "@repo/ui/components/calendar";
import { Checkbox } from "@repo/ui/components/checkbox";
import {
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  Check,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@repo/ui/helpers";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { Badge } from "@repo/ui/components/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { Progress } from "@repo/ui/components/progress";
import { Separator } from "@repo/ui/components/separator";
import { toast } from "@repo/ui/hooks/use-toast";

const addDatesSchema = z.object({
  eventId: z.string().min(1, "Please select an event"),
  dates: z
    .array(
      z.object({
        date: z.date({
          required_error: "Please select a date",
        }),
        startTime: z
          .string()
          .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Please enter a valid time in HH:MM format"
          ),
        endTime: z
          .string()
          .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Please enter a valid time in HH:MM format"
          ),
        isRecurring: z.boolean().default(false),
        recurrenceType: z.enum(["daily", "weekly", "monthly"]).optional(),
        recurrenceEnd: z.date().optional(),
        recurrenceFrequency: z.number().min(1).max(30).optional(),
      })
    )
    .min(1, "Please add at least one date"),
});

type AddDatesValues = z.infer<typeof addDatesSchema>;

// Mock data for existing events
const existingEvents = [
  { id: "1", name: "Summer Music Festival" },
  { id: "2", name: "Tech Conference 2023" },
  { id: "3", name: "Art Exhibition" },
];

export function AddDatesToEventForm({ onBack }: { onBack: () => void }) {
  const [selectedEventName, setSelectedEventName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<AddDatesValues>({
    resolver: zodResolver(addDatesSchema),
    defaultValues: {
      eventId: "",
      dates: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dates",
  });

  useEffect(() => {
    // Automatically move to the next step when an event is selected
    if (form.watch("eventId") && currentStep === 1) {
      nextStep();
    }
  }, [form.watch("eventId")]);

  function onSubmit(data: AddDatesValues) {
    setIsSubmitting(true);
    console.log(data);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Dates Added Successfully",
        description: "Your event dates have been updated.",
        duration: 5000,
      });
      onBack(); // Return to the previous screen after successful submission
    }, 2000);
  }

  const handleMultipleDatesSelect = (dates: Date[]) => {
    const newDates = dates.map((date) => ({
      date,
      startTime: "",
      endTime: "",
      isRecurring: false,
    }));
    form.setValue("dates", newDates);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecurringDates = (
    start: Date,
    end: Date,
    type: string,
    frequency: number
  ) => {
    const dates = [];
    let currentDate = start;
    while (isBefore(currentDate, end)) {
      dates.push(format(currentDate, "PPP"));
      switch (type) {
        case "daily":
          currentDate = addDays(currentDate, frequency);
          break;
        case "weekly":
          currentDate = addDays(currentDate, 7 * frequency);
          break;
        case "monthly":
          currentDate = new Date(
            currentDate.setMonth(currentDate.getMonth() + frequency)
          );
          break;
      }
    }
    return dates;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormField
            control={form.control}
            name='eventId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Event</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedEventName(
                      existingEvents.find((event) => event.id === value)
                        ?.name || ""
                    );
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select an event' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {existingEvents.map((event) => (
                      <SelectItem
                        key={event.id}
                        value={event.id}
                      >
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case 2:
        return (
          <>
            {selectedEventName && (
              <Alert className='mb-4'>
                <AlertTitle>Selected Event</AlertTitle>
                <AlertDescription>
                  Adding dates to: {selectedEventName}
                </AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name='dates'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Select Multiple Dates</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value?.length && "text-muted-foreground"
                          )}
                        >
                          {field.value?.length ? (
                            `${field.value.length} date${field.value.length > 1 ? "s" : ""} selected`
                          ) : (
                            <span>Pick dates</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-auto p-0'
                      align='start'
                    >
                      <Calendar
                        mode='multiple'
                        selected={field.value.map((d) => d.date)}
                        onSelect={(dates) =>
                          handleMultipleDatesSelect(dates || [])
                        }
                        numberOfMonths={1}
                      />
                      <Separator />
                      <div className='p-3'>
                        <FormField
                          control={form.control}
                          name='dates.0.isRecurring'
                          render={({ field }) => (
                            <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    if (checked) {
                                      form.setValue("dates", [
                                        form.getValues("dates")[0]!,
                                      ]);
                                    }
                                  }}
                                />
                              </FormControl>
                              <div className='space-y-1 leading-none'>
                                <FormLabel>Make Recurring</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ScrollArea className='h-[400px] rounded-md border p-4 mt-4'>
              <Accordion
                type='single'
                collapsible
                className='w-full'
              >
                {fields.map((field, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    key={field.id}
                  >
                    <AccordionTrigger>
                      <div className='flex items-center space-x-2'>
                        <Badge variant='outline'>
                          {format(field.date, "PPP")}
                        </Badge>
                        {field.isRecurring && <Badge>Recurring</Badge>}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='space-y-4 p-4'>
                        <div className='grid grid-cols-2 gap-4'>
                          <FormField
                            control={form.control}
                            name={`dates.${index}.startTime`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                  <Input
                                    type='time'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`dates.${index}.endTime`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Time</FormLabel>
                                <FormControl>
                                  <Input
                                    type='time'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {form.watch(`dates.${index}.isRecurring`) && (
                          <div className='space-y-4'>
                            <FormField
                              control={form.control}
                              name={`dates.${index}.recurrenceType`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Recurrence Type</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder='Select recurrence type' />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value='daily'>
                                        Daily
                                      </SelectItem>
                                      <SelectItem value='weekly'>
                                        Weekly
                                      </SelectItem>
                                      <SelectItem value='monthly'>
                                        Monthly
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`dates.${index}.recurrenceFrequency`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Recurrence Frequency</FormLabel>
                                  <FormControl>
                                    <Input
                                      type='number'
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(e.target.valueAsNumber)
                                      }
                                      min={1}
                                      max={30}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`dates.${index}.recurrenceEnd`}
                              render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                  <FormLabel>Recurrence End Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value &&
                                              "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick an end date</span>
                                          )}
                                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className='w-auto p-0'
                                      align='start'
                                    >
                                      <Calendar
                                        mode='single'
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date <= new Date() ||
                                          date <=
                                            form.getValues(
                                              `dates.${index}.date`
                                            )
                                        }
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </>
        );
      case 3:
        return (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Summary</h3>
            <p>
              <strong>Event:</strong> {selectedEventName}
            </p>
            <h4 className='font-medium'>Dates:</h4>
            <ScrollArea className='h-[400px] rounded-md border p-4'>
              <ul className='list-disc pl-5 space-y-4'>
                {fields.map((field, index) => (
                  <li key={field.id}>
                    {field.isRecurring ? (
                      <>
                        <span className='font-semibold'>
                          {format(field.date, "PPP")} -{" "}
                          {field.recurrenceEnd
                            ? format(field.recurrenceEnd, "PPP")
                            : "Ongoing"}
                        </span>
                        <span className='block'>
                          {field.startTime} - {field.endTime}
                        </span>
                        <span className='block text-sm text-muted-foreground'>
                          Recurring {field.recurrenceType}, every{" "}
                          {field.recurrenceFrequency} {field.recurrenceType}(s)
                        </span>
                        <ul className='list-disc pl-5 mt-2'>
                          {generateRecurringDates(
                            field.date,
                            field.recurrenceEnd || new Date(2099, 11, 31),
                            field.recurrenceType!,
                            field.recurrenceFrequency!
                          ).map((date, i) => (
                            <li key={i}>{date}</li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <>
                        <span className='font-semibold'>
                          {format(field.date, "PPP")}
                        </span>
                        <span className='block'>
                          {field.startTime} - {field.endTime}
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          Add Dates to Existing Event
        </CardTitle>
        <CardDescription>
          Add new dates or recurring events to an existing event
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='mb-8'>
          <Progress
            value={(currentStep / 3) * 100}
            className='w-full'
          />
          <div className='flex justify-between mt-2 text-sm text-muted-foreground'>
            <span className={cn(currentStep === 1 && "font-bold")}>
              Select Event
            </span>
            <span className={cn(currentStep === 2 && "font-bold")}>
              Add Dates
            </span>
            <span className={cn(currentStep === 3 && "font-bold")}>Review</span>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            {renderStepContent()}
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        {currentStep > 1 ? (
          <Button
            type='button'
            variant='outline'
            onClick={prevStep}
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back
          </Button>
        ) : (
          <Button
            type='button'
            variant='outline'
            onClick={onBack}
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Cancel
          </Button>
        )}
        {currentStep < 3 ? (
          <Button
            type='button'
            onClick={nextStep}
            disabled={
              (currentStep === 1 && !form.getValues("eventId")) ||
              (currentStep === 2 && form.getValues("dates").length === 0)
            }
          >
            Next
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        ) : (
          <Button
            type='submit'
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Dates..." : "Confirm and Add Dates"}
            <Check className='ml-2 h-4 w-4' />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
