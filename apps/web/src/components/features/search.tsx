"use client";

// import { events } from "@repo/mock-data";
// import { musicians } from "@repo/mock-data";
// import { bands } from "@repo/mock-data";
// import { organizers } from "@repo/mock-data";
// import { venues } from "@repo/mock-data";

import { searchItems } from "@repo/mock-data";
import { cn } from "@repo/ui/helpers";
import { useDebounce } from "use-debounce";
import { useState, useEffect, useRef } from "react";
import {
  Loader2,
  ArrowLeft,
  X as CloseIcon,
  Search as SearchIcon,
} from "@repo/ui/icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { CircularIconButton } from "@repo/ui/components/circular-icon-button";

type SearchResult = {
  id: string;
  title: string;
  type: "event" | "venue" | "performer" | "organizer";
};

export function DesktopSearch() {
  return <></>;
}

export function MobileSearch() {
  return <></>;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedQuery) {
      setIsLoading(true);
      // Simulating API call
      setTimeout(() => {
        setResults(searchItems);
        setIsLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const handleOpen = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleClose = () => {
    setQuery("");
  };

  return (
    <>
      <div className='group hidden md:block relative w-full max-w-md'>
        <SearchIcon
          className={cn(
            "absolute text-gray-500 z-10",
            "h-5 w-5",
            "absolute top-1/2 left-2.5 transform -translate-y-1/2",
            "transition-transform duration-300 ease-in-out",
            "group-hover:scale-110"
          )}
          onClick={() => searchBarRef.current?.focus()}
        />
        <Input
          ref={searchBarRef}
          type='search'
          placeholder='Search events, venues, performers...'
          className={cn(
            "rounded-full",
            "pl-9 pr-4",
            "backdrop-blur-sm",
            "transition-all duration-300 ease-in-out"
          )}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* {query && (
          <SearchResults
            results={results}
            isLoading={isLoading}
          />
        )} */}
      </div>
      <Dialog onOpenChange={(open) => !open && handleClose()}>
        <DialogTrigger asChild>
          <CircularIconButton
            label='Open search'
            icon={<SearchIcon />}
            className='md:hidden'
            onClick={handleOpen}
          />
        </DialogTrigger>
        <DialogContent className='p-0 h-full flex flex-col max-w-full md:hidden'>
          <DialogTitle className='sr-only'>Search Site</DialogTitle>
          <div className='flex items-center p-4 border-b'>
            <DialogClose asChild>
              <Button
                variant='ghost'
                size='icon'
                className='mr-2'
                onClick={handleClose}
              >
                <ArrowLeft className='h-5 w-5' />
                <span className='sr-only'>Back</span>
              </Button>
            </DialogClose>
            <div className='relative flex-grow'>
              <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
              <Input
                ref={inputRef}
                type='search'
                placeholder='Search events, venues, performers...'
                className='pl-9 pr-4'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <Button
                  variant='ghost'
                  size='sm'
                  className='absolute right-1 top-1/2 -translate-y-1/2'
                  onClick={() => setQuery("")}
                >
                  <CloseIcon className='h-4 w-4' />
                  <span className='sr-only'>Clear search</span>
                </Button>
              )}
            </div>
          </div>
          <div className='flex-grow overflow-auto'>
            <SearchResults
              results={results}
              isLoading={isLoading}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
type SearchResultsProps = {
  results: SearchResult[];
  isLoading: boolean;
};

function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Loader2 className='h-6 w-6 animate-spin text-gray-500' />
        <span className='ml-2 text-sm text-gray-500'>Searching...</span>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className='p-4'>
        <p className='text-sm text-gray-500'>No results found</p>
      </div>
    );
  }

  return (
    <div className='divide-y divide-gray-200'>
      {results.map((result) => (
        <div
          key={result.id}
          className='p-4 hover:bg-gray-50'
        >
          <a
            href='#'
            className='flex items-center'
          >
            <div className='flex-shrink-0 mr-4'>
              {result.type === "event" && <EventIcon />}
              {result.type === "venue" && <VenueIcon />}
              {result.type === "performer" && <PerformerIcon />}
              {result.type === "organizer" && <OrganizerIcon />}
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-900'>
                {result.title}
              </h3>
              <p className='text-xs text-gray-500 capitalize'>{result.type}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

function EventIcon() {
  return (
    <svg
      className='h-6 w-6 text-blue-500'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
      />
    </svg>
  );
}

function VenueIcon() {
  return (
    <svg
      className='h-6 w-6 text-green-500'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
      />
    </svg>
  );
}

function PerformerIcon() {
  return (
    <svg
      className='h-6 w-6 text-purple-500'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
      />
    </svg>
  );
}

function OrganizerIcon() {
  return (
    <svg
      className='h-6 w-6 text-yellow-500'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
      />
    </svg>
  );
}
