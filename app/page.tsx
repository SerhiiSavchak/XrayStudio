import { Hero } from "@/components/home/hero";
import { ScrollStory } from "@/components/home/scroll-story";
import { SelectedWork } from "@/components/home/selected-work";
import { FinalCTA } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollStory />
      <SelectedWork />
      <FinalCTA />
    </>
  );
}
