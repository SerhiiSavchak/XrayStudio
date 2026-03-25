"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/lib/theme/context";

// ===========================================
// CINEMATIC HERO - PREMIUM WEBSITE CRAFT
// One dominant art-directed visual - no mockups
// Refined dark palette with restrained accents
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
  const imageX = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const imageY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);
  const glowX = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const glowY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);

  // Refined color palette - graphite/charcoal/midnight with restrained accents
  const colors = isDark
    ? {
        bg: "rgb(8, 8, 12)",
        text: "#f5f5f7",
        textMuted: "#8a8a9a",
        border: "#242430",
        // Midnight blue / soft indigo - NOT purple-heavy
        glow1: "rgba(40, 60, 100, 0.35)",
        glow2: "rgba(50, 70, 120, 0.25)",
        glow3: "rgba(70, 80, 130, 0.2)",
        // Restrained accent - soft indigo, not neon purple
        accent: "rgba(90, 100, 160, 0.4)",
        accentSubtle: "rgba(70, 90, 140, 0.2)",
        overlay: "rgba(8, 8, 12, 0.5)",
      }
    : {
        bg: "rgb(250, 250, 252)",
        text: "#0e0e12",
        textMuted: "#5c5c70",
        border: "#d4d4dc",
        // Pearl / silver / soft cool tones
        glow1: "rgba(180, 190, 210, 0.4)",
        glow2: "rgba(170, 180, 200, 0.3)",
        glow3: "rgba(160, 170, 195, 0.25)",
        accent: "rgba(100, 120, 180, 0.25)",
        accentSubtle: "rgba(90, 110, 160, 0.15)",
        overlay: "rgba(250, 250, 252, 0.4)",
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
              Premium dark atmosphere - midnight blue accents
              ======================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stageIndex >= 1 ? 1 : 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0"
            style={{ backgroundColor: colors.bg }}
          >
            {/* Soft ambient glow - midnight blue, NOT purple */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ 
                scale: stageIndex >= 1 ? [1, 1.15, 1] : 0.6,
                opacity: stageIndex >= 1 ? [0.4, 0.6, 0.4] : 0,
              }}
              transition={{ 
                scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ x: glowX, y: glowY }}
              className="absolute top-[5%] left-[10%] w-[700px] h-[700px] rounded-full blur-[180px]"
            >
              <div className="w-full h-full" style={{ background: colors.glow1 }} />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ 
                scale: stageIndex >= 1 ? [1, 1.1, 1] : 0.6,
                opacity: stageIndex >= 1 ? [0.3, 0.5, 0.3] : 0,
              }}
              transition={{ 
                scale: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 },
                opacity: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 },
              }}
              className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full blur-[150px]"
            >
              <div className="w-full h-full" style={{ background: colors.glow2 }} />
            </motion.div>

            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ 
                scale: stageIndex >= 1 ? [1, 1.08, 1] : 0.6,
                opacity: stageIndex >= 1 ? [0.25, 0.4, 0.25] : 0,
              }}
              transition={{ 
                scale: { duration: 16, repeat: Infinity, ease: "easeInOut", delay: 6 },
                opacity: { duration: 16, repeat: Infinity, ease: "easeInOut", delay: 6 },
              }}
              className="absolute top-[35%] left-[35%] w-[800px] h-[800px] rounded-full blur-[200px]"
            >
              <div className="w-full h-full" style={{ background: colors.glow3 }} />
            </motion.div>

            {/* Film grain texture */}
            <div className="absolute inset-0 noise opacity-[0.02]" />

            {/* Subtle vignette */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.08)'} 100%)`,
              }}
            />
          </motion.div>

          {/* ========================================
              LAYER 2: CINEMATIC VISUAL
              Premium website-craft key visual
              ======================================== */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Soft glow behind image - restrained indigo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ 
                opacity: stageIndex >= 2 ? 1 : 0,
                scale: stageIndex >= 2 ? 1 : 0.85,
              }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ 
                  opacity: stageIndex >= 3 ? [0.25, 0.4, 0.25] : 0,
                  scale: [1, 1.03, 1],
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-[75vw] max-w-[1100px] aspect-[16/10] rounded-3xl blur-[100px]"
                style={{ background: colors.accent }}
              />
            </motion.div>

            {/* Main cinematic image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ 
                opacity: stageIndex >= 2 ? 1 : 0,
                scale: stageIndex >= 2 ? 1 : 0.9,
                y: stageIndex >= 2 ? 0 : 40,
              }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              style={{ x: imageX, y: imageY }}
              className="relative w-[82vw] max-w-[1050px] aspect-[16/10]"
            >
              {/* Subtle border glow - refined, not neon */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: stageIndex >= 3 ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute -inset-[1px] rounded-2xl lg:rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, ${colors.accentSubtle}, transparent 35%, transparent 65%, ${colors.accentSubtle})`,
                }}
              />

              {/* Image container */}
              <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden">
                <Image
                  src="/images/hero-cinematic.jpg"
                  alt="Premium digital craft"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 1050px"
                />

                {/* Elegant light sweep */}
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ 
                    x: stageIndex >= 4 ? ["100%", "-100%"] : "-100%",
                    opacity: stageIndex >= 4 ? 1 : 0,
                  }}
                  transition={{ 
                    x: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 7 },
                    opacity: { duration: 0.5 },
                  }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.2)'}, transparent)`,
                    width: "50%",
                  }}
                />

                {/* Gradient overlay for text readability */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${colors.overlay} 0%, transparent 60%)`,
                  }}
                />
              </div>

              {/* Top shine reflection */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: stageIndex >= 4 ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 left-0 right-0 h-[25%] rounded-t-2xl lg:rounded-t-3xl pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.15)'} 0%, transparent 100%)`,
                }}
              />
            </motion.div>

            {/* Subtle floating particles - silver/cool blue, very restrained */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: stageIndex >= 4 ? 0.5 : 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 pointer-events-none overflow-hidden"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -80, 0],
                    x: [0, Math.random() * 30 - 15, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "easeInOut",
                  }}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${20 + i * 14}%`,
                    bottom: "25%",
                    background: isDark ? "rgba(160, 175, 200, 0.7)" : "rgba(100, 120, 160, 0.5)",
                    boxShadow: isDark 
                      ? "0 0 15px rgba(160, 175, 200, 0.4)" 
                      : "0 0 12px rgba(100, 120, 160, 0.3)",
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* ========================================
              LAYER 3: TEXT OVERLAY
              Clean, left-aligned content
              ======================================== */}
          <div className="absolute inset-0 flex items-end pointer-events-none">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 pb-16 lg:pb-24">
              <div className="max-w-2xl">
                {/* Headline - line by line reveal */}
                <div className="overflow-hidden mb-3">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={{ y: stageIndex >= 5 ? "0%" : "110%" }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
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
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                    className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]"
                    style={{ color: colors.textMuted }}
                  >
                    that captivate.
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: stageIndex >= 6 ? 1 : 0,
                    y: stageIndex >= 6 ? 0 : 20,
                  }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 lg:mb-10 max-w-lg"
                  style={{ color: colors.textMuted }}
                >
                  We design and build premium websites for brands that refuse to blend in.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: stageIndex >= 7 ? 1 : 0,
                    y: stageIndex >= 7 ? 0 : 20,
                  }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
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

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: stageIndex >= 8 ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
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
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
