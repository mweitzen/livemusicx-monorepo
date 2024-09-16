import { capitalize } from "@/lib/utils";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

export default function AccountType({ type }: { type: "fan" | "admin" }) {
  return (
    <div className='flex w-full items-center mb-4'>
      <Link
        className='p-0 h-5 w-8'
        href='signup'
      >
        <ChevronLeft className='h-5 w-5' />
      </Link>
      <div className='mr-8 flex-1 flex justify-center'>
        <Badge variant='outline'>{capitalize(type)} Account</Badge>
      </div>
    </div>
  );
}
