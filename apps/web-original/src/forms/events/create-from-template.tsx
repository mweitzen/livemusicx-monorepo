"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@repo/ui/components/form";
import {
  FormStep,
  FormStepContent,
  FormStepDescription,
  FormStepHeader,
  FormStepTitle,
} from "~/components/admin/form-step";

import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Button } from "@repo/ui/components/button";
import { Textarea } from "@repo/ui/components/textarea";

const FromTemplateFormSchema = z.object({
  templateId: z.string(),
});

export const FromTemplateForm = () => {
  const [templateInfoAdded, setTemplateInfoAdded] = useState(false);

  const form = useForm<z.infer<typeof FromTemplateFormSchema>>({
    resolver: zodResolver(FromTemplateFormSchema),
    defaultValues: {
      templateId: "",
    },
  });

  function onSubmit(data: z.infer<typeof FromTemplateFormSchema>) {
    console.log(data);
  }
  const templateId = form.watch("templateId");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormStep display={!templateId}>
          <FormStepHeader>
            <FormStepTitle>Select Template</FormStepTitle>
            <FormStepDescription>
              Choose a template to generate pre-populated info
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={() => form.setValue("templateId", "1")}
                >
                  Template 1
                </Button>
                <Button
                  variant="outline"
                  onClick={() => form.setValue("templateId", "1")}
                >
                  Template 2
                </Button>
                <Button
                  variant="outline"
                  onClick={() => form.setValue("templateId", "1")}
                >
                  Template 3
                </Button>
              </div>
            </div>
          </FormStepContent>
        </FormStep>
        <FormStep display={!!templateId && !templateInfoAdded}>
          <FormStepHeader>
            <FormStepTitle>Populate Template Variables</FormStepTitle>
            <FormStepDescription>
              Fill in the variables for the selected template
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <div className="space-y-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input
                type="text"
                name="event-name"
                placeholder="Event Name"
                className="w-full rounded-md border p-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-description">Event Description</Label>
              <Textarea
                name="event-description"
                placeholder="Enter a description for your event"
                className="w-full rounded-md border p-3"
              />
            </div>
            <Button onClick={() => setTemplateInfoAdded(true)}>Next</Button>
          </FormStepContent>
        </FormStep>
        <FormStep display={!!templateId && templateInfoAdded}>
          <FormStepHeader>
            <FormStepTitle>Populate Remaining Information</FormStepTitle>
            <FormStepDescription>
              Fill in the remaining information for the event
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <Button type="submit">Submit</Button>
          </FormStepContent>
        </FormStep>
      </form>
    </Form>
  );
};
