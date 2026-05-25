"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Siren,
  HeartHandshake,
  Building2,
  MapPinned,
  WifiOff,
  Play,
  ArrowLeft,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { Badge } from "@/components/ui/badge";
import { useEmergencyStore } from "@/store/emergency-store";
import { useUserStore } from "@/store/user-store";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
};

export default function DemoPage() {
  const router = useRouter();
  const updateDraft = useEmergencyStore((s) => s.updateDraft);
  const commitEmergency = useEmergencyStore((s) => s.commitEmergency);
  const setRole = useUserStore((s) => s.setRole);
  const setDemoOffline = useUserStore((s) => s.setDemoOffline);

  const scenarios = [
    {
      icon: Siren,
      time: "1:00–2:00",
      title: "The Emergency",
      body: "Maternal O− crisis at Dhaka Medical. AI scores, lights up the map, and matches the fastest donor.",
      run: () => {
        setDemoOffline(false);
        updateDraft({
          patientName: "Ayesha Siddika",
          bloodGroup: "O-",
          units: 2,
          urgency: "critical",
          isMaternal: true,
          hospitalId: "hosp-dmch",
        });
        commitEmergency();
        router.push("/request/matching");
      },
    },
    {
      icon: HeartHandshake,
      time: "1:30–2:00",
      title: "The Donor's Call",
      body: "Flip to the donor. An incoming request slides in with a live countdown — accept and roll out.",
      run: () => {
        setRole("donor");
        router.push("/donor");
      },
    },
    {
      icon: Building2,
      time: "2:30–3:00",
      title: "Command Center",
      body: "Hospital ops view: live emergencies, blood supply, demand heatmap, and fulfilment analytics.",
      run: () => {
        setRole("hospital");
        router.push("/hospital");
      },
    },
    {
      icon: MapPinned,
      time: "0:30–1:00",
      title: "City Pulse",
      body: "The live Dhaka donor map — glowing, pulsing donors filtered by blood group.",
      run: () => router.push("/map"),
    },
    {
      icon: WifiOff,
      time: "2:00–2:30",
      title: "Offline · SMS Fallback",
      body: "No internet? VeinX still dispatches the request to nearby donors over SMS.",
      run: () => {
        setDemoOffline(true);
        router.push("/request");
      },
    },
  ];

  return (
    <div className="mx-auto min-h-dvh max-w-2xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground">
          <ArrowLeft className="size-4" />
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/present"
            className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary-bright"
          >
            ▶ Present mode
          </Link>
          <LanguageToggle />
        </div>
      </div>

      <Badge variant="ai" className="mb-3">
        <Play className="size-3" /> Demo control room
      </Badge>
      <h1 className="text-3xl font-bold tracking-tight">Cinematic demo scenarios</h1>
      <p className="mt-2 text-muted-foreground">
        One tap per scene, mapped to the 3-minute pitch timeline.
      </p>

      <div className="mt-8 space-y-3">
        {scenarios.map((s, i) => (
          <motion.button
            key={s.title}
            custom={i}
            variants={fade}
            initial="hidden"
            animate="show"
            onClick={s.run}
            className="group flex w-full items-center gap-4 rounded-3xl border border-border bg-card/60 p-5 text-left transition-colors hover:border-primary/40"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary-bright transition-transform group-hover:scale-110">
              <s.icon className="size-6" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{s.title}</h3>
                <Badge variant="outline" className="font-mono text-[10px]">
                  {s.time}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
            <Play className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary-bright" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
