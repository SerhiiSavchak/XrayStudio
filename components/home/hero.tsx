"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ===========================================
// LAYER 1: BACKGROUND VIDEO
// ===========================================
function VideoBackground({ scrollProgress }: { scrollProgress: any }) {
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollProgress, [0, 1], ["0%", "20%"]);
  
  return (
    <motion.div 
      style={{ scale, y }} 
      className="absolute inset-0 overflow-hidden"
    >
      {/* Cinematic video - dark, atmospheric, premium */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=2400&h=1600&fit=crop&q=90"
        className="absolute inset-0 w-full h-full object-cover"
      >
        {/* Premium cinematic video - dark tech/digital aesthetic */}
        <source 
          src="https://cdn.coverr.co/videos/coverr-digital-data-grid-1584/1080p.mp4" 
          type="video/mp4" 
        />
      </video>
      
      {/* Fallback image if video doesn't load */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=2400&h=1600&fit=crop&q=90')",
        }}
      />
    </motion.div>
  );
}

// ===========================================
// LAYER 2: DARK ATMOSPHERIC OVERLAY
// ===========================================
function AtmosphericOverlay({ isLoaded }: { isLoaded: boolean }) {
  return (
    <>
      {/* Primary dark overlay - creates depth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-[rgb(var(--background))]/75"
      />
      
      {/* Gradient overlay - adds dimension and directs eye */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(var(--background), 0.9) 0%, 
              rgba(var(--background), 0.6) 40%,
              rgba(var(--background), 0.7) 100%
            )
          `,
        }}
      />
      
      {/* Vignette for cinematic framing */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(var(--background), 0.5) 100%)" 
        }}
      />
      
      {/* Subtle ambient glow - controlled, not flashy */}
      <motion.div
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[30%] w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(var(--glow-intense), 0.08), transparent 60%)",
          filter: "blur(100px)",
        }}
      />
    </>
  );
}

// ===========================================
// LAYER 3: TYPOGRAPHY + CONTENT BLOCK
// ===========================================
function ContentBlock({ scrollProgress, isLoaded }: { scrollProgress: any; isLoaded: boolean }) {
  const y = useTransform(scrollProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="relative z-20 min-h-[100svh] flex items-center px-6 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="max-w-3xl">
          {/* Status badge - subtle, premium */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium text-white/60 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for Q2 2024 projects
            </span>
          </motion.div>

          {/* Main headline - oversized, cinematic, staggered reveal */}
          <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-bold tracking-[-0.03em] leading-[0.9]">
            <span className="block overflow-hidden">
              <motion.span
                className="block text-white"
                initial={{ y: "120%", rotateX: 45 }}
                animate={isLoaded ? { y: "0%", rotateX: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Websites that
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-1">
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[rgb(var(--glow-intense))] to-[rgb(var(--glow))]"
                initial={{ y: "120%", rotateX: 45 }}
                animate={isLoaded ? { y: "0%", rotateX: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                drive growth
              </motion.span>
            </span>
          </h1>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-lg lg:text-xl xl:text-2xl text-white/50 max-w-xl leading-relaxed font-light"
          >
            Premium websites for businesses that want to stand out, 
            convert visitors, and scale with confidence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            {/* Primary CTA */}
            <Link href="/contact" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(var(--glow))]/20 to-[rgb(var(--glow-intense))]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-[rgb(var(--background))] font-semibold text-base transition-all duration-300 group-hover:gap-4">
                Start a project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/work"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/15 bg-white/[0.02] font-semibold text-base text-white hover:bg-white/[0.06] hover:border-white/25 transition-all duration-300"
            >
              View work
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ===========================================
// LAYER 4: ONE LARGE FOREGROUND VISUAL ELEMENT
// ===========================================
function ForegroundVisual({ scrollProgress, mouseX, mouseY, isLoaded }: { 
  scrollProgress: any; 
  mouseX: any; 
  mouseY: any;
  isLoaded: boolean;
}) {
  const y = useTransform(scrollProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollProgress, [0, 0.4], [1, 0]);

  return (
    <motion.div 
      style={{ opacity }} 
      className="absolute inset-0 pointer-events-none hidden lg:block"
    >
      {/* Single large floating UI panel - right side */}
      <motion.div
        style={{
          y,
          x: useTransform(mouseX, (v) => v * -0.08),
          rotateY: useTransform(mouseX, (v) => v * 0.15),
          rotateX: useTransform(mouseY, (v) => v * -0.1),
        }}
        className="absolute top-[18%] right-[6%] w-[480px] h-[320px]"
        initial={{ opacity: 0, y: 100, rotateY: 20, scale: 0.9 }}
        animate={isLoaded ? { opacity: 1, y: 0, rotateY: 6, scale: 1 } : {}}
        transition={{ delay: 0.9, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {/* Browser/UI mockup frame */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[rgb(var(--surface-1))]/80 backdrop-blur-sm shadow-2xl">
          {/* Browser chrome bar */}
          <div className="h-10 bg-[rgb(var(--surface-2))]/90 border-b border-white/[0.06] flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-white/[0.04] text-xs text-white/30 font-mono">
                xray.studio
              </div>
            </div>
          </div>
          
          {/* UI content preview */}
          <div className="p-6 space-y-4">
            {/* Header skeleton */}
            <div className="flex justify-between items-center">
              <div className="w-24 h-4 rounded bg-white/10" />
              <div className="flex gap-3">
                <div className="w-12 h-3 rounded bg-white/[0.06]" />
                <div className="w-12 h-3 rounded bg-white/[0.06]" />
                <div className="w-12 h-3 rounded bg-white/[0.06]" />
              </div>
            </div>
            
            {/* Hero skeleton */}
            <div className="mt-8 space-y-3">
              <div className="w-3/4 h-8 rounded bg-white/10" />
              <div className="w-1/2 h-8 rounded bg-gradient-to-r from-[rgb(var(--glow-intense))]/20 to-[rgb(var(--glow))]/10" />
            </div>
            
            <div className="mt-4 w-2/3 h-3 rounded bg-white/[0.06]" />
            <div className="w-1/2 h-3 rounded bg-white/[0.04]" />
            
            {/* CTA skeleton */}
            <div className="mt-6 flex gap-3">
              <div className="w-28 h-10 rounded-lg bg-white/15" />
              <div className="w-24 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08]" />
            </div>
          </div>
          
          {/* Subtle scan line */}
          <motion.div
            className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[rgb(var(--glow-intense))]/20 to-transparent"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Glow beneath panel */}
        <div className="absolute -bottom-8 inset-x-8 h-16 bg-[rgb(var(--glow-intense))]/8 blur-3xl rounded-full" />
      </motion.div>
    </motion.div>
  );
}

// ===========================================
// SCROLL INDICATOR
// ===========================================
function ScrollIndicator({ scrollProgress, isLoaded }: { scrollProgress: any; isLoaded: boolean }) {
  const opacity = useTransform(scrollProgress, [0, 0.1], [1, 0]);
  
  return (
    <motion.div
      style={{ opacity }}
      initial={{ opacity: 0, y: 20 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5"
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-1.5 rounded-full bg-white/50"
        />
      </motion.div>
    </motion.div>
  );
}

// ===========================================
// MAIN HERO COMPONENT
// ===========================================
export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Mouse parallax for foreground element
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);

    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / innerWidth * 30);
      mouseY.set((clientY - innerHeight / 2) / innerHeight * 30);
    };
    
    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] lg:h-screen overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* Layer 1: Video background */}
      <VideoBackground scrollProgress={scrollYProgress} />

      {/* Layer 2: Dark atmospheric overlay */}
      <AtmosphericOverlay isLoaded={isLoaded} />

      {/* Layer 3: Typography + content */}
      <ContentBlock scrollProgress={scrollYProgress} isLoaded={isLoaded} />

      {/* Layer 4: One large foreground visual */}
      <ForegroundVisual 
        scrollProgress={scrollYProgress} 
        mouseX={smoothMouseX} 
        mouseY={smoothMouseY}
        isLoaded={isLoaded}
      />

      {/* Scroll indicator */}
      <ScrollIndicator scrollProgress={scrollYProgress} isLoaded={isLoaded} />

      {/* Bottom gradient transition to next section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[rgb(var(--background))] to-transparent pointer-events-none z-20" />
    </section>
  );
}
