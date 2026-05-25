"use client";

import { create } from "zustand";
import type { Role } from "@/types";

interface UserState {
  role: Role;
  isOnline: boolean;
  /** Demo-only override to showcase the offline / SMS-fallback experience. */
  demoOffline: boolean;
  /** Which mock donor the user "is" in donor mode. */
  donorId: string;
  /** Whether the user has registered as a donor. */
  registered: boolean;
  setRole: (r: Role) => void;
  setOnline: (v: boolean) => void;
  setDemoOffline: (v: boolean) => void;
  setDonorId: (id: string) => void;
  setRegistered: (v: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  role: "patient",
  isOnline: true,
  demoOffline: false,
  donorId: "donor-7",
  registered: false,
  setRole: (role) => set({ role }),
  setOnline: (isOnline) => set({ isOnline }),
  setDemoOffline: (demoOffline) => set({ demoOffline }),
  setDonorId: (donorId) => set({ donorId }),
  setRegistered: (registered) => set({ registered }),
}));

/** True when the app should present the offline experience. */
export function selectOffline(s: UserState) {
  return !s.isOnline || s.demoOffline;
}
