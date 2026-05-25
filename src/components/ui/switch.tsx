"use client";

import { cn } from "@/lib/utils";

export function Switch({
  checked,
  onCheckedChange,
  disabled,
  className,
  "aria-label": ariaLabel,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors duration-300 disabled:opacity-50",
        checked
          ? "border-primary/40 bg-primary/90 shadow-[0_0_18px_-2px_rgba(255,45,85,0.7)]"
          : "border-border bg-white/10",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block size-5 rounded-full bg-white shadow-md transition-transform duration-300 will-change-transform",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}
