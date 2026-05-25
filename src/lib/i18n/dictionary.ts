import type { Locale } from "@/types";

/**
 * Flat dot-keyed dictionary. Every UI string lives here in both locales so the
 * EN/BN toggle swaps the entire interface, not a partial translation.
 */
export const DICT: Record<string, Record<Locale, string>> = {
  // Brand / common
  "brand.tagline": {
    en: "Intelligent blood, instantly.",
    bn: "বুদ্ধিমান রক্ত, তাৎক্ষণিক।",
  },
  "common.requestBlood": { en: "Request Blood", bn: "রক্তের অনুরোধ" },
  "common.continue": { en: "Continue", bn: "এগিয়ে যান" },
  "common.back": { en: "Back", bn: "পেছনে" },
  "common.cancel": { en: "Cancel", bn: "বাতিল" },
  "common.confirm": { en: "Confirm", bn: "নিশ্চিত করুন" },
  "common.call": { en: "Call", bn: "কল করুন" },
  "common.km": { en: "km", bn: "কিমি" },
  "common.min": { en: "min", bn: "মিনিট" },
  "common.units": { en: "units", bn: "ইউনিট" },
  "common.available": { en: "Available", bn: "উপলব্ধ" },
  "common.offline": { en: "Offline", bn: "অফলাইন" },
  "common.online": { en: "Online", bn: "অনলাইন" },
  "common.viewMap": { en: "View Map", bn: "ম্যাপ দেখুন" },

  // Roles
  "role.patient": { en: "I need blood", bn: "আমার রক্ত দরকার" },
  "role.donor": { en: "I'm a donor", bn: "আমি একজন রক্তদাতা" },
  "role.hospital": { en: "Hospital", bn: "হাসপাতাল" },

  // Nav
  "nav.map": { en: "Live Map", bn: "লাইভ ম্যাপ" },
  "nav.donor": { en: "Donor", bn: "রক্তদাতা" },
  "nav.hospital": { en: "Hospital", bn: "হাসপাতাল" },
  "nav.request": { en: "Request", bn: "অনুরোধ" },

  // Landing
  "landing.hero.title": {
    en: "Blood emergencies shouldn't start on Facebook.",
    bn: "রক্তের জরুরি অবস্থা ফেসবুকে শুরু হওয়া উচিত নয়।",
  },
  "landing.hero.subtitle": {
    en: "VeinX replaces the chaos of frantic posts and phone calls with instant, AI-matched donors near you — in real time.",
    bn: "ভেইনএক্স আতঙ্কিত পোস্ট ও ফোন কলের বিশৃঙ্খলার বদলে এনে দেয় আপনার কাছের এআই-নির্বাচিত রক্তদাতা — রিয়েল টাইমে।",
  },
  "landing.hero.cta": { en: "Start Emergency Request", bn: "জরুরি অনুরোধ শুরু করুন" },
  "landing.hero.secondary": { en: "Explore Live Map", bn: "লাইভ ম্যাপ দেখুন" },
  "landing.problem.title": {
    en: "Every minute counts. The old way wastes them.",
    bn: "প্রতিটি মিনিট মূল্যবান। পুরনো পদ্ধতি তা নষ্ট করে।",
  },
  "landing.solution.title": {
    en: "One tap. Intelligent matching. Lives saved.",
    bn: "এক ট্যাপ। বুদ্ধিমান ম্যাচিং। জীবন রক্ষা।",
  },

  // Request wizard
  "request.title": { en: "Emergency Request", bn: "জরুরি অনুরোধ" },
  "request.step.group": { en: "Blood group", bn: "রক্তের গ্রুপ" },
  "request.step.details": { en: "Details", bn: "বিবরণ" },
  "request.step.location": { en: "Hospital", bn: "হাসপাতাল" },
  "request.step.review": { en: "Review", bn: "পর্যালোচনা" },
  "request.unitsNeeded": { en: "Units needed", bn: "প্রয়োজনীয় ইউনিট" },
  "request.urgency": { en: "Urgency", bn: "জরুরি মাত্রা" },
  "request.maternal": { en: "Maternal emergency", bn: "মাতৃত্বকালীন জরুরি" },
  "request.maternalHint": {
    en: "Enables Maternal Priority Routing",
    bn: "মাতৃ অগ্রাধিকার রাউটিং সক্রিয় করে",
  },
  "request.patientName": { en: "Patient name", bn: "রোগীর নাম" },
  "request.findDonors": { en: "Find Donors", bn: "রক্তদাতা খুঁজুন" },

  // Matching / AI
  "match.analyzing": { en: "Analyzing donor network", bn: "রক্তদাতা নেটওয়ার্ক বিশ্লেষণ" },
  "match.scanning": { en: "Scanning {n} donors…", bn: "{n} জন রক্তদাতা স্ক্যান করা হচ্ছে…" },
  "match.compatible": { en: "{n} compatible found", bn: "{n} জন উপযুক্ত পাওয়া গেছে" },
  "match.ranking": { en: "Ranking by ETA & reliability", bn: "ইটিএ ও নির্ভরযোগ্যতা অনুযায়ী র‌্যাঙ্কিং" },
  "match.bestMatch": { en: "Best match", bn: "সেরা ম্যাচ" },
  "match.smartMatch": { en: "Smart Match", bn: "স্মার্ট ম্যাচ" },
  "match.aiScore": { en: "AI Emergency Score", bn: "এআই জরুরি স্কোর" },
  "match.requestDonor": { en: "Request this donor", bn: "এই রক্তদাতাকে অনুরোধ করুন" },

  // Triage
  "triage.title": { en: "AI Triage", bn: "এআই ট্রায়াজ" },
  "triage.why": { en: "Why this match", bn: "কেন এই ম্যাচ" },
  "triage.factors": { en: "Scoring factors", bn: "স্কোরিং ফ্যাক্টর" },
  "triage.compatibility": { en: "Compatibility", bn: "সামঞ্জস্য" },
  "triage.proximity": { en: "Proximity", bn: "নৈকট্য" },
  "triage.availability": { en: "Availability", bn: "উপলব্ধতা" },
  "triage.reliability": { en: "Reliability", bn: "নির্ভরযোগ্যতা" },
  "triage.maternal": { en: "Maternal priority", bn: "মাতৃ অগ্রাধিকার" },

  // Tracking
  "track.title": { en: "Live Tracking", bn: "লাইভ ট্র্যাকিং" },
  "track.eta": { en: "Donor ETA", bn: "রক্তদাতার ইটিএ" },
  "track.status.searching": { en: "Searching donors", bn: "রক্তদাতা খোঁজা হচ্ছে" },
  "track.status.matched": { en: "Donor matched", bn: "রক্তদাতা মিলেছে" },
  "track.status.en_route": { en: "On the way", bn: "পথে আছেন" },
  "track.status.arrived": { en: "Arrived", bn: "পৌঁছেছেন" },
  "track.status.fulfilled": { en: "Fulfilled", bn: "সম্পন্ন" },
  "track.accepted": { en: "accepted your request", bn: "আপনার অনুরোধ গ্রহণ করেছেন" },

  // Donor mode
  "donor.title": { en: "Donor Dashboard", bn: "রক্তদাতা ড্যাশবোর্ড" },
  "donor.availabilityToggle": { en: "Available to donate", bn: "রক্তদানে প্রস্তুত" },
  "donor.incoming": { en: "Incoming request", bn: "আসন্ন অনুরোধ" },
  "donor.accept": { en: "Accept", bn: "গ্রহণ" },
  "donor.decline": { en: "Decline", bn: "প্রত্যাখ্যান" },
  "donor.history": { en: "Donation history", bn: "রক্তদানের ইতিহাস" },
  "donor.nextEligible": { en: "Next eligible", bn: "পরবর্তী যোগ্যতা" },
  "donor.become": { en: "Become a donor", bn: "রক্তদাতা হোন" },
  "donor.becomeHint": {
    en: "Join the network and save lives near you",
    bn: "নেটওয়ার্কে যোগ দিন এবং কাছের জীবন বাঁচান",
  },
  "donor.yourName": { en: "Your name", bn: "আপনার নাম" },
  "donor.yourArea": { en: "Your area", bn: "আপনার এলাকা" },
  "donor.yourPhone": { en: "Phone", bn: "ফোন" },
  "donor.registerCta": { en: "Register as donor", bn: "রক্তদাতা হিসেবে নিবন্ধন" },
  "donor.registered": { en: "You're a verified donor 🩸", bn: "আপনি একজন যাচাইকৃত রক্তদাতা 🩸" },
  "donor.openRequests": { en: "Open requests near you", bn: "আপনার কাছের খোলা অনুরোধ" },
  "donor.donateNow": { en: "Donate", bn: "রক্ত দিন" },
  "donor.noRequests": { en: "No open requests right now.", bn: "এই মুহূর্তে কোনো খোলা অনুরোধ নেই।" },
  "donor.thanksTitle": { en: "Thank you for donating 🩸", bn: "রক্তদানের জন্য ধন্যবাদ 🩸" },

  // Hospital
  "hospital.title": { en: "Hospital Command Center", bn: "হাসপাতাল কমান্ড সেন্টার" },
  "hospital.liveEmergencies": { en: "Live emergencies", bn: "লাইভ জরুরি অবস্থা" },
  "hospital.supply": { en: "Blood supply", bn: "রক্ত সরবরাহ" },
  "hospital.heatmap": { en: "Demand heatmap", bn: "চাহিদা হিটম্যাপ" },
  "hospital.responseTime": { en: "Avg response", bn: "গড় সাড়া" },
  "hospital.fulfillment": { en: "Fulfillment rate", bn: "পূরণের হার" },

  // Offline
  "offline.title": { en: "You're offline", bn: "আপনি অফলাইন" },
  "offline.body": {
    en: "VeinX can still dispatch your request over SMS to nearby donors.",
    bn: "ভেইনএক্স এখনও এসএমএসের মাধ্যমে কাছের রক্তদাতাদের কাছে আপনার অনুরোধ পাঠাতে পারে।",
  },
  "offline.sms": { en: "Send via SMS fallback", bn: "এসএমএস ফলব্যাকে পাঠান" },
};
