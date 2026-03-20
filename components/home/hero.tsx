"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

export function Hero() {
  const { t } = useLocale();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Deep background layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--background))] via-[rgb(var(--surface-1))] to-[rgb(var(--background))]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgb(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, rgb(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Radial depth glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-radial from-[rgb(var(--surface-2))] via-transparent to-transparent opacity-50" />

        {/* Animated atmospheric orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[20%] w-[600px] h-[600px] rounded-full bg-[rgb(var(--glow))] blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[15%] w-[700px] h-[700px] rounded-full bg-[rgb(var(--glow-intense))] blur-[180px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[60%] left-[50%] w-[500px] h-[500px] rounded-full bg-[rgb(var(--glow))] blur-[120px]"
        />
      </div>

      {/* Floating 3D interface planes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-2000">
        {/* Large back plane */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[10%] left-[5%] w-80 h-52 rounded-3xl surface-2 border border-[rgb(var(--border-subtle))] opacity-20 rotate-[-12deg] transform-gpu"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.2, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Right floating card */}
        <motion.div
          style={{ y: y2 }}
          className="absolute top-[20%] right-[8%] w-64 h-44 rounded-2xl surface-3 border border-[rgb(var(--border))] opacity-30 rotate-[8deg] transform-gpu"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {/* Mock interface content */}
          <div className="p-5 space-y-3">
            <div className="w-20 h-2 rounded bg-[rgb(var(--foreground))]/10" />
            <div className="w-full h-3 rounded bg-[rgb(var(--foreground))]/5" />
            <div className="w-3/4 h-3 rounded bg-[rgb(var(--foreground))]/5" />
          </div>
        </motion.div>

        {/* Bottom left plane */}
        <motion.div
          style={{ y: y3 }}
          className="absolute bottom-[15%] left-[12%] w-56 h-40 rounded-2xl surface-2 border border-[rgb(var(--border-subtle))] opacity-25 rotate-[5deg] transform-gpu"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        />

        {/* Small accent card */}
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[25%] right-[15%] w-44 h-32 rounded-xl surface-3 border border-[rgb(var(--border))] opacity-35 rotate-[-6deg] transform-gpu"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 container-wide pt-32 pb-24"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full surface-2 border border-[rgb(var(--border))] text-sm font-medium text-[rgb(var(--muted-foreground))] backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--success))] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[rgb(var(--success))]" />
              </span>
              {t.hero.label}
            </span>
          </motion.div>

          {/* Massive headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-[-0.02em] leading-[0.9]"
          >
            <span className="block text-[rgb(var(--foreground))]">
              {t.hero.title}
            </span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--foreground))] via-[rgb(var(--glow-intense))] to-[rgb(var(--foreground))]"
            >
              {t.hero.titleHighlight}
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 text-lg sm:text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed text-balance font-light"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group relative flex items-center gap-3 px-8 py-4 text-base font-medium bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[rgb(var(--glow))]/20 hover:scale-[1.02]"
            >
              <span className="relative z-10">{t.hero.cta}</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(var(--primary-foreground))]/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </Link>
            
            <Link
              href="/work"
              className="group flex items-center gap-3 px-8 py-4 text-base font-medium text-[rgb(var(--foreground))] rounded-full border border-[rgb(var(--border))] hover:border-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--surface-2))] transition-all duration-300"
            >
              <span>{t.hero.ctaSecondary}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-[rgb(var(--muted-foreground))]"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-[rgb(var(--border))] to-[rgb(var(--muted-foreground))]" />
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none noise" />
    </section>
  );
}
