"use client";
import { cn } from "@repo/ui/helpers";
import { useFormContext } from "react-hook-form";

import { Search } from "@repo/ui/icons";
import {
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";

import { Button } from "@repo/ui/components/button";

interface ParticipantSelectProps {
  name: string;
  label: string;
  items: { id: string; name: string; [key: string]: unknown }[];
}

export function ParticipantSelect({
  name,
  label,
  items,
}: ParticipantSelectProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  role='combobox'
                  variant='outline'
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? items.find((item) => item.id === field.value)?.name
                    : `Select ${label.toLowerCase()}`}
                  <Search className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput
                  placeholder={`Search ${label.toLowerCase()}...`}
                  className='h-9'
                />
                <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                <CommandList>
                  <CommandGroup heading='Your Affiliates'>
                    {items.map((item) => (
                      <CommandItem
                        key={item.id}
                        onSelect={() => {
                          form.setValue(name, item.id);
                        }}
                        className='text-sm'
                      >
                        {item.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandGroup heading='Actions'>
                    <CommandItem className='text-sm'>
                      Search for more {label.toLowerCase()}s
                    </CommandItem>
                    <CommandItem className='text-sm'>
                      Add new {label.toLowerCase()}
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
