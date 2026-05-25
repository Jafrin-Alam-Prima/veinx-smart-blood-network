"use client";

import * as React from "react";
import { Minus, Plus, LocateFixed } from "lucide-react";
import { useMapStore } from "@/store/map-store";
import { DHAKA_CENTER } from "@/lib/constants";
import { clamp } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  MapProvider,
  KM_PER_DEG_LAT,
  kmPerDegLng,
  type MapProjection,
} from "./map-context";

const ZOOM_MIN = 10.8;
const ZOOM_MAX = 15;

/**
 * Custom dark map renderer. Projects lat/lng onto a stylized Dhaka backdrop
 * (no external tiles/token required) and provides a projection to children
 * via context. Supports drag-pan, wheel + button zoom.
 */
export function MapCanvas({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const viewport = useMapStore((s) => s.viewport);
  const setViewport = useMapStore((s) => s.setViewport);

  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const drag = React.useRef<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => {
      setSize({
        width: e.contentRect.width,
        height: e.contentRect.height,
      });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const pxPerKm = Math.pow(2, viewport.zoom) * 0.014;

  const projection: MapProjection = React.useMemo(() => {
    const center = { lng: viewport.longitude, lat: viewport.latitude };
    const project = (lng: number, lat: number) => {
      const xKm = (lng - center.lng) * kmPerDegLng(center.lat);
      const yKm = (lat - center.lat) * KM_PER_DEG_LAT;
      return {
        x: size.width / 2 + xKm * pxPerKm,
        y: size.height / 2 - yKm * pxPerKm,
      };
    };
    return { project, pxPerKm, width: size.width, height: size.height };
  }, [viewport.longitude, viewport.latitude, pxPerKm, size.width, size.height]);

  function onPointerDown(e: React.PointerEvent) {
    drag.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current) return;
    const dxPx = e.clientX - drag.current.x;
    const dyPx = e.clientY - drag.current.y;
    drag.current = { x: e.clientX, y: e.clientY };
    const dLng = dxPx / pxPerKm / kmPerDegLng(viewport.latitude);
    const dLat = dyPx / pxPerKm / KM_PER_DEG_LAT;
    setViewport({
      longitude: viewport.longitude - dLng,
      latitude: viewport.latitude + dLat,
    });
  }
  function onPointerUp() {
    drag.current = null;
  }
  function onWheel(e: React.WheelEvent) {
    const next = clamp(viewport.zoom - e.deltaY * 0.0016, ZOOM_MIN, ZOOM_MAX);
    setViewport({ zoom: next });
  }
  const zoomBy = (d: number) =>
    setViewport({ zoom: clamp(viewport.zoom + d, ZOOM_MIN, ZOOM_MAX) });
  const recenter = () =>
    setViewport({
      longitude: DHAKA_CENTER.lng,
      latitude: DHAKA_CENTER.lat,
      zoom: 12.2,
    });

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onWheel={onWheel}
      className={cn(
        "relative h-full w-full touch-none overflow-hidden bg-[#070b16] [cursor:grab] active:[cursor:grabbing]",
        className,
      )}
    >
      <MapBackdrop projection={projection} />
      <MapProvider value={projection}>
        {size.width > 0 && children}
      </MapProvider>

      {/* controls */}
      <div className="absolute bottom-28 right-3 z-30 flex flex-col gap-2">
        <MapButton onClick={() => zoomBy(0.6)} label="Zoom in">
          <Plus className="size-4" />
        </MapButton>
        <MapButton onClick={() => zoomBy(-0.6)} label="Zoom out">
          <Minus className="size-4" />
        </MapButton>
        <MapButton onClick={recenter} label="Recenter">
          <LocateFixed className="size-4" />
        </MapButton>
      </div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 z-20 [box-shadow:inset_0_0_140px_40px_rgba(0,0,0,0.7)]" />
    </div>
  );
}

function MapButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="glass flex size-10 items-center justify-center rounded-xl text-foreground/80 transition-colors hover:text-foreground active:scale-95"
    >
      {children}
    </button>
  );
}

/** Stylized backdrop: grid, ambient glow, faux arterials + river. */
function MapBackdrop({ projection }: { projection: MapProjection }) {
  const { width, height } = projection;
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#0c1426,transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#9fb3d9_1px,transparent_1px),linear-gradient(90deg,#9fb3d9_1px,transparent_1px)] [background-size:46px_46px]" />
      <svg className="absolute inset-0 size-full" width={width} height={height}>
        <g stroke="#1c2942" strokeWidth="14" strokeLinecap="round" opacity="0.6">
          <line x1="-50" y1="22%" x2="120%" y2="40%" />
          <line x1="18%" y1="-40" x2="36%" y2="120%" />
          <line x1="72%" y1="-40" x2="64%" y2="120%" />
          <line x1="-50" y1="70%" x2="120%" y2="82%" />
        </g>
        <g stroke="#243352" strokeWidth="5" strokeLinecap="round" opacity="0.7">
          <line x1="-50" y1="52%" x2="120%" y2="58%" />
          <line x1="48%" y1="-40" x2="52%" y2="120%" />
        </g>
        {/* river (Buriganga-ish curve) */}
        {width > 0 && (
          <path
            d={`M ${-40} ${height * 0.92} C ${width * 0.3} ${height * 0.72}, ${width * 0.2} ${height * 0.5}, ${width * 0.46} ${height * 0.3} S ${width * 0.72} ${height * 0.1}, ${width + 40} ${height * 0.04}`}
            stroke="#13294a"
            strokeWidth="26"
            fill="none"
            opacity="0.55"
          />
        )}
      </svg>
    </div>
  );
}
