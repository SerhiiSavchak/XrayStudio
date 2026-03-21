"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function TransitionScene() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);

  const line1X = useTransform(scrollYProgress, [0, 1], ["-100%", "10%"]);
  const line2X = useTransform(scrollYProgress, [0, 1], ["100%", "-10%"]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], ["80px", "0px", "0px", "-80px"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--surface-1))]/50 via-[rgb(var(--background))] to-[rgb(var(--surface-1))]/50" />
        
        {/* Large atmospheric glow */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.05, transparent 55%)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Horizontal animated lines for cinematic feel */}
      <motion.div
        style={{ x: line1X, opacity }}
        className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--foreground))]/10 to-transparent"
      />
      <motion.div
        style={{ x: line2X, opacity }}
        className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--foreground))]/8 to-transparent"
      />

      {/* Centered reveal text */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-6"
      >
        <motion.div style={{ opacity: textOpacity, y: textY }}>
          <p className="text-xs uppercase tracking-[0.35em] text-[rgb(var(--muted-foreground))] mb-10 font-medium">
            The Process
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[rgb(var(--foreground))] tracking-[-0.03em] leading-[0.85]">
            From vision
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--foreground))]/40 via-[rgb(var(--glow-intense))] to-[rgb(var(--foreground))]/40">
              to reality
            </span>
          </h2>
        </motion.div>
      </motion.div>

      {/* Corner frame accents */}
      <motion.div style={{ opacity }} className="absolute top-12 left-12 w-20 h-20 hidden lg:block">
        <div className="w-full h-px bg-gradient-to-r from-[rgb(var(--foreground))]/20 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-[rgb(var(--foreground))]/20 to-transparent" />
      </motion.div>
      <motion.div style={{ opacity }} className="absolute bottom-12 right-12 w-20 h-20 hidden lg:block">
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-l from-[rgb(var(--foreground))]/20 to-transparent" />
        <div className="absolute right-0 w-px h-full bg-gradient-to-t from-[rgb(var(--foreground))]/20 to-transparent" />
      </motion.div>
    </section>
  );
}
