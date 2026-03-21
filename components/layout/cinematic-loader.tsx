"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function MatrixSymbols() {
  const columns = 20;
  const symbols = "01</>{}[]();:=+-*&|~^%$#@!?";
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {[...Array(columns)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 font-mono text-xs text-[rgb(var(--glow-intense))] whitespace-nowrap"
          style={{ left: `${(i / columns) * 100}%` }}
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        >
          {[...Array(30)].map((_, j) => (
            <div key={j} className="my-1">
              {symbols[Math.floor(Math.random() * symbols.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

function GlowingGrid() {
  return (
    <div className="absolute inset-0">
      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgb(var(--glow-intense))"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
      
      {/* Scan line effect */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--glow-intense))] to-transparent"
        initial={{ top: 0, opacity: 0 }}
        animate={{ top: "100%", opacity: [0, 0.8, 0.8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

function CentralOrb() {
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-[rgb(var(--glow-intense))]/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Middle ring with dash */}
      <motion.div
        className="absolute inset-2 rounded-full border border-dashed border-[rgb(var(--glow))]/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner glow */}
      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-br from-[rgb(var(--glow-intense))]/20 via-transparent to-[rgb(var(--glow))]/10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Core */}
      <motion.div
        className="absolute inset-8 rounded-full bg-[rgb(var(--glow-intense))]/30 backdrop-blur-sm"
        animate={{
          boxShadow: [
            "0 0 20px rgba(var(--glow-intense), 0.3)",
            "0 0 40px rgba(var(--glow-intense), 0.5)",
            "0 0 20px rgba(var(--glow-intense), 0.3)",
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Orbiting particles */}
      {[0, 90, 180, 270].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-2"
          style={{ transformOrigin: "0 0" }}
          animate={{ rotate: [angle, angle + 360] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.2,
          }}
        >
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-[rgb(var(--glow-intense))]"
            style={{ transform: `translateX(${i % 2 === 0 ? 50 : 60}px) translateY(-50%)` }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function CinematicLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    // Minimum display time for the loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgb(var(--background))]"
        >
          {/* Background effects */}
          <GlowingGrid />
          <MatrixSymbols />
          
          {/* Atmospheric glows */}
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px]"
            style={{ background: "radial-gradient(ellipse at center, rgb(var(--glow-intense))/0.15, transparent)" }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(ellipse at center, rgb(var(--glow))/0.1, transparent)" }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />

          {/* Central content */}
          <div className="relative z-10 flex flex-col items-center">
            <CentralOrb />
            
            {/* Logo / Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-12 text-center"
            >
              <span className="font-display text-2xl font-bold tracking-tight">
                <span className="text-[rgb(var(--foreground))]">xray</span>
                <span className="text-[rgb(var(--muted-foreground))]">.studio</span>
              </span>
            </motion.div>
            
            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-8 h-px bg-[rgb(var(--border))] overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[rgb(var(--glow))] to-[rgb(var(--glow-intense))]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 flex items-center gap-2"
            >
              <span className="text-xs font-mono text-[rgb(var(--muted-foreground))] tracking-wider">
                INITIALIZING
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-xs font-mono text-[rgb(var(--glow-intense))]"
              >
                _
              </motion.span>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[rgb(var(--border))]/30" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-[rgb(var(--border))]/30" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-[rgb(var(--border))]/30" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[rgb(var(--border))]/30" />

          {/* Noise texture */}
          <div className="absolute inset-0 pointer-events-none noise opacity-[0.02]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
