"use client";

import { cn } from "@repo/ui/helpers";
import { format, addMonths } from "date-fns";

import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { Input } from "@repo/ui/components/input";
import { Toggle } from "@repo/ui/components/toggle";
import { Button } from "@repo/ui/components/button";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const SearchInput = ({
  className,
  name = "q",
  autoComplete = "off",
  placeholder = "Search",
  ...props
}: SearchInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const debouncedSearchQuery = useDebouncedCallback(handleSearchChange, 300);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value !== "") {
      newSearchParams.set("q", e.target.value);
    } else {
      newSearchParams.delete("q");
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  }

  return (
    <Input
      id="q"
      type="search"
      name={name}
      autoComplete={autoComplete}
      placeholder={placeholder}
      defaultValue={searchParams.get("q") || undefined}
      onChange={debouncedSearchQuery}
      className={cn(className)}
      {...props}
    />
  );
};

const ToggleFilter = ({
  name,
  label,
  selectedLabel = label,
  hidden = false,
}: {
  name: string;
  selectedLabel?: React.ReactNode;
  label: React.ReactNode;
  hidden?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const searchParamSelected = searchParams.has(name, "include");

  const toggleSearchParam = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    searchParamSelected ? params.delete(name) : params.set(name, "include");
    let workaround = 0;
    params.forEach(() => workaround++);
    return workaround
      ? router.replace(`${pathname}?${params.toString()}`)
      : router.replace(`${pathname}`);
  }, [searchParams, name, pathname, router, searchParamSelected]);

  if (hidden) return null;

  return (
    <Toggle
      name={name}
      variant="outline"
      pressed={searchParamSelected}
      onPressedChange={() => {
        toggleSearchParam();
      }}
      className="whitespace-nowrap"
    >
      {searchParamSelected ? selectedLabel : label}
    </Toggle>
  );
};

const ToggleWithUpcomingEvents = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const withUpcomingSelected = searchParams.has(
    "dateStart",
    format(new Date(), "yyyy-MM-dd"),
  );

  const toggleWithUpcoming = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (withUpcomingSelected) {
      params.delete("dateStart");
      params.delete("dateEnd");
    } else {
      params.set("dateStart", format(new Date(), "yyyy-MM-dd"));
      params.set("dateEnd", format(addMonths(new Date(), 1), "yyyy-MM-dd"));
    }

    let workaround = 0;
    params.forEach(() => workaround++);
    return workaround
      ? router.replace(`${pathname}?${params.toString()}`)
      : router.replace(`${pathname}`);
  }, [searchParams, pathname, router, withUpcomingSelected]);

  return (
    <Toggle
      variant="outline"
      pressed={withUpcomingSelected}
      onPressedChange={toggleWithUpcoming}
      className="whitespace-nowrap"
    >
      With Upcoming
    </Toggle>
  );
};

const TogglePerformerType = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  let workaround = 0;
  searchParams.forEach(() => workaround++);
  return (
    <>
      <Button
        onClick={() =>
          router.replace(
            `/performers${workaround ? `?${searchParams.toString()}` : ""}`,
          )
        }
        variant="outline"
        className={pathname === "/performers" ? "bg-secondary" : ""}
      >
        Performers
      </Button>
      <Button
        onClick={() =>
          router.replace(
            `/musicians${workaround ? `?${searchParams.toString()}` : ""}`,
          )
        }
        variant="outline"
        className={pathname === "/musicians" ? "bg-secondary" : ""}
      >
        Musicians
      </Button>
      <Button
        onClick={() =>
          router.replace(
            `/groups${workaround ? `?${searchParams.toString()}` : ""}`,
          )
        }
        variant="outline"
        className={pathname === "/groups" ? "bg-secondary" : ""}
      >
        Groups
      </Button>
    </>
  );
};

const ResetFilters = ({ callback }: { callback?: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  let workaround = 0;
  searchParams.forEach(() => workaround++);
  return (
    <Button
      type="reset"
      onClick={() => {
        if (callback) callback();
        router.replace(`${pathname}`);
      }}
      className={!workaround ? "hidden" : ""}
    >
      Clear
    </Button>
  );
};

export {
  SearchInput,
  ToggleFilter,
  ToggleWithUpcomingEvents,
  TogglePerformerType,
  ResetFilters,
};
