import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

export const AvatarUpload = () => {
  const { control, setValue } = useFormContext();
  return (
    <div>
      <FormField
        control={control}
        name='avatar'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Avatar</FormLabel>
            <FormControl>
              <Input
                type='text'
                placeholder='Avatar'
                {...field}
              />
            </FormControl>
            <FormDescription>Enter a URL for your avatar</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div onClick={() => setValue("avatar", "buttfuck")} />
    </div>
  );
};
