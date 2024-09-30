import { useState } from "react";

import { FromTemplateForm } from "./from-template";
import { BlankEventForm } from "./blank";
import { AddDatesForm } from "./add-dates";
import {
  FormStep,
  FormStepContent,
  FormStepDescription,
  FormStepHeader,
  FormStepTitle,
} from "~/components/form-step";
import { Button } from "~/components/ui/button";

export const EventCreationPage = () => {
  const [selectedType, setSelectedType] = useState<
    "blank" | "add-dates" | "from-template" | null
  >(null);

  return (
    <>
      <h1 className='text-center font-semibold tracking-tight text-xl mb-2'>
        Event Creation Demos
      </h1>
      <FormStep display={!selectedType}>
        <FormStepHeader>
          <FormStepTitle>Event Creation Type</FormStepTitle>
          <FormStepDescription>
            Choose how you want to create your event
          </FormStepDescription>
          <FormStepContent className='py-4'>
            <Button
              variant='outline'
              size='lg'
              onClick={() => setSelectedType("blank")}
            >
              New, Blank Event
            </Button>
            <Button
              variant='outline'
              size='lg'
              onClick={() => setSelectedType("add-dates")}
            >
              Add Dates to Existing Event
            </Button>
            <Button
              variant='outline'
              size='lg'
              onClick={() => setSelectedType("from-template")}
            >
              Create from Template
            </Button>
          </FormStepContent>
        </FormStepHeader>
      </FormStep>
      {selectedType === "blank" ? <BlankEventForm /> : null}
      {selectedType === "add-dates" ? <AddDatesForm /> : null}
      {selectedType === "from-template" ? <FromTemplateForm /> : null}

      {selectedType ? (
        <Button
          variant='outline'
          onClick={() => setSelectedType(null)}
        >
          Clear
        </Button>
      ) : null}
    </>
  );
};
