"use client";
import { cn } from "@repo/ui/helpers";
import { useFormContext } from "react-hook-form";

import { Search } from "@repo/ui/icons";
import {
  FormControl,
  FormDescription,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import { Button } from "@repo/ui/components/button";

export const DoorTimePicker = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name='doorTime'
      render={() => (
        <FormItem>
          <FormLabel>Door Time</FormLabel>
          <FormControl>
            <Select defaultValue='0'>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>No door time</SelectLabel>
                  <SelectItem value='0'>Same time as event</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Under 1 hour</SelectLabel>
                  <SelectItem value='5'>5 Minutes Before</SelectItem>
                  <SelectItem value='10'>10 Minutes Before</SelectItem>
                  <SelectItem value='15'>15 Minutes Before</SelectItem>
                  <SelectItem value='30'>30 Minutes Before</SelectItem>
                  <SelectItem value='45'>45 Minutes Before</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>1 hour and over</SelectLabel>
                  <SelectItem value='60'>1 hour before</SelectItem>
                  <SelectItem value='90'>1.5 hours before</SelectItem>
                  <SelectItem value='120'>2 hours before</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>
            When guests can start arriving for the event.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

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

export const EventMinimumAge = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name='minimumAge'
      render={({ field }) => (
        <FormItem className='space-y-3'>
          <FormLabel>Age Restriction</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value?.toString()}
              className='flex flex-col space-y-1'
            >
              <FormItem className='flex items-center space-x-3'>
                <FormControl>
                  <RadioGroupItem value='1' />
                </FormControl>
                <FormLabel>All Ages</FormLabel>
              </FormItem>
              <FormItem className='flex items-center space-x-3'>
                <FormControl>
                  <RadioGroupItem value='0' />
                </FormControl>
                <FormLabel>Family Friendly</FormLabel>
              </FormItem>
              <FormItem className='flex items-center space-x-3'>
                <FormControl>
                  <RadioGroupItem value='13' />
                </FormControl>
                <FormLabel>13+</FormLabel>
              </FormItem>
              <FormItem className='flex items-center space-x-3'>
                <FormControl>
                  <RadioGroupItem value='18' />
                </FormControl>
                <FormLabel>18+</FormLabel>
              </FormItem>
              <FormItem className='flex items-center space-x-3'>
                <FormControl>
                  <RadioGroupItem value='21' />
                </FormControl>
                <FormLabel>21+</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
