"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";

export function CredibilityStrip() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "5+", label: t.credibility.experience },
    { value: "40+", label: t.credibility.projects },
    { value: "100%", label: t.credibility.clients },
  ];

  return (
    <section ref={ref} className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 surface-1" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--background))] via-transparent to-[rgb(var(--background))] opacity-60" />

      <div className="relative container-wide">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 lg:gap-32"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 -m-10 rounded-3xl bg-[rgb(var(--glow))]/0 group-hover:bg-[rgb(var(--glow))]/5 transition-colors duration-500 blur-xl" />
              
              <span className="relative font-display text-6xl md:text-7xl lg:text-8xl font-bold text-[rgb(var(--foreground))] tracking-tighter">
                {stat.value}
              </span>
              <span className="relative mt-3 text-sm md:text-base text-[rgb(var(--muted-foreground))] font-medium uppercase tracking-[0.2em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--border))] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--border))] to-transparent" />
    </section>
  );
}
