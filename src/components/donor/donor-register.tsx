"use client";

import * as React from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import { BloodGroupPicker } from "@/components/emergency/blood-group-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMapStore } from "@/store/map-store";
import { useUserStore } from "@/store/user-store";
import { DHAKA_AREAS } from "@/lib/constants";
import { useT } from "@/lib/i18n";
import type { BloodGroup } from "@/types";
import { cn } from "@/lib/utils";

export function DonorRegister({ onDone }: { onDone?: () => void }) {
  const { t } = useT();
  const addDonor = useMapStore((s) => s.addDonor);
  const setViewport = useMapStore((s) => s.setViewport);
  const setDonorId = useUserStore((s) => s.setDonorId);
  const setRegistered = useUserStore((s) => s.setRegistered);

  const [name, setName] = React.useState("");
  const [group, setGroup] = React.useState<BloodGroup>("O+");
  const [areaIdx, setAreaIdx] = React.useState(0);
  const [phone, setPhone] = React.useState("");
  const [available, setAvailable] = React.useState(true);

  function submit() {
    const area = DHAKA_AREAS[areaIdx];
    const id = `donor-me-${Date.now().toString().slice(-4)}`;
    const lat = area.lat + (Math.random() - 0.5) * 0.012;
    const lng = area.lng + (Math.random() - 0.5) * 0.012;
    addDonor({
      id,
      name: name.trim() || "You",
      nameBn: name.trim() || "আপনি",
      bloodGroup: group,
      lat,
      lng,
      area: area.name,
      areaBn: area.nameBn,
      phone: phone.trim() || "+8801700000000",
      available,
      predictedAvailability: 95,
      daysSinceLastDonation: 120,
      totalDonations: 0,
      rating: 5,
      verified: true,
      heading: Math.random() * Math.PI * 2,
    });
    setDonorId(id);
    setRegistered(true);
    setViewport({ longitude: lng, latitude: lat, zoom: 13 });
    toast.success(t("donor.registered"), {
      description: `${group} · ${area.name}`,
    });
    onDone?.();
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="space-y-5 rounded-3xl border border-border bg-card/60 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <UserPlus className="size-4 text-primary-bright" /> {t("donor.become")}
        </div>

        <div>
          <Label htmlFor="dname" className="mb-2 block">
            {t("donor.yourName")}
          </Label>
          <Input
            id="dname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="—"
          />
        </div>

        <div>
          <Label className="mb-2 block">{t("request.step.group")}</Label>
          <BloodGroupPicker value={group} onChange={setGroup} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="mb-2 block">{t("donor.yourArea")}</Label>
            <select
              value={areaIdx}
              onChange={(e) => setAreaIdx(Number(e.target.value))}
              className="h-11 w-full rounded-xl border border-input bg-background-2/60 px-3 text-sm text-foreground focus-visible:border-primary/60 focus-visible:outline-none"
            >
              {DHAKA_AREAS.map((a, i) => (
                <option key={a.name} value={i} className="bg-background">
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="dphone" className="mb-2 block">
              {t("donor.yourPhone")}
            </Label>
            <Input
              id="dphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+8801…"
            />
          </div>
        </div>

        <button
          onClick={() => setAvailable((v) => !v)}
          className={cn(
            "flex w-full items-center justify-between rounded-2xl border p-3 text-left transition-colors",
            available ? "border-success/40 bg-success/10" : "border-border bg-white/[0.02]",
          )}
        >
          <span className="text-sm font-medium">{t("donor.availabilityToggle")}</span>
          <Switch checked={available} onCheckedChange={setAvailable} />
        </button>

        <Button size="lg" className="w-full" onClick={submit}>
          <UserPlus className="size-4" /> {t("donor.registerCta")}
        </Button>
      </div>
    </motion.div>
  );
}
