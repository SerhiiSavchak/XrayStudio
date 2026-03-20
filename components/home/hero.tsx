"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] lg:min-h-[110vh] overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* BACKGROUND LAYER - Cinematic gradient atmosphere */}
      <div className="absolute inset-0">
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--surface-2))]"
        />
        {/* Dramatic radial glow */}
        <div className="absolute top-0 right-0 w-[120%] h-[120%] bg-gradient-radial from-[rgb(var(--glow))]/25 via-transparent to-transparent translate-x-[30%] -translate-y-[20%]" />
        <div className="absolute bottom-0 left-0 w-[80%] h-[80%] bg-gradient-radial from-[rgb(var(--glow-intense))]/15 via-transparent to-transparent -translate-x-[20%] translate-y-[30%]" />
      </div>

      {/* MIDGROUND LAYER - Floating interface planes with depth */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating project preview - RIGHT SIDE */}
        <motion.div
          style={{ y: y1 }}
          initial={{ opacity: 0, x: 100, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: -8 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[15%] right-[-5%] lg:right-[5%] w-[500px] lg:w-[600px] h-[350px] lg:h-[420px] hidden md:block"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[rgb(var(--border))] shadow-2xl shadow-black/20 transform-gpu perspective-1000">
            {/* Browser chrome */}
            <div className="absolute top-0 inset-x-0 h-10 bg-[rgb(var(--surface-2))] border-b border-[rgb(var(--border-subtle))] flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="ml-4 flex-1 h-6 rounded-md bg-[rgb(var(--surface-3))] max-w-[200px]" />
            </div>
            {/* Screenshot content */}
            <div className="absolute top-10 inset-x-0 bottom-0 bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-rose-900/30">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop"
                alt="Project preview"
                fill
                className="object-cover opacity-80 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--background))]/90 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Secondary floating card - LEFT SIDE */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, x: -80, rotateY: 12 }}
          animate={{ opacity: 1, x: 0, rotateY: 6 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[35%] left-[-8%] lg:left-[3%] w-[320px] lg:w-[380px] h-[220px] lg:h-[260px] hidden lg:block"
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden border border-[rgb(var(--border))] shadow-xl shadow-black/15 bg-[rgb(var(--surface-2))] transform-gpu">
            <div className="absolute top-0 inset-x-0 h-8 bg-[rgb(var(--surface-3))] border-b border-[rgb(var(--border-subtle))] flex items-center px-3 gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[rgb(var(--foreground))]/20" />
              <div className="w-2 h-2 rounded-full bg-[rgb(var(--foreground))]/20" />
              <div className="w-2 h-2 rounded-full bg-[rgb(var(--foreground))]/20" />
            </div>
            <div className="absolute top-8 inset-x-0 bottom-0 bg-gradient-to-br from-blue-900/30 via-cyan-900/20 to-teal-900/30">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt="Dashboard preview"
                fill
                className="object-cover opacity-70 mix-blend-luminosity"
              />
            </div>
          </div>
        </motion.div>

        {/* Small floating element - BOTTOM RIGHT */}
        <motion.div
          style={{ y: y3 }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute bottom-[20%] right-[15%] w-[200px] h-[140px] hidden lg:block"
        >
          <div className="w-full h-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))]/80 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500" />
              <div className="space-y-1">
                <div className="w-20 h-2 rounded bg-[rgb(var(--foreground))]/20" />
                <div className="w-14 h-1.5 rounded bg-[rgb(var(--foreground))]/10" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-2 rounded bg-[rgb(var(--foreground))]/10" />
              <div className="w-3/4 h-2 rounded bg-[rgb(var(--foreground))]/10" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* FOREGROUND LAYER - Main content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 min-h-[100svh] flex flex-col justify-center px-6 lg:px-12"
      >
        <div className="max-w-[1400px] mx-auto w-full pt-32 pb-20 lg:pt-40 lg:pb-32">
          <div className="max-w-3xl">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[rgb(var(--surface-2))]/80 border border-[rgb(var(--border))] text-sm font-medium text-[rgb(var(--muted-foreground))] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Available for Q2 2024 projects
              </span>
            </motion.div>

            {/* OVERSIZED EDITORIAL HEADLINE */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(3rem,10vw,8rem)] font-bold tracking-[-0.03em] leading-[0.85]"
            >
              <span className="block text-[rgb(var(--foreground))]">
                Websites that
              </span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--foreground))] via-[rgb(var(--glow-intense))] to-[rgb(var(--glow))]">
                drive growth
              </span>
            </motion.h1>

            {/* Strong supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] max-w-xl leading-relaxed font-light"
            >
              I design and build premium websites for businesses that want to 
              stand out, convert visitors, and scale with confidence.
            </motion.p>

            {/* Premium CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-base font-semibold bg-[rgb(var(--foreground))] text-[rgb(var(--background))] rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[rgb(var(--foreground))]/20"
              >
                <span className="relative z-10">Start a project</span>
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              
              <Link
                href="/work"
                className="group inline-flex items-center gap-3 px-8 py-4 text-base font-medium text-[rgb(var(--foreground))] rounded-full border border-[rgb(var(--border))] hover:border-[rgb(var(--foreground))]/30 hover:bg-[rgb(var(--surface-2))] transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                <span>View my work</span>
              </Link>
            </motion.div>

            {/* Credibility markers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 pt-8 border-t border-[rgb(var(--border-subtle))]"
            >
              <div className="flex flex-wrap items-center gap-8 lg:gap-12 text-sm text-[rgb(var(--muted-foreground))]">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-display font-bold text-[rgb(var(--foreground))]">50+</span>
                  <span>Projects delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-display font-bold text-[rgb(var(--foreground))]">8+</span>
                  <span>Years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-display font-bold text-[rgb(var(--foreground))]">100%</span>
                  <span>Client satisfaction</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-[rgb(var(--border))] flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-[rgb(var(--foreground))]"
          />
        </motion.div>
      </motion.div>

      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none noise opacity-[0.015]" />
    </section>
  );
}
