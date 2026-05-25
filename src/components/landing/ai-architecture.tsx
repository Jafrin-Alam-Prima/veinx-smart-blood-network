"use client";

import { motion } from "motion/react";
import {
  Radio,
  Brain,
  MapPin,
  Activity,
  ShieldCheck,
  HeartPulse,
  Cpu,
  ArrowRight,
} from "lucide-react";

const INPUTS = [
  { icon: Radio, label: "Live donor signals" },
  { icon: MapPin, label: "Geo + traffic" },
  { icon: Activity, label: "Availability history" },
  { icon: ShieldCheck, label: "Trust & eligibility" },
];

const ENGINE = [
  "Compatibility model",
  "Proximity / ETA",
  "Predictive Availability",
  "Reliability scoring",
  "Maternal Priority Routing",
];

export function AiArchitecture() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary-bright">
          The AI layer
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          An AI engine sits between the emergency and the donor
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Every request flows through a real-time scoring pipeline that ranks
          who can save this life, fastest.
        </p>
      </div>

      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1.3fr_auto_1fr]">
        {/* inputs */}
        <div className="space-y-3">
          {INPUTS.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card/50 px-4 py-3"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-info/12 text-info">
                <n.icon className="size-4" />
              </span>
              <span className="text-sm font-medium">{n.label}</span>
            </motion.div>
          ))}
        </div>

        <Flow />

        {/* engine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glow-crimson relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/12 to-card p-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,45,85,0.2),transparent_60%)]" />
          <div className="relative">
            <div className="mb-4 flex items-center gap-3">
              <span className="relative flex size-12 items-center justify-center rounded-2xl bg-primary text-white">
                <span className="absolute inset-0 animate-pulse-ring rounded-2xl bg-primary/50" />
                <Cpu className="relative size-6" />
              </span>
              <div>
                <div className="font-bold">VeinX AI Engine</div>
                <div className="text-xs text-muted-foreground">
                  real-time weighted scoring
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {ENGINE.map((e, i) => (
                <motion.div
                  key={e}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2 text-sm"
                >
                  <Brain className="size-3.5 text-primary-bright" />
                  {e}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <Flow />

        {/* output */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-success/30 bg-gradient-to-b from-success/10 to-card p-6 text-center"
        >
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-success/15 text-success">
            <HeartPulse className="size-6" />
          </div>
          <div className="text-4xl font-black text-primary-bright">96%</div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">
            Smart Match
          </div>
          <div className="mt-3 rounded-xl bg-white/[0.04] px-3 py-2 text-xs text-foreground/85">
            Best donor · 1.2 km · ~6 min · explainable reasons
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Animated connector showing data flowing into the engine. */
function Flow() {
  return (
    <div className="relative hidden h-px items-center lg:flex">
      <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary/50 to-primary/50" />
      <motion.span
        className="absolute size-2 rounded-full bg-primary-bright shadow-[0_0_10px_2px_rgba(255,45,85,0.9)]"
        animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <ArrowRight className="size-4 shrink-0 text-primary/70" />
    </div>
  );
}
