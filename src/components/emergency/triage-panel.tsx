"use client";

import { motion } from "motion/react";
import { Sparkles, TrendingUp } from "lucide-react";
import type { MatchedDonor } from "@/types";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { useT } from "@/lib/i18n";

const FACTOR_KEYS = [
  { key: "compatibility", label: "triage.compatibility", max: 30 },
  { key: "proximity", label: "triage.proximity", max: 28 },
  { key: "availability", label: "triage.availability", max: 20 },
  { key: "reliability", label: "triage.reliability", max: 12 },
  { key: "maternal", label: "triage.maternal", max: 10 },
] as const;

export function TriagePanel({
  match,
  aiScore,
}: {
  match: MatchedDonor;
  aiScore: number;
}) {
  const { t, n } = useT();

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/[0.08] to-transparent p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary-bright" />
          <span className="text-sm font-semibold">{t("triage.title")}</span>
        </div>
        <Badge variant="ai">
          <TrendingUp className="size-3" /> {t("match.aiScore")}
        </Badge>
      </div>

      <div className="mt-3 flex items-end gap-3">
        <div className="text-4xl font-black text-primary-bright">
          <AnimatedNumber value={aiScore} duration={1.6} />
        </div>
        <div className="mb-1 text-xs text-muted-foreground">
          / 100 · {t("triage.why")}
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {FACTOR_KEYS.map((f, i) => {
          const val = match.breakdown[f.key];
          const pct = (val / f.max) * 100;
          return (
            <div key={f.key}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t(f.label)}</span>
                <span className="font-semibold">
                  {n(val)}/{n(f.max)}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary-deep via-primary to-primary-bright"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl bg-white/[0.03] p-3">
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {t("triage.factors")}
        </div>
        <ul className="space-y-1">
          {match.reasons.map((r) => (
            <li
              key={r}
              className="flex items-start gap-2 text-xs text-foreground/85"
            >
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary-bright" />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
