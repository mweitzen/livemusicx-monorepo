import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFormContext } from "react-hook-form";

export const DoorTimePicker = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="timeDoor"
      render={() => (
        <FormItem>
          <FormLabel>Door Time</FormLabel>
          <FormControl>
            <Select defaultValue="0">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>No door time</SelectLabel>
                  <SelectItem value="0">Same time as event</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Under 1 hour</SelectLabel>
                  <SelectItem value="5">5 Minutes Before</SelectItem>
                  <SelectItem value="10">10 Minutes Before</SelectItem>
                  <SelectItem value="15">15 Minutes Before</SelectItem>
                  <SelectItem value="30">30 Minutes Before</SelectItem>
                  <SelectItem value="45">45 Minutes Before</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>1 hour and over</SelectLabel>
                  <SelectItem value="60">1 hour before</SelectItem>
                  <SelectItem value="90">1.5 hours before</SelectItem>
                  <SelectItem value="120">2 hours before</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>When guests can start arriving for the event.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
