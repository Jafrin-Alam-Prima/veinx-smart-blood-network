import { haversineKm } from "./utils";
import { DHAKA_AVG_SPEED_KMH } from "./constants";
import type { LatLng } from "@/types";

/**
 * Mock ETA: straight-line distance scaled by a road-factor, divided by an
 * average Dhaka traffic speed. Deterministic so the demo is repeatable.
 */
export function estimateEtaMin(from: LatLng, to: LatLng): number {
  const straight = haversineKm(from, to);
  const roadFactor = 1.35; // roads are not straight lines
  const km = straight * roadFactor;
  const minutes = (km / DHAKA_AVG_SPEED_KMH) * 60;
  return Math.max(2, Math.round(minutes));
}

export function distanceKm(from: LatLng, to: LatLng): number {
  return Math.round(haversineKm(from, to) * 10) / 10;
}
