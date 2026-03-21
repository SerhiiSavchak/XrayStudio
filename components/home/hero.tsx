"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

// Cinematic video/image background with parallax
function CinematicMedia({ scrollProgress }: { scrollProgress: any }) {
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollProgress, [0, 0.6], [1, 0.3]);

  return (
    <motion.div 
      style={{ scale, y, opacity }} 
      className="absolute inset-0 overflow-hidden"
    >
      {/* Hero video/image - full bleed cinematic */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=2400&h=1600&fit=crop&q=90"
          alt="Abstract digital art"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Cinematic color grade overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--background))]/80 via-[rgb(var(--background))]/60 to-[rgb(var(--background))]/70" />
        {/* Vignette */}
        <div 
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(var(--background), 0.8) 100%)" }}
        />
      </div>

      {/* Animated light rays */}
      <motion.div
        className="absolute top-0 left-1/4 w-[2px] h-[120%] bg-gradient-to-b from-white/0 via-white/[0.03] to-transparent"
        style={{ rotate: "15deg", transformOrigin: "top" }}
        animate={{ opacity: [0.3, 0.6, 0.3], y: ["-10%", "0%", "-10%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-[1px] h-[140%] bg-gradient-to-b from-white/0 via-white/[0.02] to-transparent"
        style={{ rotate: "-12deg", transformOrigin: "top" }}
        animate={{ opacity: [0.2, 0.5, 0.2], y: ["-5%", "5%", "-5%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </motion.div>
  );
}

// Floating media panels for layered depth
function FloatingMediaPanels({ scrollProgress, mouseX, mouseY, isLoaded }: { 
  scrollProgress: any; 
  mouseX: any; 
  mouseY: any;
  isLoaded: boolean;
}) {
  const y1 = useTransform(scrollProgress, [0, 1], ["0%", "40%"]);
  const y2 = useTransform(scrollProgress, [0, 1], ["0%", "55%"]);
  const opacity = useTransform(scrollProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none hidden lg:block">
      {/* Large featured panel - right side */}
      <motion.div
        style={{
          y: y1,
          x: useTransform(mouseX, (v) => v * -0.15),
          rotateY: useTransform(mouseX, (v) => v * 0.2),
          rotateX: useTransform(mouseY, (v) => v * -0.15),
        }}
        className="absolute top-[15%] right-[4%] w-[420px] h-[280px] perspective-1000 preserve-3d"
        initial={{ opacity: 0, y: 100, rotateY: 15, scale: 0.9 }}
        animate={isLoaded ? { opacity: 1, y: 0, rotateY: 8, scale: 1 } : {}}
        transition={{ delay: 0.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
            alt="Dashboard interface"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {/* Scan line effect */}
          <motion.div
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
          />
        </div>
        {/* Glow effect */}
        <div className="absolute -bottom-6 inset-x-6 h-12 bg-[rgb(var(--glow-intense))]/10 blur-2xl rounded-full" />
      </motion.div>

      {/* Secondary panel - bottom left */}
      <motion.div
        style={{
          y: y2,
          x: useTransform(mouseX, (v) => v * 0.1),
        }}
        className="absolute bottom-[18%] left-[5%] w-[280px] h-[180px]"
        initial={{ opacity: 0, x: -60, scale: 0.9 }}
        animate={isLoaded ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ delay: 1.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop"
            alt="Mobile interface"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30" />
        </div>
      </motion.div>

      {/* Accent orb */}
      <motion.div
        className="absolute top-[55%] right-[28%] w-40 h-40 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-full bg-[rgb(var(--glow-intense))] blur-3xl"
        />
      </motion.div>
    </motion.div>
  );
}

// Main content with cinematic typography reveals
function HeroContent({ scrollProgress, isLoaded }: { scrollProgress: any; isLoaded: boolean }) {
  const y = useTransform(scrollProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollProgress, [0, 0.4], [1, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="relative z-20 min-h-[100svh] flex flex-col justify-center px-6 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto w-full pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-4xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 lg:mb-10"
          >
            <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/70 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for Q2 2024 projects
            </span>
          </motion.div>

          {/* Headline - cinematic staggered reveal */}
          <h1 className="font-display text-[clamp(3.5rem,11vw,9rem)] font-bold tracking-[-0.03em] leading-[0.88]">
            {/* Line 1 */}
            <span className="block overflow-hidden">
              <motion.span
                className="block text-white"
                initial={{ y: "120%", opacity: 0 }}
                animate={isLoaded ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                Websites that
              </motion.span>
            </span>
            {/* Line 2 - gradient */}
            <span className="block overflow-hidden mt-1 lg:mt-2">
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[rgb(var(--glow-intense))] to-[rgb(var(--glow))]"
                initial={{ y: "120%", opacity: 0 }}
                animate={isLoaded ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                drive growth
              </motion.span>
            </span>
          </h1>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 lg:mt-10 text-lg lg:text-xl xl:text-2xl text-white/60 max-w-xl leading-relaxed font-light"
          >
            Premium websites for businesses that want to stand out, 
            convert visitors, and scale with confidence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/contact" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(var(--glow))]/30 to-[rgb(var(--glow-intense))]/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-[rgb(var(--background))] font-semibold text-base transition-all duration-300 group-hover:gap-4">
                Start a project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/work"
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm font-semibold text-base text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              <Play className="w-4 h-4" />
              View work
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-16 lg:mt-20 pt-8 border-t border-white/10"
          >
            <div className="flex flex-wrap items-center gap-x-8 lg:gap-x-10 gap-y-3 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--glow-intense))]" />
                Modern tech stack
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--glow-intense))]" />
                Performance focused
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--glow-intense))]" />
                Conversion optimized
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Scroll indicator
function ScrollIndicator({ scrollProgress, isLoaded }: { scrollProgress: any; isLoaded: boolean }) {
  const opacity = useTransform(scrollProgress, [0, 0.1], [1, 0]);
  
  return (
    <motion.div
      style={{ opacity }}
      initial={{ opacity: 0, y: 20 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-1.5 rounded-full bg-white/60"
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);

    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / innerWidth * 40);
      mouseY.set((clientY - innerHeight / 2) / innerHeight * 40);
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
      className="relative min-h-[100svh] lg:min-h-[110vh] overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* Layer 0: Cinematic media background */}
      <CinematicMedia scrollProgress={scrollYProgress} />

      {/* Layer 1: Floating media panels */}
      <FloatingMediaPanels 
        scrollProgress={scrollYProgress} 
        mouseX={smoothMouseX} 
        mouseY={smoothMouseY}
        isLoaded={isLoaded}
      />

      {/* Layer 2: Main content */}
      <HeroContent scrollProgress={scrollYProgress} isLoaded={isLoaded} />

      {/* Scroll indicator */}
      <ScrollIndicator scrollProgress={scrollYProgress} isLoaded={isLoaded} />

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[rgb(var(--background))] to-transparent pointer-events-none z-20" />
    </section>
  );
}
