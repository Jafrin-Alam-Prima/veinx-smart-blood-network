"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, HeartPulse, Hospital, Droplet } from "lucide-react";
import { BloodGroupPicker } from "@/components/emergency/blood-group-picker";
import { UrgencyPicker } from "@/components/emergency/urgency-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useEmergencyStore } from "@/store/emergency-store";
import { MOCK_HOSPITALS } from "@/data/mock-hospitals";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const STEPS = ["request.step.group", "request.step.details", "request.step.location"];

export default function RequestPage() {
  const router = useRouter();
  const { t, n, locale } = useT();
  const draft = useEmergencyStore((s) => s.draft);
  const updateDraft = useEmergencyStore((s) => s.updateDraft);
  const commitEmergency = useEmergencyStore((s) => s.commitEmergency);
  const [step, setStep] = React.useState(0);

  const next = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else {
      commitEmergency();
      router.push("/request/matching");
    }
  };
  const back = () => (step > 0 ? setStep((s) => s - 1) : router.push("/map"));

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col px-4 pb-28 pt-20">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {t("request.title")} · {n(step + 1)}/{n(STEPS.length)}
          </span>
          <span className={cn(locale === "bn" && "font-bengali")}>
            {t(STEPS[step])}
          </span>
        </div>
        <Progress value={((step + 1) / STEPS.length) * 100} />
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <Section
                icon={<Droplet className="size-5" />}
                title={t("request.step.group")}
              >
                <BloodGroupPicker
                  value={draft.bloodGroup}
                  onChange={(bloodGroup) => updateDraft({ bloodGroup })}
                />
              </Section>
            )}

            {step === 1 && (
              <Section
                icon={<HeartPulse className="size-5" />}
                title={t("request.step.details")}
              >
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label>{t("request.unitsNeeded")}</Label>
                      <span className="text-lg font-bold text-primary-bright">
                        {n(draft.units)}{" "}
                        <span className="text-xs text-muted-foreground">
                          {t("common.units")}
                        </span>
                      </span>
                    </div>
                    <Slider
                      min={1}
                      max={6}
                      value={draft.units}
                      onValueChange={(units) => updateDraft({ units })}
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">{t("request.urgency")}</Label>
                    <UrgencyPicker
                      value={draft.urgency}
                      onChange={(urgency) => updateDraft({ urgency })}
                    />
                  </div>

                  <button
                    onClick={() => updateDraft({ isMaternal: !draft.isMaternal })}
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-colors",
                      draft.isMaternal
                        ? "border-primary/40 bg-primary/10"
                        : "border-border bg-white/[0.02]",
                    )}
                  >
                    <div>
                      <div className="font-medium">{t("request.maternal")}</div>
                      <div className="text-xs text-muted-foreground">
                        {t("request.maternalHint")}
                      </div>
                    </div>
                    <Switch
                      checked={draft.isMaternal}
                      onCheckedChange={(isMaternal) => updateDraft({ isMaternal })}
                    />
                  </button>

                  <div>
                    <Label htmlFor="pname" className="mb-2 block">
                      {t("request.patientName")}
                    </Label>
                    <Input
                      id="pname"
                      value={draft.patientName}
                      placeholder="—"
                      onChange={(e) => updateDraft({ patientName: e.target.value })}
                    />
                  </div>
                </div>
              </Section>
            )}

            {step === 2 && (
              <Section
                icon={<Hospital className="size-5" />}
                title={t("request.step.location")}
              >
                <div className="space-y-2.5">
                  {MOCK_HOSPITALS.map((h) => {
                    const active = draft.hospitalId === h.id;
                    return (
                      <button
                        key={h.id}
                        onClick={() => updateDraft({ hospitalId: h.id })}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors",
                          active
                            ? "border-primary/50 bg-primary/[0.07]"
                            : "border-border bg-white/[0.02] hover:border-border-strong",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-10 items-center justify-center rounded-xl",
                            active
                              ? "bg-primary/20 text-primary-bright"
                              : "bg-white/5 text-muted-foreground",
                          )}
                        >
                          <Hospital className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold">
                            {locale === "bn" ? h.nameBn : h.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {h.area} · {n(h.beds)} beds
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background to-transparent px-4 pb-6 pt-8">
        <div className="mx-auto flex max-w-md gap-3">
          <Button variant="glass" size="lg" onClick={back}>
            <ArrowLeft />
          </Button>
          <Button size="lg" className="flex-1" onClick={next}>
            {step === STEPS.length - 1 ? t("request.findDonors") : t("common.continue")}
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  const { locale } = useT();
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/15 text-primary-bright">
          {icon}
        </span>
        <h1 className={cn("text-xl font-bold", locale === "bn" && "font-bengali")}>
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
}
