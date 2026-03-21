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
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const line1X = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  const line2X = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], ["60px", "0px", "0px", "-60px"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[rgb(var(--background))]"
    >
      {/* Animated lines */}
      <motion.div
        style={{ x: line1X }}
        className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--border))] to-transparent"
      />
      <motion.div
        style={{ x: line2X }}
        className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(var(--border))] to-transparent"
      />

      {/* Centered reveal text */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-6"
      >
        <motion.div style={{ opacity: textOpacity, y: textY }}>
          <p className="text-sm uppercase tracking-[0.3em] text-[rgb(var(--muted-foreground))] mb-6">
            The Process
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[rgb(var(--foreground))] tracking-tight">
            From vision
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--foreground))]/60 via-[rgb(var(--glow-intense))] to-[rgb(var(--foreground))]/60">
              to reality
            </span>
          </h2>
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      <motion.div
        style={{ opacity }}
        className="absolute top-12 left-12 w-20 h-20 border-l-2 border-t-2 border-[rgb(var(--border))]"
      />
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 right-12 w-20 h-20 border-r-2 border-b-2 border-[rgb(var(--border))]"
      />
    </section>
  );
}
