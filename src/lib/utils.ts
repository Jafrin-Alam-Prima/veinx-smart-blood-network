import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (conditional + conflict resolution). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Haversine distance between two lat/lng points, in kilometers. */
export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(h));
}

/** Linear interpolation. */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Format a number with thousands separators (en). */
export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

/** Western digits -> Bengali numerals (for bn locale display). */
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
export function toBengaliDigits(input: string | number) {
  return String(input).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/** Locale-aware number formatting (Bengali numerals for bn). */
export function localizeNumber(n: number | string, locale: "en" | "bn") {
  const s = typeof n === "number" ? formatNumber(n) : n;
  return locale === "bn" ? toBengaliDigits(s) : s;
}
