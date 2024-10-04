"use client";

import { cn } from "@repo/ui/helpers";
import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Textarea, TextareaProps } from "@repo/ui/components/textarea";
import { Input, InputProps } from "@repo/ui/components/input";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Switch } from "@repo/ui/components/switch";

import { Check, ChevronsUpDown, DollarSign, X } from "@repo/ui/icons";

/**
 *
 *
 *
 *
 *
 * Form Text Input
 *
 *
 *
 *
 *
 */
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

/**
 *
 *
 *
 *
 *
 * Form Textarea
 *
 *
 *
 *
 *
 */
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

/**
 *
 *
 *
 *
 *
 * Form Switch Input
 *
 *
 *
 *
 *
 */
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

/**
 *
 *
 *
 *
 *
 * Form Dollar Input
 *
 *
 *
 *
 *
 */
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

/**
 *
 *
 *
 *
 *
 * Form Multi-Select with Tags
 *
 *
 *
 *
 *
 */
interface FormMultiSelectTagsProps {
  name: string;
  label: string;
  items: { id: string; displayName?: string; name?: string }[];
  description?: string;
}

// TODO: CLEANUP!! Handle id override
export const FormMultiSelectTags = ({
  name,
  label,
  items,
  description,
}: FormMultiSelectTagsProps) => {
  const [open, setOpen] = useState(false);

  const { register, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name });

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-full justify-between'
            >
              {fields.length > 0
                ? `${fields.length} ${name.slice(0, -1)}${fields.length > 1 ? "s" : ""} selected`
                : `Select ${name}...`}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0'>
          <Command>
            <CommandInput placeholder={`Search ${name}...`} />
            <CommandEmpty>No {name} found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => {
                      // @ts-expect-error no-typing
                      const i = fields.findIndex((t) => t._id === item.id);

                      if (i !== -1) {
                        remove(i);
                      } else {
                        append({ _id: item.id, ...item });
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        // @ts-expect-error no-typing
                        fields.find((t) => t._id === item.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item.displayName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className='flex gap-2'>
        {fields.length ? (
          fields.map((field, index) => (
            <Badge
              key={field.id}
              variant='outline'
              className='flex items-center gap-1 pr-1 hover:cursor-pointer hover:bg-secondary'
              onClick={() => remove(index)}
            >
              {getValues(`${name}.${index}.displayName`)}
              <X className='h-3 w-3' />
              <input
                hidden
                {...register(`${name}.${index}.id`)}
              />
            </Badge>
          ))
        ) : (
          <Badge variant='secondary'>No {label} Selected</Badge>
        )}
      </div>
      {description && <FormDescription>{description}</FormDescription>}
    </FormItem>
  );
};
