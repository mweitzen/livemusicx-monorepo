import { useState, Dispatch, SetStateAction } from "react";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import { Printer } from "@repo/ui/icons";

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

export function TicketsContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);

  const handleTicketAction = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Handle success (e.g., show a toast message)
    } catch (err: unknown) {
      console.log(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-4'>
      <QRCodeDialog
        showQRCode={showQRCode}
        setShowQRCode={setShowQRCode}
      />
      <Card>
        <CardHeader>
          <CardTitle>Manage Tickets</CardTitle>
          <CardDescription>
            View and edit ticket information for your events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ticketData.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.event}</TableCell>
                  <TableCell>{ticket.type}</TableCell>
                  <TableCell>
                    {ticket.price === 0 ? "Free" : `$${ticket.price}`}
                  </TableCell>
                  <TableCell>{ticket.registered}</TableCell>
                  <TableCell>{ticket.capacity}</TableCell>
                  <TableCell>{ticket.date}</TableCell>
                  <TableCell>
                    <Button
                      variant='outline'
                      size='sm'
                      className='mr-2'
                      onClick={handleTicketAction}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Edit"}
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setShowQRCode(true)}
                    >
                      QR Code
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {error && <p className='text-red-500 mt-2'>{error}</p>}
        </CardContent>
      </Card>
      <AdvancedTicketOptions />
    </div>
  );
}

function AdvancedTicketOptions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Ticket Options</CardTitle>
        <CardDescription>
          Configure additional ticket features and settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion
          type='single'
          collapsible
          className='w-full'
        >
          <AccordionItem value='waitlist'>
            <AccordionTrigger>Waitlist Management</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='enable-waitlist'>Enable Waitlist</Label>
                  <Switch id='enable-waitlist' />
                </div>
                <div>
                  <Label htmlFor='waitlist-limit'>Waitlist Limit</Label>
                  <Input
                    id='waitlist-limit'
                    type='number'
                    placeholder='e.g., 50'
                  />
                </div>
                <div>
                  <Label htmlFor='auto-upgrade'>
                    Auto Upgrade from Waitlist
                  </Label>
                  <Select>
                    <SelectTrigger id='auto-upgrade'>
                      <SelectValue placeholder='Select option' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='manual'>Manual</SelectItem>
                      <SelectItem value='auto'>Automatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='transfer'>
            <AccordionTrigger>Ticket Transfers</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='enable-transfers'>
                    Allow Ticket Transfers
                  </Label>
                  <Switch id='enable-transfers' />
                </div>
                <div>
                  <Label htmlFor='transfer-fee'>Transfer Fee (%)</Label>
                  <Input
                    id='transfer-fee'
                    type='number'
                    placeholder='e.g., 5'
                  />
                </div>
                <div>
                  <Label htmlFor='transfer-deadline'>Transfer Deadline</Label>
                  <Select>
                    <SelectTrigger id='transfer-deadline'>
                      <SelectValue placeholder='Select deadline' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='24h'>24 hours before event</SelectItem>
                      <SelectItem value='48h'>48 hours before event</SelectItem>
                      <SelectItem value='1w'>1 week before event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='refund'>
            <AccordionTrigger>Refund Policy</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-2'>
                <div>
                  <Label htmlFor='refund-policy'>Refund Policy</Label>
                  <Select>
                    <SelectTrigger id='refund-policy'>
                      <SelectValue placeholder='Select policy' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='full'>Full refund</SelectItem>
                      <SelectItem value='partial'>Partial refund</SelectItem>
                      <SelectItem value='none'>No refunds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor='refund-window'>Refund Window</Label>
                  <Input
                    id='refund-window'
                    type='number'
                    placeholder='Days before event'
                  />
                </div>
                <div>
                  <Label htmlFor='refund-fee'>Refund Processing Fee (%)</Label>
                  <Input
                    id='refund-fee'
                    type='number'
                    placeholder='e.g., 5'
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

function QRCodeDialog({
  showQRCode,
  setShowQRCode,
}: {
  showQRCode: boolean;
  setShowQRCode: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog
      open={showQRCode}
      onOpenChange={setShowQRCode}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ticket QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code for quick check-in
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-center'>
          <img
            src='/placeholder.svg?height=200&width=200'
            alt='QR Code'
            className='w-48 h-48'
          />
        </div>
        <div className='flex justify-between'>
          <Button onClick={() => setShowQRCode(false)}>Close</Button>
          <Button variant='outline'>
            <Printer className='h-4 w-4 mr-1' />
            Print
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
