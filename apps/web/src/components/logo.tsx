import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

export default function Logo() {
  return (
    <Link
      href='/'
      className={cn("flex items-center h-10 px-2 rounded-full")}
    >
      <span className='relative'>
        <Image
          src='/assets/logo.png'
          alt='logo'
          className='w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
          height={28}
          width={28}
          priority
        />
        <Image
          src='/assets/logo-dark.png'
          alt='logo'
          className='w-5 h-5 absolute -translate-y-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
          height={28}
          width={28}
          priority
        />
      </span>
      <span className='text-xl tracking-tighter font-semibold'>Live Music</span>
    </Link>
  );
}
