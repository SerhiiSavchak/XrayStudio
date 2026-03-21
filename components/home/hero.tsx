"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

// Oversized background typography - moves slowest
function BackgroundType({ scrollProgress }: { scrollProgress: any }) {
  const y = useTransform(scrollProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollProgress, [0, 0.4], [0.025, 0]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.3]);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
    >
      <span className="font-display text-[25vw] lg:text-[22vw] font-bold tracking-[-0.04em] text-[rgb(var(--foreground))] whitespace-nowrap">
        XRAY
      </span>
    </motion.div>
  );
}

// Mid-layer floating panels - medium speed
function MidLayerPanels({ scrollProgress, mouseX, mouseY }: { scrollProgress: any; mouseX: any; mouseY: any }) {
  const y1 = useTransform(scrollProgress, [0, 1], ["0%", "35%"]);
  const y2 = useTransform(scrollProgress, [0, 1], ["0%", "45%"]);
  const opacity = useTransform(scrollProgress, [0, 0.7], [1, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none hidden lg:block">
      {/* Large floating surface - right side */}
      <motion.div
        style={{
          y: y1,
          x: useTransform(mouseX, (v) => v * -0.2),
          rotateY: useTransform(mouseX, (v) => v * 0.3),
          rotateX: useTransform(mouseY, (v) => v * -0.2),
        }}
        className="absolute top-[18%] right-[6%] w-[380px] h-[480px] rounded-[2rem] perspective-1000 preserve-3d"
        initial={{ opacity: 0, y: 100, rotateY: 15 }}
        animate={{ opacity: 1, y: 0, rotateY: 5 }}
        transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-full h-full rounded-[2rem] border border-[rgb(var(--border))]/40 bg-gradient-to-br from-[rgb(var(--surface-2))]/60 to-[rgb(var(--surface-3))]/30 backdrop-blur-xl overflow-hidden">
          {/* Interface simulation lines */}
          <div className="absolute inset-6 space-y-4">
            <motion.div 
              className="h-3 w-2/5 rounded-full bg-[rgb(var(--foreground))]/[0.04]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{ transformOrigin: "left" }}
            />
            <motion.div 
              className="h-2 w-3/5 rounded-full bg-[rgb(var(--foreground))]/[0.03]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              style={{ transformOrigin: "left" }}
            />
            <motion.div 
              className="h-2 w-2/4 rounded-full bg-[rgb(var(--foreground))]/[0.025]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--surface-2))]/80 via-transparent to-transparent" />
          {/* Edge highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
        {/* Glow underneath */}
        <div className="absolute -bottom-10 inset-x-10 h-20 bg-[rgb(var(--glow))]/[0.06] blur-2xl rounded-full" />
      </motion.div>

      {/* Smaller floating element - left side */}
      <motion.div
        style={{
          y: y2,
          x: useTransform(mouseX, (v) => v * 0.15),
          rotateY: useTransform(mouseX, (v) => v * -0.4),
        }}
        className="absolute bottom-[25%] left-[3%] w-[220px] h-[160px] rounded-2xl"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full h-full rounded-2xl border border-[rgb(var(--border))]/30 bg-[rgb(var(--surface-2))]/50 backdrop-blur-lg">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-3 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent"
          />
        </div>
      </motion.div>

      {/* Accent orb */}
      <motion.div
        style={{
          y: useTransform(scrollProgress, [0, 1], ["0%", "55%"]),
        }}
        className="absolute top-[55%] right-[25%] w-32 h-32 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-full bg-[rgb(var(--glow-intense))] blur-2xl"
        />
      </motion.div>
    </motion.div>
  );
}

// Foreground content - fastest parallax
function ForegroundContent({ scrollProgress, isInView }: { scrollProgress: any; isInView: boolean }) {
  const y = useTransform(scrollProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="relative z-20 min-h-[100svh] flex flex-col justify-center px-6 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto w-full pt-32 pb-20 lg:pt-44 lg:pb-36">
        <div className="max-w-4xl">
          {/* Status badge - mask reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
            animate={isInView ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[rgb(var(--surface-2))]/50 border border-[rgb(var(--border))]/50 text-sm font-medium text-[rgb(var(--muted-foreground))] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for Q2 2024 projects
            </span>
          </motion.div>

          {/* HEADLINE - Staggered line reveal with mask */}
          <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-bold tracking-[-0.03em] leading-[0.9] overflow-hidden">
            <motion.span
              className="block text-[rgb(var(--foreground))]"
              initial={{ y: "110%", rotateX: -45 }}
              animate={isInView ? { y: "0%", rotateX: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
            >
              Websites that
            </motion.span>
            <span className="block overflow-hidden mt-2">
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--foreground))] via-[rgb(var(--glow-intense))] to-[rgb(var(--glow))]"
                initial={{ y: "110%", rotateX: -45 }}
                animate={isInView ? { y: "0%", rotateX: 0 } : {}}
                transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
              >
                drive growth
              </motion.span>
            </span>
          </h1>

          {/* Supporting copy - slide up with opacity */}
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] max-w-xl leading-relaxed font-light"
          >
            Premium websites for businesses that want to
            stand out, convert visitors, and scale with confidence.
          </motion.p>

          {/* CTAs - staggered reveal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5"
          >
            <Link href="/contact" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(var(--glow))]/20 to-[rgb(var(--glow-intense))]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[rgb(var(--foreground))] text-[rgb(var(--background))] font-semibold text-base transition-all duration-300 group-hover:gap-4">
                Start a project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/work"
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))]/30 backdrop-blur-sm font-semibold text-base text-[rgb(var(--foreground))] hover:bg-[rgb(var(--surface-2))]/50 hover:border-[rgb(var(--border-subtle))] transition-all duration-300"
            >
              <Play className="w-4 h-4" />
              View work
            </Link>
          </motion.div>

          {/* Trust indicators - fade in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-20 pt-10 border-t border-[rgb(var(--border))]/30"
          >
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-[rgb(var(--muted-foreground))]">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--glow-intense))]" />
                Modern tech stack
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--glow-intense))]" />
                Performance focused
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--glow-intense))]" />
                Conversion optimized
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Atmospheric background - slowest layer
function AtmosphericBackground({ scrollProgress }: { scrollProgress: any }) {
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.4]);
  const y = useTransform(scrollProgress, [0, 1], ["0%", "40%"]);

  return (
    <motion.div style={{ scale, y }} className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
      
      {/* Large slow-breathing orb - top right */}
      <motion.div
        className="absolute -top-[30%] -right-[20%] w-[80vw] h-[80vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.08, transparent 50%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary orb - bottom left */}
      <motion.div
        className="absolute -bottom-[40%] -left-[30%] w-[70vw] h-[70vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.05, transparent 50%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
      
      {/* Center focal point */}
      <motion.div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[100vw] h-[50vh]"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.03, transparent 40%)",
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

// Scroll indicator with cinematic animation
function ScrollIndicator({ scrollProgress }: { scrollProgress: any }) {
  const opacity = useTransform(scrollProgress, [0, 0.15], [1, 0]);
  
  return (
    <motion.div
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.8 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
    >
      <span className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-5 h-8 rounded-full border border-[rgb(var(--border))] flex items-start justify-center p-1.5"
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-2 rounded-full bg-[rgb(var(--foreground))]"
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / innerWidth * 60);
      mouseY.set((clientY - innerHeight / 2) / innerHeight * 60);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] lg:min-h-[120vh] overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* LAYER 0 (slowest) - Atmospheric background */}
      <AtmosphericBackground scrollProgress={scrollYProgress} />

      {/* LAYER 1 - Oversized background typography */}
      <BackgroundType scrollProgress={scrollYProgress} />

      {/* LAYER 2 - Mid-layer floating panels */}
      <MidLayerPanels 
        scrollProgress={scrollYProgress} 
        mouseX={smoothMouseX} 
        mouseY={smoothMouseY} 
      />

      {/* LAYER 3 (fastest) - Foreground content */}
      <div ref={contentRef}>
        <ForegroundContent scrollProgress={scrollYProgress} isInView={isInView} />
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator scrollProgress={scrollYProgress} />

      {/* Bottom gradient transition to next section */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[rgb(var(--surface-1))] to-transparent pointer-events-none z-20" />
    </section>
  );
}
