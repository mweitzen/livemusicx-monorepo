import { Button } from "@repo/ui/components/button";

const existingVenues = [
  {
    id: "1",
    name: "The Venue",
    accountManagerId: "1",
    active: true,
  },
  {
    id: "2",
    name: "Cafe 1",
    accountManagerId: "2",
    active: true,
  },
  {
    id: "3",
    name: "Restaurant 1",
    accountManagerId: undefined,
    active: false,
  },
  {
    id: "4",
    name: "Restaurant 2",
    accountManagerId: "1",
    active: true,
  },
];

export const VenueAccountStatus = ({
  venue,
}: {
  venue: { name: string | null };
}) => {
  // call api to check if venue exists
  const existingVenue = existingVenues.find((v) => v.name === venue.name);

  return existingVenue ? (
    existingVenue.accountManagerId ? (
      <div className="text-center">
        <p className="justify-center text-xl font-semibold">Uh oh!</p>
        <p className="justify-center text-2xl font-medium">Account Claimed</p>
        <p className="justify-center text-sm text-muted-foreground">
          This account has already been claimed by another user.
          <br />
          If you believe this is a mistake, please contact.
        </p>
        <Button className="mt-4">Contact Support</Button>
      </div>
    ) : (
      <div className="flex flex-col gap-6 text-center">
        <div>
          <p className="mb-1 justify-center text-xl font-semibold">Psst!</p>
          <p className="justify-center text-2xl font-medium">Account Exists</p>
          <p className="justify-center text-sm text-muted-foreground">
            This venue has already been added by other users referencing it for
            their events.
          </p>
        </div>
        <p className="justify-center leading-loose">
          {`Your account will likely already be populated with information. This shouldn't be a
          concern, we just wanted to let you know. Most of the venue info comes from Google, but
          you will want to double check it anyway.`}
        </p>
        <div className="flex flex-col gap-2">
          <p className="justify-center text-sm">
            If you have selected the correct venue:
          </p>
          <Button onClick={() => {}}>Claim Venue</Button>
        </div>
      </div>
    )
  ) : (
    <>
      <div className="text-center">
        <p className="mb-1 justify-center text-xl font-semibold">Good to go!</p>
        <p className="justify-center text-2xl font-medium">
          No Existing Account
        </p>
        <p className="justify-center text-sm text-muted-foreground">
          {`You are creating a brand new venue. If this is your first venue, welcome! If it isnt,
          welcome back. :)`}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="justify-center text-sm">
          If you have selected the correct venue:
        </p>
        <Button onClick={() => {}}>Create Venue</Button>
      </div>
    </>
  );
};
