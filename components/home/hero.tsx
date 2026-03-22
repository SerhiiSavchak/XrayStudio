"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ===========================================
// IMMERSIVE DIGITAL WORLD HERO
// A deep spatial scene with layered planes
// suggesting a premium web development environment
// ===========================================

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mouse tracking for 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Layered parallax on scroll - different speeds per depth
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const farPlaneY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const midPlaneY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const nearPlaneY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Normalized -1 to 1
      mouseX.set((clientX / innerWidth - 0.5) * 2);
      mouseY.set((clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] overflow-hidden bg-[#030304]"
      style={{ perspective: "1200px" }}
    >
      {/* ===== LAYER 1: DEEP ATMOSPHERIC BACKGROUND ===== */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        {/* Near-black base */}
        <div className="absolute inset-0 bg-[#030304]" />

        {/* Subtle ambient haze */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 30% 40%, rgba(30,35,50,0.4), transparent),
              radial-gradient(ellipse 70% 50% at 70% 70%, rgba(25,30,45,0.3), transparent)
            `,
          }}
        />

        {/* Faint grid - suggests digital environment */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Subtle light accent - top left glow */}
        <motion.div
          animate={{ opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(70,90,140,0.2), transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      {/* ===== LAYER 2: MID-SCENE - LAYERED DIGITAL PLANES ===== */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Container for 3D scene */}
        <div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* --- FAR PLANE: Large atmospheric screen (deepest) --- */}
          <motion.div
            style={{
              y: farPlaneY,
              x: useTransform(smoothX, [-1, 1], ["-2%", "2%"]),
              rotateY: useTransform(smoothX, [-1, 1], [1, -1]),
              rotateX: useTransform(smoothY, [-1, 1], [-0.5, 0.5]),
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[10%] right-[5%] w-[70vw] max-w-[1100px] aspect-[16/10]"
            style={{ transform: "translateZ(-200px)" }}
          >
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(20,22,30,0.95), rgba(12,13,18,0.98))",
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.03),
                  0 50px 150px rgba(0,0,0,0.5),
                  inset 0 1px 0 rgba(255,255,255,0.02)
                `,
              }}
            >
              {/* Browser chrome hint */}
              <div className="absolute top-0 left-0 right-0 h-8 lg:h-10 bg-black/30 border-b border-white/[0.02] flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="ml-4 flex-1 h-5 rounded bg-white/[0.03] max-w-[200px]" />
              </div>

              {/* Abstract interface content */}
              <div className="absolute top-12 lg:top-14 inset-x-6 bottom-6 flex gap-4">
                <div className="w-48 h-full bg-white/[0.015] rounded-lg" />
                <div className="flex-1 flex flex-col gap-3">
                  <div className="h-8 w-48 bg-white/[0.02] rounded" />
                  <div className="flex-1 bg-white/[0.01] rounded-lg" />
                  <div className="h-20 bg-white/[0.015] rounded-lg" />
                </div>
              </div>

              {/* Subtle glow overlay */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: "radial-gradient(ellipse at 30% 30%, rgba(60,80,120,0.1), transparent 60%)",
                }}
              />
            </div>
          </motion.div>

          {/* --- MID PLANE: Primary large browser surface --- */}
          <motion.div
            style={{
              y: midPlaneY,
              x: useTransform(smoothX, [-1, 1], ["-3%", "3%"]),
              rotateY: useTransform(smoothX, [-1, 1], [2, -2]),
              rotateX: useTransform(smoothY, [-1, 1], [-1, 1]),
            }}
            initial={{ opacity: 0, scale: 0.9, y: 60 }}
            animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[15%] right-[10%] w-[55vw] max-w-[900px] aspect-[16/10]"
            style={{ transform: "translateZ(-50px)" }}
          >
            <div
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, rgba(30,33,45,0.98), rgba(18,20,28,0.99))",
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.05),
                  0 30px 100px rgba(0,0,0,0.6),
                  0 0 60px rgba(80,100,160,0.08),
                  inset 0 1px 0 rgba(255,255,255,0.04)
                `,
              }}
            >
              {/* Browser chrome */}
              <div className="absolute top-0 left-0 right-0 h-9 lg:h-11 bg-[#0d0e12] border-b border-white/[0.04] flex items-center px-4 gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]/80" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]/80" />
                </div>
                <div className="ml-6 h-6 flex-1 max-w-[280px] rounded-md bg-white/[0.04] flex items-center px-3">
                  <div className="w-3 h-3 rounded-full bg-white/10 mr-2" />
                  <div className="h-2 w-24 bg-white/[0.06] rounded" />
                </div>
              </div>

              {/* Website mockup content */}
              <div className="absolute top-11 lg:top-13 inset-x-0 bottom-0 p-5 lg:p-8">
                {/* Navigation hint */}
                <div className="flex justify-between items-center mb-6">
                  <div className="w-20 h-5 bg-white/[0.04] rounded" />
                  <div className="flex gap-4">
                    <div className="w-12 h-3 bg-white/[0.03] rounded" />
                    <div className="w-12 h-3 bg-white/[0.03] rounded" />
                    <div className="w-12 h-3 bg-white/[0.03] rounded" />
                  </div>
                </div>

                {/* Hero section mockup */}
                <div className="flex gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="h-6 w-3/4 bg-white/[0.05] rounded" />
                    <div className="h-6 w-1/2 bg-white/[0.03] rounded" />
                    <div className="h-3 w-2/3 bg-white/[0.02] rounded mt-6" />
                    <div className="h-3 w-1/2 bg-white/[0.02] rounded" />
                    <div className="flex gap-3 mt-6">
                      <div className="h-9 w-28 bg-white/[0.06] rounded-full" />
                      <div className="h-9 w-28 bg-white/[0.02] rounded-full border border-white/[0.04]" />
                    </div>
                  </div>
                  <div className="w-[45%] aspect-[4/3] bg-white/[0.02] rounded-lg" />
                </div>

                {/* Cards row mockup */}
                <div className="flex gap-4 mt-8">
                  <div className="flex-1 h-32 bg-white/[0.015] rounded-lg" />
                  <div className="flex-1 h-32 bg-white/[0.015] rounded-lg" />
                  <div className="flex-1 h-32 bg-white/[0.015] rounded-lg" />
                </div>
              </div>

              {/* Reflection sweep */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={isLoaded ? { x: "200%", opacity: [0, 0.08, 0] } : {}}
                transition={{ duration: 3, delay: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                }}
              />
            </div>
          </motion.div>

          {/* --- NEAR PLANE: Small floating panel (top layer) --- */}
          <motion.div
            style={{
              y: nearPlaneY,
              x: useTransform(smoothX, [-1, 1], ["-5%", "5%"]),
              rotateY: useTransform(smoothX, [-1, 1], [4, -4]),
              rotateX: useTransform(smoothY, [-1, 1], [-2, 2]),
            }}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[55%] right-[8%] w-[20vw] max-w-[300px] aspect-[4/5]"
            style={{ transform: "translateZ(80px)" }}
          >
            <div
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{
                background: "linear-gradient(170deg, rgba(35,38,52,0.95), rgba(22,24,32,0.98))",
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.06),
                  0 20px 60px rgba(0,0,0,0.5),
                  0 0 40px rgba(100,120,180,0.1),
                  inset 0 1px 0 rgba(255,255,255,0.05)
                `,
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Panel header */}
              <div className="p-4 border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-sm bg-blue-400/60" />
                  </div>
                  <div className="h-3 w-16 bg-white/[0.06] rounded" />
                </div>
              </div>

              {/* Panel content */}
              <div className="p-4 space-y-3">
                <div className="h-3 w-full bg-white/[0.04] rounded" />
                <div className="h-3 w-4/5 bg-white/[0.03] rounded" />
                <div className="h-3 w-3/5 bg-white/[0.02] rounded" />
                <div className="h-16 w-full bg-white/[0.02] rounded-lg mt-4" />
                <div className="flex gap-2 mt-4">
                  <div className="h-7 flex-1 bg-white/[0.04] rounded" />
                  <div className="h-7 flex-1 bg-white/[0.02] rounded border border-white/[0.03]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- GLASS PANEL: Translucent accent (left side) --- */}
          <motion.div
            style={{
              y: midPlaneY,
              x: useTransform(smoothX, [-1, 1], ["2%", "-2%"]),
              rotateY: useTransform(smoothX, [-1, 1], [-2, 2]),
            }}
            initial={{ opacity: 0, x: -40 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[25%] left-[8%] w-[12vw] max-w-[180px] aspect-[3/4]"
            style={{ transform: "translateZ(20px)" }}
          >
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))",
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.04),
                  inset 0 0 30px rgba(255,255,255,0.01)
                `,
                backdropFilter: "blur(30px)",
              }}
            >
              {/* Subtle content hints */}
              <div className="p-4 space-y-2">
                <div className="h-2 w-8 bg-white/[0.04] rounded" />
                <div className="h-16 w-full bg-white/[0.015] rounded mt-3" />
                <div className="h-2 w-12 bg-white/[0.03] rounded" />
                <div className="h-2 w-10 bg-white/[0.02] rounded" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== LAYER 3: FOREGROUND - TEXT CONTENT ===== */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16"
      >
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="max-w-2xl">
            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 text-xs font-medium tracking-widest text-white/40 uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Available for Q2 2026
              </span>
            </motion.div>

            {/* Main headline - dominant, editorial */}
            <h1 className="font-display font-bold tracking-[-0.04em] leading-[0.9]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(3rem,9vw,7rem)] text-white"
                  initial={{ y: "110%" }}
                  animate={isLoaded ? { y: "0%" } : {}}
                  transition={{ duration: 1.3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  Crafting
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(3rem,9vw,7rem)] text-white"
                  initial={{ y: "110%" }}
                  animate={isLoaded ? { y: "0%" } : {}}
                  transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  premium
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(3rem,9vw,7rem)] text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.15))",
                  }}
                  initial={{ y: "110%" }}
                  animate={isLoaded ? { y: "0%" } : {}}
                  transition={{ duration: 1.3, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  websites
                </motion.span>
              </span>
            </h1>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-base lg:text-lg text-white/35 max-w-md leading-relaxed"
            >
              Design-driven development for brands that value craft, 
              detail, and digital experiences that leave an impression.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="group">
                <span className="flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-white text-[#030304] font-medium text-sm transition-all duration-300 hover:bg-white/90">
                  Start a project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/work"
                className="flex items-center justify-center px-7 py-4 rounded-full border border-white/10 bg-white/[0.02] font-medium text-sm text-white/70 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
              >
                View work
              </Link>
            </motion.div>

            {/* Minimal trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="mt-14 flex items-center gap-6 text-[10px] lg:text-xs font-mono uppercase tracking-[0.2em] text-white/20"
            >
              <span>Next.js</span>
              <span className="w-px h-3 bg-white/10" />
              <span>React</span>
              <span className="w-px h-3 bg-white/10" />
              <span>Tailwind</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ===== GRADIENT OVERLAY FOR DEPTH ===== */}
      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: `
            linear-gradient(90deg, rgba(3,3,4,0.7) 0%, rgba(3,3,4,0.3) 30%, transparent 50%),
            linear-gradient(0deg, rgba(3,3,4,0.5) 0%, transparent 30%)
          `,
        }}
      />

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 0.8 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border border-white/10 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-2 rounded-full bg-white/40"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
