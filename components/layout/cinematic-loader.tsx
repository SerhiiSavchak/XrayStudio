"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Elegant light particles that drift slowly
function AmbientParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/[0.03]"
          style={{
            width: 150 + Math.random() * 200,
            height: 150 + Math.random() * 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

// Cinematic light beam that sweeps across
function LightSweep() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        className="absolute top-0 -left-1/2 w-[200%] h-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%, transparent 100%)",
        }}
        animate={{ x: ["-50%", "50%"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export function CinematicLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 120);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

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
            scale: 1.05,
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgb(var(--background))]"
        >
          {/* Ambient atmospheric layer */}
          <AmbientParticles />
          <LightSweep />
          
          {/* Deep gradient atmosphere */}
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 30%, rgb(var(--glow-intense))/0.03, transparent 60%)",
            }}
          />
          
          {/* Central content - clean and elegant */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Elegant expanding ring */}
            <div className="relative w-24 h-24">
              <motion.div
                className="absolute inset-0 rounded-full border border-[rgb(var(--foreground))]/10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-[rgb(var(--foreground))]/5"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Center glow */}
              <motion.div
                className="absolute inset-6 rounded-full bg-[rgb(var(--foreground))]/5"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.9, 1, 0.9],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            
            {/* Brand - subtle reveal */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14"
            >
              <span className="font-display text-xl font-semibold tracking-tight text-[rgb(var(--foreground))]">
                xray<span className="text-[rgb(var(--muted-foreground))]">.studio</span>
              </span>
            </motion.div>
            
            {/* Minimal progress line */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 120 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 h-px bg-[rgb(var(--foreground))]/10 overflow-hidden rounded-full"
            >
              <motion.div
                className="h-full bg-[rgb(var(--foreground))]/40"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </div>

          {/* Subtle vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(var(--background), 0.6) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
