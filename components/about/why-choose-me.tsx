"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Check } from "lucide-react";

const reasons = [
  {
    title: "Not Just Execution",
    description: "I bring product thinking to every project. Beyond building what you ask for, I help ensure what we build actually achieves your goals.",
  },
  {
    title: "Premium Visual Quality",
    description: "Your website won't look like a template. It will feel custom, modern, and expensive — because it is.",
  },
  {
    title: "Balance of Beauty and Performance",
    description: "I don't sacrifice speed for aesthetics or vice versa. Both matter, and both get attention.",
  },
  {
    title: "Direct Communication",
    description: "No agency bureaucracy or miscommunication through layers. You work with me directly throughout.",
  },
  {
    title: "Long-term Thinking",
    description: "I build with the future in mind — clean code, scalable architecture, and easy maintenance.",
  },
  {
    title: "Real Results Focus",
    description: "A beautiful website that doesn't convert is just expensive decoration. I care about business outcomes.",
  },
];

export function WhyChooseMe() {
  return (
    <Section className="bg-surface-1/30">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
            Why Work With Me
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            What makes the difference
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            There are many developers out there. Here&apos;s why clients choose to 
            work with me — and why they come back for future projects.
          </p>
        </motion.div>

        <div className="space-y-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-4 rounded-xl hover:bg-surface-2/30 transition-colors"
            >
              <div className="shrink-0 w-6 h-6 rounded-full bg-surface-3 border border-border flex items-center justify-center mt-0.5">
                <Check className="w-3.5 h-3.5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
