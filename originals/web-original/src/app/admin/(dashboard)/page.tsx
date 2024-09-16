import { NextEventSection } from "./next-event";
import { UpcomingEventsSection } from "./upcoming-events";
import { RecentlyAddedEventsSection } from "./recently-added-events";
import { DashboardAffiliateRequestsSection } from "./affiliate-requests";
import { DashboardMessagesSection } from "./messages";

export default function AdminDashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <NextEventSection className="col-span-1 md:col-span-2 lg:col-span-4" />
      <UpcomingEventsSection className="col-span-1 md:col-span-2" />
      <RecentlyAddedEventsSection className="span-1 md:col-span-4 lg:col-span-3" />
      <DashboardAffiliateRequestsSection className="span-1 md:col-span-4 lg:col-span-3" />
      <DashboardMessagesSection className="span-1 md:col-span-4 lg:col-span-6" />
    </div>
  );
}
