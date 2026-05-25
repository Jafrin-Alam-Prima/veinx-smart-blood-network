"use client";

import { create } from "zustand";
import type {
  BloodGroup,
  Emergency,
  EmergencyStatus,
  MatchedDonor,
  Urgency,
} from "@/types";
import { MOCK_HOSPITALS } from "@/data/mock-hospitals";
import { MOCK_EMERGENCIES } from "@/data/mock-emergencies";

interface Draft {
  patientName: string;
  bloodGroup: BloodGroup;
  units: number;
  urgency: Urgency;
  isMaternal: boolean;
  hospitalId: string;
  note?: string;
}

const DEFAULT_DRAFT: Draft = {
  patientName: "",
  bloodGroup: "O-",
  units: 2,
  urgency: "critical",
  isMaternal: false,
  hospitalId: MOCK_HOSPITALS[0].id,
};

interface EmergencyState {
  draft: Draft;
  active: Emergency | null;
  matches: MatchedDonor[];
  selected: MatchedDonor | null;
  liveEmergencies: Emergency[];
  updateDraft: (patch: Partial<Draft>) => void;
  resetDraft: () => void;
  commitEmergency: () => Emergency;
  setMatches: (m: MatchedDonor[], aiScore: number) => void;
  selectMatch: (m: MatchedDonor) => void;
  setStatus: (s: EmergencyStatus) => void;
}

export const useEmergencyStore = create<EmergencyState>((set, get) => ({
  draft: DEFAULT_DRAFT,
  active: null,
  matches: [],
  selected: null,
  liveEmergencies: MOCK_EMERGENCIES,

  updateDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
  resetDraft: () => set({ draft: DEFAULT_DRAFT, matches: [], selected: null }),

  commitEmergency: () => {
    const { draft } = get();
    const hospital =
      MOCK_HOSPITALS.find((h) => h.id === draft.hospitalId) ?? MOCK_HOSPITALS[0];
    const emergency: Emergency = {
      id: `emg-${Date.now().toString().slice(-5)}`,
      patientName: draft.patientName || "Anonymous Patient",
      bloodGroup: draft.bloodGroup,
      units: draft.units,
      urgency: draft.urgency,
      isMaternal: draft.isMaternal,
      hospitalId: hospital.id,
      lat: hospital.lat,
      lng: hospital.lng,
      status: "searching",
      aiScore: 0,
      matchedDonorIds: [],
      note: draft.note,
      createdAt: Date.now(),
    };
    set({ active: emergency, matches: [], selected: null });
    return emergency;
  },

  setMatches: (matches, aiScore) =>
    set((s) => ({
      matches,
      active: s.active ? { ...s.active, aiScore } : s.active,
    })),

  selectMatch: (selected) =>
    set((s) => ({
      selected,
      active: s.active
        ? {
            ...s.active,
            status: "matched",
            matchedDonorIds: [selected.donor.id],
          }
        : s.active,
    })),

  setStatus: (status) =>
    set((s) => ({ active: s.active ? { ...s.active, status } : s.active })),
}));
