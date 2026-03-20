"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

export function TrustLayer() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--background))] via-[rgb(var(--surface-1))] to-[rgb(var(--background))]" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-[rgb(var(--glow))]/10 to-transparent" />

      <div className="relative container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
              {t.trust.title}
            </span>
            
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--foreground))]">
              {t.trust.subtitle}
            </h2>
            
            <p className="mt-6 text-lg text-[rgb(var(--muted-foreground))] leading-relaxed">
              {t.trust.description}
            </p>

            {/* Trust points */}
            <ul className="mt-10 space-y-4">
              {t.trust.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full surface-3 border border-[rgb(var(--border))] flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[rgb(var(--success))]" />
                  </div>
                  <span className="text-[rgb(var(--foreground))]">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Visual element - 3D stacked cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative perspective-2000"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Stacked card layers */}
              <div className="absolute inset-0 rounded-3xl surface-3 border border-[rgb(var(--border-subtle))] transform rotate-6 translate-x-6 translate-y-6 opacity-40" />
              <div className="absolute inset-0 rounded-3xl surface-2 border border-[rgb(var(--border))] transform rotate-3 translate-x-3 translate-y-3 opacity-60" />
              
              {/* Main card */}
              <div className="relative h-full rounded-3xl surface-2 border border-[rgb(var(--border))] p-8 lg:p-10 overflow-hidden">
                {/* Mock interface */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl surface-3 border border-[rgb(var(--border))]" />
                    <div className="space-y-2">
                      <div className="w-32 h-4 rounded surface-3" />
                      <div className="w-24 h-3 rounded surface-3 opacity-60" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-full h-3 rounded surface-3" />
                    <div className="w-5/6 h-3 rounded surface-3 opacity-80" />
                    <div className="w-4/6 h-3 rounded surface-3 opacity-60" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="aspect-video rounded-xl surface-3 border border-[rgb(var(--border-subtle))]" />
                    <div className="aspect-video rounded-xl surface-3 border border-[rgb(var(--border-subtle))]" />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <div className="flex-1 h-12 rounded-xl bg-[rgb(var(--primary))] opacity-80" />
                    <div className="w-12 h-12 rounded-xl surface-3 border border-[rgb(var(--border))]" />
                  </div>
                </div>
                
                {/* Decorative glow */}
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[rgb(var(--glow))]/20 rounded-full blur-3xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
