"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export function FooterCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glow-crimson relative overflow-hidden rounded-[2rem] border border-primary/25 bg-gradient-to-br from-primary/15 via-card to-card p-10 text-center sm:p-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,45,85,0.25),transparent_60%)]" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            When seconds matter, don&apos;t search Facebook.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Launch an emergency request and let VeinX find the right donor near
            you — right now.
          </p>
          <Link href="/request" className="mt-8 inline-block">
            <Button size="lg">
              Start Emergency Request <ArrowRight />
            </Button>
          </Link>
        </div>
      </motion.div>

      <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
        <Logo />
        <p>Built for Bangladesh · Demo product · © {new Date().getFullYear()} VeinX</p>
      </footer>
    </section>
  );
}
