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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative pt-36 pb-28 lg:pt-48 lg:pb-40 overflow-hidden min-h-[70vh] flex items-center">
      {/* Cinematic background */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
        
        {/* Large atmospheric orbs */}
        <motion.div
          className="absolute -top-[30%] -right-[20%] w-[70vw] h-[70vw] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.07, transparent 55%)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute -bottom-[40%] -left-[30%] w-[60vw] h-[60vw] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.05, transparent 55%)",
            filter: "blur(50px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </motion.div>

      {/* Large floating surface planes for depth */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-[20%] right-[6%] w-[300px] h-[200px] rounded-2xl bg-[rgb(var(--surface-2))]/20 border border-[rgb(var(--border))]/20 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="absolute top-[50%] right-[12%] w-[220px] h-[140px] rounded-xl bg-[rgb(var(--surface-3))]/15 border border-[rgb(var(--border))]/15"
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 container-wide">
        <div className="max-w-4xl">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-sm font-medium uppercase tracking-[0.25em] text-[rgb(var(--muted-foreground))] mb-10"
          >
            {t.servicesPage.title}
          </motion.span>
          
          {/* Display headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.9]"
          >
            <span className="block text-[rgb(var(--foreground))]">
              {t.servicesPage.headline}
            </span>
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--foreground))] via-[rgb(var(--glow-intense))] to-[rgb(var(--glow))]">
              {t.servicesPage.headlineHighlight}
            </span>
          </motion.h1>
          
          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-10 text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] leading-relaxed max-w-2xl font-light"
          >
            {t.servicesPage.subtitle}
          </motion.p>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-[rgb(var(--foreground))] text-[rgb(var(--background))] rounded-full hover:shadow-[0_0_40px_rgba(var(--foreground),0.15)] transition-all duration-500"
            >
              {t.cta.discuss}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/work"
              className="flex items-center justify-center gap-2 px-8 py-4 text-base font-medium border border-[rgb(var(--border))]/50 text-[rgb(var(--foreground))] rounded-full hover:bg-[rgb(var(--surface-2))]/30 hover:border-[rgb(var(--border))] backdrop-blur-sm transition-all duration-300"
            >
              {t.cta.examples}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[rgb(var(--background))] to-transparent pointer-events-none" />
    </section>
  );
}
