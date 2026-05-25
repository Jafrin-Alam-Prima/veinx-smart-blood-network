export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type LatLng = { lat: number; lng: number };

export type Urgency = "routine" | "urgent" | "critical";

export interface Donor {
  id: string;
  name: string; // English transliteration
  nameBn: string; // Bengali
  bloodGroup: BloodGroup;
  lat: number;
  lng: number;
  area: string;
  areaBn: string;
  phone: string; // +8801XXXXXXXXX
  available: boolean;
  /** AI "Predictive Availability" 0-100 — likelihood the donor responds now. */
  predictedAvailability: number;
  /** Days since last donation (eligibility >= 90). */
  daysSinceLastDonation: number;
  totalDonations: number;
  rating: number; // 0-5
  verified: boolean;
  /** Movement heading in radians, used by the sim to drift the marker. */
  heading: number;
}

export interface Hospital {
  id: string;
  name: string;
  nameBn: string;
  lat: number;
  lng: number;
  area: string;
  phone: string;
  beds: number;
  /** Units in the on-site blood bank by group. */
  bloodBank: Record<BloodGroup, number>;
}

export type EmergencyStatus =
  | "draft"
  | "searching"
  | "matched"
  | "en_route"
  | "arrived"
  | "fulfilled"
  | "cancelled";

export interface Emergency {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  units: number;
  urgency: Urgency;
  isMaternal: boolean;
  hospitalId: string;
  lat: number;
  lng: number;
  status: EmergencyStatus;
  /** AI Emergency Score 0-100. */
  aiScore: number;
  matchedDonorIds: string[];
  note?: string;
  createdAt: number; // epoch ms
}

/** A donor ranked against an emergency, with the AI score breakdown. */
export interface MatchedDonor {
  donor: Donor;
  distanceKm: number;
  etaMin: number;
  /** Smart Match 0-100. */
  matchScore: number;
  breakdown: {
    compatibility: number;
    proximity: number;
    availability: number;
    reliability: number;
    maternal: number;
  };
  /** Explainable-AI reasons, surfaced in the triage panel. */
  reasons: string[];
}

export interface Analytics {
  donationsToday: number;
  livesImpacted: number;
  activeDonors: number;
  avgResponseMin: number;
  fulfillmentRate: number;
  byBloodGroup: { group: BloodGroup; available: number; requests: number }[];
  weeklyTrend: { day: string; requests: number; fulfilled: number }[];
  heatmap: { area: string; lat: number; lng: number; intensity: number }[];
}

export type Role = "patient" | "donor" | "hospital";
export type Locale = "en" | "bn";
