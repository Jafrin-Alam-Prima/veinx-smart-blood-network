import type { Analytics } from "@/types";
import { BLOOD_GROUPS, DHAKA_AREAS } from "@/lib/constants";
import { MOCK_DONORS } from "./mock-donors";

const byBloodGroup = BLOOD_GROUPS.map((group) => {
  const available = MOCK_DONORS.filter(
    (d) => d.bloodGroup === group && d.available,
  ).length;
  return {
    group,
    available,
    requests: Math.max(1, Math.round(available * (0.4 + (group === "O-" ? 0.9 : 0.3)))),
  };
});

const weeklyTrend = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map(
  (day, i) => {
    const requests = 28 + ((i * 7) % 22) + (i === 6 ? 14 : 0);
    return { day, requests, fulfilled: Math.round(requests * (0.78 + (i % 3) * 0.05)) };
  },
);

const heatmap = DHAKA_AREAS.map((a, i) => ({
  area: a.name,
  lat: a.lat,
  lng: a.lng,
  intensity: Math.round((((i * 37) % 90) + 10)) / 100,
}));

export const MOCK_ANALYTICS: Analytics = {
  donationsToday: 147,
  livesImpacted: 3820,
  activeDonors: MOCK_DONORS.filter((d) => d.available).length,
  avgResponseMin: 8,
  fulfillmentRate: 0.91,
  byBloodGroup,
  weeklyTrend,
  heatmap,
};
