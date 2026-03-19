"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Target, Lightbulb, Palette, Code } from "lucide-react";

const approaches = [
  {
    icon: Target,
    title: "Strategy First",
    description: "Every project starts with understanding your business goals, audience, and competitive landscape. Design decisions flow from strategy.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description: "I focus on solving real problems, not just making things pretty. Each element serves a purpose in the user journey.",
  },
  {
    icon: Palette,
    title: "Visual Excellence",
    description: "Premium visual execution that creates the right impression. Details matter — from typography to micro-interactions.",
  },
  {
    icon: Code,
    title: "Quality Code",
    description: "Clean, performant implementation that loads fast and works smoothly. Built for long-term maintainability.",
  },
];

export function ApproachSection() {
  return (
    <Section className="bg-surface-1/30">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
            My Approach
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            It&apos;s not just about the visuals
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every project in my portfolio represents more than just design execution. 
            Behind each one is a clear understanding of the business problem, 
            thoughtful UX decisions, and careful technical implementation.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            I believe the best websites are those where strategy, design, and 
            development work together seamlessly. That&apos;s what I bring to every project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {approaches.map((approach, index) => (
            <motion.div
              key={approach.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-surface-2/50 border border-border"
            >
              <div className="w-10 h-10 rounded-xl bg-surface-3 border border-border flex items-center justify-center mb-4">
                <approach.icon className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {approach.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {approach.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
