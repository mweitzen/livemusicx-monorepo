import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useUserStore } from "./state";
import { AccountType } from "@repo/db/schema";

export const AccountTypeTest = () => {
  const userType = useUserStore((state) => state.userType);
  const setUserType = useUserStore((state) => state.setUserType);
  const setUserLoading = useUserStore((state) => state.setUserLoading);

  return (
    <Select
      value={userType || "LOADING"}
      onValueChange={(value) => {
        if (value === "LOADING") {
          return setUserLoading(true);
        }
        setUserLoading(false);
        if (value === "LOGGED_OUT") {
          return setUserType(null);
        }
        setUserType(value as AccountType);
      }}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select user type' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Account Types</SelectLabel>
          <SelectItem value='PUBLIC'>Public</SelectItem>
          <SelectItem value='VENUE'>Venue</SelectItem>
          <SelectItem value='ORGANIZER'>Organizer</SelectItem>
          <SelectItem value='PERFORMER'>Performer</SelectItem>
          <SelectItem value='ASSOCIATE'>Associate</SelectItem>
          <SelectItem value='LOGGED_OUT'>Logged Out</SelectItem>
          <SelectItem value='LOADING'>Loading</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const UpgradeUserAccount = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-center font-semibold tracking-tight text-xl mb-2'>
        Upgrade User Account
      </h1>
      <AccountTypeTest />
    </div>
  );
};
