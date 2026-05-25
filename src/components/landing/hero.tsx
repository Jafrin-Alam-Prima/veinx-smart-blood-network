"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MapPin, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropMark } from "@/components/shared/logo";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { useT } from "@/lib/i18n";
import { EASE_OUT, fadeUp } from "@/lib/motion";

export function Hero() {
  const { t, locale } = useT();

  return (
    <section className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-32 sm:px-6 lg:flex-row lg:items-center lg:pt-40">
      <div className="flex-1">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <Badge variant="ai" className="mb-5">
            <Sparkles className="size-3" /> AI-native donor matching
          </Badge>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className={cnHeading(locale)}
        >
          {t("landing.hero.title")}
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {t("landing.hero.subtitle")}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link href="/request">
            <Button size="lg" className="w-full sm:w-auto">
              {t("landing.hero.cta")} <ArrowRight />
            </Button>
          </Link>
          <Link href="/map">
            <Button size="lg" variant="glass" className="w-full sm:w-auto">
              <MapPin /> {t("landing.hero.secondary")}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 flex gap-8"
        >
          <Stat value={8} suffix=" min" label="Avg response" />
          <Stat value={3820} label="Lives impacted" />
          <Stat value={91} suffix="%" label="Fulfilled" />
        </motion.div>
      </div>

      <HeroVisual />
    </section>
  );
}

function cnHeading(locale: string) {
  return [
    "text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl",
    locale === "bn" ? "font-bengali leading-[1.25]" : "",
  ].join(" ");
}

function Stat({
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
      <div className="text-2xl font-bold text-foreground">
        <AnimatedNumber value={value} suffix={suffix} />
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.8, ease: EASE_OUT }}
      className="relative flex-1"
    >
      <div className="glass-strong relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] p-5 shadow-elevated">
        {/* faux map grid */}
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,45,85,0.18),transparent_55%)]" />

        {/* pulsing donors */}
        {[
          { top: "30%", left: "28%", d: 0 },
          { top: "52%", left: "62%", d: 0.6 },
          { top: "68%", left: "38%", d: 1.1 },
          { top: "40%", left: "72%", d: 1.6 },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute"
            style={{ top: p.top, left: p.left }}
          >
            <span
              className="absolute -inset-3 animate-pulse-ring rounded-full bg-primary/40"
              style={{ animationDelay: `${p.d}s` }}
            />
            <span className="relative block size-3 rounded-full bg-primary shadow-[0_0_12px_2px_rgba(255,45,85,0.8)]" />
          </span>
        ))}

        {/* center patient */}
        <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2">
          <DropMark className="size-9" pulse />
        </div>

        {/* AI score chip */}
        <div className="glass absolute left-4 top-4 flex items-center gap-2 rounded-xl px-3 py-2">
          <Zap className="size-4 text-primary" />
          <div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
              AI Emergency Score
            </div>
            <div className="text-sm font-bold text-foreground">
              <AnimatedNumber value={92} duration={1.8} />
              <span className="text-muted-foreground">/100</span>
            </div>
          </div>
        </div>

        {/* matched donor card */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 22 }}
          className="glass absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl p-3"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 font-bold text-primary-bright">
            O-
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">Nusrat Jahan</div>
            <div className="text-xs text-muted-foreground">
              1.2 km · ~6 min · Smart Match 96%
            </div>
          </div>
          <Badge variant="success">Matched</Badge>
        </motion.div>
      </div>
    </motion.div>
  );
}
