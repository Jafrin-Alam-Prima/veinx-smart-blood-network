"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Phone, MapPin, PartyPopper } from "lucide-react";
import { MapCanvas } from "@/components/map/map-canvas";
import { DonorMarker, DestinationMarker } from "@/components/map/donor-marker";
import { RouteLine } from "@/components/map/route-line";
import { StatusTimeline } from "@/components/shared/status-timeline";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEmergencyStore } from "@/store/emergency-store";
import { useMapStore } from "@/store/map-store";
import { useT } from "@/lib/i18n";
import { lerp } from "@/lib/utils";
import type { EmergencyStatus } from "@/types";

export default function TrackingPage() {
  const router = useRouter();
  const { t, n, locale } = useT();
  const active = useEmergencyStore((s) => s.active);
  const selected = useEmergencyStore((s) => s.selected);
  const setViewport = useMapStore((s) => s.setViewport);

  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<EmergencyStatus>("matched");
  const [accepted, setAccepted] = React.useState(false);

  React.useEffect(() => {
    if (!active || !selected) router.replace("/request");
  }, [active, selected, router]);

  React.useEffect(() => {
    if (active)
      setViewport({ longitude: active.lng, latitude: active.lat, zoom: 13.8 });
  }, [active, setViewport]);

  // Donor accepts shortly after landing, then drives in.
  React.useEffect(() => {
    const accept = setTimeout(() => {
      setAccepted(true);
      setStatus("en_route");
    }, 1600);
    return () => clearTimeout(accept);
  }, []);

  React.useEffect(() => {
    if (status !== "en_route") return;
    const id = setInterval(() => {
      setProgress((p) => {
        const nextP = Math.min(1, p + 0.0125);
        if (nextP >= 1) {
          clearInterval(id);
          setStatus("arrived");
          setTimeout(() => setStatus("fulfilled"), 1800);
        }
        return nextP;
      });
    }, 90);
    return () => clearInterval(id);
  }, [status]);

  if (!active || !selected) return null;

  const donor = selected.donor;
  const name = locale === "bn" ? donor.nameBn : donor.name;
  const movingDonor = {
    ...donor,
    lat: lerp(donor.lat, active.lat, progress),
    lng: lerp(donor.lng, active.lng, progress),
  };
  const etaLeft = Math.max(0, Math.ceil(selected.etaMin * (1 - progress)));

  return (
    <div className="fixed inset-0">
      <MapCanvas>
        <RouteLine from={donor} to={active} />
        <DestinationMarker lng={active.lng} lat={active.lat} label={t("track.title")} />
        <DonorMarker donor={movingDonor} selected />
      </MapCanvas>

      {/* accept celebration */}
      <AnimatePresence>
        {accepted && status === "en_route" && progress < 0.1 && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-strong absolute left-1/2 top-24 z-40 -translate-x-1/2 rounded-2xl px-4 py-3"
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <PartyPopper className="size-4 text-primary-bright" />
              {name} {t("track.accepted")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* arrived burst */}
      <AnimatePresence>
        {(status === "arrived" || status === "fulfilled") && <ArrivalBurst />}
      </AnimatePresence>

      {/* tracking card */}
      <div className="absolute inset-x-0 bottom-0 z-30 px-3 pb-24">
        <div className="glass-strong mx-auto max-w-md rounded-3xl p-4">
          <div className="mb-4 flex items-center gap-3">
            <Avatar name={name} ring />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-semibold">{name}</span>
                <Badge variant="primary">{donor.bloodGroup}</Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {status === "fulfilled"
                  ? t("track.status.fulfilled")
                  : `${t("track.eta")} · ~${n(etaLeft)} ${t("common.min")}`}
              </div>
            </div>
            <a href={`tel:${donor.phone}`}>
              <Button size="icon" variant="primary" className="rounded-full">
                <Phone className="size-4" />
              </Button>
            </a>
          </div>

          <StatusTimeline current={status} />

          {status === "fulfilled" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <Button className="w-full" onClick={() => router.push("/map")}>
                <MapPin className="size-4" /> {t("common.viewMap")}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function ArrivalBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * 160,
              y: Math.sin(angle) * 160,
              opacity: 0,
              scale: 0.4,
            }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute size-2 rounded-full bg-primary"
          />
        );
      })}
    </div>
  );
}
