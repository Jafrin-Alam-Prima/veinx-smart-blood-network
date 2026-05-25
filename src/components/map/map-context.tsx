"use client";

import * as React from "react";

export interface MapProjection {
  /** Project geographic coords to pixel coords within the map container. */
  project: (lng: number, lat: number) => { x: number; y: number };
  pxPerKm: number;
  width: number;
  height: number;
}

const Ctx = React.createContext<MapProjection | null>(null);

export const MapProvider = Ctx.Provider;

export function useMapProjection() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useMapProjection must be used inside MapCanvas");
  return ctx;
}

export const KM_PER_DEG_LAT = 110.574;
export function kmPerDegLng(lat: number) {
  return 111.32 * Math.cos((lat * Math.PI) / 180);
}
