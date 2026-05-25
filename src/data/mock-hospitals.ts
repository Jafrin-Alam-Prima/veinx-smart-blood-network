import type { Hospital, BloodGroup } from "@/types";
import { BLOOD_GROUPS } from "@/lib/constants";

function bank(seed: number): Record<BloodGroup, number> {
  const out = {} as Record<BloodGroup, number>;
  BLOOD_GROUPS.forEach((g, i) => {
    out[g] = ((seed * (i + 3)) % 14) + (g.includes("-") ? 0 : 4);
  });
  return out;
}

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: "hosp-dmch",
    name: "Dhaka Medical College Hospital",
    nameBn: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
    lat: 23.7258,
    lng: 90.3975,
    area: "Bakshibazar",
    phone: "+88029660063",
    beds: 2600,
    bloodBank: bank(7),
  },
  {
    id: "hosp-square",
    name: "Square Hospital",
    nameBn: "স্কয়ার হাসপাতাল",
    lat: 23.7516,
    lng: 90.3835,
    area: "Panthapath",
    phone: "+88028159457",
    beds: 650,
    bloodBank: bank(11),
  },
  {
    id: "hosp-united",
    name: "United Hospital",
    nameBn: "ইউনাইটেড হাসপাতাল",
    lat: 23.8003,
    lng: 90.418,
    area: "Gulshan",
    phone: "+8801914001234",
    beds: 500,
    bloodBank: bank(5),
  },
  {
    id: "hosp-evercare",
    name: "Evercare Hospital",
    nameBn: "এভারকেয়ার হাসপাতাল",
    lat: 23.8156,
    lng: 90.4256,
    area: "Bashundhara",
    phone: "+8801051010001",
    beds: 425,
    bloodBank: bank(9),
  },
  {
    id: "hosp-bsmmu",
    name: "BSMMU (PG Hospital)",
    nameBn: "বঙ্গবন্ধু মেডিকেল বিশ্ববিদ্যালয়",
    lat: 23.7393,
    lng: 90.3944,
    area: "Shahbag",
    phone: "+88029661051",
    beds: 1900,
    bloodBank: bank(3),
  },
  {
    id: "hosp-labaid",
    name: "Labaid Specialized Hospital",
    nameBn: "ল্যাবএইড হাসপাতাল",
    lat: 23.7459,
    lng: 90.3795,
    area: "Dhanmondi",
    phone: "+88029676356",
    beds: 400,
    bloodBank: bank(13),
  },
];
