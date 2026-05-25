"use client";

import { create } from "zustand";
import type { Donor } from "@/types";
import { MOCK_DONORS } from "@/data/mock-donors";
import { DHAKA_CENTER } from "@/lib/constants";

export interface Viewport {
  longitude: number;
  latitude: number;
  zoom: number;
}

interface MapState {
  viewport: Viewport;
  donors: Donor[];
  selectedDonorId: string | null;
  setViewport: (v: Partial<Viewport>) => void;
  selectDonor: (id: string | null) => void;
  /** Sim tick: drift available donors slightly to feel "live". */
  tickDonors: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  viewport: {
    longitude: DHAKA_CENTER.lng,
    latitude: DHAKA_CENTER.lat,
    zoom: 12.2,
  },
  donors: MOCK_DONORS,
  selectedDonorId: null,
  setViewport: (v) => set((s) => ({ viewport: { ...s.viewport, ...v } })),
  selectDonor: (selectedDonorId) => set({ selectedDonorId }),
  tickDonors: () =>
    set((s) => ({
      donors: s.donors.map((d) => {
        if (!d.available) return d;
        const step = 0.00018;
        const heading = d.heading + (Math.random() - 0.5) * 0.6;
        return {
          ...d,
          heading,
          lat: d.lat + Math.sin(heading) * step,
          lng: d.lng + Math.cos(heading) * step,
        };
      }),
    })),
}));
