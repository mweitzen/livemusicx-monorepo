import { PageDescription, PageHeader, PageTitle } from "@/components/public/page";

export default function MusiciansPageLayout({ children }: LayoutProps) {
  return (
    <>
      <PageHeader>
        <PageTitle>Local Musicians</PageTitle>
        <PageDescription>Explore musicians performing live music</PageDescription>
      </PageHeader>
      {children}
    </>
  );
}
