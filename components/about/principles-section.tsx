"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { FileText, Layers, Eye, Zap, Settings, Users } from "lucide-react";

const principles = [
  {
    icon: FileText,
    title: "Documentation-First",
    description: "Every project starts with clear documentation. Goals, requirements, and decisions are captured before code is written. This ensures alignment and reduces surprises.",
  },
  {
    icon: Layers,
    title: "System-First Thinking",
    description: "I build design systems, not just pages. Consistent components, scalable architecture, and patterns that make future updates straightforward.",
  },
  {
    icon: Eye,
    title: "UX-Aware Development",
    description: "Technical decisions are made with user experience in mind. Fast interactions, accessible interfaces, and intuitive flows come from deliberate engineering choices.",
  },
  {
    icon: Zap,
    title: "Performance-First",
    description: "Speed isn't an afterthought. From optimized images to efficient code, every choice considers how it affects load time and user experience.",
  },
  {
    icon: Settings,
    title: "Production-Ready Mindset",
    description: "Everything I build is ready for the real world. Proper testing, clean code, and scalable architecture that can grow with your business.",
  },
  {
    icon: Users,
    title: "Direct Collaboration",
    description: "No middle layers between us. You work directly with me throughout the project, ensuring clear communication and faster iteration.",
  },
];

export function PrinciplesSection() {
  return (
    <Section className="bg-surface-1/30">
      <SectionHeader
        label="Principles"
        title="How I approach every project"
        description="These aren't just values — they're the practices I follow on every project to ensure quality, clarity, and results."
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {principles.map((principle, index) => (
          <motion.div
            key={principle.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-surface-2/50 border border-border"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-3 border border-border flex items-center justify-center mb-4">
              <principle.icon className="w-5 h-5 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {principle.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {principle.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
