import { events } from "@repo/mock-data";
import { musicians } from "@repo/mock-data";
import { bands } from "@repo/mock-data";
import { venues } from "@repo/mock-data";
import { organizers } from "@repo/mock-data";

import { FeaturedContent } from "./_components/feature-section";
import {
  FeaturedEventCard,
  FeaturedOrganizerCard,
  FeaturedPerformerCard,
  FeaturedVenueCard,
} from "./_components/feature-card";

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

  return (
    <FeaturedContent>
      {events.slice(0, 5).map((event) => (
        <FeaturedEventCard
          key={event.id}
          event={event}
        />
      ))}
    </FeaturedContent>
  );
}

export async function FeaturedPerformersList() {
  return (
    <FeaturedContent>
      {musicians.map((musician) => (
        <FeaturedPerformerCard
          key={musician.id}
          performer={musician}
        />
      ))}
      {bands.map((band) => (
        <FeaturedPerformerCard
          key={band.id}
          performer={band}
        />
      ))}
    </FeaturedContent>
  );
}

export async function FeaturedVenuesList() {
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
