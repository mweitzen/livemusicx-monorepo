import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { FileText } from "@repo/ui/icons";

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

export function ReportsContent() {
  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Registration Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer
            width='100%'
            height={300}
          >
            <RechartsBarChart data={ticketData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='event' />
              <YAxis />
              <RechartsTooltip />
              <Bar
                dataKey='registered'
                fill='#8884d8'
              />
              <Bar
                dataKey='capacity'
                fill='#82ca9d'
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <RevenueForecast />
    </div>
  );
}

function RevenueForecast() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-lg font-semibold'>Projected Revenue: $7,850</p>
        <p className='text-sm text-muted-foreground'>
          Based on current registrations and pricing
        </p>
        <div className='mt-4 space-y-2'>
          <div className='flex justify-between'>
            <span>Local Music Night</span>
            <span>$1,125</span>
          </div>
          <div className='flex justify-between'>
            <span>Community Theater Play</span>
            <span>$1,000</span>
          </div>
          <div className='flex justify-between'>
            <span>Charity Run</span>
            <span>$0 (Free Event)</span>
          </div>
          <div className='flex justify-between'>
            <span>Tech Meetup</span>
            <span>$0 (Free Event)</span>
          </div>
        </div>
        <Button className='mt-4'>
          <FileText className='mr-2 h-4 w-4' />
          Generate Detailed Report
        </Button>
      </CardContent>
    </Card>
  );
}
