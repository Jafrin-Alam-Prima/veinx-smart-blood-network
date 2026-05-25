"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  indicatorClassName,
}: {
  value: number;
  className?: string;
  indicatorClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-white/8",
        className,
      )}
    >
      <motion.div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-primary-deep via-primary to-primary-bright",
          indicatorClassName,
        )}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
