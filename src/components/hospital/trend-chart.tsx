"use client";

import dynamic from "next/dynamic";

// Recharts needs a measured container, so render it client-only.
const TrendChartInner = dynamic(() => import("./trend-chart-inner"), {
  ssr: false,
  loading: () => <div className="h-40 w-full" />,
});

export function TrendChart() {
  return (
    <div className="h-40 w-full">
      <TrendChartInner />
    </div>
  );
}
