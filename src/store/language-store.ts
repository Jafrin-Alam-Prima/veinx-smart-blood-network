"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/types";

interface LanguageState {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
      toggle: () => set((s) => ({ locale: s.locale === "en" ? "bn" : "en" })),
    }),
    { name: "veinx-locale" },
  ),
);
