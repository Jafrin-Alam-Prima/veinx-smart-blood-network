"use client";

import { MOCK_ANALYTICS } from "@/data/mock-analytics";

/** Stylized demand heatmap: glowing blobs positioned by area, sized by intensity. */
export function DemandHeatmap() {
  const points = MOCK_ANALYTICS.heatmap;
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const px = (lng: number) => ((lng - minLng) / (maxLng - minLng)) * 100;
  const py = (lat: number) => (1 - (lat - minLat) / (maxLat - minLat)) * 100;

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-[#070b16]">
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#9fb3d9_1px,transparent_1px),linear-gradient(90deg,#9fb3d9_1px,transparent_1px)] [background-size:34px_34px]" />
      {points.map((p) => {
        const size = 60 + p.intensity * 120;
        return (
          <div
            key={p.area}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${px(p.lng)}%`,
              top: `${py(p.lat)}%`,
              width: size,
              height: size,
              background: `radial-gradient(circle, rgba(255,45,85,${0.15 + p.intensity * 0.5}), transparent 70%)`,
            }}
          />
        );
      })}
      {points.map((p) => (
        <div
          key={`${p.area}-dot`}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${px(p.lng)}%`, top: `${py(p.lat)}%` }}
        >
          <span className="block size-1.5 rounded-full bg-primary-bright shadow-[0_0_8px_2px_rgba(255,45,85,0.8)]" />
          <span className="mt-0.5 block whitespace-nowrap text-[8px] text-muted-foreground">
            {p.area}
          </span>
        </div>
      ))}
    </div>
  );
}
