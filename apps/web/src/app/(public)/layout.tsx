import Footer from "./footer";
import { MarketingNavigation } from "@/components/navigation";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MarketingNavigation />
      {children}
      <Footer />
    </>
  );
}
