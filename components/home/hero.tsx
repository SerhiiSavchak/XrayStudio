"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/lib/theme/context";

// ===========================================
// CINEMATIC RESPONSIVE SHOWCASE HERO
// Real device mockups with real website content
// Desktop + Tablet + Mobile in layered composition
// ===========================================

// Real device mockup images from reliable CDN
const DEVICE_FRAMES = {
  // MacBook Pro mockup - dark frame
  macbook: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=90",
  // iPad mockup
  ipad: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=90",
  // iPhone mockup
  iphone: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=90",
};

// Premium website screenshots showing same design system across devices
const WEBSITE_SCREENS = {
  desktop: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=95",
  tablet: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&q=95",
  mobile: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&q=95",
};

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Smooth spring-based mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 40, damping: 25, mass: 1.2 };
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

  // Preload images
  useEffect(() => {
    const images = [
      WEBSITE_SCREENS.desktop,
      WEBSITE_SCREENS.tablet,
      WEBSITE_SCREENS.mobile,
    ];
    let loaded = 0;
    images.forEach(src => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        loaded++;
        if (loaded === images.length) setImagesReady(true);
      };
      img.src = src;
    });
  }, []);

  // Idle drift animation for organic movement
  const [idle, setIdle] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.006;
      setIdle({
        x: Math.sin(t) * 0.12,
        y: Math.cos(t * 0.7) * 0.08,
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Theme-adaptive colors
  const colors = isDark
    ? {
        bg: "#060608",
        surface: "#0c0c0f",
        chrome: "#101014",
        border: "#1a1a20",
        glowPrimary: "rgba(100,120,180,0.2)",
        glowSecondary: "rgba(80,100,160,0.12)",
        vignette: "rgba(6,6,8,0.95)",
      }
    : {
        bg: "#fcfcfd",
        surface: "#ffffff",
        chrome: "#f5f6f8",
        border: "#e4e4e8",
        glowPrimary: "rgba(100,120,180,0.12)",
        glowSecondary: "rgba(80,100,160,0.08)",
        vignette: "rgba(252,252,253,0.9)",
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
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute inset-0"
            style={{ backgroundColor: colors.bg }}
          >
            {/* Primary ambient glow - responds to cursor */}
            <motion.div
              className="absolute w-[140%] h-[140%] -left-[20%] -top-[20%]"
              style={{
                x: useTransform(smoothX, v => v * 30),
                y: useTransform(smoothY, v => v * 20),
                background: `radial-gradient(ellipse 80% 70% at 60% 35%, ${colors.glowPrimary} 0%, transparent 55%)`,
              }}
            />
            {/* Secondary ambient glow */}
            <motion.div
              className="absolute w-[100%] h-[100%]"
              style={{
                x: useTransform(smoothX, v => v * -15),
                y: useTransform(smoothY, v => v * -10),
                background: `radial-gradient(ellipse 60% 50% at 25% 75%, ${colors.glowSecondary} 0%, transparent 50%)`,
              }}
            />
            {/* Subtle grid pattern for depth */}
            <div 
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `
                  linear-gradient(${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px),
                  linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
              }}
            />
          </motion.div>

          {/* ========================================
              LAYER 2: DEVICE SCENE CONTAINER
              Perspective container for 3D depth
              ======================================== */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: "2200px", perspectiveOrigin: "50% 45%" }}
          >
            {/* ----------------------------------------
                DEVICE 1: DESKTOP / LAPTOP (Background - Main Anchor)
                ---------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 100, rotateX: 20, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
              transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                width: "clamp(600px, 55vw, 1000px)",
                height: "clamp(380px, 35vw, 650px)",
                right: "5%",
                top: "8%",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  x: useTransform(smoothX, v => (v + idle.x) * -20),
                  y: useTransform(smoothY, v => (v + idle.y) * -12),
                  rotateY: useTransform(smoothX, v => -10 + (v + idle.x) * 6),
                  rotateX: useTransform(smoothY, v => 3 + (v + idle.y) * 3),
                  transformStyle: "preserve-3d",
                  translateZ: "-100px",
                }}
              >
                {/* Laptop Frame */}
                <div
                  className="w-full h-full rounded-xl overflow-hidden relative"
                  style={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.border}`,
                    boxShadow: `
                      0 60px 120px -20px rgba(0,0,0,${isDark ? 0.5 : 0.15}),
                      0 30px 60px -10px rgba(0,0,0,${isDark ? 0.4 : 0.1}),
                      0 0 0 1px ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'},
                      inset 0 1px 0 ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)'}
                    `,
                  }}
                >
                  {/* Browser Chrome */}
                  <div
                    className="h-9 flex items-center px-4 gap-3"
                    style={{ 
                      backgroundColor: colors.chrome, 
                      borderBottom: `1px solid ${colors.border}` 
                    }}
                  >
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div
                      className="flex-1 h-6 rounded-md mx-12 flex items-center justify-center"
                      style={{ backgroundColor: isDark ? "#18181c" : "#e8eaed" }}
                    >
                      <span className="text-[10px] text-[rgb(var(--muted-foreground))] font-mono tracking-wide">
                        luxurystudio.design
                      </span>
                    </div>
                  </div>
                  {/* Website Screen Content */}
                  <div className="relative h-[calc(100%-2.25rem)] overflow-hidden bg-[#0a0a0c]">
                    <motion.div
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={imagesReady ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={WEBSITE_SCREENS.desktop}
                        alt="Premium website - desktop view"
                        fill
                        className="object-cover object-top"
                        priority
                      />
                    </motion.div>
                    {/* Reflection sweep animation */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ 
                        backgroundPosition: ["200% 0", "-200% 0"],
                      }}
                      transition={{ 
                        duration: 8, 
                        ease: "linear", 
                        repeat: Infinity,
                        repeatDelay: 4,
                      }}
                      style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 48%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 52%, transparent 60%)",
                        backgroundSize: "200% 100%",
                      }}
                    />
                  </div>
                  {/* Device glow */}
                  <div 
                    className="absolute -inset-px rounded-xl pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)'} 0%, transparent 50%)`,
                      opacity: 0.5,
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* ----------------------------------------
                DEVICE 2: TABLET (Mid-depth)
                ---------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 80, rotateX: 15, scale: 0.85 }}
              animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
              transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                width: "clamp(200px, 18vw, 280px)",
                height: "clamp(280px, 26vw, 380px)",
                left: "12%",
                bottom: "12%",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  x: useTransform(smoothX, v => (v + idle.x) * -40),
                  y: useTransform(smoothY, v => (v + idle.y) * -25),
                  rotateY: useTransform(smoothX, v => 12 + (v + idle.x) * 10),
                  rotateX: useTransform(smoothY, v => -4 + (v + idle.y) * 5),
                  transformStyle: "preserve-3d",
                  translateZ: "80px",
                }}
              >
                {/* Tablet Frame */}
                <div
                  className="w-full h-full rounded-[1.8rem] overflow-hidden p-3 relative"
                  style={{
                    backgroundColor: isDark ? "#0f0f12" : "#f0f0f2",
                    border: `1px solid ${colors.border}`,
                    boxShadow: `
                      0 40px 80px -15px rgba(0,0,0,${isDark ? 0.45 : 0.12}),
                      0 20px 40px -10px rgba(0,0,0,${isDark ? 0.35 : 0.08}),
                      inset 0 1px 0 ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.95)'}
                    `,
                  }}
                >
                  {/* Screen */}
                  <div className="w-full h-full rounded-[1.3rem] overflow-hidden relative bg-[#0a0a0c]">
                    <motion.div
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={imagesReady ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 1.4, delay: 1.1 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={WEBSITE_SCREENS.tablet}
                        alt="Premium website - tablet view"
                        fill
                        className="object-cover object-top"
                      />
                    </motion.div>
                  </div>
                  {/* Frame highlight */}
                  <div 
                    className="absolute inset-0 rounded-[1.8rem] pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)'} 0%, transparent 40%)`,
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* ----------------------------------------
                DEVICE 3: MOBILE (Foreground - Closest)
                ---------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 12, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
              transition={{ duration: 1.4, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                width: "clamp(130px, 11vw, 170px)",
                height: "clamp(270px, 24vw, 360px)",
                left: "32%",
                bottom: "8%",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  x: useTransform(smoothX, v => (v + idle.x) * -65),
                  y: useTransform(smoothY, v => (v + idle.y) * -40),
                  rotateY: useTransform(smoothX, v => 18 + (v + idle.x) * 14),
                  rotateX: useTransform(smoothY, v => -2 + (v + idle.y) * 6),
                  transformStyle: "preserve-3d",
                  translateZ: "200px",
                }}
              >
                {/* Phone Frame */}
                <div
                  className="w-full h-full rounded-[2.5rem] overflow-hidden p-2 relative"
                  style={{
                    backgroundColor: isDark ? "#0a0a0d" : "#e8e8ec",
                    border: `1px solid ${colors.border}`,
                    boxShadow: `
                      0 50px 100px -20px rgba(0,0,0,${isDark ? 0.5 : 0.15}),
                      0 25px 50px -10px rgba(0,0,0,${isDark ? 0.4 : 0.1}),
                      inset 0 1px 0 ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.98)'}
                    `,
                  }}
                >
                  {/* Screen */}
                  <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-[#0a0a0c]">
                    <motion.div
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={imagesReady ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 1.3, delay: 1.4 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={WEBSITE_SCREENS.mobile}
                        alt="Premium website - mobile view"
                        fill
                        className="object-cover object-top"
                      />
                    </motion.div>
                    {/* Dynamic Island */}
                    <div
                      className="absolute top-3 left-1/2 -translate-x-1/2 w-[4.5rem] h-[1.4rem] rounded-full z-10"
                      style={{ backgroundColor: "#000" }}
                    />
                  </div>
                  {/* Frame highlight */}
                  <div 
                    className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.7)'} 0%, transparent 35%)`,
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* ----------------------------------------
                FOREGROUND GLASS ACCENT
                ---------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                width: "clamp(150px, 12vw, 200px)",
                height: "clamp(280px, 25vw, 380px)",
                right: "-3%",
                top: "25%",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  x: useTransform(smoothX, v => (v + idle.x) * -85),
                  y: useTransform(smoothY, v => (v + idle.y) * -50),
                  rotateY: useTransform(smoothX, v => -22 + (v + idle.x) * 18),
                  rotateX: useTransform(smoothY, v => 4 + (v + idle.y) * 8),
                  transformStyle: "preserve-3d",
                  translateZ: "320px",
                }}
              >
                <div
                  className="w-full h-full rounded-2xl overflow-hidden"
                  style={{
                    background: isDark
                      ? "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)"
                      : "linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 100%)",
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}`,
                    boxShadow: `0 30px 80px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`,
                  }}
                >
                  {/* Animated light sweep */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ 
                      backgroundPosition: ["0% 0%", "200% 200%"],
                    }}
                    transition={{ 
                      duration: 12, 
                      ease: "linear", 
                      repeat: Infinity,
                    }}
                    style={{
                      background: "linear-gradient(135deg, transparent 0%, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%, transparent 100%)",
                      backgroundSize: "200% 200%",
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ========================================
              LAYER 3: ATMOSPHERIC OVERLAYS
              ======================================== */}
          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDark
                ? "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 0%, rgba(6,6,8,0.2) 40%, rgba(6,6,8,0.85) 100%)"
                : "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 0%, rgba(252,252,253,0.15) 40%, rgba(252,252,253,0.8) 100%)",
            }}
          />

          {/* Bottom gradient for text legibility */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to top, rgba(6,6,8,1) 0%, rgba(6,6,8,0.95) 25%, rgba(6,6,8,0.5) 55%, transparent 100%)"
                : "linear-gradient(to top, rgba(252,252,253,1) 0%, rgba(252,252,253,0.95) 25%, rgba(252,252,253,0.5) 55%, transparent 100%)",
            }}
          />

          {/* Film grain texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: isDark ? 0.018 : 0.008,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* ========================================
              LAYER 4: TEXT OVERLAY CONTENT
              Using font-display (Syne) for headlines
              ======================================== */}
          <div className="absolute inset-0 flex items-end pb-16 md:pb-20 lg:pb-24">
            <div className="container-wide">
              <div className="max-w-2xl">
                {/* Headline - Line 1 */}
                <div className="overflow-hidden mb-3">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={isLoaded ? { y: "0%" } : {}}
                    transition={{ duration: 1.3, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]"
                  >
                    Premium Websites
                  </motion.h1>
                </div>
                {/* Headline - Line 2 */}
                <div className="overflow-hidden mb-8">
                  <motion.h2
                    initial={{ y: "110%" }}
                    animate={isLoaded ? { y: "0%" } : {}}
                    transition={{ duration: 1.3, delay: 1.75, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[rgb(var(--muted-foreground))]"
                  >
                    That Convert
                  </motion.h2>
                </div>

                {/* Supporting paragraph */}
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-base md:text-lg text-[rgb(var(--muted-foreground))] leading-relaxed max-w-md mb-10"
                >
                  Strategy-driven design and development for experts, 
                  personal brands, and service businesses ready to scale.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap gap-4 mb-10"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-full font-medium text-sm transition-all hover:gap-3"
                  >
                    Start a Project
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[rgb(var(--border))] rounded-full font-medium text-sm transition-all hover:bg-[rgb(var(--surface-2))]"
                  >
                    View Work
                  </Link>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 2.5 }}
                  className="flex flex-wrap items-center gap-6 text-sm text-[rgb(var(--muted-foreground))]"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[rgb(var(--success))]" />
                    50+ Projects Delivered
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[rgb(var(--success))]" />
                    100% Client Satisfaction
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
