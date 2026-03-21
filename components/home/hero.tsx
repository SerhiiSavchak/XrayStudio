"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ===========================================
// FLOATING INTERFACE PANELS - CREATES THE "DIGITAL STAGE"
// ===========================================
function DigitalStage({ 
  mouseX, 
  mouseY, 
  isLoaded 
}: { 
  mouseX: any; 
  mouseY: any;
  isLoaded: boolean;
}) {
  // Create the central visual area - a live digital environment
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Central "stage" area - the hero image/interface zone */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[70vh] max-w-[1400px]"
        style={{ perspective: "2000px" }}
      >
        {/* Main display surface - glass panel with interface mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateX: 15 }}
          animate={isLoaded ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            rotateY: useTransform(mouseX, (v) => v * 0.03),
            rotateX: useTransform(mouseY, (v) => v * -0.02),
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full"
        >
          {/* Background glow - creates depth */}
          <div 
            className="absolute inset-0 rounded-[2rem] lg:rounded-[3rem]"
            style={{
              background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(var(--glow-intense), 0.08), transparent 70%)",
              filter: "blur(60px)",
              transform: "translateZ(-100px)",
            }}
          />

          {/* Main glass surface */}
          <div className="absolute inset-8 lg:inset-12 rounded-2xl lg:rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm">
            {/* Interface mockup - abstract but product-like */}
            <div className="absolute inset-0 p-6 lg:p-10">
              {/* Top bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                </div>
                <div className="hidden lg:flex items-center gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-16 h-2 rounded-full bg-white/[0.04]" />
                  ))}
                </div>
                <div className="w-24 h-8 rounded-lg bg-white/[0.06]" />
              </div>

              {/* Hero content skeleton */}
              <div className="mt-12 lg:mt-20 max-w-2xl">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isLoaded ? { width: "75%" } : {}}
                  transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="h-12 lg:h-16 rounded-lg bg-gradient-to-r from-white/10 to-white/[0.02]"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={isLoaded ? { width: "55%" } : {}}
                  transition={{ duration: 1.2, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-3 h-12 lg:h-16 rounded-lg bg-gradient-to-r from-[rgb(var(--glow-intense))]/15 to-transparent"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="mt-8 space-y-2"
                >
                  <div className="w-full max-w-md h-3 rounded bg-white/[0.04]" />
                  <div className="w-3/4 max-w-sm h-3 rounded bg-white/[0.03]" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="mt-10 flex gap-4"
                >
                  <div className="w-36 h-12 rounded-xl bg-white/15" />
                  <div className="w-28 h-12 rounded-xl border border-white/10 bg-white/[0.02]" />
                </motion.div>
              </div>

              {/* Cards preview */}
              <div className="absolute bottom-8 right-8 hidden lg:flex gap-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.2 + i * 0.15 }}
                    className="w-44 h-32 rounded-xl bg-white/[0.04] border border-white/[0.06] p-4"
                  >
                    <div className="w-full h-16 rounded-lg bg-white/[0.06]" />
                    <div className="mt-3 w-3/4 h-2 rounded bg-white/[0.04]" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Animated scan line */}
            <motion.div
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--glow-intense))]/30 to-transparent"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />

            {/* Corner highlights */}
            <div className="absolute top-0 left-0 w-32 h-32">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/20 to-transparent" />
              <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-white/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32">
              <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-white/10 to-transparent" />
              <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-white/10 to-transparent" />
            </div>
          </div>

          {/* Reflection beneath */}
          <div 
            className="absolute -bottom-20 inset-x-12 h-40 rounded-full opacity-30"
            style={{
              background: "radial-gradient(ellipse at center, rgba(var(--glow-intense), 0.15), transparent 70%)",
              filter: "blur(40px)",
              transform: "translateZ(-50px) scaleY(0.3)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating accent elements - subtle, controlled */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute top-[15%] right-[8%] w-64 h-64 hidden xl:block"
        style={{
          x: useTransform(mouseX, (v) => v * -0.15),
          y: useTransform(mouseY, (v) => v * -0.1),
        }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(var(--glow-intense), 0.06), transparent 60%)",
            filter: "blur(50px)",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute bottom-[20%] left-[5%] w-48 h-48 hidden xl:block"
        style={{
          x: useTransform(mouseX, (v) => v * 0.1),
          y: useTransform(mouseY, (v) => v * 0.15),
        }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(var(--glow), 0.08), transparent 60%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>
    </div>
  );
}

// ===========================================
// CONTENT OVERLAY - TYPOGRAPHY + CTAs
// ===========================================
function ContentOverlay({ isLoaded }: { isLoaded: boolean }) {
  return (
    <div className="absolute inset-0 flex items-end lg:items-center z-20 px-6 lg:px-16 pb-32 lg:pb-0">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 lg:mb-8"
          >
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-white/60 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for projects
            </span>
          </motion.div>

          {/* Main headline */}
          <h1 className="font-display text-[clamp(2.5rem,8vw,6.5rem)] font-bold tracking-[-0.03em] leading-[0.95]">
            <span className="block overflow-hidden">
              <motion.span
                className="block text-white"
                initial={{ y: "120%" }}
                animate={isLoaded ? { y: "0%" } : {}}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                I build websites
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-white/40"
                initial={{ y: "120%" }}
                animate={isLoaded ? { y: "0%" } : {}}
                transition={{ duration: 1.2, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                that convert
              </motion.span>
            </span>
          </h1>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 lg:mt-8 text-base lg:text-xl text-white/50 max-w-md lg:max-w-lg leading-relaxed"
          >
            Premium web experiences for businesses that want to stand out, 
            connect with their audience, and grow.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link href="/contact" className="group relative">
              <div className="absolute -inset-1 bg-white/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center justify-center gap-3 px-7 py-3.5 lg:px-8 lg:py-4 rounded-xl bg-white text-[rgb(var(--background))] font-semibold text-sm lg:text-base transition-all duration-300">
                Start a project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/work"
              className="flex items-center justify-center gap-3 px-7 py-3.5 lg:px-8 lg:py-4 rounded-xl border border-white/15 bg-white/[0.02] font-semibold text-sm lg:text-base text-white hover:bg-white/[0.06] transition-all duration-300"
            >
              View work
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-12 lg:mt-16 flex items-center gap-8 text-xs lg:text-sm text-white/30"
          >
            <span>Next.js & React</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Design to Code</span>
            <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
            <span className="hidden sm:block">Performance Focused</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ===========================================
// SCROLL INDICATOR
// ===========================================
function ScrollIndicator({ scrollProgress, isLoaded }: { scrollProgress: any; isLoaded: boolean }) {
  const opacity = useTransform(scrollProgress, [0, 0.15], [1, 0]);
  
  return (
    <motion.div
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={isLoaded ? { opacity: 1 } : {}}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
      >
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6], y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-2 rounded-full bg-white/50"
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);

    const handleMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / innerWidth * 40);
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
      className="relative h-[100svh] overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* Dark atmospheric base */}
      <motion.div 
        style={{ y: bgY }} 
        className="absolute inset-0"
      >
        {/* Subtle gradient atmosphere */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 80% at 50% 20%, 
                rgba(var(--surface-2), 0.8) 0%, 
                rgba(var(--background), 1) 70%
              )
            `,
          }}
        />
        
        {/* Very subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Digital stage - central visual area */}
      <motion.div style={{ opacity: contentOpacity }}>
        <DigitalStage 
          mouseX={smoothMouseX} 
          mouseY={smoothMouseY} 
          isLoaded={isLoaded} 
        />
      </motion.div>

      {/* Content overlay */}
      <motion.div style={{ opacity: contentOpacity }}>
        <ContentOverlay isLoaded={isLoaded} />
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator scrollProgress={scrollYProgress} isLoaded={isLoaded} />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[rgb(var(--background))] to-transparent pointer-events-none z-10" />
    </section>
  );
}
