"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateMusicianInputSchema,
  defaultCreateMusicianValues,
} from "~/lib/schema/accounts/musicians";

import {
  FormStep,
  FormStepContent,
  FormStepDescription,
  FormStepHeader,
  FormStepTitle,
} from "~/components/admin/form-step";
import { Form } from "@repo/ui/components/form";
import { Button } from "@repo/ui/components/button";

// feature specific imports
import { SelectGenres } from "~/components/shared/select-genres";
import { AvatarUpload } from "./components/avatar-upload";
import { AboutTextarea } from "./components/about-textarea";
import { UnclaimedAccountSearch } from "./components/unclaimed-search";
import { capitalize } from "@repo/utils";
import { api } from "@repo/trpc/react";

const FormSchema = CreateMusicianInputSchema.extend({
  performerType: z.enum(["musician", "group"]).nullable(),
  createType: z.enum(["create", "claim"]).nullable(),
});

export const CreatePerformerForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      performerType: null,
      createType: null,
      ...defaultCreateMusicianValues,
    },
  });

  const performerType = form.watch("performerType");
  const createType = form.watch("createType");

  const { mutate: createMusician, status } =
    api.v1.accounts.musicians.createAccount.useMutation({
      onSuccess: (data) => {
        console.log(data);
      },
    });
  const { mutate: claimMusician, status: claimStatus } =
    api.v1.accounts.musicians.claimAccount.useMutation({
      onSuccess: (data) => {
        console.log(data);
      },
    });
  const { mutate: createGroup, status: groupStatus } =
    api.v1.accounts.groups.createAccount.useMutation({
      onSuccess: (data) => {
        console.log(data);
      },
    });
  const { mutate: claimGroup, status: claimGroupStatus } =
    api.v1.accounts.groups.claimAccount.useMutation({
      onSuccess: (data) => {
        console.log(data);
      },
    });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (!values.performerType || !values.createType) {
      return console.log("SLIPPED THROUGH VALIDATION");
    }

    if (values.performerType === "musician") {
      if (values.createType === "create") {
        console.log("CREATE MUSICIAN: ", values);
        // createMusician(values);
      } else {
        console.log("CLAIM MUSICIAN: ", values);
        // claimMusician({ id: "", data: values });
      }
    } else if (values.performerType === "group") {
      if (values.createType === "create") {
        console.log("CREATE GROUP: ", values);
        // createGroup(values);
      } else {
        console.log("CLAIM GROUP: ", values);
        // claimGroup({ id: "", data: values });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onError={(e) => console.log(e)}
      >
        <FormStep display={!performerType}>
          <FormStepHeader>
            <FormStepTitle>Select Performer Type</FormStepTitle>
            <FormStepDescription>
              Select which type of performer account you would like to create
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => form.setValue("performerType", "musician")}
              >
                Musician
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => form.setValue("performerType", "group")}
              >
                Group
              </Button>
            </div>
          </FormStepContent>
        </FormStep>
        <FormStep display={!!performerType && !createType}>
          <FormStepHeader>
            <FormStepTitle>
              Enter {capitalize(performerType || "performer")} Name
            </FormStepTitle>
            <FormStepDescription>
              Enter a publicly displayed name for your {performerType} account.
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <UnclaimedAccountSearch type={performerType} />
          </FormStepContent>
        </FormStep>
        <FormStep display={!!performerType && !!createType}>
          <FormStepHeader>
            <FormStepTitle>Complete Your Profile</FormStepTitle>
            <FormStepDescription>
              Fill out the rest of your performer profile to get started.
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <AvatarUpload />
            <AboutTextarea />
            <SelectGenres />
            <Button
              className="w-full"
              type="submit"
              onClick={() => console.log("ERRORS: ", form.formState.errors)}
            >
              Submit (Test)
            </Button>
          </FormStepContent>
        </FormStep>
      </form>
    </Form>
  );
};
