"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/lib/theme/context";

// ===========================================
// CINEMATIC PORTAL HERO
// One dominant atmospheric visual - no browser mockups
// ===========================================

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  // Scroll behavior for fullscreen-to-receding effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);
  const yOffset = useTransform(scrollYProgress, [0, 0.5], ["0%", "-2%"]);

  // Wait for loader to finish before starting hero animation
  // Loader takes ~2800ms, so we wait 3000ms to be safe
  useEffect(() => {
    const timer = setTimeout(() => setLoaderFinished(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Staged entrance animation - ONLY starts after loader is gone
  useEffect(() => {
    if (loaderFinished) {
      const stages = [1, 2, 3, 4, 5, 6, 7, 8];
      stages.forEach((stage, i) => {
        setTimeout(() => setStageIndex(stage), 100 + i * 300);
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

  // Parallax transforms
  const imageX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const imageY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);
  const glowX = useTransform(smoothMouseX, [-1, 1], [-40, 40]);
  const glowY = useTransform(smoothMouseY, [-1, 1], [-30, 30]);

  // Theme colors - violet/purple neon for dark, lavender elegance for light
  const colors = isDark
    ? {
        bg: "rgb(6, 6, 10)",
        text: "#fafafa",
        textMuted: "#9090a8",
        border: "#2a2a3d",
        glow1: "rgba(120, 80, 200, 0.4)",
        glow2: "rgba(160, 100, 220, 0.3)",
        glow3: "rgba(80, 60, 180, 0.25)",
        neonPrimary: "rgba(140, 90, 230, 0.6)",
        neonSecondary: "rgba(100, 140, 255, 0.3)",
        overlay: "rgba(6, 6, 10, 0.4)",
      }
    : {
        bg: "rgb(252, 252, 254)",
        text: "#0c0c0e",
        textMuted: "#6c6c88",
        border: "#d8d8e8",
        glow1: "rgba(160, 130, 220, 0.25)",
        glow2: "rgba(180, 150, 230, 0.2)",
        glow3: "rgba(140, 120, 200, 0.15)",
        neonPrimary: "rgba(160, 120, 240, 0.3)",
        neonSecondary: "rgba(120, 150, 255, 0.2)",
        overlay: "rgba(252, 252, 254, 0.3)",
      };

  return (
    <section ref={containerRef} className="relative" style={{ height: "200vh", backgroundColor: colors.bg }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale, y: yOffset, borderRadius }}
          className="relative h-full w-full overflow-hidden origin-center"
        >
          {/* ========================================
              LAYER 1: ATMOSPHERIC BACKGROUND
              Dark atmosphere that builds up
              ======================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stageIndex >= 1 ? 1 : 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0"
            style={{ backgroundColor: colors.bg }}
          >
            {/* Deep violet ambient glow orbs */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: stageIndex >= 1 ? [1, 1.2, 1] : 0.5,
                opacity: stageIndex >= 1 ? [0.5, 0.8, 0.5] : 0,
              }}
              transition={{ 
                scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ x: glowX, y: glowY }}
              className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full blur-[150px]"
            >
              <div className="w-full h-full" style={{ background: colors.glow1 }} />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: stageIndex >= 1 ? [1, 1.15, 1] : 0.5,
                opacity: stageIndex >= 1 ? [0.4, 0.7, 0.4] : 0,
              }}
              transition={{ 
                scale: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 },
                opacity: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 },
              }}
              className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px]"
            >
              <div className="w-full h-full" style={{ background: colors.glow2 }} />
            </motion.div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: stageIndex >= 1 ? [1, 1.1, 1] : 0.5,
                opacity: stageIndex >= 1 ? [0.3, 0.5, 0.3] : 0,
              }}
              transition={{ 
                scale: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 },
                opacity: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 },
              }}
              className="absolute top-[40%] left-[40%] w-[700px] h-[700px] rounded-full blur-[180px]"
            >
              <div className="w-full h-full" style={{ background: colors.glow3 }} />
            </motion.div>

            {/* Film grain texture */}
            <div className="absolute inset-0 noise opacity-[0.025]" />

            {/* Vignette */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, transparent 0%, transparent 40%, ${isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.12)'} 100%)`,
              }}
            />
          </motion.div>

          {/* ========================================
              LAYER 2: CINEMATIC PORTAL IMAGE
              The dominant visual centerpiece
              ======================================== */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Neon glow halo behind image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: stageIndex >= 2 ? 1 : 0,
                scale: stageIndex >= 2 ? 1 : 0.8,
              }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ 
                  opacity: stageIndex >= 3 ? [0.4, 0.7, 0.4] : 0,
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-[80vw] max-w-[1200px] aspect-[16/10] rounded-3xl blur-[80px]"
                style={{ background: colors.neonPrimary }}
              />
            </motion.div>

            {/* Main portal image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 50 }}
              animate={{ 
                opacity: stageIndex >= 2 ? 1 : 0,
                scale: stageIndex >= 2 ? 1 : 0.85,
                y: stageIndex >= 2 ? 0 : 50,
              }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ x: imageX, y: imageY }}
              className="relative w-[85vw] max-w-[1100px] aspect-[16/10]"
            >
              {/* Electric border glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: stageIndex >= 3 ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -inset-[2px] rounded-2xl lg:rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, ${colors.neonPrimary}, transparent 40%, transparent 60%, ${colors.neonSecondary})`,
                }}
              />

              {/* Image container */}
              <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden">
                <Image
                  src="/images/hero-portal.jpg"
                  alt="Cinematic digital portal"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 1100px"
                />

                {/* Light sweep animation */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: stageIndex >= 4 ? ["100%", "-100%"] : "-100%" }}
                  transition={{ 
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.25)'}, transparent)`,
                    width: "40%",
                  }}
                />

                {/* Subtle overlay for text contrast */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${colors.overlay} 0%, transparent 50%)`,
                  }}
                />
              </div>

              {/* Top reflection/shine */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: stageIndex >= 4 ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 left-0 right-0 h-[30%] rounded-t-2xl lg:rounded-t-3xl pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.2)'} 0%, transparent 100%)`,
                }}
              />
            </motion.div>

            {/* Floating neon particles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: stageIndex >= 4 ? 0.6 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 pointer-events-none overflow-hidden"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -100, 0],
                    x: [0, Math.random() * 40 - 20, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 6 + i * 2,
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: "easeInOut",
                  }}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${15 + i * 12}%`,
                    bottom: "20%",
                    background: isDark ? "rgba(180, 140, 255, 0.8)" : "rgba(160, 120, 240, 0.6)",
                    boxShadow: isDark 
                      ? "0 0 20px rgba(180, 140, 255, 0.5)" 
                      : "0 0 15px rgba(160, 120, 240, 0.4)",
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* ========================================
              LAYER 3: TEXT OVERLAY
              Clean headline, description, CTAs
              ======================================== */}
          <div className="absolute inset-0 flex items-end pointer-events-none">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 pb-16 lg:pb-24">
              <div className="max-w-2xl">
                {/* Headline - line by line reveal */}
                <div className="overflow-hidden mb-4">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={{ y: stageIndex >= 5 ? "0%" : "110%" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]"
                    style={{ color: colors.text }}
                  >
                    Digital experiences
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-6 lg:mb-8">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={{ y: stageIndex >= 5 ? "0%" : "110%" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]"
                    style={{ color: colors.textMuted }}
                  >
                    that captivate.
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ 
                    opacity: stageIndex >= 6 ? 1 : 0,
                    y: stageIndex >= 6 ? 0 : 25,
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
                    opacity: stageIndex >= 7 ? 1 : 0,
                    y: stageIndex >= 7 ? 0 : 25,
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="flex flex-wrap items-center gap-3 sm:gap-4 pointer-events-auto"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:gap-3"
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
                    className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium border transition-all duration-300"
                    style={{ 
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  >
                    View Our Work
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>

                {/* Trust indicators - appears last */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: stageIndex >= 8 ? 1 : 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="mt-10 lg:mt-12 pt-6 lg:pt-8 border-t"
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
            animate={{ opacity: stageIndex >= 8 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
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
