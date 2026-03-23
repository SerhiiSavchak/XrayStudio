"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/lib/theme/context";

// ===========================================
// IMMERSIVE 3D DEVICE SHOWCASE HERO
// Strong cursor-reactive depth with layered devices
// Desktop + Tablet + Mobile in spatial composition
// ===========================================

// Premium website videos for device screens
const MEDIA = {
  desktop: "https://videos.pexels.com/video-files/5475772/5475772-uhd_2560_1440_30fps.mp4",
  tablet: "https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_24fps.mp4",
  mobile: "https://videos.pexels.com/video-files/6804117/6804117-uhd_1440_2560_25fps.mp4",
};

// Video component with loading state
function DeviceVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.6;
      video.addEventListener("loadeddata", () => setLoaded(true));
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className={`${className} transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Smooth spring-based mouse tracking for cinematic feel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Stronger springs with less damping for more visible movement
  const springConfig = { stiffness: 50, damping: 20, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Scroll behavior
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);
  const yOffset = useTransform(scrollYProgress, [0, 0.5], ["0%", "-2%"]);

  // Mouse tracking with much stronger effect
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

  // Load trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Idle drift animation
  const [idle, setIdle] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.008;
      setIdle({
        x: Math.sin(t) * 0.15,
        y: Math.cos(t * 0.7) * 0.1,
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Theme colors
  const c = isDark
    ? { bg: "#060608", surface: "#0a0a0c", chrome: "#0c0c0f", border: "#1a1a1f", glow: "rgba(100,120,180,0.15)" }
    : { bg: "#fcfcfd", surface: "#ffffff", chrome: "#f5f6f8", border: "#e4e4e8", glow: "rgba(80,100,160,0.10)" };

  return (
    <section ref={containerRef} className="relative" style={{ height: "200vh", backgroundColor: c.bg }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale, y: yOffset, borderRadius }}
          className="relative h-full w-full overflow-hidden origin-center"
        >
          {/* ========================================
              ATMOSPHERIC BACKGROUND
              ======================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
            style={{ backgroundColor: c.bg }}
          >
            {/* Large ambient glow that moves with cursor */}
            <motion.div
              className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%]"
              style={{
                x: smoothX,
                y: smoothY,
                background: isDark
                  ? "radial-gradient(ellipse 70% 60% at 65% 40%, rgba(60,80,140,0.12) 0%, transparent 60%)"
                  : "radial-gradient(ellipse 70% 60% at 65% 40%, rgba(100,120,180,0.08) 0%, transparent 60%)",
              }}
            />
            <motion.div
              className="absolute w-[100%] h-[100%]"
              style={{
                x: smoothX,
                y: smoothY,
                background: isDark
                  ? "radial-gradient(ellipse 50% 50% at 30% 70%, rgba(80,100,160,0.08) 0%, transparent 50%)"
                  : "radial-gradient(ellipse 50% 50% at 30% 70%, rgba(120,140,200,0.05) 0%, transparent 50%)",
              }}
            />
          </motion.div>

          {/* ========================================
              DEVICE SCENE CONTAINER
              All devices in one perspective container
              ======================================== */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: "2500px", perspectiveOrigin: "50% 50%" }}
          >
            {/* ========================================
                DEVICE 1: DESKTOP (DEEPEST - Main Anchor)
                Largest device, furthest back
                ======================================== */}
            <motion.div
              initial={{ opacity: 0, y: 80, rotateX: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                width: "58vw",
                height: "68vh",
                maxWidth: "1000px",
                maxHeight: "620px",
                minWidth: "550px",
                right: "4%",
                top: "8%",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  x: useTransform(smoothX, (v) => (v + idle.x) * -25),
                  y: useTransform(smoothY, (v) => (v + idle.y) * -15),
                  rotateY: useTransform(smoothX, (v) => -12 + (v + idle.x) * 8),
                  rotateX: useTransform(smoothY, (v) => 4 + (v + idle.y) * 4),
                  transformStyle: "preserve-3d",
                  transform: "translateZ(-150px)",
                }}
              >
                <div
                  className="w-full h-full rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: c.surface,
                    border: `1px solid ${c.border}`,
                    boxShadow: `
                      0 60px 140px ${c.glow},
                      0 0 0 1px ${isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"},
                      inset 0 1px 0 ${isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)"}
                    `,
                  }}
                >
                  {/* Browser chrome */}
                  <div
                    className="h-10 flex items-center px-4 gap-2"
                    style={{ backgroundColor: c.chrome, borderBottom: `1px solid ${c.border}` }}
                  >
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div
                      className="flex-1 h-6 rounded mx-20 flex items-center justify-center"
                      style={{ backgroundColor: isDark ? "#15151a" : "#e8eaed" }}
                    >
                      <span className="text-[10px] text-[rgb(var(--muted-foreground))] font-mono tracking-wide">
                        xraystudio.dev
                      </span>
                    </div>
                  </div>
                  <div className="relative h-[calc(100%-2.5rem)] overflow-hidden">
                    <DeviceVideo src={MEDIA.desktop} className="w-full h-full object-cover" />
                    {/* Reflection sweep */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 48%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 52%, transparent 60%)",
                        animation: "shimmer 12s ease-in-out infinite",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ========================================
                DEVICE 2: TABLET (MIDDLE DEPTH)
                Medium size, between desktop and mobile
                ======================================== */}
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 12 }}
              animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 1.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                width: "20vw",
                height: "30vh",
                maxWidth: "300px",
                maxHeight: "420px",
                minWidth: "180px",
                right: "42%",
                bottom: "15%",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  x: useTransform(smoothX, (v) => (v + idle.x) * -45),
                  y: useTransform(smoothY, (v) => (v + idle.y) * -28),
                  rotateY: useTransform(smoothX, (v) => 8 + (v + idle.x) * 12),
                  rotateX: useTransform(smoothY, (v) => -3 + (v + idle.y) * 6),
                  transformStyle: "preserve-3d",
                  transform: "translateZ(50px)",
                }}
              >
                <div
                  className="w-full h-full rounded-[1.5rem] overflow-hidden p-2.5"
                  style={{
                    backgroundColor: c.surface,
                    border: `1px solid ${c.border}`,
                    boxShadow: `
                      0 40px 100px ${c.glow},
                      inset 0 1px 0 ${isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)"}
                    `,
                  }}
                >
                  <div className="w-full h-full rounded-[1.1rem] overflow-hidden relative">
                    <DeviceVideo src={MEDIA.tablet} className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ========================================
                DEVICE 3: MOBILE (CLOSEST TO VIEWER)
                Smallest but most prominent foreground element
                ======================================== */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 1.4, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                width: "12vw",
                height: "48vh",
                maxWidth: "180px",
                maxHeight: "400px",
                minWidth: "130px",
                right: "22%",
                bottom: "10%",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  x: useTransform(smoothX, (v) => (v + idle.x) * -70),
                  y: useTransform(smoothY, (v) => (v + idle.y) * -45),
                  rotateY: useTransform(smoothX, (v) => 15 + (v + idle.x) * 18),
                  rotateX: useTransform(smoothY, (v) => -2 + (v + idle.y) * 8),
                  transformStyle: "preserve-3d",
                  transform: "translateZ(180px)",
                }}
              >
                <div
                  className="w-full h-full rounded-[2.2rem] overflow-hidden p-2"
                  style={{
                    backgroundColor: c.surface,
                    border: `1px solid ${c.border}`,
                    boxShadow: `
                      0 50px 120px ${c.glow},
                      inset 0 1px 0 ${isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.95)"}
                    `,
                  }}
                >
                  <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative">
                    <DeviceVideo src={MEDIA.mobile} className="w-full h-full object-cover" />
                    {/* Dynamic Island */}
                    <div
                      className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-5 rounded-full"
                      style={{ backgroundColor: isDark ? "#000" : "#1a1a1a" }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ========================================
                FOREGROUND GLASS ACCENT
                Adds depth and premium feel
                ======================================== */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                width: "14vw",
                height: "40vh",
                maxWidth: "220px",
                top: "30%",
                right: "-2%",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  x: useTransform(smoothX, (v) => (v + idle.x) * -90),
                  y: useTransform(smoothY, (v) => (v + idle.y) * -55),
                  rotateY: useTransform(smoothX, (v) => -25 + (v + idle.x) * 22),
                  rotateX: useTransform(smoothY, (v) => 5 + (v + idle.y) * 10),
                  transformStyle: "preserve-3d",
                  transform: "translateZ(280px)",
                }}
              >
                <div
                  className="w-full h-full rounded-2xl"
                  style={{
                    background: isDark
                      ? "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)"
                      : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%)",
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                    boxShadow: `0 0 100px ${c.glow}`,
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    style={{
                      background: "linear-gradient(105deg, transparent 0%, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%, transparent 100%)",
                      animation: "shimmer 10s ease-in-out infinite",
                      animationDelay: "3s",
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ========================================
              ATMOSPHERIC OVERLAYS
              ======================================== */}
          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDark
                ? "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 0%, rgba(6,6,8,0.3) 50%, rgba(6,6,8,0.95) 100%)"
                : "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 0%, rgba(252,252,253,0.2) 50%, rgba(252,252,253,0.9) 100%)",
            }}
          />

          {/* Bottom gradient for text legibility */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to top, rgba(6,6,8,1) 0%, rgba(6,6,8,0.98) 20%, rgba(6,6,8,0.6) 50%, transparent 100%)"
                : "linear-gradient(to top, rgba(252,252,253,1) 0%, rgba(252,252,253,0.98) 20%, rgba(252,252,253,0.6) 50%, transparent 100%)",
            }}
          />

          {/* Subtle film grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: isDark ? 0.015 : 0.008,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* ========================================
              TEXT OVERLAY CONTENT
              Using original font-display (Syne)
              ======================================== */}
          <div className="absolute inset-0 flex items-end pb-16 md:pb-20 lg:pb-24">
            <div className="container-wide">
              <div className="max-w-2xl">
                {/* Headline */}
                <div className="overflow-hidden mb-4">
                  <motion.h1
                    initial={{ y: "120%" }}
                    animate={isLoaded ? { y: "0%" } : {}}
                    transition={{ duration: 1.4, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]"
                  >
                    Premium Websites
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-8">
                  <motion.h2
                    initial={{ y: "120%" }}
                    animate={isLoaded ? { y: "0%" } : {}}
                    transition={{ duration: 1.4, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[rgb(var(--muted-foreground))]"
                  >
                    That Convert
                  </motion.h2>
                </div>

                {/* Supporting text */}
                <motion.p
                  initial={{ opacity: 0, y: 28 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.1, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
                  className="text-base md:text-lg text-[rgb(var(--muted-foreground))] leading-relaxed max-w-md mb-10"
                >
                  Strategic design, thoughtful structure, and production-ready code for experts and
                  service businesses.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.1, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap items-center gap-4 mb-10"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[rgb(var(--foreground))] text-[rgb(var(--background))] rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:gap-3"
                  >
                    Start a Project
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 px-7 py-3.5 border border-[rgb(var(--border))] rounded-full font-medium text-sm tracking-wide text-[rgb(var(--muted-foreground))] transition-all duration-300 hover:border-[rgb(var(--foreground))] hover:text-[rgb(var(--foreground))]"
                  >
                    View Work
                  </Link>
                </motion.div>

                {/* Trust row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 2.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[rgb(var(--muted-foreground))]"
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Strategy First
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Responsive Design
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Production Code
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
