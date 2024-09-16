import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { ComponentProps } from "react";

type SearchBarProps = ComponentProps<typeof Input> & { label: string };

export default function SearchBar({ label, ...props }: SearchBarProps) {
  return (
    <div className='flex-grow'>
      <Label
        htmlFor='search'
        className='sr-only'
      >
        {label}
      </Label>
      <div className='relative'>
        <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400' />
        <Input
          {...props}
          id='search'
          type='text'
          placeholder={`${label}...`}
          className='pl-10'
        />
      </div>
    </div>
  );
}
