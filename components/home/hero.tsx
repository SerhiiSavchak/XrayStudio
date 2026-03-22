"use client";

import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/lib/theme/context";

// ===========================================
// CINEMATIC HERO WITH REAL PREMIUM MEDIA
// Premium web development studio opening scene
// Uses actual videos/images instead of empty 3D panels
// ===========================================

// Premium website video sources - curated dark/luxury UI footage
const MEDIA_SOURCES = {
  // Main desktop screen - premium website scroll video
  mainDesktop: "https://videos.pexels.com/video-files/5475772/5475772-uhd_2560_1440_30fps.mp4",
  // Mobile preview - premium app/web interface video  
  mobile: "https://videos.pexels.com/video-files/6804117/6804117-uhd_1440_2560_25fps.mp4",
  // Background atmosphere - abstract digital/tech
  background: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
};

// Staggered reveal animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const objectVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    y: 40,
  },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.4,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const textRevealVariants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 1.2,
      delay: 1.2 + i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 1.8 + i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Video player component with loading state
function VideoPanel({ 
  src, 
  className,
  poster,
}: { 
  src: string; 
  className?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.75; // Slow for cinematic feel
      const handleLoaded = () => setIsLoaded(true);
      video.addEventListener("loadeddata", handleLoaded);
      return () => video.removeEventListener("loadeddata", handleLoaded);
    }
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven transforms - hero recedes on scroll
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const heroBorderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 28]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-2%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.45], [1, 0]);
  const sceneOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0.6]);

  // Mouse tracking for 3D parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Theme-aware colors
  const colors = isDark
    ? {
        bg: "#060608",
        surface: "#0a0a0c",
        surfaceLight: "#111115",
        border: "#1a1a20",
        glow: "rgba(100, 120, 180, 0.15)",
        glowStrong: "rgba(120, 140, 200, 0.25)",
      }
    : {
        bg: "#f8f9fb",
        surface: "#ffffff",
        surfaceLight: "#f0f2f5",
        border: "#e0e2e8",
        glow: "rgba(100, 120, 180, 0.1)",
        glowStrong: "rgba(80, 100, 160, 0.15)",
      };

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "200vh", backgroundColor: colors.bg }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Hero frame that scales and gains border radius on scroll */}
        <motion.div
          style={{
            scale: heroScale,
            y: heroY,
            borderRadius: heroBorderRadius,
          }}
          className="relative h-full w-full overflow-hidden origin-center"
        >
          {/* ============================================
              LAYER 1: ATMOSPHERIC BACKGROUND
              ============================================ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 2, delay: 0.1 }}
            className="absolute inset-0"
            style={{ backgroundColor: colors.bg }}
          >
            {/* Background video - abstract tech/digital atmosphere */}
            <div className="absolute inset-0 opacity-30">
              <VideoPanel 
                src={MEDIA_SOURCES.background}
                className="w-full h-full"
              />
            </div>
            
            {/* Breathing ambient light */}
            <div 
              className="absolute w-[120vw] h-[120vh] -top-[10vh] -left-[10vw] animate-breathe"
              style={{
                background: isDark
                  ? "radial-gradient(ellipse 50% 40% at 30% 50%, rgba(60,80,140,0.12) 0%, transparent 70%)"
                  : "radial-gradient(ellipse 50% 40% at 30% 50%, rgba(100,120,180,0.08) 0%, transparent 70%)",
              }}
            />
            <div 
              className="absolute w-[100vw] h-[100vh] top-0 right-0 animate-pulse-slow"
              style={{
                background: isDark
                  ? "radial-gradient(ellipse 40% 50% at 80% 30%, rgba(80,100,160,0.08) 0%, transparent 60%)"
                  : "radial-gradient(ellipse 40% 50% at 80% 30%, rgba(120,140,200,0.06) 0%, transparent 60%)",
                animationDelay: "2s",
              }}
            />
            
            {/* Subtle grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `linear-gradient(${isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"} 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </motion.div>

          {/* ============================================
              LAYER 2: 3D MEDIA SCENE
              5 Objects with real premium content
              ============================================ */}
          <motion.div
            style={{ opacity: sceneOpacity }}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={containerVariants}
            className="absolute inset-0 perspective-[2000px] preserve-3d"
          >
            {/* OBJECT 3: Deep Background Panel - atmospheric depth */}
            <motion.div
              custom={0}
              variants={objectVariants}
              className="absolute w-[70vw] h-[60vh] max-w-[1200px]"
              style={{
                top: "15%",
                right: "-10%",
                transform: `
                  translateZ(-400px)
                  rotateY(${-8 + mousePosition.x * 1}deg)
                  rotateX(${mousePosition.y * 0.5}deg)
                  translateX(${mousePosition.x * -15}px)
                  translateY(${mousePosition.y * -10}px)
                `,
                transformStyle: "preserve-3d",
              }}
            >
              <div 
                className="w-full h-full rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  boxShadow: `0 0 120px ${colors.glow}`,
                }}
              >
                <VideoPanel 
                  src={MEDIA_SOURCES.background}
                  className="w-full h-full opacity-40 blur-sm"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: isDark
                      ? "linear-gradient(135deg, rgba(6,6,8,0.7) 0%, rgba(6,6,8,0.4) 100%)"
                      : "linear-gradient(135deg, rgba(248,249,251,0.7) 0%, rgba(248,249,251,0.4) 100%)",
                  }}
                />
              </div>
            </motion.div>

            {/* OBJECT 1: Main Desktop Screen - dominant focal point */}
            <motion.div
              custom={0.2}
              variants={objectVariants}
              className="absolute w-[55vw] h-[70vh] max-w-[900px] max-h-[600px]"
              style={{
                top: "12%",
                right: "8%",
                transform: `
                  translateZ(-100px)
                  rotateY(${-12 + mousePosition.x * 2}deg)
                  rotateX(${2 + mousePosition.y * 1}deg)
                  translateX(${mousePosition.x * -25}px)
                  translateY(${mousePosition.y * -15}px)
                `,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Browser frame */}
              <div 
                className="w-full h-full rounded-xl overflow-hidden"
                style={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  boxShadow: `
                    0 25px 80px ${colors.glowStrong},
                    0 0 0 1px ${isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"},
                    inset 0 1px 0 ${isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)"}
                  `,
                }}
              >
                {/* Browser chrome */}
                <div 
                  className="h-10 flex items-center px-4 gap-2"
                  style={{ 
                    backgroundColor: isDark ? "#0c0c0f" : "#f5f6f8",
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  {/* Traffic lights */}
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  {/* URL bar */}
                  <div 
                    className="flex-1 h-6 rounded-md mx-8 flex items-center justify-center"
                    style={{ backgroundColor: isDark ? "#15151a" : "#e8eaed" }}
                  >
                    <span className="text-[10px] text-[rgb(var(--muted-foreground))] font-mono">
                      xraystudio.dev
                    </span>
                  </div>
                </div>
                
                {/* Screen content - premium website video */}
                <div className="relative h-[calc(100%-2.5rem)] overflow-hidden">
                  <VideoPanel 
                    src={MEDIA_SOURCES.mainDesktop}
                    className="w-full h-full"
                  />
                  {/* Subtle reflection sweep */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
                      animation: "shimmer 8s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* OBJECT 2: Mobile Preview Panel - responsive showcase */}
            <motion.div
              custom={0.35}
              variants={objectVariants}
              className="absolute w-[15vw] h-[55vh] max-w-[220px] max-h-[480px] min-w-[160px]"
              style={{
                bottom: "10%",
                right: "25%",
                transform: `
                  translateZ(50px)
                  rotateY(${8 + mousePosition.x * 3}deg)
                  rotateX(${-2 + mousePosition.y * 1.5}deg)
                  translateX(${mousePosition.x * -35}px)
                  translateY(${mousePosition.y * -20}px)
                `,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Phone frame */}
              <div 
                className="w-full h-full rounded-[2rem] overflow-hidden"
                style={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                  boxShadow: `
                    0 30px 100px ${colors.glowStrong},
                    0 0 0 1px ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"},
                    inset 0 1px 0 ${isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)"}
                  `,
                  padding: "8px",
                }}
              >
                {/* Inner screen */}
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                  <VideoPanel 
                    src={MEDIA_SOURCES.mobile}
                    className="w-full h-full"
                  />
                  {/* Status bar overlay */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center"
                    style={{
                      background: isDark
                        ? "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)"
                        : "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, transparent 100%)",
                    }}
                  >
                    <div 
                      className="w-20 h-5 rounded-full"
                      style={{ backgroundColor: isDark ? "#000" : "#1a1a1a" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* OBJECT 4: Foreground Glass Layer - cinematic accent */}
            <motion.div
              custom={0.5}
              variants={objectVariants}
              className="absolute w-[20vw] h-[50vh] max-w-[300px]"
              style={{
                top: "20%",
                right: "-5%",
                transform: `
                  translateZ(150px)
                  rotateY(${-25 + mousePosition.x * 4}deg)
                  rotateX(${5 + mousePosition.y * 2}deg)
                  translateX(${mousePosition.x * -45}px)
                  translateY(${mousePosition.y * -25}px)
                `,
                transformStyle: "preserve-3d",
              }}
            >
              <div 
                className="w-full h-full rounded-2xl"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                  boxShadow: `0 0 60px ${colors.glow}`,
                }}
              >
                {/* Light sweep animation */}
                <div 
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(105deg, transparent 0%, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%, transparent 100%)",
                    animation: "shimmer 6s ease-in-out infinite",
                    animationDelay: "1s",
                  }}
                />
              </div>
            </motion.div>

            {/* OBJECT 5: Status Chip - floating UI detail */}
            <motion.div
              custom={0.6}
              variants={objectVariants}
              className="absolute"
              style={{
                top: "18%",
                right: "15%",
                transform: `
                  translateZ(200px)
                  rotateY(${-5 + mousePosition.x * 2}deg)
                  translateX(${mousePosition.x * -50}px)
                  translateY(${mousePosition.y * -30}px)
                `,
                transformStyle: "preserve-3d",
              }}
            >
              <div 
                className="px-5 py-2.5 rounded-full flex items-center gap-2"
                style={{
                  backgroundColor: isDark ? "rgba(15,15,20,0.9)" : "rgba(255,255,255,0.95)",
                  border: `1px solid ${colors.border}`,
                  boxShadow: `0 15px 50px ${colors.glowStrong}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-[rgb(var(--muted-foreground))] tracking-wide">
                  Premium Websites
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ============================================
              LAYER 3: ATMOSPHERIC OVERLAYS
              ============================================ */}
          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDark
                ? "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(6,6,8,0.4) 60%, rgba(6,6,8,0.95) 100%)"
                : "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(248,249,251,0.3) 60%, rgba(248,249,251,0.9) 100%)",
            }}
          />

          {/* Bottom gradient for text legibility */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to top, rgba(6,6,8,1) 0%, rgba(6,6,8,0.9) 30%, rgba(6,6,8,0.4) 60%, transparent 100%)"
                : "linear-gradient(to top, rgba(248,249,251,1) 0%, rgba(248,249,251,0.9) 30%, rgba(248,249,251,0.4) 60%, transparent 100%)",
            }}
          />

          {/* Film grain texture */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: isDark ? 0.015 : 0.008,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* ============================================
              LAYER 4: TYPOGRAPHY OVERLAY
              Original font-display (Syne) restored
              ============================================ */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="absolute inset-0 flex items-end pb-16 lg:pb-20 xl:pb-24 pointer-events-none"
          >
            <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 pointer-events-auto">
              <div className="max-w-3xl">
                {/* Headline - restored font-display (Syne) */}
                <div className="overflow-hidden mb-1 lg:mb-2">
                  <motion.h1
                    custom={0}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={textRevealVariants}
                    className="font-display text-[clamp(2.8rem,8vw,6rem)] font-bold tracking-[-0.04em] leading-[0.9] text-[rgb(var(--foreground))]"
                  >
                    We craft digital
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-1 lg:mb-2">
                  <motion.h1
                    custom={1}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={textRevealVariants}
                    className="font-display text-[clamp(2.8rem,8vw,6rem)] font-bold tracking-[-0.04em] leading-[0.9] text-[rgb(var(--muted-foreground))]"
                  >
                    experiences that
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-6 lg:mb-8">
                  <motion.h1
                    custom={2}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={textRevealVariants}
                    className="font-display text-[clamp(2.8rem,8vw,6rem)] font-bold tracking-[-0.04em] leading-[0.9] text-[rgb(var(--foreground))]"
                  >
                    <span className="italic font-semibold">perform</span>
                  </motion.h1>
                </div>

                {/* Supporting text */}
                <motion.p
                  custom={0}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={fadeUpVariants}
                  className="text-base lg:text-lg text-[rgb(var(--muted-foreground))] max-w-md mb-8 lg:mb-10 leading-relaxed"
                >
                  Strategic design & development studio creating premium digital products for ambitious brands.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  custom={1}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={fadeUpVariants}
                  className="flex flex-wrap items-center gap-4"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[rgb(var(--foreground))] text-[rgb(var(--background))] rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-opacity duration-300"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-[rgb(var(--foreground))] hover:text-[rgb(var(--muted-foreground))] transition-colors duration-300"
                  >
                    View Work
                  </Link>
                </motion.div>

                {/* Proof indicators */}
                <motion.div
                  custom={2}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={fadeUpVariants}
                  className="flex flex-wrap items-center gap-6 mt-10 lg:mt-14"
                >
                  {[
                    "Strategy-led approach",
                    "Premium execution",
                    "Performance focused",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-[rgb(var(--muted-foreground))]">
                        {item}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
