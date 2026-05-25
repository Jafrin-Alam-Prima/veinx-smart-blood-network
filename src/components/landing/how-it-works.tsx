"use client";

import { motion } from "motion/react";
import { ClipboardList, Radar, Navigation } from "lucide-react";
import { useT } from "@/lib/i18n";

const STEPS = [
  {
    icon: ClipboardList,
    n: "01",
    title: "Request in seconds",
    body: "Pick blood group, units, urgency, and hospital. Flag maternal cases for priority.",
  },
  {
    icon: Radar,
    n: "02",
    title: "AI matches donors",
    body: "We scan the live network, rank compatible donors, and surface the best match instantly.",
  },
  {
    icon: Navigation,
    n: "03",
    title: "Track to the door",
    body: "Watch your donor en route with live ETA until blood reaches the patient.",
  },
];

export function HowItWorks() {
  const { t, locale } = useT();
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h2
        className={`mb-12 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl ${locale === "bn" ? "font-bengali leading-snug" : ""}`}
      >
        {t("landing.solution.title")}
      </h2>
      <div className="grid gap-5 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-3xl border border-border bg-card/50 p-6"
          >
            <span className="absolute right-6 top-5 text-4xl font-black text-white/5">
              {s.n}
            </span>
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-deep text-white shadow-[0_8px_24px_-8px_rgba(255,45,85,0.7)]">
              <s.icon className="size-5" />
            </div>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
