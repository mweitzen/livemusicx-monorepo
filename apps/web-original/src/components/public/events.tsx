import { MusicianDetails } from "@/lib/types/outputs";
// import { MusicianDetails } from "@/server/api/accounts/musicians";
import { EventDetails } from "../../../__archives/api/events/main";
import { Card, CardContent, CardHeader } from "../ui/card";

function EventsGrid(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      {...props}
    />
  );
}

function EventCard({
  event,
}: {
  event: MusicianDetails["events"][number] | EventDetails;
}) {
  if (!event) return null;
  return (
    <Card>
      <CardHeader>
        <p>{event.name}</p>
      </CardHeader>
      <CardContent>{event.description}</CardContent>
    </Card>
  );
}

export { EventsGrid, EventCard };
