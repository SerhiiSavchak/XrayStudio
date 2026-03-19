"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Check, X } from "lucide-react";

const included = [
  "Custom design tailored to your brand",
  "Responsive, mobile-first implementation",
  "Performance optimization",
  "Basic SEO setup",
  "Contact forms and integrations",
  "CMS for content editing (when applicable)",
  "Cross-browser testing",
  "Launch support",
  "30 days of post-launch fixes",
];

const notIncluded = [
  "Copywriting (can recommend partners)",
  "Professional photography",
  "Stock images/illustrations",
  "Ongoing hosting costs",
  "Domain registration",
  "Third-party service subscriptions",
];

export function IncludedSection() {
  return (
    <Section className="bg-surface-1/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
          Scope
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          What&apos;s included & what&apos;s not
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Clear expectations from the start. Here&apos;s what comes with every project and what you&apos;ll need to provide separately.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-surface-2/50 border border-border"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="w-4 h-4 text-green-500" />
            </div>
            Included
          </h3>
          <ul className="space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <Check className="w-4 h-4 text-green-500 shrink-0 mt-1" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Not Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-2xl bg-surface-2/50 border border-border"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-muted-foreground/10 flex items-center justify-center">
              <X className="w-4 h-4 text-muted-foreground" />
            </div>
            Not Included
          </h3>
          <ul className="space-y-3">
            {notIncluded.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <X className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-1" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground border-t border-border pt-4">
            These can be discussed and added to the project scope if needed.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
