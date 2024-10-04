"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";

import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";

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
