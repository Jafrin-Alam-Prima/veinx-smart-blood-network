"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { Droplet, Star, CalendarClock, CheckCircle2, History } from "lucide-react";
import { IncomingRequest } from "@/components/donor/incoming-request";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/store/user-store";
import { MOCK_DONORS } from "@/data/mock-donors";
import { MOCK_HOSPITALS } from "@/data/mock-hospitals";
import { estimateEtaMin, distanceKm } from "@/lib/eta";
import { useT } from "@/lib/i18n";
import { isEligible } from "@/lib/matching";
import type { Emergency } from "@/types";
import { cn } from "@/lib/utils";

const HISTORY = [
  { date: "2026-02-14", hospital: "Square Hospital", units: 1 },
  { date: "2025-11-02", hospital: "Dhaka Medical College", units: 2 },
  { date: "2025-07-19", hospital: "Labaid Specialized", units: 1 },
];

export default function DonorPage() {
  const { t, n, locale } = useT();
  const donorId = useUserStore((s) => s.donorId);
  const donor = MOCK_DONORS.find((d) => d.id === donorId) ?? MOCK_DONORS[0];

  const [available, setAvailable] = React.useState(true);
  const [incoming, setIncoming] = React.useState<Emergency | null>(null);
  const [accepted, setAccepted] = React.useState(false);

  // While available and idle, surface a simulated incoming request.
  React.useEffect(() => {
    if (!available || incoming || accepted) return;
    const id = setTimeout(() => {
      const hospital = MOCK_HOSPITALS[1];
      setIncoming({
        id: "incoming-1",
        patientName: "Shahana Begum",
        bloodGroup: donor.bloodGroup,
        units: 2,
        urgency: "critical",
        isMaternal: true,
        hospitalId: hospital.id,
        lat: hospital.lat,
        lng: hospital.lng,
        status: "searching",
        aiScore: 88,
        matchedDonorIds: [],
        createdAt: Date.now(),
      });
    }, 2200);
    return () => clearTimeout(id);
  }, [available, incoming, accepted, donor.bloodGroup]);

  const hospital = MOCK_HOSPITALS[1];
  const dist = distanceKm(donor, hospital);
  const eta = estimateEtaMin(donor, hospital);

  const name = locale === "bn" ? donor.nameBn : donor.name;
  const nextEligible = Math.max(0, 90 - donor.daysSinceLastDonation);

  function accept() {
    setIncoming(null);
    setAccepted(true);
    toast.success(`${t("donor.accept")} · ${hospital.name}`, {
      description: `~${eta} ${t("common.min")} ETA`,
    });
  }

  return (
    <div className="mx-auto max-w-md px-4 pb-28 pt-20">
      {/* profile */}
      <Card glass className="mb-4 p-4">
        <div className="flex items-center gap-3">
          <Avatar name={name} ring />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className={cn("truncate font-semibold", locale === "bn" && "font-bengali")}>
                {name}
              </span>
              <Badge variant="primary">{donor.bloodGroup}</Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {locale === "bn" ? donor.areaBn : donor.area} ·{" "}
              {isEligible(donor) ? t("common.available") : t("donor.nextEligible")}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-white/[0.02] p-3">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-xl",
                available ? "bg-success/15 text-success" : "bg-white/5 text-muted-foreground",
              )}
            >
              <Droplet className="size-4" />
            </span>
            <span className="text-sm font-medium">
              {t("donor.availabilityToggle")}
            </span>
          </div>
          <Switch checked={available} onCheckedChange={setAvailable} />
        </div>
      </Card>

      {/* stats */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <Stat icon={<Droplet className="size-4" />} value={n(donor.totalDonations)} label={t("donor.history")} />
        <Stat icon={<Star className="size-4" />} value={n(donor.rating)} label="Rating" />
        <Stat
          icon={<CalendarClock className="size-4" />}
          value={nextEligible === 0 ? "✓" : n(nextEligible)}
          label={t("donor.nextEligible")}
        />
      </div>

      {/* incoming / accepted */}
      <AnimatePresence mode="wait">
        {incoming && available && (
          <div className="mb-4">
            <IncomingRequest
              emergency={incoming}
              distanceKm={dist}
              etaMin={eta}
              onAccept={accept}
              onDecline={() => setIncoming(null)}
            />
          </div>
        )}
        {accepted && (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center gap-3 rounded-3xl border border-success/30 bg-success/10 p-4"
          >
            <CheckCircle2 className="size-6 text-success" />
            <div>
              <div className="font-semibold">On your way 🩸</div>
              <div className="text-xs text-muted-foreground">
                {hospital.name} · ~{n(eta)} {t("common.min")}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* history */}
      <div className="rounded-3xl border border-border bg-card/50 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <History className="size-4 text-primary-bright" /> {t("donor.history")}
        </div>
        <div className="space-y-2">
          {HISTORY.map((h) => (
            <div
              key={h.date}
              className="flex items-center justify-between rounded-xl bg-white/[0.02] px-3 py-2.5"
            >
              <div className="text-sm">{h.hospital}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{h.date}</span>
                <Badge variant="outline">{n(h.units)} {t("common.units")}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-3 text-center">
      <div className="mx-auto mb-1 flex size-8 items-center justify-center rounded-xl bg-primary/12 text-primary-bright">
        {icon}
      </div>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-[10px] leading-tight text-muted-foreground">{label}</div>
    </div>
  );
}
