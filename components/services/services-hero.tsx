"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code2, Palette, Zap, Globe } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

// Floating service icons with orbital animation
function FloatingIcons() {
  const icons = [
    { Icon: Code2, delay: 0, x: "75%", y: "20%" },
    { Icon: Palette, delay: 0.2, x: "85%", y: "45%" },
    { Icon: Zap, delay: 0.4, x: "70%", y: "65%" },
    { Icon: Globe, delay: 0.6, x: "90%", y: "75%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {icons.map(({ Icon, delay, x, y }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + delay, duration: 0.6 }}
          className="absolute"
          style={{ left: x, top: y }}
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ 
              duration: 5 + i, 
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="w-14 h-14 rounded-2xl bg-[rgb(var(--surface-2))]/60 border border-[rgb(var(--border))]/50 backdrop-blur-sm flex items-center justify-center"
          >
            <Icon className="w-6 h-6 text-[rgb(var(--muted-foreground))]" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// Cinematic grid background
function CinematicGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
      
      {/* Animated glow orbs */}
      <motion.div
        className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.1, transparent 60%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -bottom-[30%] -left-[20%] w-[50vw] h-[50vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.06, transparent 60%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground),0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
    </div>
  );
}

export function ServicesHero() {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative pt-36 pb-28 lg:pt-48 lg:pb-40 overflow-hidden min-h-[70vh] flex items-center">
      {/* Cinematic background */}
      <CinematicGrid />
      
      {/* Floating icons */}
      <FloatingIcons />

      {/* Floating card fragments */}
      <motion.div
        style={{ y }}
        className="absolute top-[25%] right-[8%] w-64 h-44 rounded-2xl bg-[rgb(var(--surface-3))]/20 border border-[rgb(var(--border-subtle))]/30 backdrop-blur-sm hidden lg:block"
      >
        <motion.div
          animate={{ rotate: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="w-full h-full"
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 container-wide">
        <div className="max-w-4xl">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[rgb(var(--muted-foreground))] mb-8"
          >
            {t.servicesPage.title}
          </motion.span>
          
          {/* Display headline - Premium typography matching homepage */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.9]"
          >
            <span className="block text-[rgb(var(--foreground))]">
              {t.servicesPage.headline}
            </span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--muted-foreground))] via-[rgb(var(--glow-intense))] to-[rgb(var(--muted-foreground))]">
              {t.servicesPage.headlineHighlight}
            </span>
          </motion.h1>
          
          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-10 text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] leading-relaxed max-w-2xl font-light"
          >
            {t.servicesPage.subtitle}
          </motion.p>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-[rgb(var(--foreground))] text-[rgb(var(--background))] rounded-full hover:shadow-[0_0_40px_rgba(var(--foreground),0.2)] transition-all duration-500"
            >
              {t.cta.discuss}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/work"
              className="flex items-center justify-center gap-2 px-8 py-4 text-base font-medium border border-[rgb(var(--border))] text-[rgb(var(--foreground))] rounded-full hover:bg-[rgb(var(--surface-2))]/50 hover:border-[rgb(var(--glow))]/30 backdrop-blur-sm transition-all duration-300"
            >
              {t.cta.examples}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none noise opacity-[0.02]" />
    </section>
  );
}
