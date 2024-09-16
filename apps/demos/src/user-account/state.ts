import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AccountType } from "@prisma/client";

type State = {
  userLoading: boolean;
  userType: AccountType | null;
};

type Actions = {
  setUserLoading: (loading: boolean) => void;
  setUserType: (type: AccountType | null) => void;
};

export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      userLoading: false,
      userType: "PUBLIC",
      setUserLoading: (loading) => set({ userLoading: loading }),
      setUserType: (type) => set({ userType: type }),
    }),
    {
      name: "livemusicx-user-store",
      partialize: (state) => ({ userType: state.userType }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
