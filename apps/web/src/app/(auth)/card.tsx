import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import Link from "next/link";

export default function AuthCard({
  children,
  title,
  description,
  switchHref,
  switchText,
}: {
  title: string;
  description: string;
  switchHref: string;
  switchText: string;
  children?: React.ReactNode;
}) {
  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-center'>
          {title}
        </CardTitle>
        <CardDescription className='text-center'>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className='flex justify-center'>
        <Button
          variant='link'
          asChild
        >
          <Link href={switchHref}>{switchText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
