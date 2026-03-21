"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dramatic light beams that sweep across
function CinematicBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary sweeping beam */}
      <motion.div
        className="absolute -top-full left-0 w-[1px] h-[300%] origin-top"
        style={{
          background: "linear-gradient(180deg, transparent, rgb(var(--foreground))/0.1, transparent)",
        }}
        initial={{ x: "-50vw", rotate: 25 }}
        animate={{ x: "150vw" }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
      />
      {/* Secondary beam */}
      <motion.div
        className="absolute -top-full left-0 w-[2px] h-[300%] origin-top"
        style={{
          background: "linear-gradient(180deg, transparent, rgb(var(--glow-intense))/0.15, transparent)",
        }}
        initial={{ x: "-30vw", rotate: 20 }}
        animate={{ x: "130vw" }}
        transition={{ duration: 2.8, ease: "easeInOut", delay: 0.5 }}
      />
      {/* Subtle tertiary beam */}
      <motion.div
        className="absolute -top-full left-0 w-[1px] h-[300%] origin-top"
        style={{
          background: "linear-gradient(180deg, transparent, rgb(var(--glow))/0.08, transparent)",
        }}
        initial={{ x: "-70vw", rotate: 30 }}
        animate={{ x: "170vw" }}
        transition={{ duration: 3.2, ease: "easeInOut", delay: 0.2 }}
      />
    </div>
  );
}

// Expanding circular reveal
function CircularReveal({ progress }: { progress: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Outer expanding ring */}
      <motion.div
        className="absolute rounded-full border border-[rgb(var(--foreground))]/5"
        initial={{ width: 0, height: 0 }}
        animate={{ width: 800, height: 800 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Mid ring */}
      <motion.div
        className="absolute rounded-full border border-[rgb(var(--foreground))]/8"
        initial={{ width: 0, height: 0 }}
        animate={{ width: 500, height: 500 }}
        transition={{ duration: 2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Inner pulsing ring */}
      <motion.div
        className="absolute rounded-full border border-[rgb(var(--foreground))]/10"
        initial={{ width: 0, height: 0 }}
        animate={{ 
          width: [0, 250, 260, 250], 
          height: [0, 250, 260, 250] 
        }}
        transition={{ 
          duration: 2,
          delay: 0.4,
          times: [0, 0.6, 0.8, 1],
          ease: [0.22, 1, 0.36, 1]
        }}
      />
      {/* Core glow */}
      <motion.div
        className="absolute w-20 h-20 rounded-full"
        style={{
          background: `radial-gradient(circle, rgb(var(--glow-intense))/${0.1 + progress * 0.1}, transparent 70%)`,
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// Cinematic counter
function LoadingCounter({ progress }: { progress: number }) {
  const displayProgress = Math.min(Math.round(progress), 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex flex-col items-center"
    >
      {/* Counter */}
      <div className="font-display text-7xl lg:text-8xl font-bold tracking-tight text-[rgb(var(--foreground))] tabular-nums">
        <motion.span
          key={displayProgress}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {String(displayProgress).padStart(3, "0")}
        </motion.span>
      </div>

      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6"
      >
        <span className="font-display text-lg font-semibold tracking-tight text-[rgb(var(--foreground))]">
          xray<span className="text-[rgb(var(--muted-foreground))]">.studio</span>
        </span>
      </motion.div>

      {/* Loading line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 w-40 h-[2px] bg-[rgb(var(--foreground))]/10 rounded-full overflow-hidden"
        style={{ transformOrigin: "left" }}
      >
        <motion.div
          className="h-full bg-[rgb(var(--foreground))]"
          style={{ width: `${displayProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function CinematicLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Ease out progress - faster at start, slower at end
        const remaining = 100 - prev;
        const increment = Math.max(1, remaining * 0.08);
        return Math.min(100, prev + increment);
      });
    }, 50);

    // Exit after progress complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgb(var(--background))]"
        >
          {/* Deep atmospheric gradient */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 50% 40%, rgb(var(--glow-intense))/0.04, transparent 60%)",
              }}
            />
          </div>

          {/* Cinematic beams */}
          <CinematicBeams />

          {/* Circular reveal animation */}
          <CircularReveal progress={progress} />

          {/* Counter and brand */}
          <LoadingCounter progress={progress} />

          {/* Corner frame elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute inset-8 lg:inset-16 pointer-events-none"
          >
            {/* Top left corner */}
            <div className="absolute top-0 left-0 w-12 lg:w-16">
              <motion.div 
                className="h-px bg-gradient-to-r from-[rgb(var(--foreground))]/20 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{ transformOrigin: "left" }}
              />
              <motion.div 
                className="w-px h-12 lg:h-16 bg-gradient-to-b from-[rgb(var(--foreground))]/20 to-transparent"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                style={{ transformOrigin: "top" }}
              />
            </div>
            {/* Bottom right corner */}
            <div className="absolute bottom-0 right-0 w-12 lg:w-16">
              <motion.div 
                className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[rgb(var(--foreground))]/20 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                style={{ transformOrigin: "right" }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-px h-12 lg:h-16 bg-gradient-to-t from-[rgb(var(--foreground))]/20 to-transparent"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                style={{ transformOrigin: "bottom" }}
              />
            </div>
          </motion.div>

          {/* Subtle vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(var(--background), 0.7) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
