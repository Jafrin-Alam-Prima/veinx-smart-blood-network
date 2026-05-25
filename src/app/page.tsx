import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { Problem } from "@/components/landing/problem";
import { HowItWorks } from "@/components/landing/how-it-works";
import { AiFeatures } from "@/components/landing/ai-features";
import { FooterCta } from "@/components/landing/footer-cta";

export default function HomePage() {
  return (
    <div className="relative flex-1 overflow-hidden">
      <SiteHeader />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <AiFeatures />
        <FooterCta />
      </main>
    </div>
  );
}
