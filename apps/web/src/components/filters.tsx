"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";

import { Slider } from "@repo/ui/components/slider";
// import { Switch } from "@repo/ui/components/switch";

import { List, Map as MapIcon } from "@repo/ui/icons";
import { Checkbox } from "@repo/ui/components/checkbox";

export const GenreFilter = () => {
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <div>
      <Label htmlFor='mobile-genre'>Genre</Label>
      <Select
        value={selectedGenre}
        onValueChange={setSelectedGenre}
      >
        <SelectTrigger id='mobile-genre'>
          <SelectValue placeholder='Select genre' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='All'>All Genres</SelectItem>
          <SelectItem value='Rock'>Rock</SelectItem>
          <SelectItem value='Pop'>Pop</SelectItem>
          <SelectItem value='Jazz'>Jazz</SelectItem>
          <SelectItem value='Classical'>Classical</SelectItem>
          <SelectItem value='Electronic'>Electronic</SelectItem>
          <SelectItem value='Hip Hop'>Hip Hop</SelectItem>
          <SelectItem value='Country'>Country</SelectItem>
          <SelectItem value='R&B'>R&B</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export const PriceFilter = () => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  return (
    <div>
      <Label htmlFor='mobile-price-range'>
        Price Range: ${priceRange[0]} - ${priceRange[1]}
      </Label>
      <Slider
        id='mobile-price-range'
        min={0}
        max={200}
        step={10}
        value={priceRange}
        onValueChange={setPriceRange}
        className='mt-2'
      />
    </div>
  );
};

export const DateFilter = () => {
  const [dateRange, setDateRange] = useState([
    new Date(),
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  ]);
  return (
    <div>
      <Label htmlFor='mobile-date-range'>Date Range</Label>
      <div className='flex flex-col space-y-2'>
        <Input
          type='date'
          value={dateRange[0].toISOString().split("T")[0]}
          onChange={(e) =>
            setDateRange([new Date(e.target.value), dateRange[1]])
          }
        />
        <Input
          type='date'
          value={dateRange[1].toISOString().split("T")[0]}
          onChange={(e) =>
            setDateRange([dateRange[0], new Date(e.target.value)])
          }
        />
      </div>
    </div>
  );
};

export const LocationFilter = () => {
  const [selectedLocation, setSelectedLocation] = useState("");

  return (
    <div>
      <Label htmlFor='mobile-location'>Location</Label>
      <Input
        id='mobile-location'
        type='text'
        placeholder='Enter city or venue'
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      />
    </div>
  );
};

export const TagsFilter = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <div>
      <Label>Tags</Label>
      <div className='grid grid-cols-2 gap-2 mt-2'>
        {["Child friendly", "Holiday", "Free", "Theme"].map((tag) => (
          <div
            key={tag}
            className='flex items-center space-x-2'
          >
            <Checkbox
              id={`tag-${tag}`}
              checked={selectedTags.includes(tag)}
              onCheckedChange={(checked) => {
                setSelectedTags(
                  checked
                    ? [...selectedTags, tag]
                    : selectedTags.filter((t) => t !== tag)
                );
              }}
            />
            <label
              htmlFor={`tag-${tag}`}
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              {tag}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const EventSorting = () => {
  const [sortBy, setSortBy] = useState("date");
  return (
    <Select
      value={sortBy}
      onValueChange={setSortBy}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Sort by' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='date'>Date</SelectItem>
        <SelectItem value='price'>Price</SelectItem>
        <SelectItem value='rating'>Rating</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const ToggleView = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  return (
    <div className='flex items-center space-x-2'>
      <Button
        variant={viewMode === "list" ? "default" : "outline"}
        size='icon'
        onClick={() => setViewMode("list")}
        aria-label='List view'
      >
        <List className='h-4 w-4' />
      </Button>
      <Button
        variant={viewMode === "map" ? "default" : "outline"}
        size='icon'
        onClick={() => setViewMode("map")}
        aria-label='Map view'
      >
        <MapIcon className='h-4 w-4' />
      </Button>
    </div>
  );
};
