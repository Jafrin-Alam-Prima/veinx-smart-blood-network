"use client";

import { useMapStore } from "@/store/map-store";
import { isCompatible } from "@/lib/constants";
import type { BloodGroup } from "@/types";
import { DonorMarker } from "./donor-marker";

/** Renders every donor from the store, dimming incompatible ones. */
export function DonorLayer({
  recipientGroup,
}: {
  recipientGroup?: BloodGroup;
}) {
  const donors = useMapStore((s) => s.donors);
  const selectedDonorId = useMapStore((s) => s.selectedDonorId);
  const selectDonor = useMapStore((s) => s.selectDonor);

  return (
    <>
      {donors.map((d) => {
        const compatible = recipientGroup
          ? isCompatible(recipientGroup, d.bloodGroup)
          : true;
        return (
          <DonorMarker
            key={d.id}
            donor={d}
            compatible={compatible}
            selected={selectedDonorId === d.id}
            onClick={() => selectDonor(d.id)}
          />
        );
      })}
    </>
  );
}
