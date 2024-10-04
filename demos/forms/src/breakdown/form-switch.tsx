"use client";

import { useFormContext } from "react-hook-form";

import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  // FormMessage,
} from "@repo/ui/components/form";

import { Switch } from "@repo/ui/components/switch";

interface FormSwitchProps {
  name: string;
  label: string;
  description: string;
}
export function FormSwitch({ name, label, description }: FormSwitchProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
          <div className='space-y-0.5'>
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
