"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ===========================================
// IMMERSIVE DIGITAL WORLD HERO
// No images - pure designed layered scene
// ===========================================

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Mouse tracking for 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Multi-speed parallax layers
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const farY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsLoaded(true), 200);
    const timer2 = setTimeout(() => setIsRevealed(true), 600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 2);
      mouseY.set((clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Idle drift animation values
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);
  
  useEffect(() => {
    let frame: number;
    let time = 0;
    const animate = () => {
      time += 0.003;
      driftX.set(Math.sin(time) * 8);
      driftY.set(Math.cos(time * 0.7) * 5);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [driftX, driftY]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] overflow-hidden bg-[#050506]"
      style={{ perspective: "1400px" }}
    >
      {/* ===== LAYER 1: DEEP ATMOSPHERIC BACKGROUND ===== */}
      <motion.div 
        style={{ y: bgY, opacity: sceneOpacity }} 
        className="absolute inset-0"
      >
        {/* Base */}
        <div className="absolute inset-0 bg-[#050506]" />

        {/* Subtle haze layers */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 80% at 50% 100%, rgba(15,18,30,0.6), transparent 60%),
              radial-gradient(ellipse 80% 60% at 20% 30%, rgba(20,25,40,0.3), transparent 50%),
              radial-gradient(ellipse 60% 50% at 80% 60%, rgba(15,20,35,0.25), transparent 50%)
            `,
          }}
        />

        {/* Film grain texture */}
        <motion.div
          animate={{ opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 0.1, repeat: Infinity }}
          className="absolute inset-0 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Deep ambient glow - breathing */}
        <motion.div
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-30%] left-[20%] w-[80%] h-[80%]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(40,60,100,0.15), transparent 60%)",
            filter: "blur(100px)",
          }}
        />

        {/* Secondary glow */}
        <motion.div
          animate={{ 
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[10%] w-[60%] h-[60%]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(50,40,80,0.12), transparent 60%)",
            filter: "blur(80px)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(5,5,6,0.6) 100%)
            `,
          }}
        />
      </motion.div>

      {/* ===== LAYER 2: DIGITAL SCENE - LAYERED PLANES ===== */}
      <motion.div 
        style={{ opacity: sceneOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          
          {/* --- BACK PLANE: Large atmospheric screen (deepest) --- */}
          <motion.div
            style={{
              y: farY,
              x: useTransform(smoothX, [-1, 1], ["-1%", "1%"]),
              translateX: driftX,
              translateY: driftY,
              rotateY: useTransform(smoothX, [-1, 1], [0.5, -0.5]),
              rotateX: useTransform(smoothY, [-1, 1], [-0.3, 0.3]),
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 2.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[8%] right-[2%] w-[75vw] max-w-[1200px] aspect-[16/10]"
          >
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                transform: "translateZ(-300px)",
                background: "linear-gradient(165deg, rgba(12,14,22,0.85), rgba(8,10,16,0.95))",
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.02),
                  0 80px 200px rgba(0,0,0,0.5)
                `,
              }}
            >
              {/* Subtle internal glow */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse 50% 40% at 30% 30%, rgba(60,80,120,0.08), transparent)",
                }}
              />
              
              {/* Abstract interface skeleton */}
              <div className="absolute inset-8 opacity-30">
                <div className="h-6 w-40 bg-white/[0.03] rounded mb-8" />
                <div className="flex gap-6">
                  <div className="w-40 h-full bg-white/[0.015] rounded-lg" />
                  <div className="flex-1 space-y-4">
                    <div className="h-4 w-2/3 bg-white/[0.02] rounded" />
                    <div className="h-4 w-1/2 bg-white/[0.015] rounded" />
                    <div className="h-32 bg-white/[0.01] rounded-lg mt-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- SECONDARY BACK PLANE: Higher, shifted --- */}
          <motion.div
            style={{
              y: farY,
              x: useTransform(smoothX, [-1, 1], ["-1.5%", "1.5%"]),
              translateX: useTransform(driftX, v => v * 0.8),
              translateY: useTransform(driftY, v => v * 1.2),
              rotateY: useTransform(smoothX, [-1, 1], [1, -1]),
              rotateX: useTransform(smoothY, [-1, 1], [-0.5, 0.5]),
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 2.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[5%] right-[15%] w-[40vw] max-w-[600px] aspect-[16/12]"
          >
            <div
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{
                transform: "translateZ(-200px)",
                background: "linear-gradient(150deg, rgba(18,20,30,0.9), rgba(10,12,20,0.95))",
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.025),
                  0 50px 120px rgba(0,0,0,0.4)
                `,
              }}
            >
              {/* Light streak */}
              <motion.div
                animate={{ x: ["-150%", "250%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)",
                }}
              />
              
              {/* Content skeleton */}
              <div className="absolute inset-6 opacity-25">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-white/[0.05]" />
                  <div className="w-3 h-3 rounded-full bg-white/[0.05]" />
                  <div className="w-3 h-3 rounded-full bg-white/[0.05]" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-3/4 bg-white/[0.02] rounded" />
                  <div className="h-3 w-1/2 bg-white/[0.015] rounded" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- MAIN PLANE: Central dominant surface --- */}
          <motion.div
            style={{
              y: midY,
              x: useTransform(smoothX, [-1, 1], ["-2.5%", "2.5%"]),
              translateX: useTransform(driftX, v => v * 1.2),
              translateY: useTransform(driftY, v => v * 0.9),
              rotateY: useTransform(smoothX, [-1, 1], [2, -2]),
              rotateX: useTransform(smoothY, [-1, 1], [-1, 1]),
            }}
            initial={{ opacity: 0, scale: 0.85, y: 80 }}
            animate={isRevealed ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 2.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[12%] right-[6%] w-[58vw] max-w-[950px] aspect-[16/10]"
          >
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                transform: "translateZ(-60px)",
                background: "linear-gradient(160deg, rgba(22,25,38,0.98), rgba(14,16,26,0.99))",
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.05),
                  0 4px 20px rgba(0,0,0,0.3),
                  0 40px 100px rgba(0,0,0,0.5),
                  0 0 80px rgba(60,80,140,0.08)
                `,
              }}
            >
              {/* Browser chrome */}
              <div className="absolute top-0 left-0 right-0 h-10 lg:h-12 bg-[#0a0b10]/80 border-b border-white/[0.04] flex items-center px-5 gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                </div>
                <div className="ml-6 h-6 flex-1 max-w-[300px] rounded-lg bg-white/[0.03] flex items-center px-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 mr-3" />
                  <div className="h-2 w-28 bg-white/[0.05] rounded" />
                </div>
              </div>

              {/* Website interface */}
              <div className="absolute top-12 lg:top-14 inset-x-0 bottom-0 p-6 lg:p-10">
                {/* Nav */}
                <div className="flex justify-between items-center mb-8">
                  <div className="w-24 h-5 bg-white/[0.04] rounded" />
                  <div className="flex gap-6">
                    <div className="w-14 h-3 bg-white/[0.025] rounded" />
                    <div className="w-14 h-3 bg-white/[0.025] rounded" />
                    <div className="w-14 h-3 bg-white/[0.025] rounded" />
                    <div className="w-20 h-7 bg-white/[0.04] rounded-full" />
                  </div>
                </div>

                {/* Hero content mockup */}
                <div className="flex gap-10 mt-6">
                  <div className="flex-1 space-y-4">
                    <div className="h-8 w-4/5 bg-white/[0.05] rounded" />
                    <div className="h-8 w-3/5 bg-white/[0.035] rounded" />
                    <div className="space-y-2 mt-8">
                      <div className="h-3 w-4/5 bg-white/[0.02] rounded" />
                      <div className="h-3 w-3/5 bg-white/[0.015] rounded" />
                    </div>
                    <div className="flex gap-4 mt-8">
                      <div className="h-11 w-32 bg-white/[0.06] rounded-full" />
                      <div className="h-11 w-28 bg-transparent rounded-full border border-white/[0.06]" />
                    </div>
                  </div>
                  <div className="w-[40%] aspect-[4/3] bg-white/[0.02] rounded-xl" />
                </div>

                {/* Cards */}
                <div className="flex gap-5 mt-10">
                  <div className="flex-1 h-28 bg-white/[0.015] rounded-xl" />
                  <div className="flex-1 h-28 bg-white/[0.015] rounded-xl" />
                  <div className="flex-1 h-28 bg-white/[0.015] rounded-xl" />
                </div>
              </div>

              {/* Reflection sweep */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={isRevealed ? { x: "250%", opacity: [0, 0.06, 0] } : {}}
                transition={{ duration: 3.5, delay: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                }}
              />

              {/* Edge highlight */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 20%)",
                }}
              />
            </div>
          </motion.div>

          {/* --- NEAR PLANE: Floating panel (top right) --- */}
          <motion.div
            style={{
              y: nearY,
              x: useTransform(smoothX, [-1, 1], ["-4%", "4%"]),
              translateX: useTransform(driftX, v => v * 1.5),
              translateY: useTransform(driftY, v => v * 1.3),
              rotateY: useTransform(smoothX, [-1, 1], [4, -4]),
              rotateX: useTransform(smoothY, [-1, 1], [-2, 2]),
            }}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={isRevealed ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[50%] right-[5%] w-[18vw] max-w-[280px] aspect-[3/4]"
          >
            <div
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{
                transform: "translateZ(100px)",
                background: "linear-gradient(165deg, rgba(30,34,50,0.9), rgba(18,20,32,0.95))",
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.07),
                  0 25px 70px rgba(0,0,0,0.4),
                  0 0 50px rgba(80,100,160,0.1)
                `,
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Panel content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-sm bg-blue-400/50" />
                  </div>
                  <div className="h-3 w-20 bg-white/[0.06] rounded" />
                </div>
                <div className="space-y-2.5">
                  <div className="h-2.5 w-full bg-white/[0.04] rounded" />
                  <div className="h-2.5 w-4/5 bg-white/[0.03] rounded" />
                  <div className="h-2.5 w-3/5 bg-white/[0.02] rounded" />
                </div>
                <div className="h-20 w-full bg-white/[0.02] rounded-lg mt-5" />
                <div className="flex gap-2.5 mt-5">
                  <div className="h-8 flex-1 bg-white/[0.05] rounded-lg" />
                  <div className="h-8 flex-1 bg-transparent rounded-lg border border-white/[0.04]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- FOREGROUND GLASS: Translucent layer (lower left) --- */}
          <motion.div
            style={{
              y: nearY,
              x: useTransform(smoothX, [-1, 1], ["3%", "-3%"]),
              translateX: useTransform(driftX, v => v * -0.8),
              translateY: useTransform(driftY, v => v * 1.1),
              rotateY: useTransform(smoothX, [-1, 1], [-3, 3]),
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[20%] left-[10%] w-[14vw] max-w-[200px] aspect-[4/5]"
          >
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                transform: "translateZ(60px)",
                background: "linear-gradient(145deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.04), inset 0 0 40px rgba(255,255,255,0.01)",
                backdropFilter: "blur(40px)",
              }}
            >
              <div className="p-5 opacity-60">
                <div className="h-2 w-10 bg-white/[0.05] rounded mb-4" />
                <div className="h-16 w-full bg-white/[0.02] rounded-lg" />
                <div className="space-y-2 mt-4">
                  <div className="h-2 w-14 bg-white/[0.03] rounded" />
                  <div className="h-2 w-10 bg-white/[0.02] rounded" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- FOREGROUND GLASS 2: Top crossing --- */}
          <motion.div
            style={{
              y: nearY,
              x: useTransform(smoothX, [-1, 1], ["2%", "-2%"]),
              translateX: useTransform(driftX, v => v * -1.2),
              translateY: useTransform(driftY, v => v * 0.7),
              rotateY: useTransform(smoothX, [-1, 1], [-2, 2]),
              rotateX: useTransform(smoothY, [-1, 1], [1, -1]),
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={isRevealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[15%] left-[6%] w-[10vw] max-w-[150px] aspect-[3/4]"
          >
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                transform: "translateZ(40px)",
                background: "linear-gradient(160deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.03)",
                backdropFilter: "blur(30px)",
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ===== LAYER 3: FOREGROUND TEXT ===== */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16"
      >
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="max-w-2xl">
            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-white/30 uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/40" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400/80" />
                </span>
                Available for new projects
              </span>
            </motion.div>

            {/* Headline - line by line reveal */}
            <h1 className="font-display font-bold tracking-[-0.04em] leading-[0.88]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(2.8rem,8vw,6.5rem)] text-white"
                  initial={{ y: "120%" }}
                  animate={isRevealed ? { y: "0%" } : {}}
                  transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  Crafting
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(2.8rem,8vw,6.5rem)] text-white"
                  initial={{ y: "120%" }}
                  animate={isRevealed ? { y: "0%" } : {}}
                  transition={{ duration: 1.4, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                >
                  premium
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(2.8rem,8vw,6.5rem)] text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.45), rgba(255,255,255,0.18))",
                  }}
                  initial={{ y: "120%" }}
                  animate={isRevealed ? { y: "0%" } : {}}
                  transition={{ duration: 1.4, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  websites
                </motion.span>
              </span>
            </h1>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-[15px] lg:text-base text-white/30 max-w-md leading-relaxed"
            >
              Design-driven development for brands that value craft, 
              detail, and digital experiences that leave an impression.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="group">
                <span className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-[#050506] font-medium text-sm transition-all duration-300 hover:bg-white/90 hover:scale-[1.02]">
                  Start a project
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/work"
                className="flex items-center justify-center px-8 py-4 rounded-full border border-white/10 bg-white/[0.02] font-medium text-sm text-white/60 hover:bg-white/[0.05] hover:border-white/15 hover:text-white/80 transition-all duration-300"
              >
                View work
              </Link>
            </motion.div>

            {/* Proof row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isRevealed ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 2 }}
              className="mt-14 flex items-center gap-6 text-[10px] lg:text-[11px] font-mono uppercase tracking-[0.2em] text-white/15"
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

      {/* ===== SCENE GRADIENT OVERLAY ===== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(5,5,6,0.85) 0%, rgba(5,5,6,0.4) 35%, transparent 60%),
            linear-gradient(to top, rgba(5,5,6,0.9) 0%, transparent 40%)
          `,
        }}
      />
    </section>
  );
}
