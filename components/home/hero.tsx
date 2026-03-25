"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/lib/theme/context";

// ===========================================
// EDITORIAL LAYERED MEDIA HERO
// Multiple depth planes with parallax
// Bold oversized typography
// Cinematic art-directed composition
// ===========================================

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Mouse tracking for parallax depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  // Scroll behavior for fullscreen-to-receding effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);
  const yOffset = useTransform(scrollYProgress, [0, 0.5], ["0%", "-2%"]);

  // Wait for loader to finish before starting hero animation
  useEffect(() => {
    const timer = setTimeout(() => setLoaderFinished(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Staged entrance animation - 9 stages
  useEffect(() => {
    if (loaderFinished) {
      const stages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      stages.forEach((stage, i) => {
        setTimeout(() => setStageIndex(stage), 100 + i * 280);
      });
    }
  }, [loaderFinished]);

  // Mouse move handler for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Depth-based parallax transforms (front moves more, back moves less)
  const frontX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const frontY = useTransform(smoothMouseY, [-1, 1], [-18, 18]);
  const midX = useTransform(smoothMouseX, [-1, 1], [-12, 12]);
  const midY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);
  const backX = useTransform(smoothMouseX, [-1, 1], [-5, 5]);
  const backY = useTransform(smoothMouseY, [-1, 1], [-3, 3]);
  const glowX = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const glowY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);

  // Refined color palette
  const colors = isDark
    ? {
        bg: "rgb(6, 6, 10)",
        text: "#f5f5f7",
        textSecondary: "#a0a0b0",
        textMuted: "#6a6a7a",
        border: "#1e1e28",
        glow1: "rgba(35, 55, 95, 0.4)",
        glow2: "rgba(45, 65, 105, 0.3)",
        accent: "rgba(70, 90, 140, 0.35)",
      }
    : {
        bg: "rgb(252, 252, 254)",
        text: "#0a0a0e",
        textSecondary: "#3a3a4a",
        textMuted: "#6a6a7a",
        border: "#d8d8e0",
        glow1: "rgba(160, 175, 200, 0.4)",
        glow2: "rgba(140, 160, 190, 0.3)",
        accent: "rgba(100, 120, 170, 0.3)",
      };

  return (
    <section ref={containerRef} className="relative" style={{ height: "200vh", backgroundColor: colors.bg }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale, y: yOffset, borderRadius }}
          className="relative h-full w-full overflow-hidden origin-center"
        >
          {/* ========================================
              LAYER 0: ATMOSPHERIC BACKGROUND
              ======================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stageIndex >= 1 ? 1 : 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
            style={{ backgroundColor: colors.bg }}
          >
            {/* Ambient glow orbs */}
            <motion.div
              animate={{ 
                scale: stageIndex >= 1 ? [1, 1.12, 1] : 0.8,
                opacity: stageIndex >= 1 ? [0.35, 0.55, 0.35] : 0,
              }}
              transition={{ scale: { duration: 14, repeat: Infinity }, opacity: { duration: 14, repeat: Infinity } }}
              style={{ x: glowX, y: glowY }}
              className="absolute top-[8%] left-[5%] w-[600px] h-[600px] rounded-full blur-[160px]"
            >
              <div className="w-full h-full" style={{ background: colors.glow1 }} />
            </motion.div>
            
            <motion.div
              animate={{ 
                scale: stageIndex >= 1 ? [1, 1.08, 1] : 0.8,
                opacity: stageIndex >= 1 ? [0.3, 0.45, 0.3] : 0,
              }}
              transition={{ scale: { duration: 16, repeat: Infinity, delay: 4 }, opacity: { duration: 16, repeat: Infinity, delay: 4 } }}
              className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] rounded-full blur-[140px]"
            >
              <div className="w-full h-full" style={{ background: colors.glow2 }} />
            </motion.div>

            {/* Vignette */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, transparent 0%, transparent 40%, ${isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.06)'} 100%)`,
              }}
            />
          </motion.div>

          {/* ========================================
              LAYER 1: BACK MEDIA PLANE (deepest)
              ======================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ 
              opacity: stageIndex >= 2 ? 0.7 : 0,
              scale: stageIndex >= 2 ? 1 : 0.92,
            }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: backX, y: backY }}
            className="absolute top-[8%] right-[5%] w-[55vw] max-w-[750px] aspect-[21/9]"
          >
            <div className="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden">
              <Image
                src="/images/hero-plane-back.jpg"
                alt=""
                fill
                priority
                className="object-cover"
                style={{ filter: isDark ? "brightness(0.7)" : "brightness(1.05)" }}
              />
              <div 
                className="absolute inset-0"
                style={{ 
                  background: `linear-gradient(135deg, ${isDark ? 'rgba(6,6,10,0.3)' : 'rgba(252,252,254,0.2)'} 0%, transparent 100%)` 
                }}
              />
            </div>
          </motion.div>

          {/* ========================================
              LAYER 2: MID MEDIA PLANES (second depth)
              ======================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            animate={{ 
              opacity: stageIndex >= 3 ? 0.85 : 0,
              scale: stageIndex >= 3 ? 1 : 0.9,
              x: stageIndex >= 3 ? 0 : -30,
            }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: midX, y: midY }}
            className="absolute top-[22%] left-[8%] w-[40vw] max-w-[520px] aspect-[16/9]"
          >
            <div className="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-plane-mid.jpg"
                alt=""
                fill
                priority
                className="object-cover"
              />
              {/* Subtle glow edge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: stageIndex >= 4 ? 1 : 0 }}
                className="absolute inset-0 rounded-xl lg:rounded-2xl"
                style={{
                  boxShadow: isDark 
                    ? "0 0 60px rgba(70, 90, 140, 0.2), inset 0 0 0 1px rgba(255,255,255,0.05)" 
                    : "0 0 50px rgba(100, 120, 170, 0.15), inset 0 0 0 1px rgba(0,0,0,0.05)",
                }}
              />
            </div>
          </motion.div>

          {/* Second mid plane - smaller, offset */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ 
              opacity: stageIndex >= 3 ? 0.75 : 0,
              scale: stageIndex >= 3 ? 1 : 0.85,
              y: stageIndex >= 3 ? 0 : 40,
            }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ x: useTransform(smoothMouseX, [-1, 1], [-8, 8]), y: useTransform(smoothMouseY, [-1, 1], [-6, 6]) }}
            className="absolute bottom-[28%] right-[12%] w-[28vw] max-w-[380px] aspect-[4/5] hidden md:block"
          >
            <div className="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hero-plane-front.jpg"
                alt=""
                fill
                className="object-cover"
                style={{ filter: isDark ? "brightness(0.85)" : "brightness(1)" }}
              />
            </div>
          </motion.div>

          {/* ========================================
              LAYER 3: FRONT MEDIA PLANE (closest)
              ======================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 60 }}
            animate={{ 
              opacity: stageIndex >= 4 ? 1 : 0,
              scale: stageIndex >= 4 ? 1 : 0.88,
              y: stageIndex >= 4 ? 0 : 60,
            }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: frontX, y: frontY }}
            className="absolute bottom-[12%] left-[15%] w-[32vw] max-w-[420px] aspect-[4/5] z-10"
          >
            <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-plane-front.jpg"
                alt=""
                fill
                priority
                className="object-cover"
              />
              {/* Premium border glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: stageIndex >= 5 ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-2xl lg:rounded-3xl pointer-events-none"
                style={{
                  boxShadow: isDark 
                    ? "0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), 0 0 100px rgba(70, 90, 140, 0.25)" 
                    : "0 25px 70px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06), 0 0 80px rgba(100, 120, 170, 0.2)",
                }}
              />
              {/* Light sweep */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ 
                  x: stageIndex >= 5 ? ["100%", "-100%"] : "-100%",
                  opacity: stageIndex >= 5 ? 1 : 0,
                }}
                transition={{ 
                  x: { duration: 3.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 8 },
                  opacity: { duration: 0.5 },
                }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.25)'}, transparent)`,
                  width: "40%",
                }}
              />
            </div>

            {/* Idle drift animation */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 0.5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />
          </motion.div>

          {/* ========================================
              LAYER 4: ATMOSPHERIC ACCENTS
              ======================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stageIndex >= 5 ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
          >
            {/* Subtle floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -60, 0],
                  x: [0, Math.sin(i) * 15, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeInOut",
                }}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${15 + i * 12}%`,
                  bottom: "20%",
                  background: isDark ? "rgba(150, 165, 195, 0.6)" : "rgba(90, 110, 150, 0.4)",
                  boxShadow: isDark 
                    ? "0 0 12px rgba(150, 165, 195, 0.3)" 
                    : "0 0 10px rgba(90, 110, 150, 0.2)",
                }}
              />
            ))}

            {/* Soft light ray */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: stageIndex >= 5 ? [0.15, 0.25, 0.15] : 0,
              }}
              transition={{ opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute top-0 left-[30%] w-[300px] h-[70%]"
              style={{
                background: `linear-gradient(180deg, ${isDark ? 'rgba(70,90,140,0.15)' : 'rgba(100,120,170,0.1)'} 0%, transparent 100%)`,
                filter: "blur(60px)",
                transform: "rotate(15deg)",
              }}
            />
          </motion.div>

          {/* ========================================
              LAYER 5: BOLD EDITORIAL TYPOGRAPHY
              ======================================== */}
          <div className="absolute inset-0 flex items-end z-20 pointer-events-none">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 pb-12 lg:pb-20">
              <div className="max-w-3xl">
                {/* Oversized headline - editorial rhythm */}
                <div className="overflow-hidden mb-2 lg:mb-3">
                  <motion.h1
                    initial={{ y: "120%", rotate: 2 }}
                    animate={{ y: stageIndex >= 6 ? "0%" : "120%", rotate: stageIndex >= 6 ? 0 : 2 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] xl:text-[5.5vw] font-semibold tracking-[-0.03em] leading-[0.88]"
                    style={{ color: colors.text }}
                  >
                    Digital
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-2 lg:mb-3">
                  <motion.h1
                    initial={{ y: "120%", rotate: 2 }}
                    animate={{ y: stageIndex >= 6 ? "0%" : "120%", rotate: stageIndex >= 6 ? 0 : 2 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                    className="font-display text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] xl:text-[5.5vw] font-semibold tracking-[-0.03em] leading-[0.88]"
                    style={{ color: colors.textSecondary }}
                  >
                    Experiences
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-6 lg:mb-8">
                  <motion.h1
                    initial={{ y: "120%", rotate: 2 }}
                    animate={{ y: stageIndex >= 6 ? "0%" : "120%", rotate: stageIndex >= 6 ? 0 : 2 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                    className="font-display text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] xl:text-[5.5vw] font-semibold tracking-[-0.03em] leading-[0.88] italic"
                    style={{ color: colors.textMuted }}
                  >
                    that captivate.
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ 
                    opacity: stageIndex >= 7 ? 1 : 0,
                    y: stageIndex >= 7 ? 0 : 25,
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 lg:mb-10 max-w-lg"
                  style={{ color: colors.textMuted }}
                >
                  We design and build premium websites for brands that refuse to blend in.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ 
                    opacity: stageIndex >= 8 ? 1 : 0,
                    y: stageIndex >= 8 ? 0 : 25,
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="flex flex-wrap items-center gap-3 sm:gap-4 pointer-events-auto"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:gap-3"
                    style={{ 
                      backgroundColor: colors.text, 
                      color: isDark ? "#0a0a0c" : "#fafafa",
                    }}
                  >
                    Start a Project
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/work"
                    className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium border transition-all duration-300"
                    style={{ 
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  >
                    View Our Work
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: stageIndex >= 9 ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mt-8 lg:mt-10 pt-5 lg:pt-6 border-t"
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2">
                    <span className="text-xs sm:text-sm" style={{ color: colors.textMuted }}>
                      50+ Projects Delivered
                    </span>
                    <span className="text-xs sm:text-sm" style={{ color: colors.textMuted }}>
                      Awwwards Recognized
                    </span>
                    <span className="text-xs sm:text-sm" style={{ color: colors.textMuted }}>
                      Enterprise Ready
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ========================================
              SCROLL INDICATOR
              ======================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stageIndex >= 9 ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute bottom-5 lg:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
              style={{ borderColor: colors.border }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1.5 rounded-full"
                style={{ backgroundColor: colors.textMuted }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
