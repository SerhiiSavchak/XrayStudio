"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding your business, goals, audience, and what success looks like. Defining scope and approach together.",
  },
  {
    number: "02",
    title: "Structure & Content",
    description: "Planning the sitemap, page structure, user journeys, and content hierarchy. Building the strategic foundation.",
  },
  {
    number: "03",
    title: "Visual Direction",
    description: "Developing the visual language, composition, typography, and overall aesthetic that aligns with your brand.",
  },
  {
    number: "04",
    title: "Design & Build",
    description: "Creating detailed designs and implementing them with clean, performant code. Iterating based on feedback.",
  },
  {
    number: "05",
    title: "Polish & Launch",
    description: "Final refinements, testing, optimization, and deployment. Ensuring everything works flawlessly.",
  },
];

export function ProcessPreview() {
  return (
    <Section>
      <SectionHeader
        label="Process"
        title="How we work together"
        description="A structured approach that ensures clarity, quality, and results. No surprises, just a smooth path from concept to launch."
      />

      <div className="mt-16 lg:mt-20">
        <div className="grid grid-cols-1 gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-px bg-border md:left-10" />
              )}
              
              <div className="relative flex gap-6 md:gap-10 py-8 first:pt-0 last:pb-0">
                {/* Number */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl bg-surface-2 border border-border flex items-center justify-center group-hover:border-highlight/50 transition-colors duration-500">
                    <span className="text-sm md:text-lg font-mono font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {step.number}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="pt-1 md:pt-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
