"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateOrganizerInputSchema } from "~/lib/schema/accounts/organizers";

import {
  FormStep,
  FormStepContent,
  FormStepDescription,
  FormStepHeader,
  FormStepTitle,
} from "~/components/admin/form-step";
import { Form } from "@repo/ui/components/form";
import { Button } from "@repo/ui/components/button";

// feature specific components
import { SelectGenres } from "~/components/shared/select-genres";
import { AboutTextarea } from "./components/about-textarea";
import { UnclaimedAccountSearch } from "./components/unclaimed-search";
import { AvatarUpload } from "./components/avatar-upload";

const FormSchema = CreateOrganizerInputSchema.extend({
  createType: z.enum(["create", "claim"]).nullable(),
});

export const CreateOrganizerForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      avatar: "",
      about: "",
      genres: [],
      createType: null,
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  const createType = form.watch("createType");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormStep display={!createType}>
          <FormStepHeader>
            <FormStepTitle>Enter Organizer Name</FormStepTitle>
            <FormStepDescription>
              Enter a publicly displayed name for your organizer account.
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <UnclaimedAccountSearch type="organizer" />
          </FormStepContent>
        </FormStep>
        <FormStep display={!!createType}>
          <FormStepHeader>
            <FormStepTitle>Create Organizer Account</FormStepTitle>
            <FormStepDescription>
              First, enter the basic information for your account
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <AvatarUpload />
            <AboutTextarea />
            <SelectGenres />
            <Button className="w-full" type="submit">
              Submit (Test)
            </Button>
          </FormStepContent>
        </FormStep>
      </form>
    </Form>
  );
};
