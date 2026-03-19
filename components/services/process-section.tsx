"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We discuss your business, goals, target audience, and what success looks like. I analyze competitors and identify opportunities.",
  },
  {
    number: "02",
    title: "Structure & Content",
    description: "Define the sitemap, page structure, and content hierarchy. Create wireframes and map out user journeys.",
  },
  {
    number: "03",
    title: "Visual Direction",
    description: "Develop the visual language, color palette, typography, and overall aesthetic aligned with your brand.",
  },
  {
    number: "04",
    title: "Design & Build",
    description: "Create detailed designs and implement them with clean, performant code. Regular check-ins and feedback loops.",
  },
  {
    number: "05",
    title: "QA & Polish",
    description: "Thorough testing across devices and browsers. Performance optimization and attention to details.",
  },
  {
    number: "06",
    title: "Launch & Handoff",
    description: "Deploy to production, set up analytics, and provide documentation. Support during the first weeks after launch.",
  },
];

export function ProcessSection() {
  return (
    <Section>
      <SectionHeader
        label="Process"
        title="How projects unfold"
        description="A structured approach that ensures clarity, quality, and results. Each phase builds on the previous one."
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative p-6 rounded-2xl bg-surface-2/30 border border-border"
          >
            <span className="text-4xl font-semibold text-surface-3 font-mono absolute top-4 right-4">
              {step.number}
            </span>
            <h3 className="text-lg font-semibold text-foreground mb-2 mt-8">
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
