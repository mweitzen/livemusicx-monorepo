import { api } from "@repo/trpc/server";
import UnderConstruction from "~/components/under-construction";

export default async function ExploreVenuesPage() {
  const venues = await api.v1.accounts.venues.getAll();
  return (
    <>
      <UnderConstruction title='Explore Venues' />
      {venues && venues.map((venue) => <p key={venue.id}>{venue.name}</p>)}
    </>
  );
}
