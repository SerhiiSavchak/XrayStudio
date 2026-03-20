"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

export function FinalCTA() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--background))] via-[rgb(var(--surface-1))] to-[rgb(var(--background))]" />
      
      {/* Animated glow orbs */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-[rgb(var(--glow))]/20 to-transparent blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-[rgb(var(--glow-intense))]/15 to-transparent blur-3xl"
      />
      
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgb(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, rgb(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative container-wide">
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">
              {t.cta.ready}
            </span>
          </motion.div>
          
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[rgb(var(--foreground))] text-balance"
          >
            {t.cta.title}
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] leading-relaxed max-w-2xl mx-auto"
          >
            {t.cta.subtitle}
          </motion.p>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group relative flex items-center gap-3 px-8 py-4 text-base font-medium bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[rgb(var(--glow))]/20 hover:scale-[1.02]"
            >
              <span className="relative z-10">{t.cta.primary}</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(var(--primary-foreground))]/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </Link>
            
            <a
              href="mailto:hello@xray.studio"
              className="flex items-center gap-2 px-8 py-4 text-base font-medium text-[rgb(var(--foreground))] rounded-full border border-[rgb(var(--border))] hover:bg-[rgb(var(--surface-2))] hover:border-[rgb(var(--muted-foreground))]/30 transition-all duration-300"
            >
              hello@xray.studio
            </a>
          </motion.div>
          
          {/* Response time */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-sm text-[rgb(var(--muted-foreground))]"
          >
            {t.cta.response}
          </motion.p>
        </div>
      </div>

      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none noise" />
    </section>
  );
}
