import Link from "next/link";

import {
  FormStep,
  FormStepContent,
  FormStepDescription,
  FormStepHeader,
  FormStepTitle,
} from "@/components/admin/form-step";
import { Button } from "@/components/ui/button";

import { BlankEventForm } from "@/forms/events/create-blank";
import { AddDatesForm } from "@/forms/events/create-add-dates";
import { FromTemplateForm } from "@/forms/events/create-from-template";

export default function AdminEventsCreatePage({
  searchParams,
}: {
  searchParams: {
    type?: "blank" | "add-dates" | "from-template";
    eventId?: string;
    templateId?: string;
  };
}) {
  switch (searchParams.type) {
    case "blank":
      return <div>Blank Form</div>;
    case "add-dates":
      // pass eventId to form
      return <div>Add Dates Form</div>;
    case "from-template":
      // pass templateId to form
      return <div>From Template Form</div>;
    default:
      return (
        <FormStep display={!searchParams.type}>
          <FormStepHeader>
            <FormStepTitle>Event Creation Type</FormStepTitle>
            <FormStepDescription>Choose how you want to create your event</FormStepDescription>
            <FormStepContent className="py-4">
              <Button variant="outline" size="lg" asChild>
                <Link href="/admin/events/create?type=blank" replace>
                  New, Blank Event
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/admin/events/create?type=add-dates" replace>
                  Add Dates to Existing Event
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/admin/events/create?type=from-template" replace>
                  Create from Template
                </Link>
              </Button>
            </FormStepContent>
          </FormStepHeader>
        </FormStep>
      );
  }
}
