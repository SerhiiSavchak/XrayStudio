import { Metadata } from "next";
import { ServicesHero } from "@/components/services/services-hero";
import { ServiceCategories } from "@/components/services/service-categories";
import { ServiceDetails } from "@/components/services/service-details";
import { EngagementModels } from "@/components/services/engagement-models";
import { ProcessSection } from "@/components/services/process-section";
import { IncludedSection } from "@/components/services/included-section";
import { ServicesFAQ } from "@/components/services/services-faq";
import { ServicesCTA } from "@/components/services/services-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Premium web development services for experts, personal brands, and service businesses. Landing pages, business websites, portfolio sites, and redesigns.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceCategories />
      <ServiceDetails />
      <EngagementModels />
      <ProcessSection />
      <IncludedSection />
      <ServicesFAQ />
      <ServicesCTA />
    </>
  );
}
