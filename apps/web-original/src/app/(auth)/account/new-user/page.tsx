import { TypographyH1, TypographyP } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewUserPage() {
  return (
    <div className="text-center">
      <TypographyH1>Success!</TypographyH1>
      <TypographyP>Eventually this will walk a user through a new setup.</TypographyP>
      <Button asChild>
        <Link href="/admin">Explore the Admin Section</Link>
      </Button>
    </div>
  );
}
