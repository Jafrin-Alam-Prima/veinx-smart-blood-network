"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { MOCK_ANALYTICS } from "@/data/mock-analytics";

export default function TrendChartInner() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={MOCK_ANALYTICS.weeklyTrend}
        margin={{ top: 8, right: 4, left: 4, bottom: 0 }}
      >
        <defs>
          <linearGradient id="g-req" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff2d55" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#ff2d55" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="g-ful" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="day"
          tick={{ fill: "#93a1bd", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(13,20,38,0.95)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12,
            fontSize: 12,
          }}
          labelStyle={{ color: "#f5f7fb" }}
        />
        <Area type="monotone" dataKey="requests" stroke="#ff2d55" strokeWidth={2} fill="url(#g-req)" />
        <Area type="monotone" dataKey="fulfilled" stroke="#38bdf8" strokeWidth={2} fill="url(#g-ful)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
