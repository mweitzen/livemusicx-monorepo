import { PageDescription, PageHeader, PageTitle } from "@/components/public/page";

export default function PerformersPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader>
        <PageTitle>Local Performers</PageTitle>
        <PageDescription>Explore local talent performing live music.</PageDescription>
      </PageHeader>
      {children}
    </>
  );
}
