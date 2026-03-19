"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { Rocket, Layers, RefreshCw, Wrench } from "lucide-react";

const models = [
  {
    icon: Rocket,
    title: "Project from Scratch",
    description: "Full project development from concept to launch. Includes discovery, design, development, and deployment.",
    bestFor: "New websites, major redesigns",
  },
  {
    icon: Layers,
    title: "MVP First",
    description: "Start with essential pages and features, then expand based on real needs and feedback. Faster time to market.",
    bestFor: "New ventures, testing markets",
  },
  {
    icon: RefreshCw,
    title: "Redesign Existing Site",
    description: "Transform your current website with new design, improved UX, and modern implementation while preserving what works.",
    bestFor: "Outdated sites, rebranding",
  },
  {
    icon: Wrench,
    title: "Ongoing Support",
    description: "Continuous improvements, updates, and maintenance. Keep your site fresh, fast, and up-to-date.",
    bestFor: "Active businesses, growing brands",
  },
];

export function EngagementModels() {
  return (
    <Section className="bg-surface-1/30">
      <SectionHeader
        label="Engagement Models"
        title="Flexible ways to work together"
        description="Choose the approach that fits your situation. Whether you need a complete build or ongoing partnership."
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map((model, index) => (
          <motion.div
            key={model.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-2xl bg-surface-2/50 border border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-3 border border-border flex items-center justify-center mb-6">
              <model.icon className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {model.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {model.description}
            </p>
            <div className="text-sm">
              <span className="text-muted-foreground">Best for: </span>
              <span className="text-foreground">{model.bestFor}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
