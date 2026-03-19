"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";

const technologies = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Library" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Vercel", category: "Hosting" },
  { name: "Figma", category: "Design" },
  { name: "Sanity / Contentful", category: "CMS" },
];

export function TechStack() {
  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            label="Technology"
            title="Modern stack for modern results"
          />
          <p className="mt-6 text-muted-foreground leading-relaxed">
            I use battle-tested, modern technologies that deliver excellent 
            performance, developer experience, and long-term maintainability. 
            These tools are chosen deliberately to serve your project&apos;s needs.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            The specific tech stack can be adapted to your requirements, but 
            the principles remain the same: fast, reliable, and built to last.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-2 gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="p-4 rounded-xl bg-surface-2/50 border border-border"
              >
                <span className="text-xs text-muted-foreground block mb-1">
                  {tech.category}
                </span>
                <span className="font-medium text-foreground">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
