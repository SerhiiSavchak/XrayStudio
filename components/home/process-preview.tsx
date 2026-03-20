"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

const steps = [
  { key: "discovery" as const, number: "01" },
  { key: "structure" as const, number: "02" },
  { key: "design" as const, number: "03" },
  { key: "development" as const, number: "04" },
  { key: "launch" as const, number: "05" },
];

export function ProcessPreview() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 surface-1" />
      
      <div className="relative container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 lg:mb-24"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
            {t.process.title}
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--foreground))]">
            {t.process.subtitle}
          </h2>
        </motion.div>

        {/* Process timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-[rgb(var(--border))] via-[rgb(var(--border))] to-transparent" />

          <div className="space-y-0">
            {steps.map((step, i) => {
              const stepData = t.process[step.key];
              
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className="flex gap-8 md:gap-12 py-8 first:pt-0 last:pb-0">
                    {/* Number bubble */}
                    <div className="relative shrink-0 z-10">
                      <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl surface-2 border border-[rgb(var(--border))] flex items-center justify-center group-hover:border-[rgb(var(--muted-foreground))]/30 group-hover:shadow-lg group-hover:shadow-[rgb(var(--glow))]/10 transition-all duration-500">
                        <span className="text-sm md:text-lg font-mono font-semibold text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--foreground))] transition-colors">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-1 md:pt-4">
                      <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-semibold text-[rgb(var(--foreground))] mb-3">
                        {stepData.title}
                      </h3>
                      <p className="text-[rgb(var(--muted-foreground))] leading-relaxed max-w-xl">
                        {stepData.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
