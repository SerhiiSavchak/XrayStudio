import { Hero } from "@/components/home/hero";
import { CredibilityStrip } from "@/components/home/credibility-strip";
import { ValueProposition } from "@/components/home/value-proposition";
import { SelectedWork } from "@/components/home/selected-work";
import { ServicesPreview } from "@/components/home/services-preview";
import { ProcessPreview } from "@/components/home/process-preview";
import { TrustLayer } from "@/components/home/trust-layer";
import { AboutPreview } from "@/components/home/about-preview";
import { FAQPreview } from "@/components/home/faq-preview";
import { FinalCTA } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <ValueProposition />
      <SelectedWork />
      <ServicesPreview />
      <ProcessPreview />
      <TrustLayer />
      <AboutPreview />
      <FAQPreview />
      <FinalCTA />
    </>
  );
}
