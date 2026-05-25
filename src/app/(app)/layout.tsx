"use client";

import { AppTopBar, AppBottomNav } from "@/components/shared/app-nav";
import { OfflineOverlay } from "@/components/shared/offline-overlay";
import { useSimTick, useNetworkSync } from "@/hooks/use-sim";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useSimTick();
  useNetworkSync();

  return (
    <div className="relative flex min-h-dvh flex-col">
      <AppTopBar />
      <main className="flex-1">{children}</main>
      <AppBottomNav />
      <OfflineOverlay />
    </div>
  );
}
