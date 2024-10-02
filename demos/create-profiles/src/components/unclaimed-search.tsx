import { api } from "@repo/trpc/react";
import { useFormContext, useWatch } from "react-hook-form";
import { capitalize } from "@repo/utils";

import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { Separator } from "@repo/ui/components/separator";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@repo/ui/components/form";
import { ClaimAccountButton } from "./claim-account";

export const UnclaimedAccountSearch = ({
  type,
}: {
  type: "MUSICIAN" | "BAND" | "ORGANIZER" | null;
}) => {
  const { data: unclaimedAccounts, isLoading } = api.accounts.getAll.useQuery({
    type: type || "MUSICIAN",
  });
  const { control, setValue } = useFormContext();
  const inputName = useWatch({ name: "name" }) as string;

  if (!type) return null;

  return (
    <div className='flex flex-col gap-4'>
      <FormField
        control={control}
        name='name'
        render={({ field: { ...field } }) => (
          <FormItem>
            <FormLabel>{capitalize(type)} Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (inputName.length > 2) {
                      setValue("createType", "create");
                    }
                  }
                }}
              />
            </FormControl>
            <FormDescription>
              Hint: Try searching for different variations of the {type} name if
              you think it may already have been added.
            </FormDescription>
          </FormItem>
        )}
      />
      <Button
        type='button'
        size='lg'
        disabled={isLoading || inputName.length <= 2}
        onClick={async () => {
          setValue("createType", "create");
        }}
      >
        Create New Account
      </Button>
      <Separator className='my-4' />
      <div>
        <p className='text-lg font-semibold'>Unclaimed Accounts</p>
        <p className='text-sm text-muted-foreground'>
          Accounts can be created by other users referencing you in their
          events. Unclaimed accounts that match your search will appear below.
        </p>
      </div>
      <div className='flex flex-col gap-2'>
        {inputName.length > 2
          ? isLoading
            ? "Loading..."
            : unclaimedAccounts.map((account) => (
                <div
                  key={account.id}
                  className='flex justify-between p-4 rounded-lg border items-center'
                >
                  <div>
                    <p className='text-lg font-semibold'>{account.name}</p>
                    <span className='flex gap-2 items-center'>
                      <MapPinIcon className='h-4 w-4' /> {account.basedIn.name}
                    </span>
                  </div>
                  <ClaimAccountButton
                    callback={() => {
                      setValue("createType", "claim");
                      setValue("name", account.name);
                    }}
                    account={account}
                  />
                </div>
              ))
          : "Start typing to see unclaimed accounts."}
      </div>
    </div>
  );
};
