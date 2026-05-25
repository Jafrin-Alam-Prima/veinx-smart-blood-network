"use client";

import { motion } from "motion/react";
import {
  Gauge,
  Brain,
  Activity,
  HeartPulse,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

const FEATURES = [
  {
    icon: Gauge,
    title: "AI Emergency Score",
    body: "Every request is triaged 0–100 from urgency, units, and supply scarcity.",
  },
  {
    icon: Brain,
    title: "Smart Match",
    body: "Donors ranked by compatibility, proximity, availability, and reliability.",
  },
  {
    icon: Activity,
    title: "Predictive Availability",
    body: "We estimate who is most likely to respond right now — not just who's nearby.",
  },
  {
    icon: HeartPulse,
    title: "Maternal Priority Routing",
    body: "Maternal emergencies get boosted routing to the fastest compatible donors.",
  },
  {
    icon: MapPinned,
    title: "Live Donor Map",
    body: "Uber-style real-time map with glowing donors and emergency radius overlays.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Donors",
    body: "Donation history, eligibility windows, and trust ratings on every profile.",
  },
];

export function AiFeatures() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary-bright">
          Intelligence layer
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          A funded-startup product, powered by AI
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 3) * 0.08 }}
            className="group rounded-3xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/30"
          >
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary-bright transition-transform group-hover:scale-110">
              <f.icon className="size-5" />
            </div>
            <h3 className="text-base font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {f.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
