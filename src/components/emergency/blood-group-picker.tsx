"use client";

import { motion } from "motion/react";
import { BLOOD_GROUPS } from "@/lib/constants";
import type { BloodGroup } from "@/types";
import { cn } from "@/lib/utils";

export function BloodGroupPicker({
  value,
  onChange,
}: {
  value: BloodGroup;
  onChange: (g: BloodGroup) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {BLOOD_GROUPS.map((g) => {
        const active = value === g;
        return (
          <motion.button
            key={g}
            whileTap={{ scale: 0.94 }}
            onClick={() => onChange(g)}
            className={cn(
              "relative flex aspect-square flex-col items-center justify-center rounded-2xl border text-lg font-bold transition-colors",
              active
                ? "border-primary bg-primary/15 text-primary-bright"
                : "border-border bg-white/[0.02] text-foreground/80 hover:border-border-strong",
            )}
          >
            {active && (
              <motion.span
                layoutId="bg-active"
                className="absolute inset-0 rounded-2xl ring-2 ring-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{g}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
