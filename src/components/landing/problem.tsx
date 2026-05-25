"use client";

import { motion } from "motion/react";
import { Check, MessageCircleWarning, PhoneOff, Clock, X } from "lucide-react";
import { useT } from "@/lib/i18n";

const OLD_WAY = [
  { icon: MessageCircleWarning, text: "Posting in scattered Facebook groups" },
  { icon: PhoneOff, text: "Calling dozens of random contacts" },
  { icon: Clock, text: "Hours lost while every minute matters" },
];

const NEW_WAY = [
  "One emergency request, instantly broadcast",
  "AI ranks compatible donors by ETA & reliability",
  "Live tracking until blood arrives",
];

export function Problem() {
  const { t, locale } = useT();
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl ${locale === "bn" ? "font-bengali leading-snug" : ""}`}
      >
        {t("landing.problem.title")}
      </motion.h2>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border bg-white/[0.02] p-6"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground">
            The old way
          </div>
          <ul className="space-y-4">
            {OLD_WAY.map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-white/5 text-muted-foreground">
                  <item.icon className="size-4" />
                </span>
                <span className="text-sm text-foreground/80">{item.text}</span>
                <X className="ml-auto size-4 text-muted-foreground/60" />
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glow-crimson relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary-bright">
            The VeinX way
          </div>
          <ul className="space-y-4">
            {NEW_WAY.map((text) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary/20 text-primary-bright">
                  <Check className="size-4" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
