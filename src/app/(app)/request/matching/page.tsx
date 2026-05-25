"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { MapCanvas } from "@/components/map/map-canvas";
import { DonorLayer } from "@/components/map/donor-layer";
import { DestinationMarker } from "@/components/map/donor-marker";
import { EmergencyRadius } from "@/components/map/emergency-radius";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { DonorCard } from "@/components/donor/donor-card";
import { TriagePanel } from "@/components/emergency/triage-panel";
import { MatchingOverlay } from "@/components/emergency/matching-overlay";
import { useEmergencyStore } from "@/store/emergency-store";
import { useMapStore } from "@/store/map-store";
import {
  rankDonors,
  compatibleCount,
  computeEmergencyScore,
} from "@/lib/matching";
import { useT } from "@/lib/i18n";

export default function MatchingPage() {
  const router = useRouter();
  const { t, n } = useT();
  const active = useEmergencyStore((s) => s.active);
  const matches = useEmergencyStore((s) => s.matches);
  const setMatches = useEmergencyStore((s) => s.setMatches);
  const selectMatch = useEmergencyStore((s) => s.selectMatch);
  const donors = useMapStore((s) => s.donors);
  const setViewport = useMapStore((s) => s.setViewport);
  const selectDonor = useMapStore((s) => s.selectDonor);
  const selectedDonorId = useMapStore((s) => s.selectedDonorId);

  const [phase, setPhase] = React.useState<"matching" | "results">("matching");

  // No active request → bounce back to the wizard.
  React.useEffect(() => {
    if (!active) router.replace("/request");
  }, [active, router]);

  // Center the map on the emergency.
  React.useEffect(() => {
    if (active)
      setViewport({ longitude: active.lng, latitude: active.lat, zoom: 13.4 });
  }, [active, setViewport]);

  // Compute ranking once.
  const computed = React.useMemo(() => {
    if (!active) return null;
    const ranked = rankDonors(donors, active);
    const score = computeEmergencyScore(active, ranked.length);
    return { ranked, score };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.id]);

  const onDone = React.useCallback(() => {
    if (computed) {
      setMatches(computed.ranked, computed.score);
      if (computed.ranked[0]) selectDonor(computed.ranked[0].donor.id);
    }
    setPhase("results");
  }, [computed, setMatches, selectDonor]);

  if (!active) return null;

  const best = matches[0];
  const selected =
    matches.find((m) => m.donor.id === selectedDonorId) ?? best ?? null;

  return (
    <div className="fixed inset-0">
      <MapCanvas>
        <EmergencyRadius lng={active.lng} lat={active.lat} radiusKm={5} />
        <DonorLayer recipientGroup={active.bloodGroup} />
        <DestinationMarker lng={active.lng} lat={active.lat} />
      </MapCanvas>

      <AnimatePresence>
        {phase === "matching" && (
          <MatchingOverlay
            total={donors.length}
            compatible={compatibleCount(donors, active.bloodGroup)}
            onDone={onDone}
          />
        )}
      </AnimatePresence>

      {phase === "results" && (
        <BottomSheet open onClose={() => router.push("/map")} peekHeight={360}>
          <div className="mx-auto max-w-3xl space-y-4 pb-24">
            {selected && <TriagePanel match={selected} aiScore={active.aiScore} />}

            <div>
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-base font-semibold">
                  {t("match.bestMatch")}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {n(matches.length)} compatible
                </span>
              </div>
              <div className="space-y-2.5">
                {matches.slice(0, 12).map((m, i) => (
                  <DonorCard
                    key={m.donor.id}
                    match={m}
                    rank={i}
                    active={selected?.donor.id === m.donor.id}
                    onSelect={() => selectDonor(m.donor.id)}
                    onRequest={(match) => {
                      selectMatch(match);
                      router.push(`/request/${active.id}`);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  );
}
