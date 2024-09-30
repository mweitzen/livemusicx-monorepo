import { useEffect, useState } from "react";
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

const mockAccounts = [
  {
    id: "1",
    name: "The Beatles",
    basedIn: {
      name: "Liverpool",
    },
  },
  {
    id: "2",
    name: "The Rolling Stones",
    basedIn: {
      name: "London",
    },
  },
  {
    id: "3",
    name: "The Who",
    basedIn: {
      name: "London",
    },
  },
];

export const UnclaimedAccountSearch = ({
  type,
}: {
  type: "musician" | "group" | "organizer" | null;
}) => {
  const [loading, setLoading] = useState(false);
  const [unclaimedAccounts, setUnclaimedAccounts] = useState<
    typeof mockAccounts
  >([]);
  const [dbData, setDbData] = useState<any[]>([]);

  const { control, setValue } = useFormContext();
  const inputName = useWatch({ name: "name" }) as string;

  useEffect(() => {
    // TODO: implement api call
    // mock api call to check for account
    function mockApiCall(): Promise<typeof mockAccounts> {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            mockAccounts.filter((account) =>
              account.name
                .toLowerCase()
                .split(" ")
                .join("")
                .includes(inputName.toLowerCase().split(" ").join("")),
            ),
          );
        }, 1000);
      });
    }
    if (inputName.length > 2) {
      setLoading(true);
      mockApiCall().then((res) => {
        setUnclaimedAccounts(res);
        setLoading(false);
      });
    }
  }, [inputName]);

  // useEffect(() => {
  //   axios
  //     .get("https://www.livemusicx.com/api/internal/accounts.performers.getAll")
  //     .then(
  //       ({
  //         status,
  //         statusText,
  //         data: {
  //           result: {
  //             data: { json: data },
  //           },
  //         },
  //       }) => {
  //         if (status !== 200) {
  //           throw new Error(statusText);
  //         }
  //         return setDbData(data);
  //       }
  //     )
  //     .catch((error) => {
  //       console.log("ERROR", error);
  //     });
  //   axios
  //     .get("https://www.livemusicx.com/api/v1/locations/states")
  //     .then(({ status, statusText, data }) => {
  //       if (status !== 200) {
  //         throw new Error(statusText);
  //       }
  //       console.log(data);
  //     });
  // }, []);

  if (!type) return null;

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={control}
        name="name"
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
        type="button"
        size="lg"
        disabled={loading || inputName.length <= 2}
        onClick={async () => {
          setValue("createType", "create");
        }}
      >
        Create New Account
      </Button>
      <Separator className="my-4" />
      <div>
        <p className="text-lg font-semibold">Unclaimed Accounts</p>
        <p className="text-sm text-muted-foreground">
          Accounts can be created by other users referencing you in their
          events. Unclaimed accounts that match your search will appear below.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {inputName.length > 2
          ? loading
            ? "Loading..."
            : unclaimedAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="text-lg font-semibold">{account.name}</p>
                    <span className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4" /> {account.basedIn.name}
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
        {dbData.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <p className="text-lg font-semibold">{account.name}</p>
              <span className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" /> {account.basedIn.name}
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
        ))}
      </div>
    </div>
  );
};
