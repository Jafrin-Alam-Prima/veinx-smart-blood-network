"use client";

import * as React from "react";
import { AppTopBar, AppBottomNav } from "@/components/shared/app-nav";
import { OfflineOverlay } from "@/components/shared/offline-overlay";
import { useSimTick, useNetworkSync } from "@/hooks/use-sim";
import { useUserStore } from "@/store/user-store";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useSimTick();
  useNetworkSync();

  // Deep-link for the /present "Offline" scene (read without useSearchParams
  // so child pages stay statically renderable).
  const setDemoOffline = useUserStore((s) => s.setDemoOffline);
  React.useEffect(() => {
    if (new URLSearchParams(window.location.search).get("offline"))
      setDemoOffline(true);
  }, [setDemoOffline]);

  return (
    <div className="relative flex min-h-dvh flex-col">
      <AppTopBar />
      <main className="flex-1">{children}</main>
      <AppBottomNav />
      <OfflineOverlay />
    </div>
  );
}
