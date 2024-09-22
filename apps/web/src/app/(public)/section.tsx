import { cn } from "@repo/ui/helpers";
import Image from "next/image";

export function SectionImage({
  alt,
  src,
  className,
  children,
}: React.ComponentProps<typeof Image>) {
  return (
    <div className={cn("relative", className)}>
      <Image
        alt={alt}
        src={src}
        width={600}
        height={600}
        className='mx-auto rounded-lg shadow-xl'
      />
      {children}
    </div>
  );
}
export function MarketingSection({
  className,
  children,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "py-8 md:py-16 lg:py-24 first:py-12 first:md:py-24 first:lg:py-32",
        className
      )}
      {...props}
    >
      <div className='grid items-center gap-6 px-4 md:grid-cols-2 md:px-6'>
        {children}
      </div>
    </section>
  );
}
