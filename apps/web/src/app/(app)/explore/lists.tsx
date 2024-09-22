import { api } from "@repo/trpc/server";

import {
  FeaturedEventCard,
  FeaturedOrganizerCard,
  FeaturedPerformerCard,
  FeaturedVenueCard,
} from "./_components/feature-card";
import { FeaturedContent } from "./_components/feature-section";

export async function FeaturedEventsList() {
  // Fetch featured events
  async function longWait() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 4000);
    });
  }

  await longWait();

  const events = await api.v1.events.main.getQuickView();

  return (
    <FeaturedContent>
      {events.map((event) => (
        <FeaturedEventCard
          key={event.id}
          event={event}
        />
      ))}
    </FeaturedContent>
  );
}

export async function FeaturedPerformersList() {
  const performers = await api.v1.accounts.performers.getQuickView();

  return (
    <FeaturedContent>
      {performers.map((performer) => (
        <FeaturedPerformerCard
          key={performer.id}
          performer={performer}
        />
      ))}
    </FeaturedContent>
  );
}

export async function FeaturedVenuesList() {
  const venues = await api.v1.accounts.venues.getQuickView();

  return (
    <FeaturedContent>
      {venues.map((venue) => (
        <FeaturedVenueCard
          key={venue.id}
          venue={venue}
        />
      ))}
    </FeaturedContent>
  );
}
export async function FeaturedOrganizersList() {
  const organizers = await api.v1.accounts.organizers.getQuickView();

  return (
    <FeaturedContent>
      {organizers.map((organizer) => (
        <FeaturedOrganizerCard
          key={organizer.id}
          organizer={organizer}
        />
      ))}
    </FeaturedContent>
  );
}
