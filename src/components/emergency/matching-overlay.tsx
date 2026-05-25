"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Radar, ScanSearch, ListChecks, Check } from "lucide-react";
import { DropMark } from "@/components/shared/logo";
import { useT } from "@/lib/i18n";

interface Stage {
  icon: React.ElementType;
  key: string;
  vars?: (n: number, c: number) => Record<string, number>;
}

const STAGES: Stage[] = [
  { icon: ScanSearch, key: "match.scanning", vars: (n) => ({ n }) },
  { icon: Radar, key: "match.compatible", vars: (_n, c) => ({ n: c }) },
  { icon: ListChecks, key: "match.ranking" },
  { icon: Check, key: "match.bestMatch" },
];

/** Plays the staged "AI is thinking" narration, then calls onDone. */
export function MatchingOverlay({
  total,
  compatible,
  onDone,
}: {
  total: number;
  compatible: number;
  onDone: () => void;
}) {
  const { t } = useT();
  const [stage, setStage] = React.useState(0);

  React.useEffect(() => {
    if (stage >= STAGES.length) {
      const done = setTimeout(onDone, 650);
      return () => clearTimeout(done);
    }
    const id = setTimeout(() => setStage((s) => s + 1), stage === 0 ? 1300 : 1050);
    return () => clearTimeout(id);
  }, [stage, onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-background/70 backdrop-blur-md"
    >
      <div className="relative mb-10">
        <span className="absolute -inset-8 animate-pulse-ring rounded-full bg-primary/30" />
        <span className="absolute -inset-8 animate-pulse-ring rounded-full bg-primary/20 [animation-delay:1s]" />
        <DropMark className="relative size-20" />
      </div>

      <div className="mb-2 text-sm font-medium uppercase tracking-widest text-primary-bright">
        {t("match.analyzing")}
      </div>

      <div className="h-7 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            className="flex items-center gap-2 text-lg font-semibold"
          >
            {(() => {
              const s = STAGES[Math.min(stage, STAGES.length - 1)];
              const Icon = s.icon;
              return (
                <>
                  <Icon className="size-5 text-primary" />
                  {t(s.key, s.vars?.(total, compatible))}
                </>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex gap-1.5">
        {STAGES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i <= stage ? "w-8 bg-primary" : "w-1.5 bg-white/15"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
