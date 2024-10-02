import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { GooglePlaceResult } from "~/google-maps/lib/google-maps";

type State = {
  venues: GooglePlaceResult[];
};

type Actions = {
  addVenue: (venue: GooglePlaceResult) => void;
};

export const useAppStore = create<State & Actions>()(
  persist(
    (set) => ({
      venues: [],
      addVenue: (venue) =>
        set((state) => ({
          venues: [...state.venues, venue],
        })),
    }),
    {
      name: "live-music-x",
      partialize: (state) => ({ venues: state.venues }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
