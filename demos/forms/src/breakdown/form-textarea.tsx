"use client";

import { cn } from "@repo/ui/helpers";
import { useFormContext } from "react-hook-form";

import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Textarea, TextareaProps } from "@repo/ui/components/textarea";

interface FormTextareaProps extends TextareaProps {
  name: string;
  label: string;
  description?: string;
}

export const FormTextarea = ({
  name,
  label,
  description,
  className,
  rows,
  ...props
}: FormTextareaProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              className={cn("resize-none", className)}
              rows={rows || 5}
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
