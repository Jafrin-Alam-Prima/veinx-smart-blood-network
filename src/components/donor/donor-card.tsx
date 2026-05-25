"use client";

import { motion } from "motion/react";
import { Phone, Navigation, Star, BadgeCheck, Zap } from "lucide-react";
import type { Donor, MatchedDonor } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function DonorCard({
  match,
  rank,
  onRequest,
  onSelect,
  active,
}: {
  match: MatchedDonor;
  rank?: number;
  onRequest?: (m: MatchedDonor) => void;
  onSelect?: (m: MatchedDonor) => void;
  active?: boolean;
}) {
  const { t, n, locale } = useT();
  const donor = match.donor;
  const name = locale === "bn" ? donor.nameBn : donor.name;

  return (
    <motion.div
      layout
      onClick={() => onSelect?.(match)}
      className={cn(
        "rounded-2xl border p-3.5 transition-colors",
        active
          ? "border-primary/50 bg-primary/[0.07]"
          : "border-border bg-white/[0.02] hover:border-border-strong",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-primary/25 to-primary-deep/20 text-sm font-bold text-primary-bright">
            {donor.bloodGroup}
          </div>
          {rank != null && rank < 3 && (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {n(rank + 1)}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className={cn("truncate font-semibold", locale === "bn" && "font-bengali")}>
              {name}
            </span>
            {donor.verified && (
              <BadgeCheck className="size-4 shrink-0 text-info" />
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{n(match.distanceKm)} {t("common.km")}</span>
            <span aria-hidden>·</span>
            <span>~{n(match.etaMin)} {t("common.min")}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-0.5">
              <Star className="size-3 fill-warning text-warning" />
              {n(donor.rating)}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="inline-flex items-center gap-1 text-sm font-bold text-primary-bright">
            <Zap className="size-3.5" />
            {n(match.matchScore)}%
          </div>
          <div className="text-[10px] text-muted-foreground">
            {t("match.smartMatch")}
          </div>
        </div>
      </div>

      {active && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 flex gap-2 overflow-hidden"
        >
          <Button
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onRequest?.(match);
            }}
          >
            <Navigation className="size-4" /> {t("match.requestDonor")}
          </Button>
          <a href={`tel:${donor.phone}`} onClick={(e) => e.stopPropagation()}>
            <Button size="sm" variant="glass">
              <Phone className="size-4" />
            </Button>
          </a>
        </motion.div>
      )}

      {active && match.reasons.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {match.reasons.slice(0, 2).map((r) => (
            <Badge key={r} variant="ai" className="text-[10px]">
              {r}
            </Badge>
          ))}
        </div>
      )}
    </motion.div>
  );
}
