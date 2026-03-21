"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ===========================================
// CINEMATIC HERO - "DIGITAL BRAND FILM INTRO"
// Inspired by Unseen Studio's immersive presence
// and Analogue Agency's editorial confidence
// ===========================================

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Mouse tracking for subtle parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Depth-based parallax on scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.6]);

  useEffect(() => {
    // Staggered reveal sequence
    const loadTimer = setTimeout(() => setIsLoaded(true), 100);
    const revealTimer = setTimeout(() => setIsRevealed(true), 800);
    return () => {
      clearTimeout(loadTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / innerWidth);
      mouseY.set((clientY - innerHeight / 2) / innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] overflow-hidden bg-[#050506]"
    >
      {/* ===== LAYER 1: DEEP ATMOSPHERIC BACKGROUND ===== */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        {/* Near-black base with subtle depth */}
        <div className="absolute inset-0 bg-[#050506]" />
        
        {/* Ambient light movements */}
        <motion.div
          animate={{
            opacity: [0.015, 0.04, 0.015],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(60,60,80,0.4), transparent 60%)",
            filter: "blur(100px)",
          }}
        />
        <motion.div
          animate={{
            opacity: [0.01, 0.03, 0.01],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[-30%] right-[-20%] w-[90%] h-[90%] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(40,50,70,0.3), transparent 60%)",
            filter: "blur(120px)",
          }}
        />

        {/* Soft grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* ===== LAYER 2: CINEMATIC MEDIA SURFACE ===== */}
      <motion.div
        style={{ 
          y: mediaY, 
          scale: mediaScale,
          x: useTransform(smoothMouseX, [-0.5, 0.5], ["-1%", "1%"]),
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* The main cinematic visual - a massive glowing interface frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isRevealed ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[85vw] max-w-[1400px] aspect-[16/10]"
        >
          {/* Cinematic frame glow */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(80,90,120,0.1) 0%, rgba(40,45,60,0.05) 100%)",
              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.03),
                0 0 100px rgba(80,100,140,0.08),
                0 0 200px rgba(60,80,120,0.05),
                inset 0 0 100px rgba(0,0,0,0.4)
              `,
            }}
          />

          {/* Video container with premium treatment */}
          <div className="absolute inset-3 lg:inset-6 rounded-xl overflow-hidden">
            {/* The cinematic video - dark, premium, digital workspace feel */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.7) contrast(1.1) saturate(0.9)" }}
            >
              <source
                src="https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_30fps.mp4"
                type="video/mp4"
              />
            </video>

            {/* Overlay for depth and color grading */}
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(180deg, rgba(5,5,6,0.3) 0%, transparent 30%, transparent 70%, rgba(5,5,6,0.5) 100%),
                  linear-gradient(90deg, rgba(5,5,6,0.2) 0%, transparent 20%, transparent 80%, rgba(5,5,6,0.2) 100%)
                `,
              }}
            />

            {/* Subtle scanline effect */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
              }}
            />

            {/* Animated reflection sweep */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={isRevealed ? { x: "200%", opacity: [0, 0.15, 0] } : {}}
              transition={{ duration: 2.5, delay: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
              }}
            />
          </div>

          {/* Corner accents - premium frame details */}
          <div className="absolute top-0 left-0 w-12 h-12 lg:w-20 lg:h-20">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
            <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
          </div>
          <div className="absolute top-0 right-0 w-12 h-12 lg:w-20 lg:h-20">
            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/20 to-transparent" />
            <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 w-12 h-12 lg:w-20 lg:h-20">
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/15 to-transparent" />
            <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-white/15 to-transparent" />
          </div>
          <div className="absolute bottom-0 right-0 w-12 h-12 lg:w-20 lg:h-20">
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/15 to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-white/15 to-transparent" />
          </div>
        </motion.div>
      </motion.div>

      {/* ===== LAYER 3: FOREGROUND CONTENT - TITLE CARD ===== */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-16 pb-20 lg:pb-28"
      >
        {/* Gradient overlay for text readability */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(0deg, rgba(5,5,6,0.95) 0%, rgba(5,5,6,0.6) 30%, transparent 60%)`,
          }}
        />

        <div className="relative max-w-[1600px] mx-auto w-full">
          <div className="max-w-5xl">
            {/* Availability tag */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 lg:mb-8"
            >
              <span className="inline-flex items-center gap-3 text-xs lg:text-sm font-medium tracking-wide text-white/50 uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Available for select projects
              </span>
            </motion.div>

            {/* Main headline - editorial scale, cinematic title card */}
            <h1 className="font-display font-bold tracking-[-0.03em] leading-[0.85]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(2.5rem,10vw,8rem)] text-white"
                  initial={{ y: "120%" }}
                  animate={isLoaded ? { y: "0%" } : {}}
                  transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  Digital experiences
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(2.5rem,10vw,8rem)] text-white/30"
                  initial={{ y: "120%" }}
                  animate={isLoaded ? { y: "0%" } : {}}
                  transition={{ duration: 1.4, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  that resonate
                </motion.span>
              </span>
            </h1>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 lg:mt-8 text-base lg:text-lg text-white/40 max-w-md leading-relaxed"
            >
              Design-led development for brands that understand 
              the value of craft and attention to detail.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="group relative">
                <span className="relative flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#050506] font-medium text-sm transition-all duration-300 hover:bg-white/90">
                  Start a project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link
                href="/work"
                className="flex items-center justify-center gap-3 px-7 py-3.5 rounded-full border border-white/15 bg-white/[0.02] font-medium text-sm text-white/80 hover:bg-white/[0.05] hover:border-white/25 transition-all duration-300"
              >
                View selected work
              </Link>
            </motion.div>
          </div>

          {/* Trust row - minimal, credits style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 2 }}
            className="mt-12 lg:mt-16 flex items-center gap-8 text-[10px] lg:text-xs font-mono uppercase tracking-[0.15em] text-white/25"
          >
            <span>Next.js</span>
            <span className="w-px h-3 bg-white/10" />
            <span>React</span>
            <span className="w-px h-3 bg-white/10" />
            <span>TypeScript</span>
            <span className="w-px h-3 bg-white/10" />
            <span>Tailwind</span>
          </motion.div>
        </div>
      </motion.div>

      {/* ===== SCROLL-TRIGGERED OVERLAY ===== */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-[#050506] pointer-events-none z-5"
      />

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 0.8 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 h-1.5 rounded-full bg-white/50"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
