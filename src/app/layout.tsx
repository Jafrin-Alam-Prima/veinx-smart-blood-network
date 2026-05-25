import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Providers } from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "VeinX — AI Emergency Blood Donation",
    template: "%s · VeinX",
  },
  description:
    "VeinX replaces blood-emergency chaos with instant, intelligent donor matching. Live donor map, AI triage, and real-time coordination — built for Bangladesh.",
  applicationName: "VeinX",
  keywords: [
    "blood donation",
    "emergency",
    "Bangladesh",
    "AI matching",
    "donor map",
  ],
  authors: [{ name: "VeinX" }],
  openGraph: {
    title: "VeinX — AI Emergency Blood Donation",
    description:
      "Instant intelligent blood donor matching for emergencies. Built for Bangladesh.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060912",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
