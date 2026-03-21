import { Metadata } from "next";
import { WorkHero } from "@/components/work/work-hero";
import { FeaturedProjects } from "@/components/work/featured-projects";
import { ApproachSection } from "@/components/work/approach-section";
import { WorkCTA } from "@/components/work/work-cta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected web development projects showcasing premium websites, landing pages, and digital experiences for experts and businesses.",
};

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <FeaturedProjects />
      <ApproachSection />
      <WorkCTA />
    </>
  );
}
