"use client";

import * as React from "react";
import { motion } from "motion/react";
import { MapPin, Clock, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useT } from "@/lib/i18n";
import { URGENCY_META } from "@/lib/constants";
import type { Emergency } from "@/types";
import { MOCK_HOSPITALS } from "@/data/mock-hospitals";

export function IncomingRequest({
  emergency,
  distanceKm,
  etaMin,
  onAccept,
  onDecline,
  seconds = 20,
}: {
  emergency: Emergency;
  distanceKm: number;
  etaMin: number;
  onAccept: () => void;
  onDecline: () => void;
  seconds?: number;
}) {
  const { t, n, locale } = useT();
  const [left, setLeft] = React.useState(seconds);
  const hospital = MOCK_HOSPITALS.find((h) => h.id === emergency.hospitalId);
  const meta = URGENCY_META[emergency.urgency];

  React.useEffect(() => {
    if (left <= 0) {
      onDecline();
      return;
    }
    const id = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(id);
  }, [left, onDecline]);

  const pct = (left / seconds) * 100;
  const R = 22;
  const C = 2 * Math.PI * R;

  return (
    <motion.div
      initial={{ y: 60, opacity: 0, scale: 0.96 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 60, opacity: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className="glow-crimson overflow-hidden rounded-3xl border border-primary/30 bg-card p-5"
    >
      <div className="flex items-center justify-between">
        <Badge variant="primary" className="animate-pulse">
          <HeartPulse className="size-3" /> {t("donor.incoming")}
        </Badge>
        {/* countdown ring */}
        <div className="relative size-12">
          <svg className="size-12 -rotate-90" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
            <circle
              cx="26"
              cy="26"
              r={R}
              fill="none"
              stroke={meta.color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - pct / 100)}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
            {n(left)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-2xl font-black text-primary-bright">
          {emergency.bloodGroup}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-base font-bold">
            {n(emergency.units)} {t("common.units")} · {emergency.bloodGroup}
            {emergency.isMaternal && (
              <Badge variant="ai" className="ml-2 align-middle">
                {t("triage.maternal")}
              </Badge>
            )}
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" />
              {hospital ? (locale === "bn" ? hospital.nameBn : hospital.name) : ""}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{n(distanceKm)} {t("common.km")}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" /> ~{n(etaMin)} {t("common.min")}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <Button variant="glass" size="lg" className="flex-1" onClick={onDecline}>
          {t("donor.decline")}
        </Button>
        <Button size="lg" className="flex-[2]" onClick={onAccept}>
          {t("donor.accept")}
        </Button>
      </div>
    </motion.div>
  );
}
