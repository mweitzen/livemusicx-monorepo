import { Separator } from "@repo/ui/components/separator";

export default function AuthSeparator() {
  return (
    <div className='relative mt-6'>
      <div className='absolute inset-0 flex items-center'>
        <Separator className='w-full' />
      </div>
      <div className='relative flex justify-center text-xs uppercase'>
        <span className='bg-background px-2 text-muted-foreground'>
          Or continue with
        </span>
      </div>
    </div>
  );
}
