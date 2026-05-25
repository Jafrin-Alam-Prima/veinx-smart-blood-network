"use client";

import { motion } from "motion/react";
import { useMapProjection } from "./map-context";

/** Animated dashed route from a donor to the destination. */
export function RouteLine({
  from,
  to,
}: {
  from: { lng: number; lat: number };
  to: { lng: number; lat: number };
}) {
  const { project, width, height } = useMapProjection();
  const a = project(from.lng, from.lat);
  const b = project(to.lng, to.lat);

  // Slight control-point bow for an organic path.
  const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.12;
  const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.12;
  const d = `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[8]"
      width={width}
      height={height}
    >
      <motion.path
        d={d}
        fill="none"
        stroke="#ff4d6d"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="2 10"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.circle
        r={4}
        fill="#fff"
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
        style={{ offsetPath: `path("${d}")` } as React.CSSProperties}
      />
    </svg>
  );
}
