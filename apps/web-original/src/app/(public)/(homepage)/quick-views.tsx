import { api } from "@repo/trpc/server";
import {
  EventQuickViewItem,
  VenueQuickViewItem,
  PerformerQuickViewItem,
  OrganizerQuickViewItem,
  QuickViewEmptyState,
} from "~/components/public/quick-view-item";

export async function VenuesItems() {
  const venues = await api.v1.accounts.venues.getQuickView();
  if (!venues || !venues.length) {
    return <QuickViewEmptyState />;
  }
  return venues.map((venue) => (
    <VenueQuickViewItem key={venue.id} venue={venue} />
  ));
}

export async function OrganizersItems() {
  const organizers = await api.v1.accounts.organizers.getQuickView();
  if (!organizers || !organizers.length) {
    return <QuickViewEmptyState />;
  }
  return organizers.map((organizer) => (
    <OrganizerQuickViewItem key={organizer.id} organizer={organizer} />
  ));
}

export async function PerformersItems() {
  const performers = await api.v1.accounts.performers.getQuickView();
  if (!performers || !performers.length) {
    return <QuickViewEmptyState />;
  }
  return performers.map((performer) => (
    <PerformerQuickViewItem key={performer.id} performer={performer} />
  ));
}

export async function EventsItems() {
  const events = await api.v1.events.main.getQuickView();

  if (!events || !events.length) {
    return <QuickViewEmptyState />;
  }
  return events.map((event) => (
    <EventQuickViewItem key={event.id} event={event} />
  ));
}
