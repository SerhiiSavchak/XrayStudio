"use client";

import { motion } from "framer-motion";

const credibilityItems = [
  {
    value: "5+",
    label: "Years of Experience",
  },
  {
    value: "40+",
    label: "Projects Delivered",
  },
  {
    value: "100%",
    label: "Client Satisfaction",
  },
  {
    value: "24h",
    label: "Response Time",
  },
];

export function CredibilityStrip() {
  return (
    <section className="relative py-16 lg:py-20 border-y border-border bg-surface-1/50">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-highlight/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {credibilityItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
                {item.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
