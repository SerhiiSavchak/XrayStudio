"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/lib/theme/context";

// ===========================================
// CINEMATIC RESPONSIVE WEBSITE SHOWCASE HERO
// 6-part composition with real premium media
// Desktop + Tablet + Mobile device showcase
// ===========================================

// Premium website videos for device screens
const MEDIA = {
  desktop: "https://videos.pexels.com/video-files/5475772/5475772-uhd_2560_1440_30fps.mp4",
  tablet: "https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_24fps.mp4",
  mobile: "https://videos.pexels.com/video-files/6804117/6804117-uhd_1440_2560_25fps.mp4",
  background: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
};

// Video component with loading state
function DeviceVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.7;
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
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll transforms - fullscreen to receding
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);
  const yOffset = useTransform(scrollYProgress, [0, 0.5], ["0%", "-2%"]);
  const sceneOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0.5]);

  // Mouse tracking
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Load trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Theme colors
  const c = isDark
    ? { bg: "#060608", surface: "#0a0a0c", border: "#1a1a1f", glow: "rgba(100,120,180,0.12)" }
    : { bg: "#fcfcfd", surface: "#ffffff", border: "#e4e4e8", glow: "rgba(80,100,160,0.08)" };

  return (
    <section ref={containerRef} className="relative" style={{ height: "200vh", backgroundColor: c.bg }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale, y: yOffset, borderRadius }}
          className="relative h-full w-full overflow-hidden origin-center"
        >
          {/* ========================================
              PART 1: ATMOSPHERIC BACKGROUND
              ======================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 2, delay: 0 }}
            className="absolute inset-0"
            style={{ backgroundColor: c.bg }}
          >
            {/* Ambient light gradients */}
            <div
              className="absolute inset-0 animate-breathe"
              style={{
                background: isDark
                  ? "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(60,80,140,0.08) 0%, transparent 70%)"
                  : "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(100,120,180,0.06) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute inset-0 animate-pulse-slow"
              style={{
                background: isDark
                  ? "radial-gradient(ellipse 50% 40% at 25% 60%, rgba(80,100,160,0.06) 0%, transparent 60%)"
                  : "radial-gradient(ellipse 50% 40% at 25% 60%, rgba(120,140,200,0.04) 0%, transparent 60%)",
                animationDelay: "2s",
              }}
            />
          </motion.div>

          {/* ========================================
              PART 4: DEEP BACKGROUND DIGITAL LAYER
              ======================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
            style={{
              width: "75vw",
              height: "65vh",
              maxWidth: "1300px",
              top: "10%",
              right: "-15%",
              transform: `
                perspective(2000px)
                translateZ(-500px)
                rotateY(${-6 + mouse.x * 0.8}deg)
                rotateX(${mouse.y * 0.4}deg)
                translateX(${mouse.x * -10}px)
                translateY(${mouse.y * -8}px)
              `,
            }}
          >
            <div
              className="w-full h-full rounded-3xl overflow-hidden"
              style={{ backgroundColor: c.surface, border: `1px solid ${c.border}`, boxShadow: `0 0 150px ${c.glow}` }}
            >
              <DeviceVideo src={MEDIA.background} className="w-full h-full object-cover opacity-30 blur-sm" />
              <div
                className="absolute inset-0"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, rgba(6,6,8,0.8) 0%, rgba(6,6,8,0.5) 100%)"
                    : "linear-gradient(135deg, rgba(252,252,253,0.8) 0%, rgba(252,252,253,0.5) 100%)",
                }}
              />
            </div>
          </motion.div>

          {/* ========================================
              PART 1: MAIN DESKTOP DEVICE
              ======================================== */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: sceneOpacity }}
            className="absolute"
          >
            <div
              className="relative"
              style={{
                width: "52vw",
                height: "62vh",
                maxWidth: "900px",
                maxHeight: "580px",
                minWidth: "500px",
                top: "8vh",
                right: "6vw",
                position: "absolute",
                transform: `
                  perspective(2000px)
                  translateZ(-80px)
                  rotateY(${-14 + mouse.x * 2.5}deg)
                  rotateX(${3 + mouse.y * 1.2}deg)
                  translateX(${mouse.x * -30}px)
                  translateY(${mouse.y * -18}px)
                `,
              }}
            >
              {/* Desktop frame */}
              <div
                className="w-full h-full rounded-xl overflow-hidden"
                style={{
                  backgroundColor: c.surface,
                  border: `1px solid ${c.border}`,
                  boxShadow: `
                    0 30px 100px ${c.glow},
                    0 0 0 1px ${isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"},
                    inset 0 1px 0 ${isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)"}
                  `,
                }}
              >
                {/* Browser chrome */}
                <div
                  className="h-9 flex items-center px-4 gap-2"
                  style={{
                    backgroundColor: isDark ? "#0c0c0f" : "#f5f6f8",
                    borderBottom: `1px solid ${c.border}`,
                  }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div
                    className="flex-1 h-5 rounded mx-16 flex items-center justify-center"
                    style={{ backgroundColor: isDark ? "#15151a" : "#e8eaed" }}
                  >
                    <span className="text-[9px] text-[rgb(var(--muted-foreground))] font-mono tracking-wide">
                      xraystudio.dev
                    </span>
                  </div>
                </div>
                {/* Screen content */}
                <div className="relative h-[calc(100%-2.25rem)] overflow-hidden">
                  <DeviceVideo src={MEDIA.desktop} className="w-full h-full object-cover" />
                  {/* Reflection sweep */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 48%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.04) 52%, transparent 60%)",
                      animation: "shimmer 10s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================
              PART 2: TABLET DEVICE
              ======================================== */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: sceneOpacity }}
            className="absolute"
          >
            <div
              style={{
                width: "22vw",
                height: "32vh",
                maxWidth: "320px",
                maxHeight: "440px",
                minWidth: "200px",
                bottom: "18vh",
                right: "38vw",
                position: "absolute",
                transform: `
                  perspective(2000px)
                  translateZ(30px)
                  rotateY(${6 + mouse.x * 3}deg)
                  rotateX(${-4 + mouse.y * 1.5}deg)
                  translateX(${mouse.x * -38}px)
                  translateY(${mouse.y * -22}px)
                `,
              }}
            >
              {/* Tablet frame */}
              <div
                className="w-full h-full rounded-2xl overflow-hidden p-2"
                style={{
                  backgroundColor: c.surface,
                  border: `1px solid ${c.border}`,
                  boxShadow: `
                    0 25px 80px ${c.glow},
                    inset 0 1px 0 ${isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)"}
                  `,
                }}
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <DeviceVideo src={MEDIA.tablet} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================
              PART 3: MOBILE DEVICE
              ======================================== */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: sceneOpacity }}
            className="absolute"
          >
            <div
              style={{
                width: "13vw",
                height: "50vh",
                maxWidth: "200px",
                maxHeight: "430px",
                minWidth: "140px",
                bottom: "8vh",
                right: "18vw",
                position: "absolute",
                transform: `
                  perspective(2000px)
                  translateZ(120px)
                  rotateY(${12 + mouse.x * 4}deg)
                  rotateX(${-2 + mouse.y * 2}deg)
                  translateX(${mouse.x * -50}px)
                  translateY(${mouse.y * -28}px)
                `,
              }}
            >
              {/* Phone frame */}
              <div
                className="w-full h-full rounded-[2rem] overflow-hidden p-2"
                style={{
                  backgroundColor: c.surface,
                  border: `1px solid ${c.border}`,
                  boxShadow: `
                    0 35px 100px ${c.glow},
                    inset 0 1px 0 ${isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.95)"}
                  `,
                }}
              >
                <div className="w-full h-full rounded-[1.6rem] overflow-hidden relative">
                  <DeviceVideo src={MEDIA.mobile} className="w-full h-full object-cover" />
                  {/* Dynamic Island */}
                  <div
                    className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-full"
                    style={{ backgroundColor: isDark ? "#000" : "#1a1a1a" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================
              PART 5: FOREGROUND GLASS LAYER
              ======================================== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.6, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
            style={{
              width: "18vw",
              height: "45vh",
              maxWidth: "280px",
              top: "25%",
              right: "-4%",
              transform: `
                perspective(2000px)
                translateZ(200px)
                rotateY(${-22 + mouse.x * 5}deg)
                rotateX(${4 + mouse.y * 2.5}deg)
                translateX(${mouse.x * -60}px)
                translateY(${mouse.y * -35}px)
              `,
            }}
          >
            <div
              className="w-full h-full rounded-2xl"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.008) 100%)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 100%)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}`,
                boxShadow: `0 0 80px ${c.glow}`,
              }}
            >
              {/* Animated light sweep */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 0%, transparent 35%, rgba(255,255,255,0.08) 50%, transparent 65%, transparent 100%)",
                  animation: "shimmer 8s ease-in-out infinite",
                  animationDelay: "2s",
                }}
              />
            </div>
          </motion.div>

          {/* ========================================
              ATMOSPHERIC OVERLAYS
              ======================================== */}
          {/* Cinematic vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDark
                ? "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 0%, rgba(6,6,8,0.35) 55%, rgba(6,6,8,0.95) 100%)"
                : "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 0%, rgba(252,252,253,0.25) 55%, rgba(252,252,253,0.9) 100%)",
            }}
          />

          {/* Bottom text legibility gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[55%] pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to top, rgba(6,6,8,1) 0%, rgba(6,6,8,0.95) 25%, rgba(6,6,8,0.5) 55%, transparent 100%)"
                : "linear-gradient(to top, rgba(252,252,253,1) 0%, rgba(252,252,253,0.95) 25%, rgba(252,252,253,0.5) 55%, transparent 100%)",
            }}
          />

          {/* Film grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: isDark ? 0.012 : 0.006,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* ========================================
              PART 6: OVERLAY CONTENT
              Using original font-display (Syne)
              ======================================== */}
          <div className="absolute inset-0 flex items-end pb-20 md:pb-24 lg:pb-28">
            <div className="container-wide">
              <div className="max-w-2xl">
                {/* Headline with staggered reveal */}
                <div className="overflow-hidden mb-6">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={isLoaded ? { y: "0%" } : {}}
                    transition={{ duration: 1.3, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]"
                  >
                    Premium Websites
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-8">
                  <motion.h2
                    initial={{ y: "110%" }}
                    animate={isLoaded ? { y: "0%" } : {}}
                    transition={{ duration: 1.3, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[rgb(var(--muted-foreground))]"
                  >
                    That Convert
                  </motion.h2>
                </div>

                {/* Supporting text */}
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
                  className="text-base md:text-lg text-[rgb(var(--muted-foreground))] leading-relaxed max-w-md mb-10"
                >
                  Strategic design, thoughtful structure, and production-ready code for experts and
                  service businesses.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
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
                  initial={{ opacity: 0, y: 16 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
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
