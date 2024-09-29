import { api } from "@repo/trpc/server";

import {
  FeaturedEventCard,
  FeaturedOrganizerCard,
  FeaturedPerformerCard,
  FeaturedVenueCard,
} from "./_components/feature-card";
import { FeaturedContent } from "./_components/feature-section";

export async function FeaturedEventsList() {
  const events = await api.events.getFeatured();

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
  const musicians = await api.accounts.getFeatured({ type: "MUSICIAN" });
  const bands = await api.accounts.getFeatured({ type: "BAND" });
  const performers = [...musicians, ...bands]
    .sort((a, b) => {
      return (
        a.events[0]!.timeStart!.getTime() - b.events[0]!.timeStart!.getTime()
      );
    })
    .slice(0, 5);

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
  const venues = await api.accounts.getFeatured({ type: "VENUE" });

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
  const organizers = await api.accounts.getFeatured({ type: "ORGANIZER" });

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
