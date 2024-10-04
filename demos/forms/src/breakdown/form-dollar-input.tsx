"use client";

import { useFormContext } from "react-hook-form";

import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";

import { Input, InputProps } from "@repo/ui/components/input";
import { DollarSign } from "@repo/ui/icons";

interface FormDollarInputProps extends InputProps {
  name: string;
  label: string;
  description?: string;
}

export function FormDollarInput({
  name,
  label,
  description,
}: FormDollarInputProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className='relative'>
              <Input
                type='number'
                placeholder='25.00'
                min={0}
                {...field}
              />
              <DollarSign className='absolute right-3 top-2.5 h-4 w-4 opacity-50' />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
