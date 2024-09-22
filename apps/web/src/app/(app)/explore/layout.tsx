import FilterBar from "~/components/features/filter-bar";

export default function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <FilterBar />
      {children}
    </>
  );
}
