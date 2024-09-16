import { PageDescription, PageHeader, PageTitle } from "@/components/public/page";

export default function GroupsPageLayout({ children }: LayoutProps) {
  return (
    <>
      <PageHeader>
        <PageTitle>Local Music Groups</PageTitle>
        <PageDescription>Explore music groups playing live music</PageDescription>
      </PageHeader>
      {children}
    </>
  );
}
