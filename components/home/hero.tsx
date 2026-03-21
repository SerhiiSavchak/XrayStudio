"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ===========================================
// CINEMATIC HERO - "DIGITAL DIRECTOR'S CUT"
// A premium film-like title sequence for a web developer
// ===========================================

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* ===== LAYER 1: CINEMATIC VIDEO BACKGROUND ===== */}
      <motion.div
        style={{ scale: videoScale, opacity: videoOpacity }}
        className="absolute inset-0"
      >
        {/* Video element - dark, premium, cinematic footage */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=1080&fit=crop&q=80"
        >
          {/* Premium dark tech/digital footage */}
          <source
            src="https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-in-the-dark-2914/1080p.mp4"
            type="video/mp4"
          />
        </video>

        {/* Fallback high-quality image if video doesn't load */}
        {!videoLoaded && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=1080&fit=crop&q=80')`,
            }}
          />
        )}
      </motion.div>

      {/* ===== LAYER 2: ATMOSPHERIC OVERLAYS ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Heavy dark gradient overlay - cinematic color grading */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, 
                rgba(6,6,8,0.4) 0%, 
                rgba(6,6,8,0.6) 40%, 
                rgba(6,6,8,0.85) 70%,
                rgba(6,6,8,1) 100%
              )
            `,
          }}
        />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, rgba(6,6,8,0.7) 100%)`,
          }}
        />

        {/* Subtle top gradient for header blend */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[rgba(6,6,8,0.5)] to-transparent" />

        {/* Animated light sweep - subtle, elegant */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={isLoaded ? { x: "200%", opacity: [0, 0.15, 0] } : {}}
          transition={{ duration: 3, delay: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)`,
          }}
        />

        {/* Subtle ambient glow */}
        <motion.div
          animate={{
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[800px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(var(--glow-intense), 1), transparent 60%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* ===== LAYER 3: TYPOGRAPHY & CONTENT ===== */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex items-end pb-24 lg:pb-32 px-6 lg:px-16"
      >
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="max-w-4xl">
            {/* Availability indicator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.1] text-sm text-white/70 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Available for projects
              </span>
            </motion.div>

            {/* Main headline - editorial scale, cinematic typography */}
            <h1 className="font-display font-bold tracking-[-0.04em] leading-[0.9]">
              {/* Line 1 */}
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(3rem,12vw,9rem)] text-white"
                  initial={{ y: "110%" }}
                  animate={isLoaded ? { y: "0%" } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  Crafting
                </motion.span>
              </span>

              {/* Line 2 */}
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(3rem,12vw,9rem)] text-white"
                  initial={{ y: "110%" }}
                  animate={isLoaded ? { y: "0%" } : {}}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  Digital
                </motion.span>
              </span>

              {/* Line 3 - accent color */}
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-[clamp(3rem,12vw,9rem)] text-white/40"
                  initial={{ y: "110%" }}
                  animate={isLoaded ? { y: "0%" } : {}}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  Experiences
                </motion.span>
              </span>
            </h1>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-lg lg:text-xl text-white/50 max-w-lg leading-relaxed"
            >
              Premium websites and digital products for brands that 
              demand excellence. Design-led development with 
              performance at the core.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="group relative">
                <div className="absolute -inset-1 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-[rgb(var(--background))] font-semibold text-base transition-all duration-300">
                  Start a project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/work"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-sm font-semibold text-base text-white hover:bg-white/[0.08] hover:border-white/30 transition-all duration-300"
              >
                View work
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-white/60"
          />
        </motion.div>
      </motion.div>

      {/* ===== CORNER FRAME ELEMENTS - Subtle cinematic framing ===== */}
      <div className="absolute inset-8 lg:inset-16 pointer-events-none z-10">
        {/* Top left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute top-0 left-0 w-16 h-16 lg:w-24 lg:h-24"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/30 to-transparent" />
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>

        {/* Top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="absolute top-0 right-0 w-16 h-16 lg:w-24 lg:h-24"
        >
          <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-white/30 to-transparent" />
          <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>

        {/* Bottom left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="absolute bottom-0 left-0 w-16 h-16 lg:w-24 lg:h-24"
        >
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white/20 to-transparent" />
          <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-white/20 to-transparent" />
        </motion.div>

        {/* Bottom right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-0 right-0 w-16 h-16 lg:w-24 lg:h-24"
        >
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-white/20 to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-white/20 to-transparent" />
        </motion.div>
      </div>

      {/* ===== TRUST INDICATORS - Film credits style ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 right-8 lg:bottom-16 lg:right-16 z-20 hidden md:block"
      >
        <div className="flex items-center gap-6 text-[10px] lg:text-xs font-mono uppercase tracking-[0.2em] text-white/30">
          <span>Next.js</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>React</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>TypeScript</span>
        </div>
      </motion.div>
    </section>
  );
}
