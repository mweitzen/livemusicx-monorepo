import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormStep,
  FormStepContent,
  FormStepDescription,
  FormStepHeader,
  FormStepTitle,
} from "./components/form-step";
import { Form } from "@repo/ui/components/form";
import { Button } from "@repo/ui/components/button";

// feature specific imports
import { SelectGenres } from "./components/select-genres";
import { AvatarUpload } from "./components/avatar-upload";
import { AboutTextarea } from "./components/about-textarea";
import { UnclaimedAccountSearch } from "./components/unclaimed-search";
import { CreateMusicianSchema } from "../lib/schema";
import { capitalize } from "@repo/utils";

const FormSchema = CreateMusicianSchema.extend({
  performerType: z.enum(["musician", "group"]).nullable(),
  createType: z.enum(["create", "claim"]).nullable(),
});

export const CreatePerformerAccount = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      avatar: "",
      about: "",
      genres: [],
      basedInId: "",
      performerType: null,
      createType: null,
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  const performerType = form.watch("performerType");
  const createType = form.watch("createType");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormStep display={!performerType}>
          <FormStepHeader>
            <FormStepTitle>Select Performer Type</FormStepTitle>
            <FormStepDescription>
              Select which type of performer account you would like to create
            </FormStepDescription>
          </FormStepHeader>
          <FormStepContent>
            <div className='flex flex-col gap-4'>
              <Button
                variant='outline'
                size='lg'
                onClick={() => form.setValue("performerType", "musician")}
              >
                Musician
              </Button>
              <Button
                variant='outline'
                size='lg'
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
              className='w-full'
              type='submit'
            >
              Submit (Test)
            </Button>
          </FormStepContent>
        </FormStep>
      </form>
    </Form>
  );
};
