import { api } from "@repo/trpc/react";
import { Button } from "@repo/ui/components/button";

import { CreateEventForm } from "./blank-event";

function App() {
  const { mutate } = api.events.test.useMutation({
    onSuccess: (data) => {
      console.log(">>> Success ", data);
    },
  });

  function handleCreateEvent() {
    mutate(event);
  }

  return (
    <div className='container'>
      <h1 className='text-center py-4 text-3xl'>Create Events</h1>
      <CreateEventForm />
      <Button onClick={handleCreateEvent}>Mutate</Button>
    </div>
  );
}

export default App;

const event = {
  name: "Coding Partner Launch Party",
  description: "Celebrate the launch of our awesome coding partner!",
  imageUrl: "coding-partner-logo.png",

  timeDoor: new Date("2024-12-31 7:00 PM"),
  timeStart: new Date("2024-12-31 8:00 PM"),
  timeEnd: new Date("2024-12-3 11:00 PM"),

  isPublished: true,
  isPrivate: false,
  isFree: false,
  servesAlcohol: true,
  servesFood: true,
  isChildFriendly: false,
  isHoliday: false,
  ageRestriction: true,
  minimumAge: 21,

  requiresRsvp: true,
  rsvpLink: "https://codingpartner.com/rsvp",
  requiresTicket: true,
  ticketLinks: [
    {
      name: "Early Bird",
      price: 20,
      url: "https://codingpartner.com/tickets/earlybird",
    },
  ],

  venueId: "venue123",
  stageId: "stage456",
  organizerId: "organizer789",
  musicianIds: ["musician1", "musician2"],
  bandIds: ["band1"],

  genreIds: ["genre1", "genre2"],
  keywordIds: ["keyword1", "keyword2"],
};
