"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

export function ServicesHero() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
        <div className="absolute inset-0 bg-gradient-radial from-[rgb(var(--glow))]/10 via-transparent to-transparent opacity-50" />
        
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgb(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, rgb(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating elements */}
      <motion.div
        style={{ y }}
        className="absolute top-[20%] right-[10%] w-64 h-44 rounded-2xl surface-3 border border-[rgb(var(--border-subtle))] opacity-20 rotate-[8deg]"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
        className="absolute bottom-[15%] left-[5%] w-48 h-32 rounded-xl surface-2 border border-[rgb(var(--border))] opacity-25 rotate-[-6deg]"
      />

      <motion.div style={{ opacity }} className="relative container-wide">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]"
          >
            {t.servicesPage.title}
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.9]"
          >
            <span className="block text-[rgb(var(--foreground))]">
              {t.servicesPage.headline}
            </span>
            <span className="block text-[rgb(var(--muted-foreground))]">
              {t.servicesPage.headlineHighlight}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] leading-relaxed max-w-2xl"
          >
            {t.servicesPage.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-full hover:opacity-90 transition-all"
            >
              {t.cta.discuss}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/work"
              className="flex items-center justify-center gap-2 px-8 py-4 text-base font-medium border border-[rgb(var(--border))] text-[rgb(var(--foreground))] rounded-full hover:bg-[rgb(var(--surface-2))] transition-all"
            >
              {t.cta.examples}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
