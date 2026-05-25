"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type TabsCtx = { value: string; setValue: (v: string) => void; id: string };
const Ctx = React.createContext<TabsCtx | null>(null);

export function Tabs({
  value,
  onValueChange,
  children,
  className,
}: {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const id = React.useId();
  return (
    <Ctx.Provider value={{ value, setValue: onValueChange, id }}>
      <div className={className}>{children}</div>
    </Ctx.Provider>
  );
}

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-2xl border border-border bg-white/[0.03] p-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(Ctx)!;
  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={cn(
        "relative rounded-xl px-4 py-2 text-sm font-medium transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {active && (
        <motion.span
          layoutId={`tab-${ctx.id}`}
          className="absolute inset-0 rounded-xl bg-primary/15 ring-1 ring-primary/30"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(Ctx)!;
  if (ctx.value !== value) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
