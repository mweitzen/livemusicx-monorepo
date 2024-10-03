import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Textarea } from "@repo/ui/components/textarea";
import { useFormContext } from "react-hook-form";

export const AboutTextarea = ({
  placeholder = "Enter a brief, but encompassing description for your account.",
}: {
  placeholder?: string;
}) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name='about'
      render={({ field }) => (
        <FormItem>
          <FormLabel>About</FormLabel>
          <FormControl>
            <Textarea
              className='resize-none'
              placeholder={placeholder}
              rows={5}
              {...field}
            />
          </FormControl>
          <FormDescription>
            Enter a brief description. Try to keep the length within the
            provided space.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
