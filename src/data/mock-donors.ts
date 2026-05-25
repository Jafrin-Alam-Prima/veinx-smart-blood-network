import type { Donor, BloodGroup } from "@/types";
import { BLOOD_GROUPS, DHAKA_AREAS } from "@/lib/constants";
import { BD_NAMES } from "./names";

/** Tiny seeded PRNG (mulberry32) so the donor set is identical every load. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function phone(rand: () => number) {
  const ops = ["13", "14", "15", "16", "17", "18", "19"];
  const op = ops[Math.floor(rand() * ops.length)];
  let rest = "";
  for (let i = 0; i < 8; i++) rest += Math.floor(rand() * 10);
  return `+8801${op}${rest}`;
}

function generateDonors(count: number): Donor[] {
  const rand = mulberry32(42);
  const donors: Donor[] = [];

  for (let i = 0; i < count; i++) {
    const area = DHAKA_AREAS[Math.floor(rand() * DHAKA_AREAS.length)];
    const name = BD_NAMES[i % BD_NAMES.length];
    const bloodGroup: BloodGroup =
      BLOOD_GROUPS[Math.floor(rand() * BLOOD_GROUPS.length)];

    // Scatter within ~1.2km of the area centroid.
    const lat = area.lat + (rand() - 0.5) * 0.022;
    const lng = area.lng + (rand() - 0.5) * 0.022;

    const totalDonations = Math.floor(rand() * 45);
    const daysSinceLastDonation = Math.floor(rand() * 220);

    donors.push({
      id: `donor-${i + 1}`,
      name: name.en,
      nameBn: name.bn,
      bloodGroup,
      lat,
      lng,
      area: area.name,
      areaBn: area.nameBn,
      phone: phone(rand),
      available: rand() > 0.32,
      predictedAvailability: Math.floor(45 + rand() * 55),
      daysSinceLastDonation,
      totalDonations,
      rating: Math.round((3.6 + rand() * 1.4) * 10) / 10,
      verified: rand() > 0.25,
      heading: rand() * Math.PI * 2,
    });
  }
  return donors;
}

export const MOCK_DONORS: Donor[] = generateDonors(64);
