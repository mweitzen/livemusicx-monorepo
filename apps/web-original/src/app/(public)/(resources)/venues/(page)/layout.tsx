import {
  PageDescription,
  PageHeader,
  PageTitle,
} from "~/components/public/page";

export default function VenuesPageLayout({ children }: LayoutProps) {
  return (
    <>
      <PageHeader>
        <PageTitle>Venues</PageTitle>
        <PageDescription>
          Explore local venues hosting live music.
        </PageDescription>
      </PageHeader>
      {children}
    </>
  );
}
