import PublicFooter from "@/components/public/footer";
import { MainWrapper } from "@/components/shared/main-wrapper";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainWrapper>{children}</MainWrapper>
      <PublicFooter />
    </>
  );
}
