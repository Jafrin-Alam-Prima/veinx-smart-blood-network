"use client";

import { motion } from "motion/react";
import type { Urgency } from "@/types";
import { URGENCY_META } from "@/lib/constants";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const ORDER: Urgency[] = ["routine", "urgent", "critical"];

export function UrgencyPicker({
  value,
  onChange,
}: {
  value: Urgency;
  onChange: (u: Urgency) => void;
}) {
  const { locale } = useT();
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {ORDER.map((u) => {
        const meta = URGENCY_META[u];
        const active = value === u;
        return (
          <motion.button
            key={u}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(u)}
            className={cn(
              "relative flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 transition-colors",
              active ? "border-transparent" : "border-border bg-white/[0.02]",
            )}
            style={active ? { background: `${meta.color}1f` } : undefined}
          >
            {active && (
              <motion.span
                layoutId="urgency-active"
                className="absolute inset-0 rounded-2xl ring-2"
                style={{ ["--tw-ring-color" as string]: meta.color }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className="relative size-2.5 rounded-full"
              style={{ background: meta.color, boxShadow: `0 0 10px ${meta.color}` }}
            />
            <span
              className={cn(
                "relative text-sm font-semibold",
                locale === "bn" && "font-bengali",
              )}
              style={{ color: active ? meta.color : undefined }}
            >
              {locale === "bn" ? meta.labelBn : meta.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
