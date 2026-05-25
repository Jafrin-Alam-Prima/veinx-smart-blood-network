"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Minimal single-thumb range slider styled to the design system. */
export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
}: {
  value: number;
  onValueChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("relative flex h-6 w-full items-center", className)}>
      <div className="relative h-2 w-full rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary-deep via-primary to-primary-bright"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white shadow-[0_0_14px_-2px_rgba(255,45,85,0.8)]"
          style={{ left: `${pct}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className="absolute inset-0 w-full cursor-pointer opacity-0"
      />
    </div>
  );
}
