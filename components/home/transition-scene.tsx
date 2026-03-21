"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function TransitionScene() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Typography reveals
  const titleY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["100%", "0%", "0%", "-100%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 1], ["100%", "0%", "0%", "-100%"]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.75, 0.95], [0, 1, 1, 0]);

  // Horizontal lines that sweep across
  const line1X = useTransform(scrollYProgress, [0, 0.5], ["-100%", "20%"]);
  const line2X = useTransform(scrollYProgress, [0.1, 0.6], ["100%", "-20%"]);
  const line3X = useTransform(scrollYProgress, [0.2, 0.7], ["-100%", "30%"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Counter animation
  const counterScale = useTransform(scrollYProgress, [0.3, 0.5], [0.5, 1]);
  const counterOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.75, 0.9], [0, 1, 1, 0]);

  // Background breathing
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1.25]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.3, 0.8, 0.8, 0.3]);

  // Frame elements
  const frameOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const frameScale = useTransform(scrollYProgress, [0.1, 0.4], [0.9, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[rgb(var(--background))]">
        {/* Animated background */}
        <motion.div style={{ scale: bgScale }} className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))] via-[rgb(var(--background))] to-[rgb(var(--surface-1))]" />
          
          {/* Central glow */}
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full"
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.08, transparent 50%)",
                filter: "blur(60px)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Horizontal scanning lines */}
        <motion.div style={{ opacity: lineOpacity }} className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ x: line1X }}
            className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--foreground))]/15 to-transparent"
          />
          <motion.div
            style={{ x: line2X }}
            className="absolute top-[50%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--foreground))]/10 to-transparent"
          />
          <motion.div
            style={{ x: line3X }}
            className="absolute top-[70%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--foreground))]/12 to-transparent"
          />
        </motion.div>

        {/* Corner frame accents */}
        <motion.div 
          style={{ opacity: frameOpacity, scale: frameScale }} 
          className="absolute inset-12 lg:inset-20 pointer-events-none"
        >
          {/* Top left */}
          <div className="absolute top-0 left-0 w-16 lg:w-24 h-16 lg:h-24">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[rgb(var(--foreground))]/30 to-transparent" />
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-[rgb(var(--foreground))]/30 to-transparent" />
          </div>
          {/* Top right */}
          <div className="absolute top-0 right-0 w-16 lg:w-24 h-16 lg:h-24">
            <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[rgb(var(--foreground))]/30 to-transparent" />
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-[rgb(var(--foreground))]/30 to-transparent" />
          </div>
          {/* Bottom left */}
          <div className="absolute bottom-0 left-0 w-16 lg:w-24 h-16 lg:h-24">
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[rgb(var(--foreground))]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-[rgb(var(--foreground))]/30 to-transparent" />
          </div>
          {/* Bottom right */}
          <div className="absolute bottom-0 right-0 w-16 lg:w-24 h-16 lg:h-24">
            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[rgb(var(--foreground))]/30 to-transparent" />
            <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-[rgb(var(--foreground))]/30 to-transparent" />
          </div>
        </motion.div>

        {/* Central content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          {/* Label */}
          <div className="overflow-hidden mb-8 lg:mb-10">
            <motion.p
              style={{ y: subtitleY, opacity: subtitleOpacity }}
              className="text-xs lg:text-sm uppercase tracking-[0.35em] text-[rgb(var(--muted-foreground))] font-medium"
            >
              How I Work
            </motion.p>
          </div>

          {/* Main headline - split into lines for stagger effect */}
          <div className="overflow-hidden">
            <motion.h2
              style={{ y: titleY, opacity: titleOpacity }}
              className="font-display text-5xl md:text-7xl lg:text-[6rem] xl:text-[7rem] font-bold tracking-[-0.03em] leading-[0.85]"
            >
              <span className="block text-[rgb(var(--foreground))]">From vision</span>
            </motion.h2>
          </div>
          
          <div className="overflow-hidden mt-2 lg:mt-4">
            <motion.h2
              style={{ y: subtitleY, opacity: subtitleOpacity }}
              className="font-display text-5xl md:text-7xl lg:text-[6rem] xl:text-[7rem] font-bold tracking-[-0.03em] leading-[0.85]"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--foreground))]/50 via-[rgb(var(--glow-intense))] to-[rgb(var(--foreground))]/50">
                to reality
              </span>
            </motion.h2>
          </div>

          {/* Process counter */}
          <motion.div
            style={{ scale: counterScale, opacity: counterOpacity }}
            className="mt-16 lg:mt-20 flex items-center justify-center gap-8 lg:gap-12"
          >
            {["Discovery", "Design", "Development", "Launch"].map((step, i) => (
              <div key={step} className="flex items-center gap-3 lg:gap-4">
                <span className="text-3xl lg:text-4xl font-display font-bold text-[rgb(var(--foreground))]/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs lg:text-sm uppercase tracking-[0.15em] text-[rgb(var(--muted-foreground))] hidden md:block">
                  {step}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Vertical progress indicator */}
        <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 h-32 w-px bg-[rgb(var(--border))]/30 overflow-hidden">
          <motion.div
            className="w-full bg-[rgb(var(--foreground))]"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            }}
          />
        </div>

        {/* Section label */}
        <motion.div
          style={{ opacity: frameOpacity }}
          className="absolute left-6 lg:left-12 bottom-12 lg:bottom-16"
        >
          <span className="text-[10px] lg:text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted-foreground))]/60 writing-mode-vertical hidden lg:block"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            The Process
          </span>
        </motion.div>
      </div>
    </section>
  );
}
