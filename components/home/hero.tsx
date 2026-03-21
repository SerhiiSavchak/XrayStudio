"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

// Deep atmospheric background with multiple gradient layers
function CinematicAtmosphere() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--background))]" />
      
      {/* Large slow-moving atmospheric orbs - creates depth */}
      <motion.div
        className="absolute -top-[40%] -right-[30%] w-[90vw] h-[90vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.08, transparent 55%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -bottom-[50%] -left-[40%] w-[80vw] h-[80vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.06, transparent 55%)",
          filter: "blur(50px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -50, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
      
      {/* Central cinematic glow - the main light source */}
      <motion.div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[120vw] h-[60vh]"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.04, transparent 45%)",
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Premium floating visual planes for layered depth
function DepthPlanes({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {/* Far background plane */}
      <motion.div
        className="absolute top-[15%] right-[8%] w-[400px] h-[280px] rounded-3xl"
        style={{
          x: useTransform(mouseX, (v) => v * -0.3),
          y: useTransform(mouseY, (v) => v * -0.3),
          background: "linear-gradient(135deg, rgb(var(--surface-2))/0.3, rgb(var(--surface-3))/0.1)",
          border: "1px solid rgb(var(--border))/0.3",
          backdropFilter: "blur(20px)",
        }}
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          {/* Simulate a premium interface preview */}
          <div className="h-full w-full bg-gradient-to-br from-[rgb(var(--surface-3))]/40 to-transparent" />
          <div className="absolute top-6 left-6 right-6 space-y-3">
            <div className="h-2 w-1/3 rounded bg-[rgb(var(--foreground))]/[0.06]" />
            <div className="h-1.5 w-2/3 rounded bg-[rgb(var(--foreground))]/[0.04]" />
          </div>
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[rgb(var(--surface-2))]/50 to-transparent" />
        </div>
      </motion.div>
      
      {/* Mid-ground floating surface */}
      <motion.div
        className="absolute top-[45%] right-[15%] w-[280px] h-[180px] rounded-2xl"
        style={{
          x: useTransform(mouseX, (v) => v * 0.2),
          y: useTransform(mouseY, (v) => v * 0.2),
          background: "linear-gradient(145deg, rgb(var(--surface-3))/0.4, rgb(var(--surface-2))/0.2)",
          border: "1px solid rgb(var(--border))/0.4",
          backdropFilter: "blur(15px)",
        }}
        initial={{ opacity: 0, scale: 0.9, x: 80 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-2xl" />
        {/* Glow accent */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[rgb(var(--glow))]/10 rounded-full blur-2xl" />
      </motion.div>
      
      {/* Foreground accent element */}
      <motion.div
        className="absolute bottom-[25%] left-[5%] w-[200px] h-[140px] rounded-xl"
        style={{
          x: useTransform(mouseX, (v) => v * 0.4),
          y: useTransform(mouseY, (v) => v * 0.4),
          background: "linear-gradient(160deg, rgb(var(--surface-2))/0.5, transparent)",
          border: "1px solid rgb(var(--border))/0.2",
        }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-4 rounded-lg bg-[rgb(var(--surface-3))]/30"
        />
      </motion.div>
    </div>
  );
}

// Cinematic light rays for atmosphere
function LightRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <motion.div
        className="absolute top-0 left-1/4 w-[2px] h-full"
        style={{
          background: "linear-gradient(180deg, transparent, rgb(var(--foreground)), transparent)",
        }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="absolute top-0 left-1/2 w-[1px] h-full"
        style={{
          background: "linear-gradient(180deg, transparent, rgb(var(--foreground)), transparent)",
        }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-[1px] h-full"
        style={{
          background: "linear-gradient(180deg, transparent, rgb(var(--foreground)), transparent)",
        }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 2.5 }}
      />
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Strong parallax transforms for cinematic depth
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const planesY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Mouse parallax for interactive depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / innerWidth * 40);
      mouseY.set((clientY - innerHeight / 2) / innerHeight * 40);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] lg:min-h-[115vh] overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* LAYER 0 - Deep cinematic atmosphere */}
      <motion.div style={{ scale: bgScale, y: bgY }}>
        <CinematicAtmosphere />
      </motion.div>

      {/* LAYER 1 - Subtle light rays */}
      <LightRays />

      {/* LAYER 2 - Floating depth planes */}
      <motion.div style={{ y: planesY }}>
        <DepthPlanes mouseX={smoothMouseX} mouseY={smoothMouseY} />
      </motion.div>

      {/* LAYER 3 - Main content foreground */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 min-h-[100svh] flex flex-col justify-center px-6 lg:px-16"
      >
        <div className="max-w-[1400px] mx-auto w-full pt-32 pb-20 lg:pt-44 lg:pb-36">
          <div className="max-w-4xl">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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

            {/* DISPLAY HEADLINE - Cinematic scale */}
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(3rem,10vw,8rem)] font-bold tracking-[-0.03em] leading-[0.9]"
            >
              <motion.span 
                className="block text-[rgb(var(--foreground))]"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                Websites that
              </motion.span>
              <motion.span 
                className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--foreground))] via-[rgb(var(--glow-intense))] to-[rgb(var(--glow))]"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.45 }}
              >
                drive growth
              </motion.span>
            </motion.h1>

            {/* Supporting copy - clean and confident */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] max-w-xl leading-relaxed font-light"
            >
              Premium websites for businesses that want to 
              stand out, convert visitors, and scale with confidence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5"
            >
              {/* Primary CTA */}
              <Link href="/contact" className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(var(--glow))]/20 to-[rgb(var(--glow-intense))]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[rgb(var(--foreground))] text-[rgb(var(--background))] font-semibold text-base transition-all duration-300 group-hover:gap-4">
                  Start a project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/work"
                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-2))]/30 backdrop-blur-sm font-semibold text-base text-[rgb(var(--foreground))] hover:bg-[rgb(var(--surface-2))]/50 hover:border-[rgb(var(--border-subtle))] transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                View work
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
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

      {/* Bottom gradient transition to next section */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[rgb(var(--surface-1))] to-transparent pointer-events-none" />
    </section>
  );
}
