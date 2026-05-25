"use client";

import { motion } from "motion/react";
import {
  Activity,
  HeartHandshake,
  Timer,
  CheckCircle2,
  Droplet,
} from "lucide-react";
import { DemandHeatmap } from "@/components/hospital/demand-heatmap";
import { TrendChart } from "@/components/hospital/trend-chart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { useEmergencyStore } from "@/store/emergency-store";
import { MOCK_ANALYTICS } from "@/data/mock-analytics";
import { MOCK_HOSPITALS } from "@/data/mock-hospitals";
import { URGENCY_META } from "@/lib/constants";
import { useT } from "@/lib/i18n";
import type { EmergencyStatus } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_VARIANT: Record<
  EmergencyStatus,
  "default" | "primary" | "success" | "warning" | "info"
> = {
  draft: "default",
  searching: "warning",
  matched: "info",
  en_route: "primary",
  arrived: "primary",
  fulfilled: "success",
  cancelled: "default",
};

export default function HospitalPage() {
  const { t, n, locale } = useT();
  const emergencies = useEmergencyStore((s) => s.liveEmergencies);
  const a = MOCK_ANALYTICS;
  const maxSupply = Math.max(...a.byBloodGroup.map((b) => b.available));

  return (
    <div className="mx-auto max-w-3xl px-4 pb-28 pt-20">
      <h1 className={cn("mb-1 text-2xl font-bold", locale === "bn" && "font-bengali")}>
        {t("hospital.title")}
      </h1>
      <p className="mb-5 text-sm text-muted-foreground">
        {locale === "bn" ? MOCK_HOSPITALS[0].nameBn : MOCK_HOSPITALS[0].name}
      </p>

      {/* stat cards */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={<Droplet />} value={a.donationsToday} label="Donations today" />
        <StatCard icon={<HeartHandshake />} value={a.livesImpacted} label="Lives impacted" />
        <StatCard icon={<Timer />} value={a.avgResponseMin} suffix=" min" label={t("hospital.responseTime")} />
        <StatCard
          icon={<CheckCircle2 />}
          value={Math.round(a.fulfillmentRate * 100)}
          suffix="%"
          label={t("hospital.fulfillment")}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* live emergencies */}
        <Card glass className="p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Activity className="size-4 text-primary-bright" />
            {t("hospital.liveEmergencies")}
          </div>
          <div className="space-y-2">
            {emergencies.map((e) => {
              const meta = URGENCY_META[e.urgency];
              return (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] p-2.5"
                >
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ background: meta.color, boxShadow: `0 0 8px ${meta.color}` }}
                  />
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-xs font-bold text-primary-bright">
                    {e.bloodGroup}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">
                      {e.patientName}
                      {e.isMaternal && (
                        <span className="ml-1.5 text-[10px] text-primary-bright">
                          ⬦ maternal
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {n(e.units)} {t("common.units")} · AI {n(e.aiScore)}
                    </div>
                  </div>
                  <Badge variant={STATUS_VARIANT[e.status]}>
                    {t(`track.status.${e.status}` as string)}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </Card>

        <div className="space-y-4">
          {/* supply */}
          <Card glass className="p-4">
            <div className="mb-3 text-sm font-semibold">{t("hospital.supply")}</div>
            <div className="space-y-2">
              {a.byBloodGroup.map((b) => (
                <div key={b.group} className="flex items-center gap-3">
                  <span className="w-8 text-xs font-bold text-primary-bright">
                    {b.group}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary-deep to-primary-bright"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(b.available / maxSupply) * 100}%` }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <span className="w-6 text-right text-xs text-muted-foreground">
                    {n(b.available)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* trend */}
          <Card glass className="p-4">
            <div className="mb-1 text-sm font-semibold">Weekly demand</div>
            <TrendChart />
          </Card>
        </div>
      </div>

      {/* heatmap */}
      <Card glass className="mt-4 p-4">
        <div className="mb-3 text-sm font-semibold">{t("hospital.heatmap")}</div>
        <DemandHeatmap />
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  value,
  suffix,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <Card glass className="p-3.5">
      <div className="mb-2 flex size-8 items-center justify-center rounded-xl bg-primary/12 text-primary-bright [&_svg]:size-4">
        {icon}
      </div>
      <div className="text-xl font-bold">
        <AnimatedNumber value={value} suffix={suffix} />
      </div>
      <div className="text-[11px] leading-tight text-muted-foreground">{label}</div>
    </Card>
  );
}
