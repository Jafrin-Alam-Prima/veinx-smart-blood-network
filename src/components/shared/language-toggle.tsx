"use client";

import { motion } from "motion/react";
import { useLanguageStore } from "@/store/language-store";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "en" as const, label: "EN" },
  { value: "bn" as const, label: "বাংলা" },
];

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLanguageStore((s) => s.locale);
  const setLocale = useLanguageStore((s) => s.setLocale);

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-white/[0.04] p-0.5 text-xs font-semibold",
        className,
      )}
    >
      {OPTIONS.map((opt) => {
        const active = locale === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setLocale(opt.value)}
            className={cn(
              "relative rounded-full px-3 py-1.5 transition-colors",
              active ? "text-primary-foreground" : "text-muted-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
