"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Home,
  MapPinned,
  Siren,
  HeartHandshake,
  Building2,
  WifiOff,
  RotateCw,
  ArrowLeft,
  Signal,
  Wifi,
  BatteryFull,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

// Trailing slashes (and slash-before-query) keep these working under the
// static export too, not just the dev/server build.
const SCENES = [
  { icon: Home, label: "Landing", src: "/" },
  { icon: MapPinned, label: "Live Map", src: "/map/" },
  { icon: Siren, label: "AI Matching", src: "/request/matching/?seed=1" },
  { icon: HeartHandshake, label: "Donor", src: "/donor/" },
  { icon: Building2, label: "Hospital", src: "/hospital/" },
  { icon: WifiOff, label: "Offline · SMS", src: "/request/?offline=1" },
];

const SIZES = [
  { label: "Compact", scale: 0.72 },
  { label: "Default", scale: 0.9 },
  { label: "Large", scale: 1.0 },
  { label: "Max", scale: 1.12 },
];

export default function PresentPage() {
  const [src, setSrc] = React.useState("/");
  const [nonce, setNonce] = React.useState(0);
  const [scale, setScale] = React.useState(0.9);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const go = (s: string) => {
    setSrc(s);
    setNonce((k) => k + 1); // force reload even if same scene
  };

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#05070e]">
      {/* studio backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(255,45,85,0.16),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#9fb3d9_1px,transparent_1px),linear-gradient(90deg,#9fb3d9_1px,transparent_1px)] [background-size:52px_52px]" />
      </div>

      {/* top bar */}
      <header className="relative z-10 flex items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          {/* phone size control */}
          <div className="hidden items-center gap-1 rounded-full border border-border bg-white/[0.03] p-1 sm:flex">
            {SIZES.map((s) => (
              <button
                key={s.label}
                onClick={() => setScale(s.scale)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                  Math.abs(scale - s.scale) < 0.001
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
          <input
            type="range"
            min={0.55}
            max={1.2}
            step={0.01}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            aria-label="Phone size"
            className="hidden w-28 accent-[var(--primary)] md:block"
          />
        </div>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 px-4 pb-10 lg:flex-row lg:items-center lg:gap-16">
        {/* director rail */}
        <div className="order-2 flex flex-wrap justify-center gap-2 lg:order-1 lg:max-w-[200px] lg:flex-col">
          <span className="hidden w-full text-[11px] font-semibold uppercase tracking-widest text-muted-foreground lg:block">
            Scenes
          </span>
          {SCENES.map((s) => {
            const active = src === s.src;
            return (
              <button
                key={s.label}
                onClick={() => go(s.src)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "border-primary/50 bg-primary/12 text-primary-bright"
                    : "border-border bg-white/[0.02] text-muted-foreground hover:border-border-strong hover:text-foreground",
                )}
              >
                <s.icon className="size-4" />
                {s.label}
              </button>
            );
          })}
          <button
            onClick={() => go(src)}
            className="mt-1 flex items-center gap-2.5 rounded-xl border border-border bg-white/[0.02] px-3.5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCw className="size-4" /> Replay
          </button>
        </div>

        {/* phone */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2"
        >
          <PhoneFrame scale={scale}>
            <iframe
              key={nonce}
              ref={iframeRef}
              src={src}
              title="VeinX preview"
              className="size-full border-0 bg-background"
            />
          </PhoneFrame>
        </motion.div>

        {/* brand caption (right) */}
        <div className="order-3 hidden max-w-[200px] lg:block">
          <h1 className="text-2xl font-bold leading-tight">
            Vein<span className="text-primary">X</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            AI emergency blood donation. Live donor map, AI triage, real-time
            matching — built for Bangladesh.
          </p>
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({
  children,
  scale = 1,
}: {
  children: React.ReactNode;
  scale?: number;
}) {
  return (
    <div
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      className="relative h-[86dvh] max-h-[860px] w-[calc(86dvh*0.462)] max-w-[400px] rounded-[3rem] border-[12px] border-[#0b0d14] bg-[#0b0d14] shadow-[0_40px_120px_-30px_rgba(255,45,85,0.35),0_30px_80px_-20px_rgba(0,0,0,0.9)] transition-transform"
    >
      {/* side buttons */}
      <span className="absolute -left-[14px] top-28 h-12 w-[3px] rounded-l bg-[#1a1f2b]" />
      <span className="absolute -left-[14px] top-44 h-16 w-[3px] rounded-l bg-[#1a1f2b]" />
      <span className="absolute -right-[14px] top-36 h-20 w-[3px] rounded-r bg-[#1a1f2b]" />

      <div className="relative size-full overflow-hidden rounded-[2.1rem] bg-background">
        {/* status bar */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex h-9 items-center justify-between px-6 text-[11px] font-semibold text-foreground">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="size-3.5" />
            <Wifi className="size-3.5" />
            <BatteryFull className="size-4" />
          </div>
        </div>
        {/* dynamic island */}
        <div className="absolute left-1/2 top-2 z-50 h-7 w-24 -translate-x-1/2 rounded-full bg-black" />

        {/* screen content (offset below status bar) */}
        <div className="absolute inset-0 top-9">{children}</div>
      </div>
    </div>
  );
}
