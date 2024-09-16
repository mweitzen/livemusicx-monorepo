import { PageDescription, PageHeader, PageTitle } from "@/components/public/page";

export default function OrganizersPageLayout({ children }: LayoutProps) {
  return (
    <>
      <PageHeader>
        <PageTitle>Organizers</PageTitle>
        <PageDescription>Explore organizers curating live music near you.</PageDescription>
      </PageHeader>
      {children}
    </>
  );
}
