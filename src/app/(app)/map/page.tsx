"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { MapCanvas } from "@/components/map/map-canvas";
import { DonorLayer } from "@/components/map/donor-layer";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { DonorCard } from "@/components/donor/donor-card";
import { Badge } from "@/components/ui/badge";
import { useMapStore } from "@/store/map-store";
import { rankDonors } from "@/lib/matching";
import { BLOOD_GROUPS, DHAKA_CENTER } from "@/lib/constants";
import { useT } from "@/lib/i18n";
import type { BloodGroup, Emergency, MatchedDonor } from "@/types";
import { cn } from "@/lib/utils";

export default function MapPage() {
  const router = useRouter();
  const { t, n } = useT();
  const donors = useMapStore((s) => s.donors);
  const selectedDonorId = useMapStore((s) => s.selectedDonorId);
  const selectDonor = useMapStore((s) => s.selectDonor);
  const [group, setGroup] = React.useState<BloodGroup>("O-");

  // Synthetic emergency at city center to rank donors in explore mode.
  const matches = React.useMemo<MatchedDonor[]>(() => {
    const synthetic: Emergency = {
      id: "explore",
      patientName: "",
      bloodGroup: group,
      units: 1,
      urgency: "urgent",
      isMaternal: false,
      hospitalId: "",
      lat: DHAKA_CENTER.lat,
      lng: DHAKA_CENTER.lng,
      status: "searching",
      aiScore: 0,
      matchedDonorIds: [],
      createdAt: 0,
    };
    return rankDonors(donors, synthetic).slice(0, 24);
  }, [donors, group]);

  const selected = matches.find((m) => m.donor.id === selectedDonorId) ?? null;

  return (
    <div className="fixed inset-0">
      <MapCanvas>
        <DonorLayer recipientGroup={group} />
      </MapCanvas>

      {/* group filter */}
      <div className="absolute inset-x-0 top-20 z-30 px-3">
        <div className="mx-auto flex max-w-3xl items-center gap-2 overflow-x-auto pb-1">
          <Badge variant="ai" className="shrink-0">
            <Search className="size-3" /> {n(matches.length)} {t("common.available")}
          </Badge>
          {BLOOD_GROUPS.map((g) => (
            <button
              key={g}
              onClick={() => setGroup(g)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                group === g
                  ? "border-primary bg-primary text-white"
                  : "glass border-border text-muted-foreground",
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <BottomSheet open onClose={() => {}} peekHeight={300}>
        <div className="mx-auto max-w-3xl">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">
              {t("nav.map")} · {group}
            </h2>
            <span className="text-xs text-muted-foreground">
              {n(matches.length)} {t("match.bestMatch")}
            </span>
          </div>
          <div className="space-y-2.5 pb-24">
            {matches.map((m, i) => (
              <DonorCard
                key={m.donor.id}
                match={m}
                rank={i}
                active={selected?.donor.id === m.donor.id}
                onSelect={() => selectDonor(m.donor.id)}
                onRequest={() => router.push("/request")}
              />
            ))}
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
