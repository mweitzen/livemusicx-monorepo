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

interface FormTextInputProps extends InputProps {
  name: string;
  label: string;
  description?: string;
}

export const FormTextInput = ({
  name,
  label,
  description,
  ...props
}: FormTextInputProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...props}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
