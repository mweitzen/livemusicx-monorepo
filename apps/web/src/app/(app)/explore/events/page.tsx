import { api } from "@repo/trpc/server";
import { convertSearchParamsToQuery } from "@repo/utils";

import { Button } from "@repo/ui/components/button";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { Calendar, MapPin, Music, Ticket } from "@repo/ui/icons";
import { SearchEventsInput } from "@repo/validators/events";

export default async function ExploreEventsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const conversion = convertSearchParamsToQuery(searchParams);
  const query = SearchEventsInput.parse(conversion);

  const events = await api.events.getUpcoming(query);

  return (
    <div className='space-y-6'>
      <Tabs
        defaultValue='grid'
        className='w-full'
      >
        <TabsList>
          <TabsTrigger value='grid'>Grid</TabsTrigger>
          <TabsTrigger value='list'>List</TabsTrigger>
          <TabsTrigger value='calendar'>Calendar</TabsTrigger>
          <TabsTrigger value='map'>Map</TabsTrigger>
        </TabsList>
        <TabsContent value='grid'>
          <ScrollArea className='h-[800px]'>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {events.map((event) => (
                <Card
                  key={event.id}
                  className='overflow-hidden'
                >
                  <CardHeader className='p-0'>
                    <img
                      src={event.image ?? ""}
                      alt={event.name}
                      className='h-[200px] w-full object-cover'
                    />
                  </CardHeader>
                  <CardContent className='p-4'>
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription>
                      <div className='flex items-center mt-2'>
                        <Calendar className='mr-2 h-4 w-4' />
                        {"event.date"} at {"event.time"}
                      </div>
                      <div className='flex items-center mt-1'>
                        <MapPin className='mr-2 h-4 w-4' />
                        {"event.venue"}
                      </div>
                      <div className='flex items-center mt-1'>
                        <Music className='mr-2 h-4 w-4' />
                        {"event.genre"}
                      </div>
                      <div className='flex items-center mt-1'>
                        <Ticket className='mr-2 h-4 w-4' />${"event.price"}
                      </div>
                    </CardDescription>
                  </CardContent>
                  <CardFooter className='p-4 pt-0'>
                    <Button className='w-full'>Get Tickets</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <div className='mt-8 flex justify-center'>
            <Button>Load More Events</Button>
          </div>
        </TabsContent>
        <TabsContent value='list'>
          <ScrollArea className='h-[800px]'>
            <div className='space-y-4'>
              {events.map((event) => (
                <Card key={event.id}>
                  <div className='flex items-center p-4'>
                    <img
                      src={event.image ?? ""}
                      alt={event.name}
                      className='h-24 w-24 object-cover rounded-md mr-4'
                    />
                    <div className='flex-grow'>
                      <CardTitle>{event.name}</CardTitle>
                      <CardDescription>
                        <div className='flex items-center mt-1'>
                          <Calendar className='mr-2 h-4 w-4' />
                          {"event.date"} at {"event.time"}
                        </div>
                        <div className='flex items-center mt-1'>
                          <MapPin className='mr-2 h-4 w-4' />
                          {"event.venue"}
                        </div>
                      </CardDescription>
                    </div>
                    <div className='text-right'>
                      <div className='font-bold'>${"event.price"}</div>
                      <Button
                        size='sm'
                        className='mt-2'
                      >
                        Get Tickets
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <div className='mt-8 flex justify-center'>
            <Button>Load More Events</Button>
          </div>
        </TabsContent>
        <TabsContent value='calendar'>
          <div className='h-[800px] flex items-center justify-center bg-muted rounded-lg'>
            Calendar view coming soon...
          </div>
        </TabsContent>
        <TabsContent value='map'>
          <div className='h-[800px] flex items-center justify-center bg-muted rounded-lg'>
            Map view coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
