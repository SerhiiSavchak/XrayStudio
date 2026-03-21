import { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { ProfessionalIdentity } from "@/components/about/professional-identity";
import { PrinciplesSection } from "@/components/about/principles-section";
import { HowIWork } from "@/components/about/how-i-work";
import { WhyChooseMe } from "@/components/about/why-choose-me";
import { TechStack } from "@/components/about/tech-stack";
import { AboutCTA } from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Product-minded web developer creating premium websites for experts and service businesses. Learn about my approach, principles, and how I work.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ProfessionalIdentity />
      <PrinciplesSection />
      <HowIWork />
      <WhyChooseMe />
      <TechStack />
      <AboutCTA />
    </>
  );
}
