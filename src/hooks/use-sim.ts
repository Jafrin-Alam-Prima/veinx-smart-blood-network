"use client";

import { useEffect } from "react";
import { useMapStore } from "@/store/map-store";
import { useUserStore } from "@/store/user-store";

/** Drives the "live" feel: drifts donor markers on an interval. */
export function useSimTick(intervalMs = 2200, enabled = true) {
  const tickDonors = useMapStore((s) => s.tickDonors);
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(tickDonors, intervalMs);
    return () => clearInterval(id);
  }, [tickDonors, intervalMs, enabled]);
}

/** Syncs the browser's online/offline state into the user store. */
export function useNetworkSync() {
  const setOnline = useUserStore((s) => s.setOnline);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, [setOnline]);
}
