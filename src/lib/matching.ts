import type { Donor, Emergency, MatchedDonor, BloodGroup } from "@/types";
import { isCompatible, URGENCY_META } from "./constants";
import { distanceKm, estimateEtaMin } from "./eta";
import { clamp } from "./utils";

const WEIGHTS = {
  compatibility: 30,
  proximity: 28,
  availability: 20,
  reliability: 12,
  maternal: 10,
};

/** Eligible to donate again after 90 days. */
export function isEligible(donor: Donor) {
  return donor.daysSinceLastDonation >= 90;
}

/**
 * Score a single donor against an emergency. Returns the weighted breakdown
 * plus human-readable reasons for the explainable-AI triage panel.
 */
export function scoreDonor(donor: Donor, emergency: Emergency): MatchedDonor {
  const exact = donor.bloodGroup === emergency.bloodGroup;
  const compatNorm = exact ? 1 : 0.78;

  const dist = distanceKm(donor, emergency);
  const eta = estimateEtaMin(donor, emergency);
  const proximityNorm = clamp(1 - dist / 12, 0, 1);

  const availNorm = donor.predictedAvailability / 100;

  const reliabilityNorm =
    (donor.rating / 5) * 0.6 +
    (donor.verified ? 0.25 : 0) +
    clamp(donor.totalDonations / 40, 0, 1) * 0.15;

  const maternalNorm = emergency.isMaternal ? proximityNorm : 0;

  const breakdown = {
    compatibility: Math.round(WEIGHTS.compatibility * compatNorm),
    proximity: Math.round(WEIGHTS.proximity * proximityNorm),
    availability: Math.round(WEIGHTS.availability * availNorm),
    reliability: Math.round(WEIGHTS.reliability * reliabilityNorm),
    maternal: Math.round(WEIGHTS.maternal * maternalNorm),
  };

  const matchScore = clamp(
    breakdown.compatibility +
      breakdown.proximity +
      breakdown.availability +
      breakdown.reliability +
      breakdown.maternal,
    0,
    99,
  );

  const reasons: string[] = [];
  reasons.push(
    exact
      ? `Exact ${donor.bloodGroup} match`
      : `${donor.bloodGroup} compatible with ${emergency.bloodGroup}`,
  );
  reasons.push(`${dist} km away · ~${eta} min ETA`);
  if (donor.predictedAvailability >= 70)
    reasons.push(`Predicted ${donor.predictedAvailability}% available now`);
  if (donor.verified && donor.totalDonations >= 10)
    reasons.push(`Trusted donor · ${donor.totalDonations} prior donations`);
  if (emergency.isMaternal)
    reasons.push("Prioritized under Maternal Priority Routing");

  return { donor, distanceKm: dist, etaMin: eta, matchScore, breakdown, reasons };
}

/** Rank all compatible, eligible donors for an emergency, best first. */
export function rankDonors(
  donors: Donor[],
  emergency: Emergency,
): MatchedDonor[] {
  return donors
    .filter(
      (d) =>
        d.available &&
        isEligible(d) &&
        isCompatible(emergency.bloodGroup, d.bloodGroup),
    )
    .map((d) => scoreDonor(d, emergency))
    .sort((a, b) => b.matchScore - a.matchScore);
}

/** How many donors in the pool are even compatible (for the AI narration). */
export function compatibleCount(donors: Donor[], group: BloodGroup) {
  return donors.filter((d) => isCompatible(group, d.bloodGroup)).length;
}

/**
 * Overall AI Emergency Score 0-100 — urgency, units needed, maternal flag,
 * and how scarce supply is relative to demand.
 */
export function computeEmergencyScore(
  emergency: Pick<Emergency, "urgency" | "units" | "isMaternal" | "bloodGroup">,
  matchCount: number,
): number {
  const urgency = URGENCY_META[emergency.urgency].weight; // 0.4-1
  const unitsFactor = clamp(emergency.units / 4, 0.25, 1);
  const scarcity = clamp(1 - matchCount / 25, 0, 1); // fewer matches => higher
  const maternal = emergency.isMaternal ? 0.12 : 0;

  const score =
    100 *
    clamp(0.5 * urgency + 0.22 * unitsFactor + 0.28 * scarcity + maternal, 0, 1);
  return Math.round(score);
}
