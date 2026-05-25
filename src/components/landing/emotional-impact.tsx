"use client";

import { motion } from "motion/react";
import { AnimatedNumber } from "@/components/ui/animated-number";

export function EmotionalImpact() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-b from-card to-background-2 px-6 py-12 text-center sm:px-10 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,45,85,0.18),transparent_60%)]" />

        {/* heartbeat EKG line */}
        <div className="relative mx-auto mb-8 h-12 w-full max-w-md overflow-hidden">
          <svg viewBox="0 0 400 60" className="size-full" preserveAspectRatio="none">
            <motion.path
              d="M0 30 H120 l10 -22 l12 44 l10 -22 H260 l8 -14 l8 28 l6 -14 H400"
              fill="none"
              stroke="#ff2d55"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </svg>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent,var(--background-2)_85%)]" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-2xl text-balance text-2xl font-bold leading-snug sm:text-3xl"
        >
          Behind every request is someone&apos;s mother, brother, or child —
          waiting on a stranger&apos;s kindness.
        </motion.h2>

        <p className="relative mx-auto mt-4 max-w-lg text-muted-foreground">
          A donation takes minutes. Finding one shouldn&apos;t cost a life.
          VeinX makes that connection instant.
        </p>

        <div className="relative mt-10 flex flex-wrap justify-center gap-x-12 gap-y-6">
          <Metric value={3820} label="Lives impacted" />
          <Metric value={8} suffix=" min" label="Avg time to match" />
          <Metric value={147} label="Donations today" />
        </div>
      </div>
    </section>
  );
}

function Metric({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div>
      <div className="text-3xl font-black text-gradient sm:text-4xl">
        <AnimatedNumber value={value} suffix={suffix} duration={2} />
      </div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
