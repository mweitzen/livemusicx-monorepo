import { FeaturedSection } from "./_components/feature-section";

import {
  FeaturedEventsList,
  FeaturedPerformersList,
  FeaturedVenuesList,
  FeaturedOrganizersList,
} from "./lists";

export default function ExplorePage() {
  return (
    <>
      <FeaturedSection
        title='Upcoming Events'
        href='/explore/events'
      >
        <FeaturedEventsList />
      </FeaturedSection>
      <FeaturedSection
        title='Featured Performers'
        href='/explore/performers'
      >
        <FeaturedPerformersList />
      </FeaturedSection>
      <FeaturedSection
        title='Featured Venues'
        href='/explore/venues'
      >
        <FeaturedVenuesList />
      </FeaturedSection>
      <FeaturedSection
        title='Event Organizers'
        href='/explore/organizers'
      >
        <FeaturedOrganizersList />
      </FeaturedSection>
    </>
  );
}
