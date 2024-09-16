"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPinIcon } from "lucide-react";

export default function LocationSelector() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='flex items-center gap-2'
        >
          <MapPinIcon className='w-5 h-5' />
          <span>San Francisco, CA</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-4'>
        <div className='grid gap-4'>
          <h3 className='text-lg font-semibold'>Set your location</h3>
          <form>
            <Input
              placeholder='Search for a city'
              className='bg-muted'
              type='search'
            />
            <Button
              type='submit'
              className='mt-4 w-full'
            >
              Update Location
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
