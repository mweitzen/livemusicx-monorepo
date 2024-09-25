import Image from "next/image";

interface PageHeaderProps {
  children?: React.ReactNode | React.ReactNode[];
  title: string;
  imageUrl?: string;
}

export default function PageHeader({
  children,
  title,
  imageUrl = "/assets/placeholder.svg",
}: PageHeaderProps) {
  return (
    <div className='relative rounded-lg overflow-hidden'>
      <Image
        src={imageUrl}
        alt={title}
        width={1200}
        height={400}
        className='w-full h-[400px] object-cover object-top'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-6'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2'>
          {title}
        </h1>
        <div className='flex flex-wrap gap-4 text-white'>{children}</div>
      </div>
    </div>
  );
}
