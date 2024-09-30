"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  Check,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";

// Define the schema for template variables
const templateVariableSchema = z.object({
  name: z.string(),
  type: z.enum(["text", "number", "date", "time", "boolean", "select"]),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
});

// Define the schema for event templates
const eventTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  variables: z.array(templateVariableSchema),
});

// Define the schema for the form
const eventSchema = z.object({
  templateId: z.string().min(1, "Please select a template"),
  eventName: z.string().min(3, "Event name must be at least 3 characters"),
  eventDate: z.date({
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
  location: z.string().min(1, "Please enter a location"),
  description: z.string().optional(),
  isPublic: z.boolean().default(true),
  ticketPrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid price")
    .optional(),
  capacity: z.string().regex(/^\d+$/, "Please enter a valid number").optional(),
  variables: z.record(z.string(), z.any()).optional(),
});

type EventTemplate = z.infer<typeof eventTemplateSchema>;
type EventValues = z.infer<typeof eventSchema>;

// Mock data for event templates with variables
const eventTemplates: EventTemplate[] = [
  {
    id: "1",
    name: "Music Concert",
    description:
      "A template for music concerts with stage setup and sound equipment.",
    variables: [
      { name: "artistName", type: "text", required: true },
      {
        name: "genre",
        type: "select",
        required: true,
        options: ["Rock", "Pop", "Jazz", "Classical", "Electronic"],
      },
      { name: "openingAct", type: "text", required: false },
      { name: "ticketSaleStartDate", type: "date", required: true },
    ],
  },
  {
    id: "2",
    name: "Tech Conference",
    description:
      "A template for technology conferences with multiple tracks and speaker sessions.",
    variables: [
      { name: "conferenceTopic", type: "text", required: true },
      { name: "numberOfTracks", type: "number", required: true },
      { name: "keynoteStartTime", type: "time", required: true },
      { name: "virtualAttendanceOption", type: "boolean", required: true },
    ],
  },
  {
    id: "3",
    name: "Art Exhibition",
    description:
      "A template for art exhibitions with gallery layout and artwork display options.",
    variables: [
      { name: "exhibitionTheme", type: "text", required: true },
      { name: "numberOfArtists", type: "number", required: true },
      { name: "isInteractive", type: "boolean", required: false },
      {
        name: "exhibitionStyle",
        type: "select",
        required: true,
        options: ["Modern", "Contemporary", "Classical", "Mixed Media"],
      },
    ],
  },
];

export function CreateEventFromTemplate({ onBack }: { onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<EventTemplate | null>(null);

  const form = useForm<EventValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      templateId: "",
      eventName: "",
      eventDate: new Date(),
      startTime: "",
      endTime: "",
      location: "",
      description: "",
      isPublic: true,
      ticketPrice: "",
      capacity: "",
      variables: {},
    },
    mode: "onChange", // This enables real-time validation
  });

  const {
    control,
    watch,
    setValue,
    formState: { errors, isValid },
  } = form;

  useEffect(() => {
    const templateId = watch("templateId");
    const template = eventTemplates.find((t) => t.id === templateId);
    setSelectedTemplate(template || null);

    if (template) {
      const variables: Record<string, any> = {};
      template.variables.forEach((v) => {
        variables[v.name] = v.type === "boolean" ? false : "";
      });
      setValue("variables", variables);
    }
  }, [watch("templateId"), setValue]);

  function onSubmit(data: EventValues) {
    setIsSubmitting(true);
    console.log(data);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Event Created Successfully",
        description: "Your event has been created from the template.",
        duration: 5000,
      });
      onBack(); // Return to the previous screen after successful submission
    }, 2000);
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderVariableInput = (
    variable: z.infer<typeof templateVariableSchema>,
    index: number
  ) => {
    const fieldName = `variables.${variable.name}` as const;

    return (
      <FormField
        key={variable.name}
        control={control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {variable.name}
              {variable.required && "*"}
            </FormLabel>
            <FormControl>
              {variable.type === "text" && <Input {...field} />}
              {variable.type === "number" && (
                <Input
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              )}
              {variable.type === "date" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
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
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
              {variable.type === "time" && (
                <Input
                  type='time'
                  {...field}
                />
              )}
              {variable.type === "boolean" && (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
              {variable.type === "select" && variable.options && (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${variable.name}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {variable.options.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormField
            control={control}
            name='templateId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Event Template</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Choose a template' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {eventTemplates.map((template) => (
                      <SelectItem
                        key={template.id}
                        value={template.id}
                      >
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {selectedTemplate?.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case 2:
        return (
          <>
            <FormField
              control={control}
              name='eventName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter event name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='eventDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={control}
                name='startTime'
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
                control={control}
                name='endTime'
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
          </>
        );
      case 3:
        return (
          <>
            <FormField
              control={control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter event location'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter event description'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='isPublic'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Public Event</FormLabel>
                    <p className='text-sm text-muted-foreground'>
                      This event will be visible to all users
                    </p>
                  </div>
                </FormItem>
              )}
            />
            {selectedTemplate && (
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Template Variables</h3>
                {selectedTemplate.variables.map((variable, index) =>
                  renderVariableInput(variable, index)
                )}
              </div>
            )}
          </>
        );
      case 4:
        return (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Event Summary</h3>
            <ScrollArea className='h-[300px] rounded-md border p-4'>
              <dl className='space-y-2'>
                <div>
                  <dt className='font-medium'>Template:</dt>
                  <dd>{selectedTemplate?.name}</dd>
                </div>
                <div>
                  <dt className='font-medium'>Event Name:</dt>
                  <dd>{watch("eventName")}</dd>
                </div>
                <div>
                  <dt className='font-medium'>Date:</dt>
                  <dd>{format(watch("eventDate"), "PPP")}</dd>
                </div>
                <div>
                  <dt className='font-medium'>Time:</dt>
                  <dd>
                    {watch("startTime")} - {watch("endTime")}
                  </dd>
                </div>
                <div>
                  <dt className='font-medium'>Location:</dt>
                  <dd>{watch("location")}</dd>
                </div>
                <div>
                  <dt className='font-medium'>Description:</dt>
                  <dd>{watch("description")}</dd>
                </div>
                <div>
                  <dt className='font-medium'>Visibility:</dt>
                  <dd>{watch("isPublic") ? "Public" : "Private"}</dd>
                </div>
                {selectedTemplate && (
                  <div>
                    <dt className='font-medium'>Template Variables:</dt>
                    <dd>
                      <ul className='list-disc pl-5'>
                        {selectedTemplate.variables.map((variable) => (
                          <li key={variable.name}>
                            {variable.name}:{" "}
                            {watch(`variables.${variable.name}`)}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </ScrollArea>
          </div>
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!watch("templateId");
      case 2:
        return (
          !!watch("eventName") &&
          !!watch("eventDate") &&
          !!watch("startTime") &&
          !!watch("endTime")
        );
      case 3:
        return !!watch("location");
      default:
        return true;
    }
  };

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>
          Create Event from Template
        </CardTitle>
        <CardDescription>
          Use a pre-defined template to quickly create your event
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='mb-8'>
          <Progress
            value={(currentStep / 4) * 100}
            className='w-full'
          />
          <div className='flex justify-between mt-2 text-sm text-muted-foreground'>
            <span className={cn(currentStep === 1 && "font-bold")}>
              Template
            </span>
            <span className={cn(currentStep === 2 && "font-bold")}>
              Basic Info
            </span>
            <span className={cn(currentStep === 3 && "font-bold")}>
              Details
            </span>
            <span className={cn(currentStep === 4 && "font-bold")}>Review</span>
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
        {currentStep < 4 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    type='button'
                    onClick={nextStep}
                    disabled={!isStepValid()}
                  >
                    Next
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {!isStepValid() && "Please fill in all required fields"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            type='submit'
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "Creating Event..." : "Create Event"}
            <Check className='ml-2 h-4 w-4' />
          </Button>
        )}
      </CardFooter>
      {Object.keys(errors).length > 0 && (
        <Alert
          variant='destructive'
          className='mt-4'
        >
          <AlertTriangle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Please correct the following errors:
            <ul className='list-disc pl-5 mt-2'>
              {Object.entries(errors).map(([key, error]) => (
                <li key={key}>{error.message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
}
