"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { WifiOff, MessageSquare, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore, selectOffline } from "@/store/user-store";
import { MOCK_DONORS } from "@/data/mock-donors";
import { useEmergencyStore } from "@/store/emergency-store";
import { useT } from "@/lib/i18n";

/** Full-screen offline experience with a visual SMS-fallback dispatch. */
export function OfflineOverlay() {
  const offline = useUserStore(selectOffline);
  return (
    <AnimatePresence>
      {offline && <OfflineCard />}
    </AnimatePresence>
  );
}

/** Mounted only while offline, so `sent` resets each time we go offline. */
function OfflineCard() {
  const { t, n, locale } = useT();
  const draft = useEmergencyStore((s) => s.draft);
  const [sent, setSent] = React.useState(false);
  const nearby = MOCK_DONORS.filter((d) => d.available).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/85 px-4 backdrop-blur-lg"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-strong w-full max-w-sm rounded-3xl p-6 text-center"
      >
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-warning/15 text-warning">
          <WifiOff className="size-7" />
        </div>
        <h2 className="text-xl font-bold">{t("offline.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("offline.body")}</p>

        {!sent ? (
          <Button size="lg" className="mt-6 w-full" onClick={() => setSent(true)}>
            <MessageSquare className="size-4" /> {t("offline.sms")}
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-2 text-left"
          >
            <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] p-3 text-xs">
              <Send className="size-3.5 shrink-0 text-primary-bright" />
              <span className="font-mono text-muted-foreground">
                VEINX: {draft.bloodGroup} · {n(draft.units)} {t("common.units")} ·
                reply YES to donate
              </span>
            </div>
            {nearby.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.12 }}
                className="flex items-center justify-between rounded-xl bg-white/[0.02] px-3 py-2 text-xs"
              >
                <span className="font-mono text-muted-foreground">{d.phone}</span>
                <span className="inline-flex items-center gap-1 text-success">
                  <Check className="size-3" /> delivered
                </span>
              </motion.div>
            ))}
            <p className="pt-1 text-center text-[11px] text-muted-foreground">
              {n(nearby.length)}{" "}
              {locale === "bn"
                ? "জনকে এসএমএস পাঠানো হয়েছে"
                : "donors reached over SMS"}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
