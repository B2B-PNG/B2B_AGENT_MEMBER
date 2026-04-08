import type { IUser } from "@/hooks/interfaces/auth";
import { create } from "zustand";

interface UserState {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  clearUser: () => set({ user: null, isLoading: false }),
}));

export const useIsLoggedIn = () => {
  const user = useUserStore((state) => state.user);
  return !!user;
};