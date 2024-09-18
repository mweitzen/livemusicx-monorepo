import { currentUser } from "@/lib/auth";

import { CreateOrganizerForm } from "@/forms/accounts/create-organizer";
import { CreatePerformerForm } from "@/forms/accounts/create-performer";
// import { CreateVenueForm } from "@/forms/accounts/create-venue";}

export default async function CreateAccountPage() {
  const user = await currentUser();
  if (!user) return null;

  const accountType = user.type;

  switch (accountType) {
    case "ORGANIZER":
      return <CreateOrganizerForm />;
    case "PERFORMER":
      return <CreatePerformerForm />;
    case "VENUE":
    //   return <CreateVenueForm />;
    default:
      return null;
  }
}
