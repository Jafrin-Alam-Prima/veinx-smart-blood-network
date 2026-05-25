"use client";

import { motion } from "motion/react";
import { useMapProjection } from "./map-context";

/** Expanding crimson search radius centered on the emergency location. */
export function EmergencyRadius({
  lng,
  lat,
  radiusKm = 5,
}: {
  lng: number;
  lat: number;
  radiusKm?: number;
}) {
  const { project, pxPerKm } = useMapProjection();
  const { x, y } = project(lng, lat);
  const r = radiusKm * pxPerKm;

  return (
    <div
      className="pointer-events-none absolute z-[5] -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      {/* static ring */}
      <div
        className="rounded-full border border-primary/40 bg-primary/[0.06]"
        style={{ width: r * 2, height: r * 2 }}
      />
      {/* sweeping pulse */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/50"
        initial={{ scale: 0.2, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      />
    </div>
  );
}
