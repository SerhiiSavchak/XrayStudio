"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";

const workStyle = [
  {
    title: "Communication",
    points: [
      "Regular updates without overwhelming you",
      "Clear explanations without jargon",
      "Responsive to questions and feedback",
      "Honest about timelines and challenges",
    ],
  },
  {
    title: "Process",
    points: [
      "Structured phases with clear milestones",
      "Work-in-progress access for transparency",
      "Iterative feedback loops",
      "No surprises at the end",
    ],
  },
  {
    title: "Quality",
    points: [
      "Attention to details at every level",
      "Cross-browser and device testing",
      "Performance optimization built in",
      "Clean, documented code",
    ],
  },
];

export function HowIWork() {
  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            label="Collaboration"
            title="How I work with clients"
          />
          <p className="mt-6 text-muted-foreground leading-relaxed">
            I believe the best results come from partnership, not just project delivery. 
            Here&apos;s what you can expect when we work together — clear communication, 
            structured process, and consistent quality standards.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            My goal is to make the process smooth and predictable, so you can focus 
            on your business while knowing the project is in capable hands.
          </p>
        </motion.div>

        <div className="space-y-6">
          {workStyle.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-surface-2/50 border border-border"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-highlight shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
