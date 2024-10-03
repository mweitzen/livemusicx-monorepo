import React, { useState, useCallback, useRef, KeyboardEvent } from "react";
import { useCombobox } from "downshift";
import { X } from "lucide-react";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";

const genres = [
  "Rock",
  "Pop",
  "Jazz",
  "Hip Hop",
  "Electronic",
  "Classical",
  "Country",
  "Blues",
  "R&B",
  "Reggae",
  "Folk",
  "Metal",
  "Punk",
  "Soul",
  "Funk",
  "Disco",
  "Techno",
  "House",
  "Ambient",
  "Indie",
];

export default function GenreInput() {
  const [inputValue, setInputValue] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredGenres = genres.filter(
    (genre) =>
      genre.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedGenres.includes(genre)
  );

  const addGenre = useCallback(
    (genre: string) => {
      if (genre && !selectedGenres.includes(genre) && genres.includes(genre)) {
        setSelectedGenres((prev) => [...prev, genre]);
        setInputValue("");
      }
    },
    [selectedGenres]
  );

  const removeGenre = useCallback((genre: string) => {
    setSelectedGenres((prev) => prev.filter((g) => g !== genre));
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && inputValue) {
        event.preventDefault();
        const genresToAdd = inputValue.split(",").map((g) => g.trim());
        genresToAdd.forEach(addGenre);
      } else if (event.key === "," && inputValue) {
        event.preventDefault();
        addGenre(inputValue.trim());
      }
    },
    [inputValue, addGenre]
  );

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getToggleButtonProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: filteredGenres,
    inputValue,
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue || "");
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        addGenre(selectedItem);
      }
    },
  });

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='flex flex-wrap gap-2 mb-2'>
        {selectedGenres.map((genre) => (
          <Badge
            key={genre}
            variant='secondary'
            className='text-sm'
          >
            {genre}
            <Button
              variant='ghost'
              size='sm'
              className='ml-1 h-auto p-0 text-muted-foreground hover:text-foreground'
              onClick={() => removeGenre(genre)}
            >
              <X className='h-3 w-3' />
              <span className='sr-only'>Remove {genre}</span>
            </Button>
          </Badge>
        ))}
      </div>
      <div
        {...getToggleButtonProps()}
        className='relative'
      >
        <Input
          {...getInputProps({
            ref: inputRef,
            onKeyDown: handleKeyDown,
            placeholder: "Type genres (comma-separated)",
            className: "w-full",
          })}
        />
        <ul
          {...getMenuProps()}
          className={`absolute z-10 w-full bg-background border border-input rounded-md mt-1 max-h-60 overflow-auto ${
            !(isOpen && filteredGenres.length) && "hidden"
          }`}
        >
          {isOpen &&
            filteredGenres.map((item, index) => (
              <li
                key={item}
                {...getItemProps({ item, index })}
                className={`px-2 py-1 cursor-pointer ${
                  highlightedIndex === index
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
