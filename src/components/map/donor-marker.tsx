"use client";

import { motion } from "motion/react";
import type { Donor } from "@/types";
import { cn } from "@/lib/utils";
import { useMapProjection } from "./map-context";

export function DonorMarker({
  donor,
  selected,
  compatible = true,
  onClick,
}: {
  donor: Donor;
  selected?: boolean;
  compatible?: boolean;
  onClick?: () => void;
}) {
  const { project } = useMapProjection();
  const { x, y } = project(donor.lng, donor.lat);

  const color = !compatible
    ? "#64748b"
    : donor.available
      ? "#ff2d55"
      : "#7c8aa5";

  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      {donor.available && compatible && (
        <span
          className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full"
          style={{ background: `${color}66` }}
        />
      )}
      <span
        className={cn(
          "relative flex size-6 items-center justify-center rounded-full border-2 text-[8px] font-bold text-white transition-all",
          selected && "scale-150",
        )}
        style={{
          background: color,
          borderColor: selected ? "#fff" : "rgba(255,255,255,0.5)",
          boxShadow: compatible
            ? `0 0 14px 2px ${color}cc`
            : "0 0 6px rgba(0,0,0,0.4)",
        }}
      >
        {donor.bloodGroup}
      </span>
    </motion.button>
  );
}

/** A hospital / patient destination pin. */
export function DestinationMarker({
  lng,
  lat,
  label,
}: {
  lng: number;
  lat: number;
  label?: string;
}) {
  const { project } = useMapProjection();
  const { x, y } = project(lng, lat);
  return (
    <div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      <div className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full bg-white/30" />
      <div className="relative flex size-9 items-center justify-center rounded-full border-2 border-white bg-white text-primary shadow-[0_0_18px_4px_rgba(255,255,255,0.5)]">
        <span className="text-base font-black">+</span>
      </div>
      {label && (
        <div className="glass absolute left-1/2 top-11 -translate-x-1/2 whitespace-nowrap rounded-lg px-2 py-1 text-[10px] font-medium">
          {label}
        </div>
      )}
    </div>
  );
}
