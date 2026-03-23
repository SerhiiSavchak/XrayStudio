"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/lib/theme/context";

// ===========================================
// CINEMATIC RESPONSIVE SHOWCASE HERO
// Desktop Monitor + Tablet + Mobile in depth lineup
// Same premium website across all devices
// ===========================================

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Smooth spring-based mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 50, damping: 30, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Scroll behavior for fullscreen-to-receding effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);
  const yOffset = useTransform(scrollYProgress, [0, 0.5], ["0%", "-2%"]);

  // Mouse tracking handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Staged load sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Idle drift animation
  const [idle, setIdle] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.005;
      setIdle({
        x: Math.sin(t) * 0.1,
        y: Math.cos(t * 0.8) * 0.06,
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Theme-adaptive colors
  const colors = isDark
    ? {
        bg: "#08090c",
        surface: "#0e0f14",
        chrome: "#131419",
        border: "#1f2029",
        text: "#fafafa",
        textMuted: "#8c8c96",
        glowPrimary: "rgba(100,140,220,0.15)",
        glowSecondary: "rgba(80,120,200,0.08)",
        glowAccent: "rgba(140,160,255,0.06)",
        screenBg: "#0a0b0e",
      }
    : {
        bg: "#fafbfc",
        surface: "#ffffff",
        chrome: "#f5f6f8",
        border: "#e2e4e8",
        text: "#0c0c0e",
        textMuted: "#6c6c78",
        glowPrimary: "rgba(80,100,160,0.08)",
        glowSecondary: "rgba(60,80,140,0.05)",
        glowAccent: "rgba(100,120,200,0.04)",
        screenBg: "#fefefe",
      };

  return (
    <section ref={containerRef} className="relative" style={{ height: "200vh", backgroundColor: colors.bg }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale, y: yOffset, borderRadius }}
          className="relative h-full w-full overflow-hidden origin-center"
        >
          {/* ========================================
              LAYER 1: RICH ATMOSPHERIC BACKGROUND
              ======================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
            style={{ backgroundColor: colors.bg }}
          >
            {/* Primary ambient glow - top right */}
            <motion.div
              className="absolute w-[120%] h-[120%] -right-[10%] -top-[20%]"
              style={{
                x: useTransform(smoothX, v => v * 25),
                y: useTransform(smoothY, v => v * 15),
                background: `radial-gradient(ellipse 70% 60% at 70% 30%, ${colors.glowPrimary} 0%, transparent 60%)`,
              }}
            />
            {/* Secondary glow - left side */}
            <motion.div
              className="absolute w-[80%] h-[100%] -left-[10%] top-[10%]"
              style={{
                x: useTransform(smoothX, v => v * -15),
                y: useTransform(smoothY, v => v * -10),
                background: `radial-gradient(ellipse 50% 70% at 20% 60%, ${colors.glowSecondary} 0%, transparent 55%)`,
              }}
            />
            {/* Bottom accent glow */}
            <motion.div
              className="absolute w-[100%] h-[60%] bottom-0"
              style={{
                background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${colors.glowAccent} 0%, transparent 70%)`,
              }}
            />
            
            {/* Subtle grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                  linear-gradient(${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px),
                  linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}
            />

            {/* Layout grid hints - web design detail */}
            <div className="absolute inset-x-0 top-0 h-full flex justify-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoaded ? 0.02 : 0 }}
                  transition={{ duration: 1.5, delay: 1.5 + i * 0.1 }}
                  className="w-px h-full"
                  style={{
                    marginLeft: i === 0 ? 0 : '18vw',
                    background: `linear-gradient(to bottom, transparent, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 30%, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 70%, transparent)`,
                  }}
                />
              ))}
            </div>

            {/* Floating UI element hints */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 0.4 : 0, y: 0 }}
              transition={{ duration: 1.2, delay: 2 }}
              className="absolute left-[8%] top-[18%] flex items-center gap-2"
              style={{
                x: useTransform(smoothX, v => v * 8),
                y: useTransform(smoothY, v => v * 5),
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isDark ? 'rgba(100,200,150,0.6)' : 'rgba(34,197,94,0.6)' }} />
              <span className="text-[10px] font-mono tracking-wider" style={{ color: colors.textMuted }}>responsive.css</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 0.35 : 0, y: 0 }}
              transition={{ duration: 1.2, delay: 2.2 }}
              className="absolute right-[6%] bottom-[28%] px-3 py-1.5 rounded-full border"
              style={{
                x: useTransform(smoothX, v => v * -12),
                y: useTransform(smoothY, v => v * -8),
                borderColor: colors.border,
                backgroundColor: isDark ? 'rgba(14,15,20,0.7)' : 'rgba(255,255,255,0.7)',
              }}
            >
              <span className="text-[9px] font-mono tracking-wide" style={{ color: colors.textMuted }}>breakpoint: xl</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 0.25 : 0 }}
              transition={{ duration: 1.5, delay: 2.4 }}
              className="absolute left-[5%] bottom-[35%] flex flex-col gap-1"
              style={{
                x: useTransform(smoothX, v => v * 6),
                y: useTransform(smoothY, v => v * 4),
              }}
            >
              {[48, 36, 28].map((w, i) => (
                <div key={i} className="h-[3px] rounded-full" style={{ width: `${w}px`, backgroundColor: colors.border }} />
              ))}
            </motion.div>
          </motion.div>

          {/* ========================================
              LAYER 2: DEVICE SCENE - DEPTH LINEUP
              Desktop monitor (back) → Tablet → Mobile (front)
              ======================================== */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: "2500px", perspectiveOrigin: "45% 50%" }}
          >
            {/* ----------------------------------------
                DEVICE 1: DESKTOP MONITOR (Back - Largest)
                Clean modern monitor design, no laptop
                ---------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.9, rotateY: -15 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                width: "clamp(550px, 48vw, 850px)",
                height: "clamp(340px, 30vw, 520px)",
                right: "8%",
                top: "12%",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  x: useTransform(smoothX, v => (v + idle.x) * -15),
                  y: useTransform(smoothY, v => (v + idle.y) * -10),
                  rotateY: useTransform(smoothX, v => -12 + (v + idle.x) * 5),
                  rotateX: useTransform(smoothY, v => 2 + (v + idle.y) * 2),
                  transformStyle: "preserve-3d",
                  translateZ: "-80px",
                }}
              >
                {/* Monitor Frame - Clean and Modern */}
                <div
                  className="w-full h-full flex flex-col"
                  style={{
                    backgroundColor: isDark ? "#0c0d10" : "#f8f9fa",
                  }}
                >
                  {/* Screen Bezel */}
                  <div
                    className="flex-1 m-2 rounded-lg overflow-hidden relative"
                    style={{
                      backgroundColor: colors.surface,
                      border: `1px solid ${colors.border}`,
                      boxShadow: `
                        0 50px 100px -20px rgba(0,0,0,${isDark ? 0.5 : 0.12}),
                        0 25px 50px -10px rgba(0,0,0,${isDark ? 0.35 : 0.08}),
                        inset 0 1px 0 ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)'}
                      `,
                    }}
                  >
                    {/* Browser Chrome */}
                    <div
                      className="h-8 flex items-center px-3 gap-2"
                      style={{ 
                        backgroundColor: colors.chrome, 
                        borderBottom: `1px solid ${colors.border}` 
                      }}
                    >
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <div
                        className="flex-1 h-5 rounded mx-8 flex items-center justify-center"
                        style={{ backgroundColor: isDark ? "#1a1b20" : "#e8eaed" }}
                      >
                        <span className="text-[9px] font-mono tracking-wider" style={{ color: colors.textMuted }}>
                          aurora.studio
                        </span>
                      </div>
                    </div>

                    {/* Premium Website Content - Desktop Version */}
                    <div className="relative h-[calc(100%-2rem)] overflow-hidden" style={{ backgroundColor: colors.screenBg }}>
                      {/* Hero section of fictional site */}
                      <div className="h-full p-8 flex flex-col">
                        {/* Nav bar */}
                        <div className="flex items-center justify-between mb-12">
                          <div className="w-20 h-5 rounded" style={{ backgroundColor: isDark ? '#1a1b20' : '#e4e6ea' }} />
                          <div className="flex gap-6">
                            {[40, 32, 36, 44].map((w, i) => (
                              <div key={i} className="h-3 rounded" style={{ width: w, backgroundColor: isDark ? '#1a1b20' : '#e4e6ea' }} />
                            ))}
                          </div>
                          <div className="w-20 h-7 rounded-full" style={{ backgroundColor: isDark ? '#fafafa' : '#0c0c0e' }} />
                        </div>

                        {/* Main content area */}
                        <div className="flex-1 flex gap-12">
                          {/* Left - Typography */}
                          <div className="flex-1 flex flex-col justify-center">
                            <div className="space-y-3 mb-6">
                              <div className="h-10 w-[85%] rounded" style={{ backgroundColor: isDark ? '#1f2026' : '#e0e2e6' }} />
                              <div className="h-10 w-[70%] rounded" style={{ backgroundColor: isDark ? '#1f2026' : '#e0e2e6' }} />
                            </div>
                            <div className="space-y-2 mb-8">
                              <div className="h-3 w-[90%] rounded" style={{ backgroundColor: isDark ? '#16171c' : '#eceef0' }} />
                              <div className="h-3 w-[75%] rounded" style={{ backgroundColor: isDark ? '#16171c' : '#eceef0' }} />
                            </div>
                            <div className="flex gap-3">
                              <div className="w-28 h-9 rounded-full" style={{ backgroundColor: isDark ? '#fafafa' : '#0c0c0e' }} />
                              <div className="w-24 h-9 rounded-full border" style={{ borderColor: colors.border }} />
                            </div>
                          </div>

                          {/* Right - Visual */}
                          <div className="w-[45%] rounded-xl relative overflow-hidden" style={{ backgroundColor: isDark ? '#12131a' : '#f0f2f4' }}>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div 
                                className="w-[70%] h-[60%] rounded-lg"
                                style={{ 
                                  background: `linear-gradient(135deg, ${isDark ? 'rgba(100,140,220,0.2)' : 'rgba(80,100,160,0.15)'} 0%, ${isDark ? 'rgba(140,100,200,0.15)' : 'rgba(120,80,180,0.1)'} 100%)`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Screen reflection */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatDelay: 5 }}
                        style={{
                          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.02) 48%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 52%, transparent 60%)",
                          backgroundSize: "200% 100%",
                        }}
                      />
                    </div>
                  </div>

                  {/* Monitor Stand */}
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-16 h-6" 
                      style={{ 
                        backgroundColor: isDark ? '#0c0d10' : '#e8eaec',
                        borderRadius: '2px 2px 0 0',
                      }} 
                    />
                    <div 
                      className="w-32 h-2 rounded-full" 
                      style={{ backgroundColor: isDark ? '#0c0d10' : '#e8eaec' }} 
                    />
                  </div>
                </div>

                {/* Device glow */}
                <div 
                  className="absolute -inset-4 rounded-2xl pointer-events-none -z-10"
                  style={{
                    background: `radial-gradient(ellipse at 50% 30%, ${colors.glowPrimary} 0%, transparent 60%)`,
                  }}
                />
              </motion.div>
            </motion.div>

            {/* ----------------------------------------
                DEVICE 2: TABLET (Mid-depth)
                ---------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.85, rotateY: 10 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                width: "clamp(180px, 15vw, 240px)",
                height: "clamp(250px, 22vw, 330px)",
                left: "18%",
                bottom: "18%",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  x: useTransform(smoothX, v => (v + idle.x) * -35),
                  y: useTransform(smoothY, v => (v + idle.y) * -22),
                  rotateY: useTransform(smoothX, v => 15 + (v + idle.x) * 8),
                  rotateX: useTransform(smoothY, v => -3 + (v + idle.y) * 4),
                  transformStyle: "preserve-3d",
                  translateZ: "60px",
                }}
              >
                {/* Tablet Frame */}
                <div
                  className="w-full h-full rounded-[1.5rem] overflow-hidden p-2.5 relative"
                  style={{
                    backgroundColor: isDark ? "#101114" : "#f2f3f5",
                    border: `1px solid ${colors.border}`,
                    boxShadow: `
                      0 35px 70px -15px rgba(0,0,0,${isDark ? 0.4 : 0.1}),
                      0 20px 40px -10px rgba(0,0,0,${isDark ? 0.3 : 0.06}),
                      inset 0 1px 0 ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.95)'}
                    `,
                  }}
                >
                  {/* Screen */}
                  <div className="w-full h-full rounded-[1.1rem] overflow-hidden relative" style={{ backgroundColor: colors.screenBg }}>
                    {/* Same website - Tablet version */}
                    <div className="h-full p-5 flex flex-col">
                      {/* Nav */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-4 rounded" style={{ backgroundColor: isDark ? '#1a1b20' : '#e4e6ea' }} />
                        <div className="w-6 h-4 flex flex-col gap-1">
                          <div className="h-0.5 rounded-full" style={{ backgroundColor: isDark ? '#3a3b42' : '#c4c6ca' }} />
                          <div className="h-0.5 rounded-full" style={{ backgroundColor: isDark ? '#3a3b42' : '#c4c6ca' }} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="space-y-2 mb-4">
                          <div className="h-6 w-[90%] rounded" style={{ backgroundColor: isDark ? '#1f2026' : '#e0e2e6' }} />
                          <div className="h-6 w-[70%] rounded" style={{ backgroundColor: isDark ? '#1f2026' : '#e0e2e6' }} />
                        </div>
                        <div className="space-y-1.5 mb-5">
                          <div className="h-2 w-[95%] rounded" style={{ backgroundColor: isDark ? '#16171c' : '#eceef0' }} />
                          <div className="h-2 w-[80%] rounded" style={{ backgroundColor: isDark ? '#16171c' : '#eceef0' }} />
                        </div>
                        <div className="w-20 h-7 rounded-full" style={{ backgroundColor: isDark ? '#fafafa' : '#0c0c0e' }} />
                      </div>

                      {/* Visual block */}
                      <div 
                        className="h-24 rounded-lg mt-4"
                        style={{ backgroundColor: isDark ? '#12131a' : '#f0f2f4' }}
                      />
                    </div>
                  </div>

                  {/* Frame highlight */}
                  <div 
                    className="absolute inset-0 rounded-[1.5rem] pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)'} 0%, transparent 40%)`,
                    }}
                  />
                </div>

                {/* Device glow */}
                <div 
                  className="absolute -inset-3 rounded-3xl pointer-events-none -z-10"
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, ${colors.glowSecondary} 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            </motion.div>

            {/* ----------------------------------------
                DEVICE 3: MOBILE (Front - Closest)
                ---------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8, rotateY: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 1.4, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                width: "clamp(110px, 9vw, 145px)",
                height: "clamp(230px, 20vw, 305px)",
                left: "35%",
                bottom: "10%",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  x: useTransform(smoothX, v => (v + idle.x) * -55),
                  y: useTransform(smoothY, v => (v + idle.y) * -35),
                  rotateY: useTransform(smoothX, v => 20 + (v + idle.x) * 12),
                  rotateX: useTransform(smoothY, v => -2 + (v + idle.y) * 5),
                  transformStyle: "preserve-3d",
                  translateZ: "180px",
                }}
              >
                {/* Phone Frame */}
                <div
                  className="w-full h-full rounded-[2rem] overflow-hidden p-1.5 relative"
                  style={{
                    backgroundColor: isDark ? "#0a0b0e" : "#e8eaec",
                    border: `1px solid ${colors.border}`,
                    boxShadow: `
                      0 40px 80px -15px rgba(0,0,0,${isDark ? 0.45 : 0.12}),
                      0 20px 40px -10px rgba(0,0,0,${isDark ? 0.35 : 0.08}),
                      inset 0 1px 0 ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.98)'}
                    `,
                  }}
                >
                  {/* Screen */}
                  <div className="w-full h-full rounded-[1.7rem] overflow-hidden relative" style={{ backgroundColor: colors.screenBg }}>
                    {/* Dynamic Island */}
                    <div
                      className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-full z-10"
                      style={{ backgroundColor: "#000" }}
                    />

                    {/* Same website - Mobile version */}
                    <div className="h-full pt-10 px-3 pb-4 flex flex-col">
                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="space-y-1.5 mb-3">
                          <div className="h-5 w-[95%] rounded" style={{ backgroundColor: isDark ? '#1f2026' : '#e0e2e6' }} />
                          <div className="h-5 w-[75%] rounded" style={{ backgroundColor: isDark ? '#1f2026' : '#e0e2e6' }} />
                        </div>
                        <div className="space-y-1 mb-4">
                          <div className="h-1.5 w-[90%] rounded" style={{ backgroundColor: isDark ? '#16171c' : '#eceef0' }} />
                          <div className="h-1.5 w-[70%] rounded" style={{ backgroundColor: isDark ? '#16171c' : '#eceef0' }} />
                        </div>
                        <div className="w-full h-6 rounded-full" style={{ backgroundColor: isDark ? '#fafafa' : '#0c0c0e' }} />
                      </div>

                      {/* Visual block */}
                      <div 
                        className="h-20 rounded-lg"
                        style={{ backgroundColor: isDark ? '#12131a' : '#f0f2f4' }}
                      />

                      {/* Home indicator */}
                      <div className="mt-3 flex justify-center">
                        <div className="w-24 h-1 rounded-full" style={{ backgroundColor: isDark ? '#2a2b32' : '#c4c6ca' }} />
                      </div>
                    </div>
                  </div>

                  {/* Frame highlight */}
                  <div 
                    className="absolute inset-0 rounded-[2rem] pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)'} 0%, transparent 35%)`,
                    }}
                  />
                </div>

                {/* Device glow */}
                <div 
                  className="absolute -inset-4 rounded-[2.5rem] pointer-events-none -z-10"
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, ${colors.glowSecondary} 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* ========================================
              LAYER 3: TYPOGRAPHY & CTA
              ======================================== */}
          <div className="absolute inset-0 flex items-end pb-20 lg:pb-24">
            <div className="container-wide w-full">
              <div className="max-w-2xl">
                {/* Overline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="w-8 h-px" style={{ backgroundColor: colors.textMuted }} />
                  <span 
                    className="text-xs font-medium tracking-[0.2em] uppercase"
                    style={{ color: colors.textMuted }}
                  >
                    Digital Product Studio
                  </span>
                </motion.div>

                {/* Main headline */}
                <div className="space-y-1 mb-6">
                  {["Crafting Premium", "Digital Experiences"].map((line, i) => (
                    <div key={i} className="overflow-hidden">
                      <motion.h1
                        initial={{ y: "100%" }}
                        animate={isLoaded ? { y: 0 } : {}}
                        transition={{ duration: 0.9, delay: 1.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight"
                        style={{ color: colors.text, lineHeight: 1.05 }}
                      >
                        {line}
                      </motion.h1>
                    </div>
                  ))}
                </div>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.8 }}
                  className="text-base md:text-lg mb-8 max-w-md"
                  style={{ color: colors.textMuted, lineHeight: 1.6 }}
                >
                  Strategy, design, and development for brands that demand excellence.
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 2 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
                    style={{
                      backgroundColor: isDark ? colors.text : '#0c0c0e',
                      color: isDark ? colors.bg : '#fafafa',
                    }}
                  >
                    Start a Project
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 hover:bg-[rgb(var(--surface-1))]"
                    style={{
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  >
                    View Work
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Vignette overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, ${colors.bg} 100%)`,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
