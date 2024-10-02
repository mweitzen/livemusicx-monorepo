import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Switch } from "@repo/ui/components/switch";
import { Progress } from "@repo/ui/components/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import { CheckCircle } from "@repo/ui/icons";

const ticketData = [
  {
    id: 1,
    event: "Local Music Night",
    type: "General Admission",
    price: 15,
    registered: 75,
    capacity: 100,
    date: "2023-07-15",
  },
  {
    id: 2,
    event: "Community Theater Play",
    type: "VIP",
    price: 25,
    registered: 40,
    capacity: 50,
    date: "2023-07-22",
  },
  {
    id: 3,
    event: "Charity Run",
    type: "Participant",
    price: 0,
    registered: 200,
    capacity: 500,
    date: "2023-08-05",
  },
  {
    id: 4,
    event: "Tech Meetup",
    type: "RSVP",
    price: 0,
    registered: 80,
    capacity: 100,
    date: "2023-07-28",
  },
];

export function CheckInContent() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [checkInProgress, setCheckInProgress] = useState(33);

  const handleCheckIn = () => {
    // Simulating check-in process
    setCheckInProgress((prev) => Math.min(prev + 1, 100));
  };

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Event Check-in</CardTitle>
          <CardDescription>
            Manage attendee check-ins for your events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <Label>Select Event</Label>
              <Select
                value={selectedEvent}
                onValueChange={setSelectedEvent}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Choose an event' />
                </SelectTrigger>
                <SelectContent>
                  {ticketData.map((event) => (
                    <SelectItem
                      key={event.id}
                      value={event.id.toString()}
                    >
                      {event.event}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex space-x-2'>
              <Input
                placeholder='Enter ticket number or name'
                className='flex-grow'
              />
              <Button onClick={handleCheckIn}>
                <CheckCircle className='h-4 w-4 mr-1' />
                Check In
              </Button>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-2'>Check-in Progress</h3>
              <Progress
                value={checkInProgress}
                className='w-full'
              />
              <p className='text-sm text-muted-foreground mt-1'>
                {checkInProgress} of 100 attendees checked in
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <AdvancedCheckInOptions />
    </div>
  );
}

function AdvancedCheckInOptions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Check-in Options</CardTitle>
        <CardDescription>
          Configure additional check-in features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion
          type='single'
          collapsible
          className='w-full'
        >
          <AccordionItem value='qr-code'>
            <AccordionTrigger>QR Code Scanning</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='enable-qr'>Enable QR Code Scanning</Label>
                  <Switch
                    id='enable-qr'
                    defaultChecked
                  />
                </div>
                <div>
                  <Label htmlFor='qr-expiration'>QR Code Expiration</Label>
                  <Select defaultValue='24h'>
                    <SelectTrigger id='qr-expiration'>
                      <SelectValue placeholder='Select expiration time' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1h'>1 hour before event</SelectItem>
                      <SelectItem value='6h'>6 hours before event</SelectItem>
                      <SelectItem value='24h'>24 hours before event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='self-check-in'>
            <AccordionTrigger>Self Check-in Kiosk</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='enable-kiosk'>
                    Enable Self Check-in Kiosk
                  </Label>
                  <Switch id='enable-kiosk' />
                </div>
                <div>
                  <Label htmlFor='kiosk-mode'>Kiosk Mode</Label>
                  <Select>
                    <SelectTrigger id='kiosk-mode'>
                      <SelectValue placeholder='Select kiosk mode' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='qr'>QR Code Only</SelectItem>
                      <SelectItem value='name'>Name Search</SelectItem>
                      <SelectItem value='both'>
                        QR Code and Name Search
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='offline-mode'>
            <AccordionTrigger>Offline Mode</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='enable-offline'>Enable Offline Mode</Label>
                  <Switch id='enable-offline' />
                </div>
                <p className='text-sm text-muted-foreground'>
                  Offline mode allows check-ins without an internet connection.
                  Data will sync when connection is restored.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
