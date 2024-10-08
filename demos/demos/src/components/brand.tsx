import { cn } from "~/lib/utils";
import { Link } from "react-router-dom";

// import icon from "~/app/icon.png";
// import iconDark from "~/app/icon-dark.png";

export const Brand = ({ displayText }: { displayText?: boolean }) => {
  return (
    <Link
      to='/'
      className='bg-background/30 rounded-lg flex items-center gap-1.5 hover:bg-background/90'
    >
      <span className='inline relative'>
        <img
          src='/brand.png'
          alt='brand'
          className='w-8 h-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
          height={32}
          width={32}
        />
        <img
          src='/brand-dark.png'
          alt='brand'
          className='w-8 h-8 absolute -translate-y-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
          height={32}
          width={32}
        />
      </span>
      <span
        className={cn(
          "text-sm tracking-tight font-semibold hidden md:inline align-bottom mr-2.5",
          displayText ? "inline" : ""
        )}
      >
        Live Music X
      </span>
    </Link>
  );
};
