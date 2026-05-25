"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { EmergencyStatus } from "@/types";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const FLOW: { status: EmergencyStatus; key: string }[] = [
  { status: "searching", key: "track.status.searching" },
  { status: "matched", key: "track.status.matched" },
  { status: "en_route", key: "track.status.en_route" },
  { status: "arrived", key: "track.status.arrived" },
  { status: "fulfilled", key: "track.status.fulfilled" },
];

export function StatusTimeline({ current }: { current: EmergencyStatus }) {
  const { t } = useT();
  const currentIdx = FLOW.findIndex((f) => f.status === current);

  return (
    <div className="flex items-center justify-between">
      {FLOW.map((f, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={f.status} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              {i > 0 && (
                <div
                  className={cn(
                    "h-0.5 flex-1",
                    i <= currentIdx ? "bg-primary" : "bg-white/10",
                  )}
                />
              )}
              <motion.div
                animate={active ? { scale: [1, 1.15, 1] } : {}}
                transition={{ repeat: active ? Infinity : 0, duration: 1.6 }}
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold",
                  done || active
                    ? "border-primary bg-primary text-white"
                    : "border-white/15 bg-transparent text-muted-foreground",
                )}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </motion.div>
              {i < FLOW.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1",
                    i < currentIdx ? "bg-primary" : "bg-white/10",
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "mt-1.5 text-center text-[9px] leading-tight",
                active ? "text-primary-bright" : "text-muted-foreground",
              )}
            >
              {t(f.key)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
