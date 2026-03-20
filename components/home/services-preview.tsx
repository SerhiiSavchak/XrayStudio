"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Palette, Code2, Wrench } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

const services = [
  {
    key: "design" as const,
    icon: Palette,
    gradient: "from-[rgb(var(--glow))]/20 to-transparent",
  },
  {
    key: "development" as const,
    icon: Code2,
    gradient: "from-[rgb(var(--glow-intense))]/20 to-transparent",
  },
  {
    key: "support" as const,
    icon: Wrench,
    gradient: "from-[rgb(var(--glow))]/15 to-transparent",
  },
];

export function ServicesPreview() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-radial from-[rgb(var(--surface-2))] to-transparent opacity-50 -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-radial from-[rgb(var(--surface-2))] to-transparent opacity-40 -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="relative container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 lg:mb-20"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
            {t.services.title}
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[rgb(var(--foreground))]">
            {t.services.subtitle}
          </h2>
        </motion.div>

        {/* Services grid - staggered layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            const serviceData = t.services[service.key];
            
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`group relative ${i === 1 ? "lg:mt-12" : ""}`}
              >
                <div className="relative h-full p-8 lg:p-10 rounded-3xl surface-2 border border-[rgb(var(--border))] overflow-hidden transition-all duration-500 hover:border-[rgb(var(--muted-foreground))]/30 hover:shadow-2xl hover:shadow-[rgb(var(--glow))]/10">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className="relative mb-8">
                    <div className="w-14 h-14 rounded-2xl surface-3 border border-[rgb(var(--border))] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-6 h-6 text-[rgb(var(--foreground))]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="font-display text-2xl lg:text-3xl font-semibold text-[rgb(var(--foreground))] mb-4">
                      {serviceData.title}
                    </h3>
                    <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                      {serviceData.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="relative mt-8 flex items-center text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--foreground))] transition-colors">
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 lg:mt-16 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-[rgb(var(--foreground))] rounded-full border border-[rgb(var(--border))] hover:bg-[rgb(var(--surface-2))] hover:border-[rgb(var(--muted-foreground))]/30 transition-all duration-300"
          >
            {t.services.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
