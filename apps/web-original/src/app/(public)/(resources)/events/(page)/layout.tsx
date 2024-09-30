import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "~/components/public/page";

export default function EventsPageLayout({ children }: LayoutProps) {
  return (
    <>
      <PageHeader>
        <PageTitle>Upcoming Events</PageTitle>
        <PageDescription>
          Explore live music happening near you. Custom tailor your search to
          match your interests.
        </PageDescription>
      </PageHeader>
      {children}
    </>
  );
}
