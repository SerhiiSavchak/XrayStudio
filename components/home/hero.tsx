"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/lib/theme/context";

// ===========================================
// CINEMATIC PORTAL HERO
// One dominant digital gateway as the main object
// ===========================================

// ----------------------------------------
// PORTAL WEBSITE CONTENT
// Premium fictional website inside the portal
// ----------------------------------------

function PortalWebsiteContent({ isDark }: { isDark: boolean }) {
  const colors = {
    bg: isDark ? "#07080a" : "#fefefe",
    chrome: isDark ? "#0c0d10" : "#f8f9fa",
    border: isDark ? "#1a1b20" : "#e8eaed",
    surface: isDark ? "#12131a" : "#f0f2f5",
    surfaceAlt: isDark ? "#0e0f14" : "#f5f7f9",
    text: isDark ? "#fafafa" : "#0a0a0c",
    textMuted: isDark ? "#6a6a74" : "#7a7a84",
    accent: isDark ? "#2a2b35" : "#e0e2e8",
    highlight: isDark ? "rgba(100,120,200,0.15)" : "rgba(80,100,180,0.08)",
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ backgroundColor: colors.bg }}>
      {/* Browser Chrome */}
      <div
        className="h-10 flex items-center px-4 gap-3 shrink-0"
        style={{ backgroundColor: colors.chrome, borderBottom: `1px solid ${colors.border}` }}
      >
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div
          className="flex-1 h-6 rounded-md mx-8 flex items-center justify-center"
          style={{ backgroundColor: isDark ? "#16171c" : "#eceef0" }}
        >
          <span className="text-[10px] font-mono tracking-wider" style={{ color: colors.textMuted }}>
            novastudio.design
          </span>
        </div>
      </div>

      {/* Website Content */}
      <div className="flex-1 overflow-hidden">
        {/* Navigation */}
        <div className="flex items-center justify-between px-12 py-6" style={{ borderBottom: `1px solid ${colors.border}` }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md" style={{ backgroundColor: colors.text }} />
            <span className="text-sm font-semibold tracking-tight" style={{ color: colors.text }}>NOVA</span>
          </div>
          <div className="flex items-center gap-8">
            {["Work", "Services", "Studio", "Contact"].map((item) => (
              <span key={item} className="text-xs tracking-wide" style={{ color: colors.textMuted }}>{item}</span>
            ))}
          </div>
          <div className="px-4 py-1.5 rounded-full text-xs" style={{ backgroundColor: colors.text, color: colors.bg }}>
            Get Started
          </div>
        </div>

        {/* Hero Section */}
        <div className="px-12 py-16">
          <div className="flex gap-16">
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-6">
                <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: colors.textMuted }}>
                  Digital Design Studio
                </span>
              </div>
              <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight mb-6" style={{ color: colors.text }}>
                We craft digital<br />
                experiences that<br />
                <span style={{ color: colors.textMuted }}>inspire.</span>
              </h1>
              <p className="text-sm leading-relaxed mb-8 max-w-md" style={{ color: colors.textMuted }}>
                Award-winning studio specializing in brand identity, web design, and digital products for ambitious companies.
              </p>
              <div className="flex items-center gap-4">
                <div className="px-6 py-3 rounded-full text-sm font-medium" style={{ backgroundColor: colors.text, color: colors.bg }}>
                  View Our Work
                </div>
                <div className="px-6 py-3 rounded-full text-sm font-medium border" style={{ borderColor: colors.border, color: colors.text }}>
                  About Us
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="w-[45%] relative">
              <div 
                className="w-full aspect-[4/3] rounded-2xl overflow-hidden"
                style={{ backgroundColor: colors.surfaceAlt }}
              >
                {/* Abstract visual composition */}
                <div className="w-full h-full relative">
                  <div 
                    className="absolute top-8 left-8 w-32 h-32 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${isDark ? 'rgba(80,100,180,0.3)' : 'rgba(60,80,160,0.15)'}, transparent)` }}
                  />
                  <div 
                    className="absolute bottom-12 right-12 w-48 h-24 rounded-xl"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-2xl rotate-12"
                    style={{ backgroundColor: colors.surface, boxShadow: `0 20px 60px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clients Row */}
        <div className="px-12 py-8" style={{ borderTop: `1px solid ${colors.border}` }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: colors.textMuted }}>
              Trusted by leading brands
            </span>
            <div className="flex items-center gap-12">
              {[60, 72, 56, 64, 68].map((w, i) => (
                <div key={i} className="h-5 rounded opacity-40" style={{ width: w, backgroundColor: colors.textMuted }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------
// HERO COMPONENT
// ----------------------------------------

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Scroll behavior for fullscreen-to-receding effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);
  const yOffset = useTransform(scrollYProgress, [0, 0.5], ["0%", "-2%"]);

  // Staged entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const stages = [1, 2, 3, 4, 5, 6, 7];
      stages.forEach((stage, i) => {
        setTimeout(() => setStageIndex(stage), 200 + i * 250);
      });
    }
  }, [isLoaded]);

  // Mouse move handler
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

  // Transform values for 3D portal effect
  const portalRotateY = useTransform(smoothMouseX, [-1, 1], [8, -8]);
  const portalRotateX = useTransform(smoothMouseY, [-1, 1], [-4, 4]);
  const portalX = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const portalY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  // Secondary elements move more
  const glassRotateY = useTransform(smoothMouseX, [-1, 1], [12, -12]);
  const glassRotateX = useTransform(smoothMouseY, [-1, 1], [-6, 6]);
  const glassX = useTransform(smoothMouseX, [-1, 1], [-25, 25]);
  const glassY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  // Theme colors
  const colors = isDark
    ? {
        bg: "rgb(6, 6, 8)",
        text: "#fafafa",
        textMuted: "#8c8c96",
        border: "#1f2029",
        glow1: "rgba(60, 80, 160, 0.25)",
        glow2: "rgba(100, 60, 140, 0.2)",
        glow3: "rgba(40, 100, 120, 0.15)",
        portalBorder: "rgba(255,255,255,0.08)",
        portalShadow: "0 60px 120px rgba(0,0,0,0.7), 0 20px 60px rgba(60,80,160,0.15)",
        glassBg: "rgba(255,255,255,0.03)",
        glassBorder: "rgba(255,255,255,0.06)",
      }
    : {
        bg: "rgb(252, 252, 253)",
        text: "#0c0c0e",
        textMuted: "#6c6c78",
        border: "#e2e4e8",
        glow1: "rgba(100, 120, 200, 0.15)",
        glow2: "rgba(140, 100, 180, 0.1)",
        glow3: "rgba(80, 140, 160, 0.08)",
        portalBorder: "rgba(0,0,0,0.06)",
        portalShadow: "0 60px 120px rgba(0,0,0,0.15), 0 20px 60px rgba(100,120,200,0.08)",
        glassBg: "rgba(0,0,0,0.02)",
        glassBorder: "rgba(0,0,0,0.04)",
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
              ======================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stageIndex >= 1 ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
            style={{ backgroundColor: colors.bg }}
          >
            {/* Ambient glow orbs */}
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[15%] left-[20%] w-[500px] h-[500px] rounded-full blur-[120px]"
              style={{ background: colors.glow1 }}
            />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full blur-[100px]"
              style={{ background: colors.glow2 }}
            />
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
              style={{ background: colors.glow3 }}
            />

            {/* Subtle grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)'} 1px, transparent 1px)`,
                backgroundSize: "80px 80px",
              }}
            />

            {/* Film grain texture */}
            <div className="absolute inset-0 noise opacity-[0.02]" />

            {/* Vignette */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.08)'} 100%)`,
              }}
            />
          </motion.div>

          {/* ========================================
              LAYER 2: CINEMATIC PORTAL
              ======================================== */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "2000px" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
              animate={{ 
                opacity: stageIndex >= 2 ? 1 : 0,
                scale: stageIndex >= 2 ? 1 : 0.9,
                rotateX: stageIndex >= 2 ? 0 : 15,
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                rotateY: portalRotateY,
                rotateX: portalRotateX,
                x: portalX,
                y: portalY,
                transformStyle: "preserve-3d",
              }}
              className="relative ml-[15%]"
            >
              {/* Portal glow halo */}
              <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-8 rounded-[40px] blur-[60px]"
                style={{ background: colors.glow1 }}
              />
              
              {/* Portal frame */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: "min(900px, 55vw)",
                  aspectRatio: "16/10",
                  border: `1px solid ${colors.portalBorder}`,
                  boxShadow: colors.portalShadow,
                  transform: "translateZ(0)",
                }}
              >
                {/* Portal content - premium website */}
                <PortalWebsiteContent isDark={isDark} />
                
                {/* Light sweep animation */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.15)'}, transparent)`,
                    width: "50%",
                  }}
                />
              </div>

              {/* Portal reflection/shine */}
              <div 
                className="absolute top-0 left-0 right-0 h-[40%] rounded-t-2xl pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.3)'} 0%, transparent 100%)`,
                }}
              />
            </motion.div>

            {/* ========================================
                LAYER 3: GLASS ACCENTS
                ======================================== */}
            {/* Left glass accent */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ 
                opacity: stageIndex >= 3 ? 0.6 : 0,
                x: stageIndex >= 3 ? 0 : -60,
              }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{
                rotateY: glassRotateY,
                rotateX: glassRotateX,
                x: glassX,
                y: glassY,
                transformStyle: "preserve-3d",
              }}
              className="absolute left-[8%] top-[30%] w-48 h-64 rounded-2xl"
            >
              <div 
                className="w-full h-full rounded-2xl"
                style={{
                  background: colors.glassBg,
                  border: `1px solid ${colors.glassBorder}`,
                  backdropFilter: "blur(12px)",
                  boxShadow: `0 20px 50px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)'}`,
                }}
              />
            </motion.div>

            {/* Right glass accent */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ 
                opacity: stageIndex >= 3 ? 0.4 : 0,
                x: stageIndex >= 3 ? 0 : 60,
              }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{
                rotateY: glassRotateY,
                rotateX: glassRotateX,
                x: useTransform(smoothMouseX, [-1, 1], [30, -30]),
                y: useTransform(smoothMouseY, [-1, 1], [20, -20]),
                transformStyle: "preserve-3d",
              }}
              className="absolute right-[5%] bottom-[25%] w-32 h-48 rounded-xl"
            >
              <div 
                className="w-full h-full rounded-xl"
                style={{
                  background: colors.glassBg,
                  border: `1px solid ${colors.glassBorder}`,
                  backdropFilter: "blur(8px)",
                  boxShadow: `0 15px 40px ${isDark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.04)'}`,
                }}
              />
            </motion.div>
          </div>

          {/* ========================================
              LAYER 4: TEXT OVERLAY
              ======================================== */}
          <div className="absolute inset-0 flex items-end pointer-events-none">
            <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 pb-20 lg:pb-28">
              <div className="max-w-2xl">
                {/* Headline */}
                <div className="overflow-hidden mb-6">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: stageIndex >= 4 ? "0%" : "100%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]"
                    style={{ color: colors.text }}
                  >
                    Digital experiences
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-8">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: stageIndex >= 4 ? "0%" : "100%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]"
                    style={{ color: colors.textMuted }}
                  >
                    that captivate.
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: stageIndex >= 5 ? 1 : 0,
                    y: stageIndex >= 5 ? 0 : 20,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
                  style={{ color: colors.textMuted }}
                >
                  We design and build premium websites for brands that refuse to blend in.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: stageIndex >= 6 ? 1 : 0,
                    y: stageIndex >= 6 ? 0 : 20,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex flex-wrap items-center gap-4 pointer-events-auto"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-4 rounded-full text-base font-medium transition-all duration-300 hover:gap-3"
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
                    className="group inline-flex items-center gap-2 px-7 py-4 rounded-full text-base font-medium border transition-all duration-300"
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
                  animate={{ opacity: stageIndex >= 7 ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mt-12 pt-8 border-t"
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                    <span className="text-sm" style={{ color: colors.textMuted }}>
                      50+ Projects Delivered
                    </span>
                    <span className="text-sm" style={{ color: colors.textMuted }}>
                      Awwwards Recognized
                    </span>
                    <span className="text-sm" style={{ color: colors.textMuted }}>
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
            animate={{ opacity: stageIndex >= 7 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
