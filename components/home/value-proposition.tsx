"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { Eye, Layers, Zap, Shield } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Premium Visual Presence",
    description: "Websites that look expensive and modern. Strong first impressions that position your brand above the competition.",
  },
  {
    icon: Layers,
    title: "Thoughtful Structure",
    description: "Clear user journeys, logical content hierarchy, and intuitive navigation that guides visitors toward action.",
  },
  {
    icon: Zap,
    title: "Performance-First",
    description: "Fast loading, smooth interactions, and optimized code. Sites that feel responsive and professional.",
  },
  {
    icon: Shield,
    title: "Built for Trust",
    description: "Every element designed to build credibility and confidence. From typography to micro-interactions.",
  },
];

export function ValueProposition() {
  return (
    <Section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-1/50 to-transparent pointer-events-none" />
      
      <div className="relative">
        <SectionHeader
          label="Why Choose Me"
          title="Websites that work as hard as you do"
          description="Not just beautiful designs, but strategic digital assets that strengthen your brand and drive real business results."
        />

        <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 lg:p-10 rounded-2xl bg-surface-2/50 border border-border hover:border-highlight/50 transition-all duration-500"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-highlight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-surface-3 border border-border flex items-center justify-center mb-6 group-hover:border-highlight/30 transition-colors duration-500">
                  <value.icon className="w-6 h-6 text-foreground" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
