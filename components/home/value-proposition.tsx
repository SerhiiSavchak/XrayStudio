"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, Layers, Zap, Shield } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const values = [
  { key: "visual" as const, icon: Eye },
  { key: "structure" as const, icon: Layers },
  { key: "performance" as const, icon: Zap },
  { key: "trust" as const, icon: Shield },
];

export function ValueProposition() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--surface-1))] opacity-50" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-[rgb(var(--glow))]/10 to-transparent" />

      <div className="relative container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 lg:mb-24"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
            {t.value.title}
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--foreground))]">
            {t.value.subtitle}
          </h2>
          <p className="mt-6 text-lg text-[rgb(var(--muted-foreground))] leading-relaxed max-w-2xl">
            {t.value.description}
          </p>
        </motion.div>

        {/* Values grid - bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {values.map((value, i) => {
            const Icon = value.icon;
            const valueData = t.value[value.key];
            const isLarge = i === 0 || i === 3;

            return (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group relative ${isLarge ? "md:row-span-1" : ""}`}
              >
                <div className="relative h-full p-8 lg:p-10 rounded-3xl surface-2 border border-[rgb(var(--border))] overflow-hidden transition-all duration-500 hover:border-[rgb(var(--muted-foreground))]/30 hover:shadow-2xl hover:shadow-[rgb(var(--glow))]/5">
                  {/* Gradient hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--glow))]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl surface-3 border border-[rgb(var(--border))] flex items-center justify-center group-hover:scale-110 group-hover:border-[rgb(var(--muted-foreground))]/30 transition-all duration-500">
                      <Icon className="w-6 h-6 text-[rgb(var(--foreground))]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="font-display text-xl lg:text-2xl font-semibold text-[rgb(var(--foreground))] mb-3">
                      {valueData.title}
                    </h3>
                    <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                      {valueData.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
