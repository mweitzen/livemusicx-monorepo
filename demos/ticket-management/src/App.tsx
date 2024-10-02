import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import {
  BarChart,
  Calendar,
  DollarSign,
  Users,
  Ticket,
  FileText,
  Link,
} from "@repo/ui/icons";

import { DashboardContent } from "./sections/dashboard-content";
import { TicketsContent } from "./sections/tickets-content";
import { AttendeesContent } from "./sections/attendees-content";
import { CheckInContent } from "./sections/check-in-content";
import { PricingContent } from "./sections/pricing-content";
import { ReportsContent } from "./sections/reports-content";
import { IntegrationsContent } from "./sections/integrations-content";

export default function TicketManagement() {
  const [activeTab, setActiveTab] =
    useState<keyof typeof tabContent>("dashboard");

  const tabContent = {
    dashboard: <DashboardContent />,
    tickets: <TicketsContent />,
    attendees: <AttendeesContent />,
    checkIn: <CheckInContent />,
    pricing: <PricingContent />,
    reports: <ReportsContent />,
    integrations: <IntegrationsContent />,
  } as const;

  return (
    <div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>Ticket Management</h2>
      </div>
      <Tabs
        defaultValue='dashboard'
        value={activeTab}
        // @ts-expect-error not-providing-types
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger
            value='dashboard'
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart className='mr-2 h-4 w-4' />
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value='tickets'
            onClick={() => setActiveTab("tickets")}
          >
            <Ticket className='mr-2 h-4 w-4' />
            Tickets
          </TabsTrigger>
          <TabsTrigger
            value='attendees'
            onClick={() => setActiveTab("attendees")}
          >
            <Users className='mr-2 h-4 w-4' />
            Attendees
          </TabsTrigger>
          <TabsTrigger
            value='checkIn'
            onClick={() => setActiveTab("checkIn")}
          >
            <Calendar className='mr-2 h-4 w-4' />
            Check-in
          </TabsTrigger>
          <TabsTrigger
            value='pricing'
            onClick={() => setActiveTab("pricing")}
          >
            <DollarSign className='mr-2 h-4 w-4' />
            Pricing
          </TabsTrigger>
          <TabsTrigger
            value='reports'
            onClick={() => setActiveTab("reports")}
          >
            <FileText className='mr-2 h-4 w-4' />
            Reports
          </TabsTrigger>
          <TabsTrigger
            value='integrations'
            onClick={() => setActiveTab("integrations")}
          >
            <Link className='mr-2 h-4 w-4' />
            Integrations
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value={activeTab}
          className='space-y-4'
        >
          {tabContent[activeTab]}
        </TabsContent>
      </Tabs>
    </div>
  );
}
