import { api } from "@/lib/trpc/server";
import {
  EventQuickViewItem,
  VenueQuickViewItem,
  PerformerQuickViewItem,
  OrganizerQuickViewItem,
  QuickViewEmptyState,
} from "@/components/public/quick-view-item";

export async function VenuesItems() {
  const venues = await api.accounts.venues.getQuickView.query();
  if (!venues || !venues.length) {
    return <QuickViewEmptyState />;
  }
  return venues.map((venue) => (
    <VenueQuickViewItem key={venue.id} venue={venue} />
  ));
}

export async function OrganizersItems() {
  const organizers = await api.accounts.organizers.getQuickView.query();
  if (!organizers || !organizers.length) {
    return <QuickViewEmptyState />;
  }
  return organizers.map((organizer) => (
    <OrganizerQuickViewItem key={organizer.id} organizer={organizer} />
  ));
}

export async function PerformersItems() {
  const performers = await api.accounts.performers.getQuickView.query();
  if (!performers || !performers.length) {
    return <QuickViewEmptyState />;
  }
  return performers.map((performer) => (
    <PerformerQuickViewItem key={performer.id} performer={performer} />
  ));
}

export async function EventsItems() {
  const events = await api.events.main.getQuickView.query();

  if (!events || !events.length) {
    return <QuickViewEmptyState />;
  }
  return events.map((event) => (
    <EventQuickViewItem key={event.id} event={event} />
  ));
}
