import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export const AboutTextarea = () => {
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
              {...field}
              className='resize-none'
              rows={5}
              placeholder='Enter a brief, but encompassing description for your account.'
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
