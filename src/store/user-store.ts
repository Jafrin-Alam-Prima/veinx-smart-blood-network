"use client";

import { create } from "zustand";
import type { Role } from "@/types";

interface UserState {
  role: Role;
  isOnline: boolean;
  /** Which mock donor the user "is" in donor mode. */
  donorId: string;
  setRole: (r: Role) => void;
  setOnline: (v: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  role: "patient",
  isOnline: true,
  donorId: "donor-7",
  setRole: (role) => set({ role }),
  setOnline: (isOnline) => set({ isOnline }),
}));
