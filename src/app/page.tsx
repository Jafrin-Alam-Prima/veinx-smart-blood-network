import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { Problem } from "@/components/landing/problem";
import { EmotionalImpact } from "@/components/landing/emotional-impact";
import { HowItWorks } from "@/components/landing/how-it-works";
import { AiArchitecture } from "@/components/landing/ai-architecture";
import { AiFeatures } from "@/components/landing/ai-features";
import { FooterCta } from "@/components/landing/footer-cta";

export default function HomePage() {
  return (
    <div className="relative flex-1 overflow-hidden">
      <SiteHeader />
      <main>
        <Hero />
        <Problem />
        <EmotionalImpact />
        <HowItWorks />
        <AiArchitecture />
        <AiFeatures />
        <FooterCta />
      </main>
    </div>
  );
}
