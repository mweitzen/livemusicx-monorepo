import { useState, useEffect } from "react";

const mockExistingProfiles = [
  { id: 1, name: "John Doe", genres: ["rock"], location: "New York" },
  { id: 2, name: "Jane Smith", genres: ["pop"], location: "Los Angeles" },
  { id: 3, name: "Bob Johnson", genres: ["jazz"], location: "Chicago" },
];
export type MockProfile = (typeof mockExistingProfiles)[number];

export function useSearchProfiles(
  type: "musicians" | "bands" | "organizers",
  query?: string
) {
  const [searchResults, setSearchResults] = useState<
    typeof mockExistingProfiles | null
  >(null);

  useEffect(() => {
    if (query && query.length >= 2) {
      const results = mockExistingProfiles.filter((profile) =>
        profile.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  console.log(type);

  return searchResults;
}
