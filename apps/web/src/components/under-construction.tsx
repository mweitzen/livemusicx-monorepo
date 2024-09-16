import Link from "next/link";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function UnderConstruction({
  title = "Page Maintenance",
  demoLinks,
}: {
  title?: string;
  demoLinks?: { name: string; href: string }[];
}) {
  return (
    <div className='mx-auto max-w-md text-center py-24'>
      <Badge variant='secondary'>Site Under Construction</Badge>
      <h1 className='mt-4 text-3xl font-bold tracking-tighter text-foreground sm:text-4xl'>
        {title}
      </h1>
      <p className='mt-4 text-muted-foreground'>
        {
          "We're working hard to bring you an amazing new experience. Please check back soon."
        }
      </p>
      <div className='mt-6 gap-4 flex flex-col max-w-52 mx-auto justify-center'>
        {demoLinks ? (
          demoLinks.map((link) => (
            <Button
              key={link.href}
              asChild
            >
              <Link href={link.href}>{link.name}</Link>
            </Button>
          ))
        ) : (
          <Button asChild>
            <Link
              href='/'
              prefetch={false}
            >
              Go to Homepage
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
