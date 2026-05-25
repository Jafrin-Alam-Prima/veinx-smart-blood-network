import type { BloodGroup, LatLng } from "@/types";

export const DHAKA_CENTER: LatLng = { lat: 23.8103, lng: 90.4125 };

export const BLOOD_GROUPS: BloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

/** For a recipient of group X, which donor groups are compatible. */
export const DONOR_COMPATIBILITY: Record<BloodGroup, BloodGroup[]> = {
  "O-": ["O-"],
  "O+": ["O-", "O+"],
  "A-": ["O-", "A-"],
  "A+": ["O-", "O+", "A-", "A+"],
  "B-": ["O-", "B-"],
  "B+": ["O-", "O+", "B-", "B+"],
  "AB-": ["O-", "A-", "B-", "AB-"],
  "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
};

export function isCompatible(recipient: BloodGroup, donor: BloodGroup) {
  return DONOR_COMPATIBILITY[recipient].includes(donor);
}

/** Dhaka neighbourhoods used to scatter mock donors. */
export const DHAKA_AREAS: {
  name: string;
  nameBn: string;
  lat: number;
  lng: number;
}[] = [
  { name: "Dhanmondi", nameBn: "ধানমন্ডি", lat: 23.7461, lng: 90.376 },
  { name: "Gulshan", nameBn: "গুলশান", lat: 23.7925, lng: 90.4078 },
  { name: "Banani", nameBn: "বনানী", lat: 23.7937, lng: 90.4066 },
  { name: "Mirpur", nameBn: "মিরপুর", lat: 23.8223, lng: 90.3654 },
  { name: "Uttara", nameBn: "উত্তরা", lat: 23.8759, lng: 90.3795 },
  { name: "Mohammadpur", nameBn: "মোহাম্মদপুর", lat: 23.7656, lng: 90.3589 },
  { name: "Bashundhara", nameBn: "বসুন্ধরা", lat: 23.8203, lng: 90.4254 },
  { name: "Motijheel", nameBn: "মতিঝিল", lat: 23.7331, lng: 90.4172 },
  { name: "Tejgaon", nameBn: "তেজগাঁও", lat: 23.7639, lng: 90.3935 },
  { name: "Badda", nameBn: "বাড্ডা", lat: 23.7806, lng: 90.4267 },
  { name: "Rampura", nameBn: "রামপুরা", lat: 23.7615, lng: 90.4178 },
  { name: "Khilgaon", nameBn: "খিলগাঁও", lat: 23.75, lng: 90.4258 },
];

export const URGENCY_META = {
  routine: { label: "Routine", labelBn: "সাধারণ", color: "#38bdf8", weight: 0.4 },
  urgent: { label: "Urgent", labelBn: "জরুরি", color: "#f5a524", weight: 0.75 },
  critical: {
    label: "Critical",
    labelBn: "সংকটাপন্ন",
    color: "#ff2d55",
    weight: 1,
  },
} as const;

/** Average urban speed in Dhaka traffic (km/h) used for ETA. */
export const DHAKA_AVG_SPEED_KMH = 16;
